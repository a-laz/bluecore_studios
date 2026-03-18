# EVM Developers on Solana: What the Account Model Actually Changes

**Description:** Most EVM-to-Solana comparisons stop at TPS and gas costs. The architectural difference that actually matters is that EVM contracts own their state and Solana programs don't — and that changes how you design every DeFi primitive from the ground up.
**Tags:** DeFi Infrastructure, Protocol Design
**Slug:** `solana-account-model-evm`
**Read time:** ~18 min

---

# EVM Developers on Solana: What the Account Model Actually Changes

In October 2022, an attacker drained $116 million from Mango Markets in about half an hour. The mechanics involved manipulating a low-liquidity token's price on Mango's own oracle, posting the inflated position as collateral, and borrowing heavily against it before the price normalized. The oracle read was valid — the price feed was fresh. The price was just engineered.

This gets cited as an oracle problem, which is accurate. What gets less attention is why Mango's oracle was vulnerable in that particular way, and why teams porting lending logic from Ethereum tend to get oracle handling wrong on Solana even when they know to be careful.

Pyth price feeds are regular accounts. They have to be passed into your instruction as a parameter, and if the account is stale, you read the stale price. The protocol validates staleness by checking `price.published_at` against `Clock::get().unix_timestamp`. It should also check the confidence interval — Pyth widens this when price discovery is uncertain — but Chainlink's EVM interface doesn't surface confidence intervals in the same form, so teams that have spent years writing EVM lending code just don't have that check in their muscle memory. The gap isn't carelessness. It's that the failure mode doesn't exist in the environment they came from.

## State Doesn't Live Where You Think It Does

A Solana program is stateless bytecode. All mutable state lives in separate accounts passed explicitly to every instruction. There's no `storage` keyword. There's no `address(this)`. Everything your protocol needs to read or write — market config, vault balances, user positions, fee state — is a separate account with its own address and byte layout, and every instruction that touches it must declare it upfront.

EVM contracts own their state. It's co-located with the code, implicitly, with no setup. You declare a `mapping(address => UserPosition)` and write to it. The storage lives at the contract address by default.

None of that exists on Solana, and that gap is where EVM developers spend their first few weeks confused in ways that are hard to articulate. The confusion doesn't feel like "I don't understand this" — it feels like "this keeps not working and I don't know why."

A deposit instruction in a Solana lending protocol passes 12 to 15 accounts. Market config, asset reserve, user obligation, liquidity vault, collateral vault, fee vault, oracle, user token accounts, system program, token program, rent sysvar. The verbosity isn't overhead. Those accounts *are* the state. The instruction routes through them, it doesn't own them.

PDAs are how this becomes workable at scale. A Program Derived Address is derived deterministically from seeds and a program ID, and it lands off the Ed25519 curve — meaning no private key can exist for it. The owning program signs for it via `invoke_signed` by supplying the original seeds; the runtime re-derives the address to verify. Vaults, user positions, market accounts — all of this can be created and controlled without the program holding a key.

One thing that's genuinely under-documented: the canonical bump (the highest nonce that produces a valid off-curve address) should always be stored in account data and passed in, not recomputed on-chain. `find_program_address` iterates from 255 downward, spending roughly 1,500 compute units per attempt. This doesn't sound like much until you're calling it on every deposit and realize you're burning 15,000+ CU before any business logic runs. The Solana compute budget is 200,000 CU per transaction by default. 15k is not nothing.

I ended up down a rabbit hole once trying to figure out why a program was intermittently bumping into compute limits on what seemed like a simple instruction. It was the bump. Three places in the code recomputed it. Storing it in the account and passing it as a constraint fixed all three.

There's a related question about how the priority fee market interacts with compute unit consumption that I still don't have a clean mental model for. You can request more compute units per transaction with `ComputeBudgetInstruction::set_compute_unit_limit` — up to 1.4M — but validators prioritize transactions by fee-per-compute-unit, not fee-per-transaction. Which means a compute-heavy program that doesn't tune its CU request is effectively paying the same priority fee as a lightweight one from the validator's perspective. The recommendation is to simulate transactions and request exactly what you need, but simulated CU usage and actual CU usage can diverge when account state changes between simulation and execution. I've seen teams go in circles on this for a while without landing on a satisfying approach. Anyway — security.

## The Attack Surface Doesn't Shrink. It Moves.

Re-entrancy doesn't exist on Solana. The SBF VM returns `ReentrancyNotAllowed` if program A calls program B and B tries to call A. This is runtime enforcement. You can't write a re-entrancy bug because the runtime won't execute it. There's no `receive()` fallback, no ERC-777-style token hook, no way to inject code via ETH transfers. A whole category of EVM exploit history just doesn't apply.

What you get instead is a different set of vulnerabilities that EVM developers consistently underestimate, because the intuitions don't transfer.

Account data is untyped bytes. The runtime checks ownership — only the owner program can write to an account — but it doesn't check type. If your program deserializes an account without verifying `account.owner == your_program_id`, an attacker passes a crafted account owned by a program they control with a byte layout that happens to deserialize as your struct. The program accepts it. This is probably the most common exploitable vulnerability in audited Solana programs, and it keeps appearing because EVM developers have no equivalent to draw on. The EVM runtime guarantees that code at a contract address is the code that was deployed there, and that storage belongs to that contract. An external account can't forge internal state. On Solana nothing prevents an attacker from constructing bytes that pattern-match your struct — so the program has to do the check itself.

Related, and weirder: `Config { admin: Pubkey, fee: u64 }` and `User { authority: Pubkey, balance: u64 }` are both 40 bytes with the same field layout. Without a type discriminator, a program expecting a Config account will silently accept a User account. Anchor prepends an 8-byte discriminator to every account and validates it before deserialization. Teams that avoid Anchor to save compute units tend to not reimplement this correctly — they'll add the owner check but forget the discriminator, or get the check order wrong and create a TOCTOU window.

The signer check failure is more embarrassing than it sounds. `account.key == admin_pubkey` without `account.is_signer` accepts any transaction that includes the admin's pubkey as an unsigned account reference. The Wormhole exploit involved something structurally similar — a guardian signature verification function was substituted for a no-op. $320M in bridged assets was controlled by a validator set that was never actually asked to sign.

Arbitrary CPI is the last one worth dwelling on because it shows up in reasonable-looking aggregation code. If a program accepts a program ID as a user-supplied parameter and calls `invoke` without checking it against an allowlist, the user controls the program that gets invoked. It reads as obvious in retrospect, but during a fast build it just looks like flexibility.

There's also a class of subtle account confusion bugs that don't fit neatly into any of these categories — where the wrong account is passed and deserialization silently succeeds because the byte layout happens to be compatible, and the program proceeds with corrupted state. Anchor catches most of these through its `Account<'info, T>` wrapper and seeds constraints, but programs that do manual account parsing have to reason through every combination carefully. I've seen two audited programs where this was the critical finding, and in both cases the auditors had missed it on the first pass.

## What the Account Model Does to Protocol Design

The fixed-size array problem doesn't get talked about enough.

Account data is fixed at creation. `realloc` lets you grow an account up to 10 KiB per instruction — but that's a ceiling per instruction, not per operation, and you have to fund the rent delta and initialize the new space yourself. MarginFi's `LendingAccount` supports up to 16 positions. Kamino's obligation structure has a similar cap. When a user hits the limit, they can't open a new position without closing one. There's no equivalent in a mapping-based model.

Adding a new field to an existing account type — say, a reward tracking field for a new token — means migrating every existing account. You can do it upfront (one signed transaction per account, which scales terribly), lazily on first interaction (returning users absorb the cost), or by pre-allocating slack space at creation (everyone pays rent on bytes that might never be used). None of these are equivalent to just adding a key to a mapping, and the choice you make at launch locks in tradeoffs you'll be living with for years.

The rent calculation is `(data_length + 128) × 3480 × 2` lamports for rent exemption — roughly 0.002 SOL for a 165-byte token account, more for larger ones. Before a user can receive any token, they need an associated token account for that specific mint. If they don't have one, the transfer fails. Not "shows an error" — fails.

This produces a failure mode in reward distributions I've seen more than once. Protocol ships a new reward token, runs the distribution, transactions fail for everyone who hasn't previously held that token. The protocol then has to create ATAs from treasury SOL (cost they hadn't planned for), exclude those users, or delay. The first time it happens it's surprising. The second time it's just embarrassing because it should have been in the pre-launch checklist.

Side note that always trips people up: Solana programs are upgradeable by default. The deploy authority can push new bytecode. This is the *opposite* of the EVM default, where contracts are immutable unless you've explicitly built an upgradeable proxy. Most production Solana protocols eventually freeze the upgrade authority or transfer it to a governance multisig, but early in development they don't, and wallets will sometimes warn users about this. It's not a security flaw exactly — but it's a different trust model than EVM developers expect, and if you forget to freeze it before mainnet, you'll have a fun conversation with your auditors.

## Flash Loans, Briefly

Solana flash loans work through instruction introspection. The lending program reads `sysvar::instructions` — a sysvar that exposes the full current transaction's instruction set — and validates that a repay instruction appears later before releasing funds. If the repay fails, everything reverts at the transaction level.

The transaction construction is different from EVM: all accounts for all intermediate steps have to be known and declared before submission. You can't discover a pool's address at runtime and route through it. Jupiter runs its routing engine off-chain not as an optimization but because Solana's account declaration requirement makes on-chain dynamic routing architecturally impossible. For simple arbitrage, the off-chain builder does more work but it's fine. For anything that needs to discover intermediate state on-chain during execution, you're stuck.

Jito bundles complicate this picture in ways I don't want to overstate. Bundles allow up to five transactions to execute atomically within a single slot, which opens cross-transaction patterns that aren't possible in native Solana. The flash loan design space shifts somewhat. I don't have current production experience building flash loan infrastructure on Solana, so I'll leave the bundle question to people who've actually shipped it recently — the ecosystem has moved fast here.

## The Account Declaration Thing, Again

I keep coming back to the upfront account declaration requirement because it's the one that catches smart teams at the worst moment. You're three weeks from launch, building the routing layer, and you realize your on-chain program can't do something you assumed was possible because the accounts aren't known until execution. The architecture has to change.

Every account touched must be declared before the transaction is signed. Complex multi-hop routes with oracle accounts and tick arrays at each hop run into the 1,232-byte transaction size limit (that's IPv6 MTU minus headers — the limit comes from wanting transactions to fit in a single UDP packet). Each account address is 32 bytes. v0 transactions with Address Lookup Tables push this boundary out somewhat, but they don't eliminate it.

Any time your program needs to conditionally access one of two accounts based on runtime state, both accounts have to be in the transaction even if only one gets used. If the routing decision can't be made until execution, both possible routes have to be pre-loaded. This isn't a footgun that experienced developers work around — it's a fundamental property of the execution model. Designing around it is different from being surprised by it.

The oracle staleness issue from Mango is the one I think about most. It's where the mental model from Ethereum is most subtly wrong and the gap is hardest to notice in code review. Teams checking staleness but not the confidence interval will pass an audit, deploy to mainnet, and still be vulnerable to the exact attack vector that cost Mango $116M. The confidence interval check is the thing most teams still don't do.


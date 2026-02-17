"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Shield,
  TrendingUp,
  Lock,
  BarChart3,
  Trophy,
  Calculator,
} from "lucide-react";
import Link from "next/link";

const metrics = [
  { label: "Collateralized Mortgages", value: "$51.8M", icon: Shield },
  { label: "Collateralization Rate", value: "103.75%", icon: Lock },
  { label: "Supply Actively Staked", value: "88%", icon: TrendingUp },
  { label: "Target APY", value: "8%", icon: BarChart3 },
];

const highlights = [
  {
    icon: TrendingUp,
    title: "Staking & Yield Distribution",
    description:
      "Real-time claimable rewards system deployed on Solana. Yield from real mortgage interest income distributed transparently onchain with no lockup periods.",
  },
  {
    icon: Shield,
    title: "KYC/Compliance Gating",
    description:
      "Full KYC/AML integration gating access to the staking dApp. Regulatory compliance baked into the protocol layer, not bolted on as an afterthought.",
  },
  {
    icon: BarChart3,
    title: "On-Chain Transparency",
    description:
      "Public events for all yield distributions with exportable audit trails. Global dashboard showing real-time TVL, collateralization rate, staked percentage, and yield treasury.",
  },
  {
    icon: Trophy,
    title: "Gamification Layer",
    description:
      "XP-based engagement system with badges and tiered milestones from Shrimp to Whale. Drives sustained user participation and community building.",
  },
  {
    icon: Calculator,
    title: "Yield Calculator",
    description:
      "Interactive calculator allowing users to model returns across variable stake amounts, durations, and compounding strategies. Drives conversion.",
  },
  {
    icon: Lock,
    title: "Liquidity Without Lockups",
    description:
      "Reserve buffers and laddered loan maturities provide liquidity without requiring stakers to lock funds. Users can unstake at any time.",
  },
];

const techStack = [
  { category: "Smart Contracts", items: ["Solana", "Anchor", "Rust"] },
  { category: "Frontend", items: ["Next.js", "React", "TypeScript"] },
  {
    category: "Data & Dashboard",
    items: ["Real-time Dashboard", "Yield Calculator", "Analytics"],
  },
  {
    category: "Compliance",
    items: ["KYC/AML Integration", "Audit Trail", "Regulatory Middleware"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function REFI2CaseStudy() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-2xl border-b border-edge">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-heading transition-colors"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Bluecore
          </Link>
          <a
            href="https://refi2.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading transition-colors"
          >
            Visit refi2.com
            <ExternalLink size={14} />
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-28">
        <div className="mx-auto max-w-5xl px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-[11px] font-mono font-medium text-accent bg-accent-glow rounded-full">
                Case Study
              </span>
              <span className="px-3 py-1 text-[11px] font-mono text-muted bg-card rounded-full">
                Solana
              </span>
              <span className="px-3 py-1 text-[11px] font-mono text-muted bg-card rounded-full">
                Real-World Assets
              </span>
              <span className="px-3 py-1 text-[11px] font-mono text-muted bg-card rounded-full">
                DeFi Yield
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-heading leading-tight">
              REFI2
            </h1>
            <p className="mt-3 text-lg text-body max-w-2xl">
              Tokenizing Canadian secured mortgages into liquid,
              yield-generating onchain instruments.
            </p>
            <p className="mt-2 text-sm font-mono text-muted">
              Client: ReFi Technologies &middot; refi2.com
            </p>
          </motion.div>

          {/* Metrics */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className="rounded-xl bg-card border border-edge p-6 text-center"
              >
                <m.icon size={18} className="text-accent mx-auto mb-3" />
                <div className="font-display font-bold text-2xl md:text-3xl text-heading mb-1">
                  {m.value}
                </div>
                <div className="text-[11px] font-mono text-muted uppercase tracking-wide">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Problem / Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-[0.2em]">
                Problem
              </span>
              <h2 className="mt-3 font-display font-bold text-2xl text-heading mb-4">
                The Liquidity Gap
              </h2>
              <p className="text-body leading-[1.8]">
                Private mortgage lending generates stable, overcollateralized
                returns — but the asset class is completely illiquid and
                inaccessible to most investors. Traditional securitization is
                expensive, opaque, and excludes smaller participants. The
                result: billions in high-quality yield locked behind
                institutional walls.
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-[0.2em]">
                Solution
              </span>
              <h2 className="mt-3 font-display font-bold text-2xl text-heading mb-4">
                Onchain Tokenization
              </h2>
              <p className="text-body leading-[1.8]">
                Bluecore built a full-stack DeFi protocol that tokenizes a
                diversified portfolio of Canadian secured mortgages. REFI2
                tokens maintain a 1:1 USD peg backed by 102%+
                collateralization. Stakers earn 8% APY from real mortgage
                interest income — distributed transparently onchain with no
                lockup periods.
              </p>
            </div>
          </motion.div>

          {/* Architecture Highlights */}
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono text-xs text-accent uppercase tracking-[0.2em]">
                Architecture
              </span>
              <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl text-heading mb-10">
                What We Built
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {highlights.map((h) => (
                <motion.div
                  key={h.title}
                  variants={fadeUp}
                  className="rounded-xl bg-card border border-edge p-6"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-glow mb-4">
                    <h.icon size={18} className="text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-heading mb-2">
                    {h.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {h.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Architecture Diagram placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 rounded-xl bg-card border border-edge overflow-hidden"
          >
            <div className="p-8">
              <span className="font-mono text-xs text-accent uppercase tracking-[0.2em]">
                Architecture Flow
              </span>
              <h3 className="mt-3 font-display font-semibold text-xl text-heading mb-6">
                From Mortgage Origination to Onchain Yield
              </h3>

              {/* Simplified architecture diagram */}
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 py-8">
                {[
                  { step: "01", label: "Mortgage\nOrigination", sub: "Secured Canadian mortgages" },
                  { step: "02", label: "Tokenization\nEngine", sub: "1:1 USD peg, 102%+ collateral" },
                  { step: "03", label: "KYC / Compliance\nGating", sub: "Regulatory middleware" },
                  { step: "04", label: "Solana\nSmart Contracts", sub: "Staking & yield distribution" },
                  { step: "05", label: "User\nDashboard", sub: "Stake, claim, track yield" },
                ].map((item, i, arr) => (
                  <div key={item.step} className="flex items-center gap-4 md:gap-0 flex-1">
                    <div className="text-center flex-1">
                      <div className="font-mono text-[11px] text-accent mb-2">
                        {item.step}
                      </div>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-raised border border-edge mb-3">
                        <span className="font-display font-bold text-heading text-lg">
                          {item.step}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-heading whitespace-pre-line leading-tight">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-muted mt-1">
                        {item.sub}
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="hidden md:block w-8 h-px bg-edge flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16"
          >
            <span className="font-mono text-xs text-accent uppercase tracking-[0.2em]">
              Tech Stack
            </span>
            <h2 className="mt-3 font-display font-bold text-2xl text-heading mb-8">
              Built With
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {techStack.map((domain) => (
                <div
                  key={domain.category}
                  className="rounded-xl bg-card border border-edge p-5"
                >
                  <span className="text-[11px] font-mono text-accent uppercase tracking-wider">
                    {domain.category}
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {domain.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-sm text-heading bg-raised rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 text-center"
          >
            <h3 className="font-display font-bold text-2xl md:text-3xl text-heading mb-4">
              Building something similar?
            </h3>
            <p className="text-body mb-8 max-w-md mx-auto">
              We bring the same depth of engineering to every engagement. Let&apos;s
              talk about your protocol.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/85 transition-colors duration-200"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

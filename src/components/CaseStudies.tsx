"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import AnimateIn from "./AnimateIn";
import Link from "next/link";

const metrics = [
  { label: "Collateralized Mortgages", value: "$51.8M" },
  { label: "Collateralization Rate", value: "103.75%" },
  { label: "Supply Actively Staked", value: "88%" },
  { label: "Target APY", value: "8%" },
];

export default function CaseStudies() {
  return (
    <section id="work" className="relative py-28 md:py-36 bg-raised">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Case Studies"
          title="Shipped Work"
          description="Real protocols, real users, real capital. Every engagement produces infrastructure that runs in production."
        />

        {/* REFI2 Feature Card */}
        <AnimateIn>
          <div className="relative rounded-2xl overflow-hidden bg-card border border-edge">
            {/* Gradient accent bar */}
            <div
              className="h-1"
              style={{
                background:
                  "linear-gradient(90deg, #2176FF 0%, #00E5A0 100%)",
              }}
            />

            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
                {/* Left content */}
                <div className="flex-1 max-w-2xl">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="px-3 py-1 text-[11px] font-mono font-medium text-accent bg-accent-glow rounded-full">
                      Featured
                    </span>
                    <span className="px-3 py-1 text-[11px] font-mono text-muted bg-raised rounded-full">
                      Solana
                    </span>
                    <span className="px-3 py-1 text-[11px] font-mono text-muted bg-raised rounded-full">
                      RWA
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl md:text-3xl text-heading mb-2">
                    REFI2
                  </h3>
                  <p className="text-sm text-muted font-mono mb-4">
                    refi2.com &middot; ReFi Technologies
                  </p>

                  <p className="text-body leading-relaxed mb-3">
                    Tokenizing Canadian secured mortgages into liquid,
                    yield-generating onchain instruments. A full-stack DeFi
                    protocol where REFI2 tokens maintain a 1:1 USD peg backed by
                    102%+ collateralization.
                  </p>

                  <p className="text-body leading-relaxed mb-8">
                    Stakers earn 8% APY from real mortgage interest income
                    distributed transparently onchain — no lockups, full
                    liquidity, and complete KYC compliance integration.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {[
                      "Solana / Anchor",
                      "Rust",
                      "Next.js",
                      "React",
                      "KYC/AML",
                      "Real-time Dashboard",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-[11px] font-mono text-muted border border-edge rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href="/case-studies/refi2"
                      className="group inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-alt transition-colors"
                    >
                      Read Full Case Study
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                    <a
                      href="https://refi2.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading transition-colors"
                    >
                      Visit Site
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Right — Metrics */}
                <div className="grid grid-cols-2 gap-4 lg:min-w-[280px]">
                  {metrics.map((m) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="rounded-xl bg-raised border border-edge p-5 text-center"
                    >
                      <div className="font-display font-bold text-2xl text-heading mb-1">
                        {m.value}
                      </div>
                      <div className="text-[11px] font-mono text-muted uppercase tracking-wide">
                        {m.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Architecture highlights */}
              <div className="section-divider my-10" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Staking & yield distribution with real-time claimable rewards",
                  "No lockup periods — liquidity via reserve buffers",
                  "KYC/compliance gating for staking dApp access",
                  "On-chain transparency layer with exportable audit trails",
                  "Gamification layer with XP, badges, and tiered milestones",
                  "Interactive yield calculator with compounding models",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-alt shrink-0" />
                    <span className="text-sm text-body leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Placeholder for future case studies */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: "AI-Powered Compliance Middleware",
              category: "AI + Risk",
              status: "Coming Soon",
            },
            {
              title: "Cross-Chain Infrastructure Protocol",
              category: "Infrastructure",
              status: "Coming Soon",
            },
          ].map((cs) => (
            <AnimateIn key={cs.title}>
              <div className="gradient-border rounded-xl bg-card border border-edge p-7 opacity-60">
                <span className="text-[11px] font-mono text-muted uppercase tracking-wide">
                  {cs.category}
                </span>
                <h4 className="mt-2 font-display font-semibold text-lg text-heading">
                  {cs.title}
                </h4>
                <span className="mt-3 inline-block px-3 py-1 text-[11px] font-mono text-dim bg-raised rounded-full">
                  {cs.status}
                </span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

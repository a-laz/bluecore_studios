"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode2,
  Layers,
  Bot,
  BarChart3,
  Coins,
  ShieldCheck,
  Building2,
  Rocket,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

type Audience = "enterprise" | "startups";

const services = [
  {
    icon: FileCode2,
    title: "Smart Contract Systems",
    description:
      "Production-grade contracts for DeFi, NFTs, and governance. Audited, gas-optimized, and battle-tested.",
    keywords: ["Solidity", "Rust", "Anchor", "Foundry"],
    audience: ["enterprise", "startups"] as Audience[],
  },
  {
    icon: Layers,
    title: "DeFi Primitives",
    description:
      "Vaults, AMMs, lending protocols, and staking mechanisms across EVM and Solana ecosystems.",
    keywords: ["EVM", "Solana", "Cross-chain"],
    audience: ["startups"] as Audience[],
  },
  {
    icon: Bot,
    title: "AI Agents & Onchain Automation",
    description:
      "Autonomous systems that execute onchain strategies — yield optimization, rebalancing, liquidation protection.",
    keywords: ["Python", "LangChain", "ML Pipelines"],
    audience: ["enterprise", "startups"] as Audience[],
  },
  {
    icon: BarChart3,
    title: "Data Pipelines & Analytics",
    description:
      "Indexing, oracles, and ML-driven risk models that give protocols real-time intelligence.",
    keywords: ["TheGraph", "Helius", "PyTorch"],
    audience: ["enterprise"] as Audience[],
  },
  {
    icon: Coins,
    title: "Token Engineering",
    description:
      "Mechanism design, tokenomics modeling, and agent-based simulation for sustainable protocol economies.",
    keywords: ["cadCAD", "Agent-based Models"],
    audience: ["startups"] as Audience[],
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    description:
      "Audit, screening, and regulatory middleware — the intelligent airlock between DeFi and institutions.",
    keywords: ["Merkle Verification", "KYC/AML"],
    audience: ["enterprise"] as Audience[],
  },
];

export default function WhatWeBuild() {
  const [active, setActive] = useState<Audience>("enterprise");

  const filtered = services.filter((s) => s.audience.includes(active));

  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Services"
          title="What We Build"
          description="End-to-end engineering for protocols at every stage — from mechanism design through production deployment."
        />

        {/* Audience toggle buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14">
          <button
            onClick={() => setActive("enterprise")}
            className={`group relative flex-1 max-w-sm flex items-center gap-5 p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
              active === "enterprise"
                ? "bg-card border-accent shadow-[0_0_30px_rgba(33,118,255,0.1)]"
                : "bg-card/50 border-edge hover:border-edge-light hover:bg-card"
            }`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300 ${
                active === "enterprise"
                  ? "bg-accent text-white"
                  : "bg-accent-glow text-accent"
              }`}
            >
              <Building2 size={22} />
            </div>
            <div className="text-left">
              <span
                className={`font-display font-bold text-lg transition-colors duration-200 ${
                  active === "enterprise" ? "text-heading" : "text-body"
                }`}
              >
                Enterprise
              </span>
              <p className="text-xs text-muted mt-0.5">
                Institutional-grade infrastructure & compliance
              </p>
            </div>
            {active === "enterprise" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-xl border-2 border-accent pointer-events-none"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
          </button>

          <button
            onClick={() => setActive("startups")}
            className={`group relative flex-1 max-w-sm flex items-center gap-5 p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
              active === "startups"
                ? "bg-card border-accent-alt shadow-[0_0_30px_rgba(0,229,160,0.08)]"
                : "bg-card/50 border-edge hover:border-edge-light hover:bg-card"
            }`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300 ${
                active === "startups"
                  ? "bg-accent-alt text-surface"
                  : "bg-accent-glow text-accent"
              }`}
            >
              <Rocket size={22} />
            </div>
            <div className="text-left">
              <span
                className={`font-display font-bold text-lg transition-colors duration-200 ${
                  active === "startups" ? "text-heading" : "text-body"
                }`}
              >
                Startups
              </span>
              <p className="text-xs text-muted mt-0.5">
                Ship fast with battle-tested Web3 engineering
              </p>
            </div>
            {active === "startups" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-xl border-2 border-accent-alt pointer-events-none"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
          </button>
        </div>

        {/* Animated cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.07 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((service) => (
              <motion.div
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.97 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.4, ease: "easeOut" as const },
                  },
                }}
                className="gradient-border group rounded-xl bg-card p-7 hover:bg-card-hover transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-glow mb-5">
                  <service.icon size={20} className="text-accent" />
                </div>

                <h3 className="font-display font-semibold text-lg text-heading mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-body leading-relaxed mb-5">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 text-[11px] font-mono text-muted bg-raised rounded-md"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

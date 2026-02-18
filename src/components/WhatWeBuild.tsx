"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  ShieldCheck,
  Bot,
  BarChart3,
  KeyRound,
  Activity,
  FileCode2,
  Layers,
  Cpu,
  Coins,
  Rocket,
  Building2,
  BarChart2,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import type { LucideIcon } from "lucide-react";

type Audience = "enterprise" | "startups";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  keywords: string[];
}

const enterprise: Service[] = [
  {
    icon: Server,
    title: "Distributed Systems",
    description:
      "High-availability architectures built for scale — fault-tolerant, audited, and production-hardened.",
    keywords: ["Rust", "Go", "Kubernetes", "Terraform"],
  },
  {
    icon: ShieldCheck,
    title: "Compliance Middleware",
    description:
      "Regulatory screening, audit trails, and policy enforcement layers that sit between your systems and institutional requirements.",
    keywords: ["KYC/AML", "Merkle Verification", "SOC 2"],
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description:
      "Autonomous decision engines that execute complex operational strategies — optimization, rebalancing, and real-time response.",
    keywords: ["Python", "LangChain", "ML Pipelines"],
  },
  {
    icon: BarChart3,
    title: "Data Pipelines & Analytics",
    description:
      "Event streaming, indexing, and ML-driven risk models powering real-time operational intelligence.",
    keywords: ["Kafka", "PyTorch", "PostgreSQL", "ClickHouse"],
  },
  {
    icon: KeyRound,
    title: "Identity & Access Systems",
    description:
      "Credential management, role-based access, and zero-trust architecture for regulated environments.",
    keywords: ["OAuth", "SSO", "RBAC", "MFA"],
  },
  {
    icon: Activity,
    title: "Risk Engineering",
    description:
      "Real-time monitoring, anomaly detection, and automated response systems for high-stakes operations.",
    keywords: ["Prometheus", "Grafana", "Custom Alerting"],
  },
];

const startups: Service[] = [
  {
    icon: FileCode2,
    title: "Smart Contract Systems",
    description:
      "Production-grade contracts for DeFi, NFTs, and governance. Audited, gas-optimized, and battle-tested.",
    keywords: ["Solidity", "Rust", "Anchor", "Foundry"],
  },
  {
    icon: Layers,
    title: "DeFi Primitives",
    description:
      "Vaults, AMMs, lending protocols, and staking mechanisms across EVM and Solana ecosystems.",
    keywords: ["EVM", "Solana", "Cross-chain"],
  },
  {
    icon: Cpu,
    title: "AI Agents & Onchain Automation",
    description:
      "Autonomous systems that execute onchain strategies — yield optimization, rebalancing, liquidation protection.",
    keywords: ["Python", "LangChain", "ML Pipelines"],
  },
  {
    icon: Coins,
    title: "Token Engineering",
    description:
      "Mechanism design, tokenomics modeling, and agent-based simulation for sustainable protocol economies.",
    keywords: ["cadCAD", "Agent-based Models"],
  },
  {
    icon: Rocket,
    title: "Launch Infrastructure",
    description:
      "Token launches, liquidity bootstrapping, vesting contracts, and distribution pipelines — from testnet to mainnet.",
    keywords: ["Solana", "EVM", "Merkle Distributors"],
  },
  {
    icon: BarChart2,
    title: "Indexing & Protocol Analytics",
    description:
      "Custom subgraphs, real-time dashboards, and on-chain data pipelines so your team sees everything.",
    keywords: ["TheGraph", "Helius", "Dune", "Flipside"],
  },
];

const serviceMap: Record<Audience, Service[]> = { enterprise, startups };

export default function WhatWeBuild() {
  const [active, setActive] = useState<Audience>("enterprise");

  const cards = serviceMap[active];

  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Services"
          title="What We Build"
          description="Same team, same skills — two different front doors. Pick the lens that fits your world."
        />

        {/* Audience pill toggle */}
        <div className="relative inline-flex items-center gap-1 p-1 rounded-full bg-card border border-edge mb-14">
          <button
            onClick={() => setActive("enterprise")}
            className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
              active === "enterprise" ? "text-white" : "text-muted hover:text-heading"
            }`}
          >
            <Building2 size={16} />
            Enterprise
          </button>
          <button
            onClick={() => setActive("startups")}
            className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
              active === "startups" ? "text-white" : "text-muted hover:text-heading"
            }`}
          >
            <Rocket size={16} />
            Startups
          </button>
          <motion.div
            layoutId="pillHighlight"
            className={`absolute top-1 bottom-1 rounded-full ${
              active === "enterprise" ? "bg-accent" : "bg-accent-alt"
            }`}
            style={{
              left: active === "enterprise" ? 4 : "50%",
              right: active === "enterprise" ? "50%" : 4,
            }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
          />
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
            {cards.map((service) => (
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

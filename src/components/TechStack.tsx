"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const domains = [
  {
    label: "Chains",
    techs: ["Solana", "Ethereum", "Arbitrum", "Base", "Cosmos"],
  },
  {
    label: "Smart Contracts",
    techs: ["Rust", "Solidity", "Anchor", "Foundry", "Hardhat"],
  },
  {
    label: "AI / ML",
    techs: ["Python", "PyTorch", "LangChain", "Vector DBs", "TensorFlow"],
  },
  {
    label: "Infrastructure",
    techs: ["TheGraph", "Helius", "Alchemy", "IPFS", "Supabase"],
  },
  {
    label: "Frontend",
    techs: ["React", "Next.js", "TypeScript", "wagmi", "Wallet Adapters"],
  },
  {
    label: "Backend / Systems",
    techs: ["Rust", "Node.js", "Tauri", "PostgreSQL"],
  },
  {
    label: "Compliance",
    techs: ["Merkle Verification", "KYC/AML APIs", "Regulatory Frameworks"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const row = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Stack"
          title="Technologies We Ship With"
          description="An engineer will scan this in 3 seconds. We made sure it's worth the look."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-4"
        >
          {domains.map((domain) => (
            <motion.div
              key={domain.label}
              variants={row}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 py-4 border-b border-edge last:border-0"
            >
              <span className="font-mono text-xs text-accent uppercase tracking-[0.15em] w-44 shrink-0">
                {domain.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {domain.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 text-sm font-body text-heading bg-card border border-edge rounded-lg hover:border-edge-light hover:bg-card-hover transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

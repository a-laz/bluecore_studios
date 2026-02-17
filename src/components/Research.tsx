"use client";

import { motion } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const articles = [
  {
    title: "The Compliance Airlock: Why Institutional DeFi Needs an Intelligent Middleware Layer",
    description:
      "How ML-driven compliance and risk scoring creates the bridge between open DeFi protocols and regulated institutional capital.",
    tags: ["Compliance", "AI", "Institutions"],
  },
  {
    title: "Tokenizing Real-World Assets on Solana: Architecture Decisions and Tradeoffs",
    description:
      "A technical post-mortem from the REFI2 build — Anchor program design, yield distribution mechanics, and KYC integration patterns.",
    tags: ["Solana", "RWA", "Architecture"],
  },
  {
    title: "Merkle Tree Verification for Onchain NAV Tracking",
    description:
      "Deep dive into the cryptographic verification architecture that enables trustless NAV reporting for tokenized asset protocols.",
    tags: ["Cryptography", "Verification"],
  },
  {
    title: "AI Agents in DeFi: From Yield Optimization to Autonomous Risk Management",
    description:
      "Exploring the frontier of autonomous onchain systems — architecture patterns, safety mechanisms, and the path to verifiable inference.",
    tags: ["AI", "DeFi", "Agents"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Research() {
  return (
    <section id="research" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Research"
          title="Technical Writing"
          description="Not a blog. Deep technical content for engineers and protocol founders evaluating depth."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {articles.map((article) => (
            <motion.article
              key={article.title}
              variants={card}
              className="gradient-border group rounded-xl bg-card p-7 hover:bg-card-hover transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <FileText size={18} className="text-accent mt-0.5 shrink-0" />
                <ArrowUpRight
                  size={16}
                  className="text-dim group-hover:text-accent transition-colors shrink-0"
                />
              </div>

              <h3 className="font-display font-semibold text-lg text-heading leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
                {article.title}
              </h3>

              <p className="text-sm text-body leading-relaxed mb-5">
                {article.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-mono text-muted bg-raised rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <span className="text-[11px] font-mono text-dim uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

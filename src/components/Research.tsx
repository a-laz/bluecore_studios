"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Link from "next/link";

const articles: {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  externalUrl?: string;
}[] = [
  {
    slug: "compliance-airlock",
    title: "The Compliance Airlock: Why Institutional DeFi Needs an Intelligent Middleware Layer",
    description:
      "How ML-driven compliance and risk scoring creates the bridge between open DeFi protocols and regulated institutional capital.",
    tags: ["Compliance", "AI", "Institutions"],
    image: "/images/research/compliance-airlock.jpg", // Placeholder path
  },
  {
    slug: "solana-rwa-architecture",
    title: "Tokenizing Real-World Assets on Solana: Architecture Decisions and Tradeoffs",
    description:
      "A technical post-mortem from the REFI2 build — Anchor program design, yield distribution mechanics, and KYC integration patterns.",
    tags: ["Solana", "RWA", "Architecture"],
    image: "/images/research/solana-rwa.jpg", // Placeholder path
  },
  {
    slug: "merkle-tree-verification",
    title: "Merkle Tree Verification for Onchain NAV Tracking",
    description:
      "Deep dive into the cryptographic verification architecture that enables trustless NAV reporting for tokenized asset protocols.",
    tags: ["Cryptography", "Verification"],
    image: "/images/research/merkle-tree.jpg", // Placeholder path
  },
  {
    slug: "multi-agent-prompting",
    title: "Behavior, Strategy, Decision: Best Practices for Prompting Multi-Agent Systems",
    description:
      "A practical framework for structuring prompts across multi-agent architectures — covering behavior layers, strategy delegation, and decision boundaries for production AI systems.",
    tags: ["AI", "Multi-Agent", "Prompting"],
    image: "/images/research/multi-agent-prompting.png",
    externalUrl: "https://alexlazarev.medium.com/behavior-strategy-decision-best-practices-for-prompting-multi-agent-systems-5757c1ca6899",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Research() {
  return (
    <section id="research" className="relative py-28 md:py-36 bg-raised">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {articles.map((article) => {
            const Wrapper = article.externalUrl
              ? ({ children, className }: { children: React.ReactNode; className?: string }) => (
                  <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
                )
              : ({ children, className }: { children: React.ReactNode; className?: string }) => (
                  <Link href={`/research/${article.slug}`} className={className}>{children}</Link>
                );

            return (
              <motion.article
                key={article.slug}
                variants={card}
                className="group relative rounded-2xl overflow-hidden h-[450px] md:h-[550px] cursor-pointer"
              >
                <Wrapper>
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${article.image})`,
                    }}
                  >
                    {/* Fallback gradient if image doesn't load */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent" />
                  </div>

                  {/* Dark Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-raised via-raised/85 to-raised/50 group-hover:from-raised/95 group-hover:via-raised/90 transition-all duration-500" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8 lg:p-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs font-mono text-accent bg-accent-glow/50 backdrop-blur-sm rounded-md border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-heading leading-tight mb-3 group-hover:text-accent transition-colors duration-300">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-body leading-relaxed mb-5 line-clamp-3">
                      {article.description}
                    </p>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:text-accent-alt transition-colors">
                      <span>Read Article</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </div>
                </Wrapper>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

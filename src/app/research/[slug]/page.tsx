"use client";

import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Article data - in a real app, this would come from a CMS or database
const articles: Record<string, {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  "compliance-airlock": {
    slug: "compliance-airlock",
    title: "The Compliance Airlock: Why Institutional DeFi Needs an Intelligent Middleware Layer",
    description: "How ML-driven compliance and risk scoring creates the bridge between open DeFi protocols and regulated institutional capital.",
    tags: ["Compliance", "AI", "Institutions"],
    image: "/images/research/compliance-airlock.jpg",
    author: "Bluecore Team",
    date: "2024-01-15",
    readTime: "12 min read",
    content: `
# The Compliance Airlock

This is placeholder content for the article. In a production environment, this would be loaded from a CMS, markdown files, or a database.

## Introduction

The bridge between traditional finance and DeFi requires more than just smart contracts—it needs intelligent middleware that can navigate the complex landscape of regulatory compliance while maintaining the transparency and efficiency that makes DeFi powerful.

## Key Concepts

- ML-driven compliance scoring
- Risk assessment automation
- Institutional capital integration
- Regulatory framework alignment

## Technical Deep Dive

[Article content would go here...]

## Conclusion

The future of institutional DeFi depends on building these intelligent middleware layers that can seamlessly connect regulated capital with open protocols.
    `,
  },
  "solana-rwa-architecture": {
    slug: "solana-rwa-architecture",
    title: "Tokenizing Real-World Assets on Solana: Architecture Decisions and Tradeoffs",
    description: "A technical post-mortem from the REFI2 build — Anchor program design, yield distribution mechanics, and KYC integration patterns.",
    tags: ["Solana", "RWA", "Architecture"],
    image: "/images/research/solana-rwa.jpg",
    author: "Bluecore Team",
    date: "2024-02-20",
    readTime: "15 min read",
    content: `
# Tokenizing Real-World Assets on Solana

This is placeholder content for the article.

## Architecture Overview

[Content would go here...]
    `,
  },
  "merkle-tree-verification": {
    slug: "merkle-tree-verification",
    title: "Merkle Tree Verification for Onchain NAV Tracking",
    description: "Deep dive into the cryptographic verification architecture that enables trustless NAV reporting for tokenized asset protocols.",
    tags: ["Cryptography", "Verification"],
    image: "/images/research/merkle-tree.jpg",
    author: "Bluecore Team",
    date: "2024-03-10",
    readTime: "10 min read",
    content: `
# Merkle Tree Verification for Onchain NAV Tracking

This is placeholder content for the article.

[Content would go here...]
    `,
  },
  "ai-agents-defi": {
    slug: "ai-agents-defi",
    title: "AI Agents in DeFi: From Yield Optimization to Autonomous Risk Management",
    description: "Exploring the frontier of autonomous onchain systems — architecture patterns, safety mechanisms, and the path to verifiable inference.",
    tags: ["AI", "DeFi", "Agents"],
    image: "/images/research/ai-agents.jpg",
    author: "Bluecore Team",
    date: "2024-04-05",
    readTime: "18 min read",
    content: `
# AI Agents in DeFi

This is placeholder content for the article.

[Content would go here...]
    `,
  },
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const article = articles[params.slug];

  useEffect(() => {
    if (!article) {
      router.push('/#research');
    }
  }, [article, router]);

  if (!article) {
    return null;
  }

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${article.image})`,
          }}
        >
          {/* Fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent" />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-raised via-raised/90 to-raised/60" />

        {/* Content */}
        <div className="relative w-full">
          <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
            <Link
              href="/#research"
              className="inline-flex items-center gap-2 text-sm text-body hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              <span>Back to Research</span>
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
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
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-heading leading-tight mb-6">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
              <span>{article.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative py-16 md:py-24 bg-raised">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-body leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>

          {/* Back to Research Link */}
          <div className="mt-16 pt-8 border-t border-edge">
            <Link
              href="/#research"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-alt transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Research</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}


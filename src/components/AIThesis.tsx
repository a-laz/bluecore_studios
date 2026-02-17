"use client";

import { motion } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";
import AnimateIn from "./AnimateIn";

export default function AIThesis() {
  return (
    <section id="thesis" className="relative py-28 md:py-36 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(33, 118, 255, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl">
          <AnimateIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-glow">
                <Brain size={20} className="text-accent" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Thesis
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-heading leading-tight mb-8">
              Where AI Meets Onchain
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div className="space-y-6 text-body leading-[1.8]">
              <p>
                The next wave of DeFi won&apos;t be built by humans alone.
                Autonomous AI agents will manage onchain capital at scale —
                optimizing yields across protocols, rebalancing positions in
                real-time, and executing liquidation protection strategies faster
                than any trading desk.
              </p>

              <p>
                But autonomy without accountability is a non-starter for
                institutional capital. The missing piece is{" "}
                <span className="text-heading font-medium">
                  verifiable inference
                </span>{" "}
                — the ability to prove AI decisions onchain, creating an
                auditable trail that satisfies both protocol governance and
                regulatory frameworks.
              </p>

              <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="my-8 pl-6 border-l-2 border-accent"
              >
                <p className="text-lg text-heading font-display font-medium leading-relaxed italic">
                  &ldquo;Institutional money can&apos;t enter DeFi without an
                  intelligent airlock layer — ML-driven compliance and risk
                  scoring as middleware between open protocols and regulated
                  capital.&rdquo;
                </p>
              </motion.blockquote>

              <p>
                Real-world asset tokenization is the bridge. AI handles the
                underwriting, monitoring, and risk assessment. Smart contracts
                handle the settlement, custody, and distribution. Together, they
                create financial infrastructure that is simultaneously more
                transparent than traditional finance and more compliant than
                current DeFi.
              </p>

              <p>
                We build at this intersection — not because it&apos;s
                trendy, but because it&apos;s where the actual value creation
                happens. The teams that understand both the AI stack and the
                onchain stack will define the next decade of financial
                infrastructure.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2} className="mt-10">
            <a
              href="#research"
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-alt transition-colors"
            >
              Read our research
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

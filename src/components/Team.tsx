"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Team() {
  return (
    <section id="team" className="relative py-28 md:py-36 bg-raised">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Team"
          title="Who Builds This"
          description="In Web3 + AI, individual reputation matters more than corporate brand. We ship under our own names."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="gradient-border rounded-xl bg-card p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-xl bg-surface flex items-center justify-center shrink-0 border border-edge overflow-hidden">
                <span className="font-display font-bold text-2xl text-accent">
                  AL
                </span>
              </div>

              <div className="flex-1">
                <h3 className="font-display font-bold text-xl text-heading">
                  Alex Lazarev
                </h3>
                <p className="text-sm font-mono text-accent mt-1">
                  Founder & Lead Engineer
                </p>
                <p className="mt-4 text-sm text-body leading-relaxed">
                  Saw the institutional compliance gap in DeFi firsthand and
                  founded Bluecore to build the infrastructure that bridges it.
                  Hands-on engineer specializing in DeFi infrastructure,
                  compliance middleware, Rust, and Solana — not a manager who
                  stopped coding.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "DeFi Infrastructure",
                    "Compliance Middleware",
                    "Rust",
                    "Solana",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-mono text-muted bg-raised rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-heading transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={17} />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-heading transition-colors"
                    aria-label="X / Twitter"
                  >
                    <Twitter size={17} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-heading transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={17} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

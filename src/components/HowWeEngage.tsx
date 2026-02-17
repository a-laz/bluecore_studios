"use client";

import { motion } from "framer-motion";
import { Search, Zap, Users, Lightbulb } from "lucide-react";
import SectionHeading from "./SectionHeading";

const models = [
  {
    icon: Search,
    title: "Audit & Architecture Review",
    description:
      "Deep technical review of existing code, architecture, and security posture. Deliverable: written report with prioritized findings.",
    idealFor:
      "Teams with existing code that need expert validation before launch or fundraise.",
  },
  {
    icon: Zap,
    title: "Build Sprint",
    description:
      "4–8 week embedded engagement to ship a specific module, feature, or protocol component with velocity.",
    idealFor:
      "Teams with a clear spec that need execution speed and deep Web3 expertise.",
  },
  {
    icon: Users,
    title: "Ongoing Protocol Engineering",
    description:
      "Retainer-based core contributor role. Bluecore engineers embed in your team as long-term builders.",
    idealFor:
      "Protocols that need sustained, senior-level engineering capacity.",
  },
  {
    icon: Lightbulb,
    title: "Research & Prototyping",
    description:
      "Feasibility analysis and prototype development for novel mechanisms, tokenomics, or AI integrations.",
    idealFor:
      "Teams exploring new territory and needing a technical thought partner.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HowWeEngage() {
  return (
    <section id="approach" className="relative py-28 md:py-36 bg-raised">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Approach"
          title="How We Engage"
          description="No cookie-cutter discovery-to-launch funnels. We work the way Web3 teams actually build."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {models.map((model) => (
            <motion.div
              key={model.title}
              variants={card}
              className="gradient-border group rounded-xl bg-card p-8 hover:bg-card-hover transition-colors duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-glow mb-6">
                <model.icon size={20} className="text-accent" />
              </div>

              <h3 className="font-display font-semibold text-xl text-heading mb-3">
                {model.title}
              </h3>

              <p className="text-sm text-body leading-relaxed mb-5">
                {model.description}
              </p>

              <div className="pt-4 border-t border-edge">
                <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                  Ideal for
                </span>
                <p className="mt-1.5 text-sm text-body leading-relaxed">
                  {model.idealFor}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

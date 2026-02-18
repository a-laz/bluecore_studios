"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Search, Zap, Users, Lightbulb, ArrowRight, Plus, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Model {
  icon: LucideIcon;
  title: string;
  description: string;
  idealFor: string;
}

const models: Model[] = [
  {
    icon: Search,
    title: "Audit & Architecture Review",
    description:
      "Deep technical review of existing code, architecture, and security posture. Deliverable: written report with prioritized findings.",
    idealFor:
      "Teams with existing systems that need expert validation before scaling or procurement.",
  },
  {
    icon: Zap,
    title: "Build Sprint",
    description:
      "4–8 week embedded engagement to ship a specific module, feature, or system component with velocity.",
    idealFor:
      "Teams with a clear spec that need execution speed and deep technical expertise.",
  },
  {
    icon: Users,
    title: "Ongoing Systems Engineering",
    description:
      "Retainer-based core contributor role. Bluecore engineers embed in your team as long-term builders.",
    idealFor:
      "Organizations that need sustained, senior-level engineering capacity.",
  },
  {
    icon: Lightbulb,
    title: "Research & Prototyping",
    description:
      "Feasibility analysis and prototype development for novel architectures, system designs, or AI integrations.",
    idealFor:
      "Teams exploring new territory and needing a technical thought partner.",
  },
];

function CursorGradient() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 80, damping: 30 });
  const y = useSpring(rawY, { stiffness: 80, damping: 30 });
  const bg = useTransform(
    [x, y],
    ([xv, yv]) =>
      `radial-gradient(600px circle at ${(xv as number) * 100}% ${(yv as number) * 100}%, rgba(33, 118, 255, 0.06), transparent 60%)`
  );

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 pointer-events-none hidden md:block"
      style={{ background: bg }}
      onMouseMove={(e) => {
        const rect = ref.current?.parentElement?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((e.clientX - rect.left) / rect.width);
        rawY.set((e.clientY - rect.top) / rect.height);
      }}
    />
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HowWeEngage() {
  const [open, setOpen] = useState<number | null>(null);

  function toggle(i: number) {
    setOpen(open === i ? null : i);
  }

  return (
    <section
      id="approach"
      className="relative py-32 md:py-44 bg-raised bg-grid overflow-hidden"
    >
      {/* Depth gradient */}
      <div
        className="absolute top-0 left-0 w-full h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 0%, rgba(33, 118, 255, 0.06) 0%, transparent 70%)",
        }}
      />

      <CursorGradient />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading — left-aligned, tight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Approach
          </span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl lg:text-[3.5rem] text-heading leading-[1.08] tracking-[-0.02em]">
            How We Engage
          </h2>
          <p className="mt-5 text-[17px] text-body leading-relaxed">
            No cookie-cutter discovery-to-launch funnels. We work the way
            high-performance engineering teams actually build.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-3xl"
        >
          {models.map((model, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={model.title}
                variants={itemVariant}
                className="border-b border-edge last:border-0"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-5 py-7 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span className="font-mono text-sm text-dim w-8 shrink-0">
                    0{i + 1}
                  </span>

                  {/* Title */}
                  <span
                    className={`flex-1 font-display font-bold text-xl md:text-2xl tracking-[-0.01em] transition-colors duration-200 ${
                      isOpen
                        ? "text-heading"
                        : "text-muted group-hover:text-heading"
                    }`}
                  >
                    {model.title}
                  </span>

                  {/* Toggle icon */}
                  <span className="text-muted group-hover:text-heading transition-colors shrink-0">
                    {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-13 pb-8 flex flex-col md:flex-row gap-8" style={{ paddingLeft: "3.25rem" }}>
                        <div className="flex-1">
                          <p className="text-[15px] text-[#A8B8CF] leading-[1.8]">
                            {model.description}
                          </p>
                        </div>
                        <div className="md:w-64 shrink-0">
                          <span className="inline-block px-2.5 py-1 text-[10px] font-mono font-medium uppercase tracking-[0.15em] text-accent bg-accent/10 rounded-full mb-2">
                            Ideal for
                          </span>
                          <p className="text-[14px] text-[#A8B8CF] leading-relaxed">
                            {model.idealFor}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Section-end CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-start gap-6"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/85 transition-colors duration-200"
          >
            Start a Conversation
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <p className="text-sm text-muted max-w-xs leading-relaxed">
            Not sure which model fits? We&apos;ll scope it together in a
            30-minute technical discovery call.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

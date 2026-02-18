"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import DataStream from "./DataStream";
import {
  SiAmazonwebservices,
  SiGoogle,
  SiStripe,
  SiShopify,
  SiSlack,
} from "react-icons/si";

const WORDS = ["Blink.", "Break.", "Bend.", "Sleep.", "Lie."];
const TYPE_SPEED = 104;
const HOLD_DURATION = 2860;
const DELETE_SPEED = 65;

function RotatingWord({ delay = 0 }: { delay?: number }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"waiting" | "typing" | "holding" | "deleting">("waiting");

  // Initial delay before starting
  useEffect(() => {
    const timeout = setTimeout(() => setPhase("typing"), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  // Typing phase
  useEffect(() => {
    if (phase !== "typing") return;
    const word = WORDS[index];
    if (displayed.length >= word.length) {
      setPhase("holding");
      return;
    }
    const timeout = setTimeout(
      () => setDisplayed(word.slice(0, displayed.length + 1)),
      TYPE_SPEED
    );
    return () => clearTimeout(timeout);
  }, [phase, displayed, index]);

  // Hold phase
  useEffect(() => {
    if (phase !== "holding") return;
    const timeout = setTimeout(() => setPhase("deleting"), HOLD_DURATION);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Deleting phase
  useEffect(() => {
    if (phase !== "deleting") return;
    if (displayed.length === 0) {
      setIndex((prev) => (prev + 1) % WORDS.length);
      setPhase("typing");
      return;
    }
    const timeout = setTimeout(
      () => setDisplayed(displayed.slice(0, -1)),
      DELETE_SPEED
    );
    return () => clearTimeout(timeout);
  }, [phase, displayed]);

  const showCursor = phase !== "waiting";

  return (
    <span className="gradient-text">
      {displayed}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.45, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[0.85em] bg-accent align-middle ml-0.5 -mb-0.5"
        />
      )}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-surface" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(33, 118, 255, 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 60%, rgba(0, 229, 160, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Data stream — desktop only */}
      <DataStream />

      {/* Particle network */}
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-edge text-xs font-mono text-muted tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-alt animate-pulse" />
            Real-Time Systems &middot; Compliance Infrastructure &middot; Risk Engineering
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-heading leading-[1.1] tracking-tight"
        >
          We Build Infrastructure
          <br />
          That Doesn&apos;t <RotatingWord delay={1100} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-body leading-relaxed"
        >
          We engineer the backend systems, compliance layers, and data
          infrastructure that regulated industries actually trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/85 transition-colors duration-200"
          >
            Build With Us
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#work"
            className="flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-body border border-edge rounded-lg hover:border-edge-light hover:text-heading transition-all duration-200"
          >
            See Our Work
          </a>
        </motion.div>

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <p className="text-sm text-muted italic tracking-wide">
            Trusted by{" "}
            <span className="text-accent-alt font-bold not-italic">20+</span>{" "}
            tech companies &amp; startups
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { Icon: SiAmazonwebservices, label: "AWS" },
              { Icon: SiGoogle, label: "Google" },
              { Icon: SiStripe, label: "Stripe" },
              { Icon: SiShopify, label: "Shopify" },
              { Icon: SiSlack, label: "Slack" },
            ].map(({ Icon, label }) => (
              <Icon
                key={label}
                aria-label={label}
                size={24}
                className="text-heading opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </motion.div>
      </div>


    </section>
  );
}

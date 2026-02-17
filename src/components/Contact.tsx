"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, Calendar } from "lucide-react";
import AnimateIn from "./AnimateIn";

const stages = ["Idea", "MVP", "Scaling"];
const budgets = ["< $25k", "$25k–$50k", "$50k–$100k", "$100k+"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-raised overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 60%, rgba(33, 118, 255, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — CTA */}
          <div>
            <AnimateIn>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Contact
              </span>
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl lg:text-5xl text-heading leading-tight">
                Let&apos;s Build
              </h2>
              <p className="mt-5 text-lg text-body leading-relaxed max-w-md">
                No enterprise forms. No 3-week sales cycles. Tell us what you&apos;re
                building and we&apos;ll tell you how we can help.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.1} className="mt-10 space-y-5">
              <a
                href="#"
                className="flex items-center gap-4 group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-glow">
                  <Calendar size={18} className="text-accent" />
                </div>
                <div>
                  <span className="text-sm font-medium text-heading group-hover:text-accent transition-colors">
                    Book a Call
                  </span>
                  <p className="text-xs text-muted">
                    30-min technical discovery via Calendly
                  </p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-4 group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-glow">
                  <MessageCircle size={18} className="text-accent" />
                </div>
                <div>
                  <span className="text-sm font-medium text-heading group-hover:text-accent transition-colors">
                    Telegram
                  </span>
                  <p className="text-xs text-muted">
                    DM for quick conversations
                  </p>
                </div>
              </a>

              <a
                href="mailto:hello@bluecorestudios.com"
                className="flex items-center gap-4 group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-glow">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <span className="text-sm font-medium text-heading group-hover:text-accent transition-colors">
                    Email
                  </span>
                  <p className="text-xs text-muted">
                    hello@bluecorestudios.com
                  </p>
                </div>
              </a>
            </AnimateIn>
          </div>

          {/* Right — Form */}
          <AnimateIn delay={0.15}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl bg-card border border-edge p-10 text-center"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent-glow mx-auto mb-5">
                  <Send size={22} className="text-accent" />
                </div>
                <h3 className="font-display font-bold text-xl text-heading mb-2">
                  Message Sent
                </h3>
                <p className="text-sm text-body">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl bg-card border border-edge p-8"
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-muted uppercase tracking-wider mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 text-sm text-heading bg-raised border border-edge rounded-lg placeholder:text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project"
                      className="block text-xs font-mono text-muted uppercase tracking-wider mb-2"
                    >
                      Protocol / Project
                    </label>
                    <input
                      id="project"
                      type="text"
                      required
                      className="w-full px-4 py-3 text-sm text-heading bg-raised border border-edge rounded-lg placeholder:text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                      placeholder="Project name or URL"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="stage"
                        className="block text-xs font-mono text-muted uppercase tracking-wider mb-2"
                      >
                        Stage
                      </label>
                      <select
                        id="stage"
                        className="w-full px-4 py-3 text-sm text-heading bg-raised border border-edge rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors appearance-none"
                      >
                        {stages.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-xs font-mono text-muted uppercase tracking-wider mb-2"
                      >
                        Budget
                      </label>
                      <select
                        id="budget"
                        className="w-full px-4 py-3 text-sm text-heading bg-raised border border-edge rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors appearance-none"
                      >
                        {budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-xs font-mono text-muted uppercase tracking-wider mb-2"
                    >
                      Brief Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full px-4 py-3 text-sm text-heading bg-raised border border-edge rounded-lg placeholder:text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
                      placeholder="What are you building and where do you need help?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent/85 transition-colors duration-200"
                  >
                    Start a Conversation
                    <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

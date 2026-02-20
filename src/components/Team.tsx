"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useState, useRef, useEffect } from "react";
import AnimateIn from "./AnimateIn";
import {
  SiNasa,
  SiGoogle,
  SiAmazonwebservices,
  SiMeta,
  SiStripe,
  SiShopify,
} from "react-icons/si";

const teamMembers = [
  {
    name: "Vladislav Kuznetsov",
    initials: "VK",
    image: "/images/team/vlad.png",
    role: "ML Engineer & Data Scientist",
    bio: "Machine learning engineer with deep expertise in predictive modeling, NLP, and computer vision. Builds the data pipelines and ML infrastructure that power Bluecore's analytics — from risk scoring models to retention-driven insights. Turns complex datasets into actionable strategy using transfer learning, hyperparameter tuning, and scalable cloud workflows.",
    skills: ["Machine Learning", "Deep Learning / NLP", "Python / TensorFlow", "AWS / PySpark"],
    social: {
      github: "https://github.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Robert J Taylor",
    initials: "RT",
    image: "/images/team/rob.jpeg",
    role: "GTM & Frontend Developer",
    bio: "Bridges the gap between product and market at Bluecore. Top investor at Fiddeum with a sharp eye for Web3 opportunities, paired with hands-on frontend development skills to ship user-facing interfaces. Drives go-to-market strategy while building the experiences users actually interact with.",
    skills: ["Go-to-Market Strategy", "Frontend Development", "Web3 Investing", "Fiddeum"],
    social: {
      github: "https://github.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Alex Lazarev",
    initials: "AL",
    image: "/images/team/Alex.jpg",
    role: "Lead AI Product Developer",
    bio: "Builds agentic DeFi systems that turn complex on-chain strategies into simple savings products for everyday users. Ships multi-agent architectures, smart routing across DeFi protocols, and risk-aware portfolio copilots in Python, React, and Rust. 10+ years operating real-world businesses now applied to crypto. An engineer and operator who thinks in UX, risk, and trust.",
    skills: ["Agentic AI / DeFi", "Rust / Python / React", "Multi-Agent Systems", "Crypto Infrastructure"],
    social: {
      github: "https://github.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
    },
  },
];

const networkCompanies = [
  { name: "JP Morgan", icon: null },
  { name: "NASA", icon: SiNasa },
  { name: "Google", icon: SiGoogle },
  { name: "AWS", icon: SiAmazonwebservices },
  { name: "Meta", icon: SiMeta },
  { name: "Stripe", icon: SiStripe },
  { name: "Bloomberg", icon: null },
  { name: "Shopify", icon: SiShopify },
];

function AnimatedCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration: 1.2, ease: "easeOut" });
    }
  }, [inView, count, target]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(v) + "+";
    });
    return unsubscribe;
  }, [rounded]);

  return <span ref={ref}>0+</span>;
}

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

function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div variants={card}>
      <div className="gradient-border rounded-xl bg-card p-6 md:p-8 h-full flex flex-col">
        <div className="flex flex-col items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-xl bg-surface flex items-center justify-center shrink-0 border border-edge overflow-hidden relative">
            {member.image && !imageError ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: member.name === "Vladislav Kuznetsov" ? "center top" : "center center",
                }}
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="font-display font-bold text-2xl text-accent">
                {member.initials}
              </span>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-display font-bold text-xl text-heading">
              {member.name}
            </h3>
            <p className="text-sm font-mono text-accent mt-1">
              {member.role}
            </p>
            <p className="mt-4 text-sm text-body leading-relaxed">
              {member.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {member.skills.map((skill) => (
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
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-heading transition-colors"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-heading transition-colors"
                aria-label="X / Twitter"
              >
                <Twitter size={17} />
              </a>
              <a
                href={member.social.linkedin}
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
  );
}

const logoTile = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const logoContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export default function Team() {
  return (
    <section id="team" className="relative py-28 md:py-36 bg-raised">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Leadership"
          title="We Bet Our Name on Every Engagement"
          description="Every engineer on your project has shipped systems they'd stake their reputation on. Most already have."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </motion.div>

        {/* Engineering Network */}
        <div className="section-divider my-16" />

        <AnimateIn>
          <div className="glass-card-featured rounded-2xl border border-edge p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              {/* Left — stat block */}
              <div className="text-center lg:text-left shrink-0">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                  Engineering Network
                </p>
                <p className="font-display font-bold text-6xl md:text-7xl gradient-text leading-none">
                  <AnimatedCounter target={15} />
                </p>
                <p className="font-display font-semibold text-xl text-heading mt-2">
                  Engineers
                </p>
                <p className="text-sm text-muted mt-3 max-w-[260px]">
                  Spanning AI, DeFi, and enterprise infrastructure
                </p>
              </div>

              {/* Right — company logo grid */}
              <div className="flex-1 w-full">
                <motion.div
                  variants={logoContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                >
                  {networkCompanies.map((company) => (
                    <motion.div
                      key={company.name}
                      variants={logoTile}
                      className="flex items-center justify-center gap-2.5 rounded-xl bg-surface/50 border border-edge/50 px-4 py-4 hover:border-accent/30 transition-colors"
                    >
                      {company.icon ? (
                        <company.icon className="w-5 h-5 text-muted shrink-0" />
                      ) : null}
                      <span className="font-mono text-xs text-muted whitespace-nowrap">
                        {company.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-[11px] text-muted/60 mt-4 text-center lg:text-left">
                  Engineers from our network have shipped production systems at these organizations.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

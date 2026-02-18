"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useState } from "react";

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
      </div>
    </section>
  );
}

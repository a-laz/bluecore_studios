"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useState } from "react";

const teamMembers = [
  {
    name: "Alex Lazarev",
    initials: "AL",
    image: "/images/team/Alex.jpg",
    role: "Founder & Lead Engineer",
    bio: "Saw the institutional compliance gap in DeFi firsthand and founded Bluecore to build the infrastructure that bridges it. Hands-on engineer specializing in DeFi infrastructure, compliance middleware, Rust, and Solana — not a manager who stopped coding.",
    skills: ["DeFi Infrastructure", "Compliance Middleware", "Rust", "Solana"],
    social: {
      github: "https://github.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Team Member 2",
    initials: "TM",
    image: "/images/team/rob.jpeg",
    role: "Senior Engineer",
    bio: "Placeholder bio for team member. Deep expertise in AI/ML systems, smart contract development, and protocol architecture. Passionate about building scalable infrastructure for the next generation of DeFi.",
    skills: ["AI/ML", "Smart Contracts", "Protocol Architecture", "Scalability"],
    social: {
      github: "https://github.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Team Member 3",
    initials: "TM",
    image: "/images/team/vlad.png",
    role: "Senior Engineer",
    bio: "Placeholder bio for team member. Specialized in security audits, cryptographic systems, and onchain governance mechanisms. Focused on building trustless and verifiable systems.",
    skills: ["Security Audits", "Cryptography", "Governance", "Verification"],
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
                  objectPosition: member.name === "Team Member 3" ? "center top" : "center center",
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

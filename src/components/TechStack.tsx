"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  SiReact,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiRust,
  SiGo,
  SiLaravel,
  SiSwift,
  SiDocker,
  SiGithub,
  SiPostgresql,
  SiFigma,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Category = "Frontend" | "Backend" | "Mobile" | "DevOps" | "Design";
type Filter = "All" | Category;

interface Tech {
  name: string;
  Icon: IconType;
  categories: Category[];
  color: string;
}

const filters: Filter[] = ["All", "Frontend", "Backend", "Mobile", "DevOps"];

const technologies: Tech[] = [
  { name: "React", Icon: SiReact, categories: ["Frontend"], color: "#61DAFB" },
  { name: "Vue.js", Icon: SiVuedotjs, categories: ["Frontend"], color: "#4FC08D" },
  { name: "Node.js", Icon: SiNodedotjs, categories: ["Backend", "DevOps"], color: "#339933" },
  { name: "Python", Icon: SiPython, categories: ["Backend"], color: "#3776AB" },
  { name: "Rust", Icon: SiRust, categories: ["Backend"], color: "#DEA584" },
  { name: "Go", Icon: SiGo, categories: ["Backend"], color: "#00ADD8" },
  { name: "Laravel", Icon: SiLaravel, categories: ["Backend"], color: "#FF2D20" },
  { name: "Swift", Icon: SiSwift, categories: ["Mobile"], color: "#F05138" },
  { name: "Docker", Icon: SiDocker, categories: ["DevOps"], color: "#2496ED" },
  { name: "GitHub", Icon: SiGithub, categories: ["DevOps"], color: "#E2E8F0" },
  { name: "PostgreSQL", Icon: SiPostgresql, categories: ["Backend", "DevOps"], color: "#4169E1" },
  { name: "Figma", Icon: SiFigma, categories: ["Design"], color: "#F24E1E" },
];

export default function TechStack() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? technologies
      : technologies.filter((t) => t.categories.includes(activeFilter));

  return (
    <section id="stack" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Stack"
          title="Technologies We Ship With"
          description="An engineer will scan this in 3 seconds. We made sure it's worth the look."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? "bg-accent-alt text-surface shadow-[0_0_16px_rgba(0,229,160,0.25)]"
                  : "border border-edge text-body hover:border-edge-light hover:text-heading"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((tech) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-card border border-edge transition-all duration-300 hover:border-edge-light hover:shadow-[0_0_24px_rgba(33,118,255,0.1)]"
                >
                  <tech.Icon
                    size={28}
                    className="transition-transform duration-300 group-hover:scale-110"
                    style={{ color: tech.color }}
                  />
                  <span className="text-sm font-body text-body group-hover:text-heading transition-colors duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}

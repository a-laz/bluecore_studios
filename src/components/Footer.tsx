import { Github, Twitter } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Thesis", href: "#thesis" },
  { label: "Approach", href: "#approach" },
  { label: "Stack", href: "#stack" },
  { label: "Team", href: "#team" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <a
              href="#"
              className="font-display font-bold text-xl tracking-tight text-heading"
            >
              BLUECORE<span className="text-accent">.</span>
            </a>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Web3 infrastructure and AI solutions for protocol founders and
              institutional clients.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-heading transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-heading transition-colors"
                aria-label="X / Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-4">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-heading transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="section-divider mt-12 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dim">
          <span>&copy; {new Date().getFullYear()} Bluecore Studios. All rights reserved.</span>
          <span className="font-mono tracking-wide">
            Built with conviction, shipped with precision.
          </span>
        </div>
      </div>
    </footer>
  );
}

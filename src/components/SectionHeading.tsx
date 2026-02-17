import AnimateIn from "./AnimateIn";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <AnimateIn className="mb-16">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {label}
      </span>
      <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl lg:text-5xl text-heading leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-lg text-body leading-relaxed">
          {description}
        </p>
      )}
    </AnimateIn>
  );
}

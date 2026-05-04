export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) => (
  <div className={`${align === "center" ? "text-center mx-auto" : ""} max-w-2xl ${className}`}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-[1.05] text-accent">
      {title}
    </h2>
    {subtitle && <p className="mt-4 text-muted-foreground leading-relaxed">{subtitle}</p>}
  </div>
);

import { useRef } from "react";
import { Gem, Ruler, Sparkles, Truck } from "lucide-react";
import gsap from "gsap";
import { RevealOnScroll } from "./RevealOnScroll";
import { SectionHeading } from "./SectionHeading";

const items = [
  { Icon: Gem,      title: "Premium Materials",       text: "Slow-grown European hardwoods, marine-grade ply, solid brass." },
  { Icon: Ruler,    title: "Precision Manufacturing", text: "Calibrated CNC cutting, ±0.1mm tolerances, hand-fit joinery." },
  { Icon: Sparkles, title: "Custom Designs",          text: "Drawn around your space, your storage and the way you live." },
  { Icon: Truck,    title: "Fast Delivery",           text: "Most projects shipped within 6–8 weeks, white-glove install." },
];

const Card3D = ({ Icon, title, text }: { Icon: typeof Gem; title: string; text: string }) => {
  const cardRef  = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.set(el, {
      rotateX: -y * 14,
      rotateY:  x * 14,
      z: 12,
      transformPerspective: 700,
    });
    if (shineRef.current) {
      shineRef.current.style.background =
        `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(242,204,122,0.18) 0%, transparent 65%)`;
    }
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0, rotateY: 0, z: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
      transformPerspective: 700,
    });
    if (shineRef.current) shineRef.current.style.background = "none";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative h-full rounded-2xl bg-card border border-border p-7 transition-shadow duration-500 hover:shadow-elegant"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Moving light shine */}
      <div ref={shineRef} className="absolute inset-0 rounded-2xl pointer-events-none z-10" />

      <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-serif text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
};

export const WhyChooseUs = () => (
  <section className="relative overflow-hidden">

    {/* ── Decorative background ── */}
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
      <div className="absolute inset-0" style={{ background: "hsl(var(--secondary)/0.4)" }} />

      {/* Ghost "CRAFT" watermark */}
      <span
        className="absolute font-serif leading-none tracking-tight"
        style={{
          fontSize: "clamp(100px, 22vw, 320px)",
          left: "-0.04em",
          top: "50%",
          transform: "translateY(-50%)",
          color: "hsl(var(--foreground)/0.028)",
          letterSpacing: "-0.04em",
        }}
      >
        CRAFT
      </span>

      {/* Terracotta blob top-right */}
      <div
        className="absolute -top-16 -right-16 rounded-full"
        style={{
          width: "42vw", height: "42vw",
          background: "radial-gradient(circle, hsl(17 60% 47% / 0.07) 0%, transparent 65%)",
        }}
      />
      {/* Olive blob bottom-left */}
      <div
        className="absolute -bottom-10 left-[10%] rounded-full"
        style={{
          width: "25vw", height: "25vw",
          background: "radial-gradient(circle, hsl(75 27% 23% / 0.05) 0%, transparent 65%)",
        }}
      />

      <div
        className="absolute bottom-0 left-[4vw] right-[4vw] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.15), transparent)" }}
      />
    </div>

    <div className="container relative z-10 py-20 md:py-28">
      <SectionHeading
        align="center"
        eyebrow="Why Cabinet Factory"
        title="Built to a higher standard."
        subtitle="Four principles that shape every commission we take on."
      />
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map(({ Icon, title, text }, i) => (
          <RevealOnScroll key={title} delay={i * 90}>
            <Card3D Icon={Icon} title={title} text={text} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

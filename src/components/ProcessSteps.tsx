import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Design Consultation",
    text: "We visit, listen, measure — translating your brief into a clear concept.",
    img: "/pic3.jpeg",
  },
  {
    n: "02",
    title: "Material Selection",
    text: "Hand-pick veneers, finishes and hardware in our material library.",
    img: "/indian_materials.png",
  },
  {
    n: "03",
    title: "Manufacturing",
    text: "CNC precision meets hand finishing in our climate-controlled atelier.",
    img: "/pic8.jpeg",
  },
  {
    n: "04",
    title: "Installation",
    text: "White-glove install by our master fitters — leaving only the result.",
    img: "/pic9.jpeg",
  },
];

export const ProcessSteps = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".process-card");
      if (cards?.length) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.13,
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">

      {/* ── Decorative background ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {/* Light warm base */}
        <div className="absolute inset-0" style={{ background: "hsl(var(--secondary)/0.15)" }} />

        {/* Ghost "PROCESS" watermark */}
        <span
          className="absolute font-serif leading-none tracking-tight"
          style={{
            fontSize: "clamp(90px, 20vw, 300px)",
            right: "-0.05em",
            top: "50%",
            transform: "translateY(-50%)",
            color: "hsl(var(--foreground)/0.025)",
            letterSpacing: "-0.04em",
          }}
        >
          PROCESS
        </span>

        {/* Terracotta blob top-left */}
        <div
          className="absolute -top-20 -left-20 rounded-full"
          style={{
            width: "38vw", height: "38vw",
            background: "radial-gradient(circle, hsl(17 60% 47% / 0.07) 0%, transparent 65%)",
          }}
        />

        {/* Olive blob bottom-right */}
        <div
          className="absolute -bottom-16 right-[5%] rounded-full"
          style={{
            width: "28vw", height: "28vw",
            background: "radial-gradient(circle, hsl(75 27% 23% / 0.05) 0%, transparent 65%)",
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-[4vw] right-[4vw] h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.18), transparent)" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="container relative z-10">
        <SectionHeading
          eyebrow="The Process"
          title="From first sketch to finished room."
          subtitle="A calm, considered four-step journey — designed to feel as refined as the result."
        />

        <div ref={cardsRef} className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div
              key={s.n}
              className="process-card group relative rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
              style={{ opacity: 0 }}
            >
              {/* Step image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />

                {/* Large ghost step number over image */}
                <span
                  className="absolute bottom-2 right-3 font-serif leading-none select-none"
                  style={{
                    fontSize: "clamp(48px, 8vw, 72px)",
                    color: "hsl(17 65% 55% / 0.35)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.n}
                </span>
              </div>

              {/* Text */}
              <div className="p-5 pt-4">
                {/* Step number pill */}
                <div className="inline-flex items-center gap-1.5 mb-3">
                  <span
                    className="h-px w-5"
                    style={{ background: "hsl(17 60% 47% / 0.5)" }}
                  />
                  <span
                    className="text-[10px] uppercase tracking-[0.2em] font-medium"
                    style={{ color: "hsl(17 65% 55%)" }}
                  >
                    Step {s.n}
                  </span>
                </div>
                <h3 className="font-serif text-xl leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(17 65% 55%), hsl(17 60% 47% / 0.3))" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

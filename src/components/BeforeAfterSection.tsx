import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./SectionHeading";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  {
    before: "/before-room.jpg",
    after: "/pic5.jpeg",
    beforeAlt: "Room before renovation",
    afterAlt: "Stunning living room after Cabinet Factory renovation",
    label: "Living Room Transformation",
    description: "From dated interiors to a sophisticated, modern living space with custom built-in cabinetry.",
  },
  {
    before: "/pic2.2.png",
    after: "/pic2.jpeg",
    beforeAlt: "Kitchen before renovation",
    afterAlt: "Premium kitchen after Cabinet Factory renovation",
    label: "Kitchen Redesign",
    description: "A complete kitchen overhaul featuring precision-crafted cabinets and premium finishes.",
  },
  {
    before: "/bedroom1.png",
    after: "/bedroomafter.png",
    beforeAlt: "Bedroom before renovation",
    afterAlt: "Elegant bedroom after Cabinet Factory renovation",
    label: "Bedroom Makeover",
    description: "Custom wardrobes and storage solutions that transform the entire bedroom experience.",
  },
];

export const BeforeAfterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
        },
      );

      const cards = cardsRef.current?.querySelectorAll(".ba-card");
      if (cards?.length) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out", stagger: 0.15,
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
        {/* Warm tinted base */}
        <div className="absolute inset-0" style={{ background: "hsl(var(--secondary)/0.22)" }} />

        {/* Ghost "TRANSFORM" watermark */}
        <span
          className="absolute font-serif leading-none tracking-tight"
          style={{
            fontSize: "clamp(70px, 16vw, 230px)",
            top: "50%",
            left: "-0.05em",
            transform: "translateY(-50%)",
            color: "hsl(var(--foreground)/0.025)",
            letterSpacing: "-0.03em",
          }}
        >
          TRANSFORM
        </span>

        {/* Terracotta blob bottom-right */}
        <div
          className="absolute -bottom-16 -right-16 rounded-full"
          style={{
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, hsl(17 60% 47% / 0.07) 0%, transparent 65%)",
          }}
        />

        {/* Olive blob top-left */}
        <div
          className="absolute -top-10 left-[20%] rounded-full"
          style={{
            width: "22vw", height: "22vw",
            background: "radial-gradient(circle, hsl(75 27% 23% / 0.05) 0%, transparent 65%)",
          }}
        />

        {/* Accent lines */}
        <div
          className="absolute top-0 left-[4vw] right-[4vw] h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.18), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-[4vw] right-[4vw] h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.12), transparent)" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="container relative z-10">
        <div ref={headingRef} style={{ opacity: 0 }}>
          <SectionHeading
            align="center"
            eyebrow="Transformations"
            title="See the difference we make."
            subtitle="Drag the slider to reveal the stunning transformations our team delivers — from concept to completion."
          />
        </div>

        <div ref={cardsRef} className="mt-14 grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {transformations.map((t) => (
            <div
              key={t.label}
              className="ba-card group rounded-2xl bg-card border border-border p-4 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant"
              style={{ opacity: 0 }}
            >
              <BeforeAfterSlider
                before={t.before}
                after={t.after}
                beforeAlt={t.beforeAlt}
                afterAlt={t.afterAlt}
              />
              <div className="mt-4 px-1 pb-2">
                <h3 className="font-serif text-xl">{t.label}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

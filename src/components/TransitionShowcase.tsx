import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const processHighlights = [
  { label: "Concept to Blueprint", desc: "Every project begins with a precise digital concept." },
  { label: "Material Craftsmanship", desc: "Hand-selected veneers, hardware & finishes." },
  { label: "Precision Manufacturing", desc: "CNC-cut and hand-finished in our atelier." },
  { label: "White-Glove Install", desc: "Fitted by master craftsmen — flawlessly." },
];

export const TransitionShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".ts-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Left GIF card
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Right GIF card
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Process steps stagger
      gsap.fromTo(
        ".ts-step",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: stepsRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: "hsl(var(--foreground))" }}
    >
      {/* ─── Decorative blobs ─── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -top-32 -left-32 rounded-full"
          style={{
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, hsl(17 60% 47% / 0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 rounded-full"
          style={{
            width: "38vw", height: "38vw",
            background: "radial-gradient(circle, hsl(75 27% 23% / 0.14) 0%, transparent 65%)",
          }}
        />
        {/* Hairline grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(39 33% 96%) 1px, transparent 1px), linear-gradient(90deg, hsl(39 33% 96%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container relative z-10">

        {/* ─── Section heading ─── */}
        <div ref={textRef} className="text-center mb-16 md:mb-20">
          <div className="ts-heading inline-flex items-center gap-2 mb-4 opacity-0">
            <span className="h-px w-8" style={{ background: "hsl(17 60% 47%)" }} />
            <span
              className="text-[10px] uppercase tracking-[0.25em] font-medium"
              style={{ color: "hsl(17 65% 60%)" }}
            >
              Our Process — In Motion
            </span>
            <span className="h-px w-8" style={{ background: "hsl(17 60% 47%)" }} />
          </div>

          <h2
            className="ts-heading font-serif text-4xl md:text-6xl leading-tight tracking-tight opacity-0"
            style={{ color: "hsl(39 33% 94%)" }}
          >
            From vision to
            <em className="not-italic block" style={{ color: "hsl(17 65% 60%)" }}>
              extraordinary.
            </em>
          </h2>

          <p
            className="ts-heading mt-5 mx-auto max-w-xl text-base md:text-lg leading-relaxed opacity-0"
            style={{ color: "hsl(36 12% 62%)" }}
          >
            Watch how raw materials become heirloom-quality cabinetry — a seamless journey
            from first sketch to white-glove installation.
          </p>
        </div>

        {/* ─── GIF Showcase — two cards side by side ─── */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">

          {/* Left card — transition2.gif */}
          <div
            ref={leftRef}
            className="group relative rounded-3xl overflow-hidden opacity-0"
            style={{
              border: "1px solid hsl(39 33% 94% / 0.10)",
              boxShadow: "0 32px 80px -24px hsl(30 14% 2% / 0.7)",
            }}
          >
            {/* Badge */}
            <div
              className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                background: "hsl(17 60% 47% / 0.92)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Sparkles className="h-3 w-3" style={{ color: "hsl(39 33% 96%)" }} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "hsl(39 33% 96%)" }}>
                Transformation
              </span>
            </div>

            <img
              src="/transition2.gif"
              alt="Cabinet factory craftsmanship transformation"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ height: "clamp(260px, 36vw, 500px)", display: "block" }}
            />

            {/* Bottom overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5"
              style={{
                background: "linear-gradient(to top, hsl(30 14% 6% / 0.95) 0%, transparent 100%)",
              }}
            >
              <p
                className="font-serif text-xl leading-snug"
                style={{ color: "hsl(39 33% 94%)" }}
              >
                Design to Reality
              </p>
              <p className="mt-1 text-sm" style={{ color: "hsl(36 12% 62%)" }}>
                Witness precision craftsmanship unfold in real time.
              </p>
            </div>

            {/* Hover shimmer */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, hsl(39 33% 96% / 0.06) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Right card — transition1.gif */}
          <div
            ref={rightRef}
            className="group relative rounded-3xl overflow-hidden opacity-0"
            style={{
              border: "1px solid hsl(39 33% 94% / 0.10)",
              boxShadow: "0 32px 80px -24px hsl(30 14% 2% / 0.7)",
            }}
          >
            {/* Badge */}
            <div
              className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                background: "hsl(75 27% 23% / 0.92)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Sparkles className="h-3 w-3" style={{ color: "hsl(39 33% 96%)" }} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "hsl(39 33% 96%)" }}>
                Craftsmanship
              </span>
            </div>

            <img
              src="/transition1.gif"
              alt="Cabinet factory craftsmanship process"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ height: "clamp(260px, 36vw, 500px)", display: "block" }}
            />

            {/* Bottom overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5"
              style={{
                background: "linear-gradient(to top, hsl(30 14% 6% / 0.95) 0%, transparent 100%)",
              }}
            >
              <p
                className="font-serif text-xl leading-snug"
                style={{ color: "hsl(39 33% 94%)" }}
              >
                Atelier Process
              </p>
              <p className="mt-1 text-sm" style={{ color: "hsl(36 12% 62%)" }}>
                Every detail shaped by master craftsmen, every time.
              </p>
            </div>

            {/* Hover shimmer */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, hsl(39 33% 96% / 0.06) 0%, transparent 50%)",
              }}
            />
          </div>
        </div>

        {/* ─── Process Highlights ─── */}
        <div
          ref={stepsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {processHighlights.map((item, idx) => (
            <div
              key={idx}
              className="ts-step group relative rounded-2xl p-6 opacity-0 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "hsl(39 33% 96% / 0.04)",
                border: "1px solid hsl(39 33% 96% / 0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Step number */}
              <div
                className="mb-4 inline-flex items-center gap-2"
              >
                <span
                  className="font-serif text-4xl leading-none"
                  style={{ color: "hsl(17 65% 55% / 0.35)" }}
                >
                  0{idx + 1}
                </span>
                <CheckCircle2
                  className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "hsl(17 65% 55%)" }}
                />
              </div>

              <h3
                className="font-serif text-lg leading-snug mb-2"
                style={{ color: "hsl(39 33% 94%)" }}
              >
                {item.label}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(36 12% 55%)" }}>
                {item.desc}
              </p>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(17 65% 55%), transparent)" }}
              />
            </div>
          ))}
        </div>

        {/* ─── CTA ─── */}
        <div className="mt-14 flex justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 text-base font-medium transition-all duration-300 hover:scale-[1.04] hover:shadow-glow"
            style={{
              background: "hsl(17 60% 47%)",
              color: "hsl(39 33% 96%)",
            }}
          >
            <Link to="/process">
              See Full Process <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

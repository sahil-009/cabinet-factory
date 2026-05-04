import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { quote: "Our kitchen renovation was handled with incredible care. Every cabinet fits like it was always there — the precision is something else.", name: "Priya Sharma", role: "Homeowner, Mumbai", rating: 5 },
  { quote: "Cabinet Factory transformed our Bangalore flat completely. The wardrobes are stunning and the team was professional throughout.", name: "Arjun Nair", role: "Architect, Bangalore", rating: 5 },
  { quote: "The craftsmanship is outstanding. Our modular kitchen looks like it belongs in an AD magazine spread.", name: "Kavya Reddy", role: "Interior Designer, Hyderabad", rating: 5 },
  { quote: "Worth every rupee. They listened to exactly what we wanted and delivered far beyond our expectations.", name: "Vikram Patel", role: "Homeowner, Ahmedabad", rating: 5 },
  { quote: "From the material selection to the final install — a calm, refined process. Our kitchen is our favourite room now.", name: "Deepa Menon", role: "Homeowner, Chennai", rating: 5 },
  { quote: "Our home office cabinets are functional and beautiful. The build quality is unmatched at this price point in India.", name: "Rahul Gupta", role: "Entrepreneur, Delhi", rating: 5 },
];

const doubled = [...reviews, ...reviews];

const Stars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: n }).map((_, i) => (
      <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
    ))}
  </div>
);

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
        },
      );

      // Auto-scroll loop — starts once section enters view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 90%",
        once: true,
        onEnter() {
          const track = trackRef.current;
          if (!track) return;
          const halfW = track.scrollWidth / 2;

          tweenRef.current = gsap.to(track, {
            x: -halfW,
            duration: 40,
            ease: "none",
            repeat: -1,
          });

          const pause = () => tweenRef.current?.pause();
          const play  = () => tweenRef.current?.play();
          track.addEventListener("mouseenter", pause);
          track.addEventListener("mouseleave", play);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">

      {/* ── Decorative background ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute inset-0" style={{ background: "hsl(var(--secondary)/0.4)" }} />

        {/* Giant ghost quote */}
        <span
          className="absolute font-serif leading-none"
          style={{
            fontSize: "clamp(200px, 38vw, 560px)",
            top: "-0.15em", right: "-0.06em",
            color: "hsl(var(--foreground)/0.025)",
            lineHeight: 1,
          }}
        >
          "
        </span>

        {/* Terracotta blob left */}
        <div className="absolute -top-20 -left-10 rounded-full"
          style={{ width: "40vw", height: "40vw", background: "radial-gradient(circle, hsl(17 60% 47% / 0.07) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-0 rounded-full"
          style={{ width: "28vw", height: "28vw", background: "radial-gradient(circle, hsl(75 27% 23% / 0.05) 0%, transparent 65%)" }} />
        <div className="absolute top-0 left-[4vw] right-[4vw] h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.18), transparent)" }} />
      </div>

      <div className="container relative z-10 mb-12">
        <div ref={headingRef} style={{ opacity: 0 }}>
          <SectionHeading
            eyebrow="Voices"
            title="What our clients say."
            subtitle="Real homeowners, architects and designers across India share their experience."
          />
        </div>
      </div>

      {/* ── Infinite scroll track ── */}
      <div className="relative z-10 overflow-hidden">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--secondary)/0.4), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(var(--secondary)/0.4), transparent)" }} />

        <div ref={trackRef} className="flex gap-5 w-max px-5">
          {doubled.map((r, i) => (
            <div
              key={i}
              className="group flex-shrink-0 w-[320px] md:w-[380px] rounded-2xl bg-card border border-border p-6 shadow-soft
                         hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-400 cursor-default"
            >
              <Stars n={r.rating} />
              <blockquote className="mt-4 font-serif text-lg leading-snug text-foreground/90">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {/* Monogram avatar */}
                <div
                  className="h-9 w-9 rounded-full grid place-items-center shrink-0 text-sm font-serif font-medium"
                  style={{
                    background: "hsl(17 60% 47% / 0.12)",
                    color: "hsl(17 65% 55%)",
                    border: "1px solid hsl(17 60% 47% / 0.2)",
                  }}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

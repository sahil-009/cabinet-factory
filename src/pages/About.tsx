import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

gsap.registerPlugin(ScrollTrigger);

const craft  = "/indian_materials.png";
const factory = "/indian_dining.png";
const island  = "/indian_decor_accents.png";

const team = [
  { name: "Inês Carvalho",  role: "Founder & Design Lead" },
  { name: "Rui Soares",     role: "Master Joiner" },
  { name: "Marta Lopes",    role: "Materials & Finishes" },
  { name: "André Pinto",    role: "Production Manager" },
];

const stats = [
  ["22+", "Years of craft"],
  ["1.4k", "Homes furnished"],
  ["38",   "Master artisans"],
  ["12",   "Cities served"],
];

const About = () => {
  const heroRef  = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero heading cascade
      gsap.fromTo(".about-hero-word",
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.06 },
      );

      // Stats counter-style entrance
      gsap.fromTo(".about-stat",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero section ── */}
      <section ref={heroRef} className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute inset-0" style={{ background: "hsl(var(--secondary)/0.12)" }} />
          <span className="absolute font-serif leading-none tracking-tight"
            style={{ fontSize: "clamp(100px, 22vw, 320px)", right: "-0.04em", top: "-0.05em",
              color: "hsl(var(--foreground)/0.028)", letterSpacing: "-0.04em" }}>
            ABOUT
          </span>
          <div className="absolute -top-20 -left-20 rounded-full"
            style={{ width: "44vw", height: "44vw", background: "radial-gradient(circle, hsl(17 60% 47% / 0.07) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 left-[4vw] right-[4vw] h-px"
            style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.15), transparent)" }} />
        </div>
        <div className="container relative z-10">
          <span className="eyebrow"><span className="h-px w-8 bg-foreground/40" /> Our Story</span>
          <h1 className="mt-3 font-serif text-5xl md:text-7xl leading-[1] max-w-3xl">
            {["A", "quiet", "ambition", "for"].map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                <span className="about-hero-word inline-block">{w}</span>
              </span>
            ))}
            <br />
            <span className="inline-block overflow-hidden align-bottom mr-[0.22em]">
              <em className="about-hero-word text-accent not-italic inline-block">honest</em>
            </span>
            {["furniture."].map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                <span className="about-hero-word inline-block">{w}</span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Founded in 2003 in a small Bangalore workshop, Cabinet Factory has grown into an atelier of 38 makers
            — but the philosophy hasn't changed. Build slowly. Use real materials. Detail everything.
          </p>
        </div>
      </section>

      {/* ── Image pair ── */}
      <section className="relative overflow-hidden py-8">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "hsl(var(--secondary)/0.1)" }} />
        <div className="container relative z-10 grid md:grid-cols-2 gap-6 md:gap-8">
          <RevealOnScroll>
            <img src={factory} alt="Cabinet Factory interior" loading="lazy" width={1280} height={1024}
              className="rounded-[2rem] w-full h-[420px] object-cover shadow-soft" />
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <img src={craft} alt="Hand finishing a cabinet" loading="lazy" width={1280} height={1024}
              className="rounded-[2rem] w-full h-[420px] object-cover shadow-soft" />
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <span className="absolute font-serif leading-none tracking-tight"
            style={{ fontSize: "clamp(80px, 18vw, 260px)", left: "-0.04em", bottom: "-0.08em",
              color: "hsl(var(--foreground)/0.025)", letterSpacing: "-0.03em" }}>
            MISSION
          </span>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full"
            style={{ width: "35vw", height: "35vw", background: "radial-gradient(circle, hsl(17 60% 47% / 0.06) 0%, transparent 65%)" }} />
        </div>
        <div className="container relative z-10 grid md:grid-cols-2 gap-10 md:gap-16">
          <RevealOnScroll>
            <span className="eyebrow">Mission</span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Furniture that earns its place.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To make built-in cabinetry that's worth keeping — designed for the way you actually live,
              built to outlast the trends, and quietly beautiful from the very first detail to the last.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <span className="eyebrow">Vision</span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">A return to slow craft.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We believe modern manufacturing doesn't have to mean disposable. Our atelier blends precision
              machinery with hand finishing to make heirloom-quality cabinetry attainable.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0" style={{ background: "hsl(var(--secondary)/0.45)" }} />
          <div className="absolute -top-10 right-[10%] rounded-full"
            style={{ width: "30vw", height: "30vw", background: "radial-gradient(circle, hsl(17 60% 47% / 0.07) 0%, transparent 65%)" }} />
          <div className="absolute top-0 left-[4vw] right-[4vw] h-px"
            style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.18), transparent)" }} />
        </div>
        <div className="container relative z-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(([n, l]) => (
            <div key={l} className="about-stat text-center" style={{ opacity: 0 }}>
              <div className="font-serif text-5xl text-accent">{n}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <span className="absolute font-serif leading-none tracking-tight"
            style={{ fontSize: "clamp(80px, 18vw, 260px)", right: "-0.04em", top: "-0.05em",
              color: "hsl(var(--foreground)/0.025)", letterSpacing: "-0.04em" }}>
            TEAM
          </span>
          <div className="absolute -bottom-10 -left-10 rounded-full"
            style={{ width: "32vw", height: "32vw", background: "radial-gradient(circle, hsl(75 27% 23% / 0.05) 0%, transparent 65%)" }} />
        </div>
        <div className="container relative z-10">
          <SectionHeading eyebrow="The Team" title="Hands behind the work." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((p, i) => (
              <RevealOnScroll key={p.name} delay={i * 80}>
                <div className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
                  <div className="aspect-[4/5] bg-secondary overflow-hidden">
                    <img src={i % 2 ? craft : island} alt={p.name} loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="font-serif text-lg">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.role}</div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default About;

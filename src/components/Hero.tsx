import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "./FloatingParticles";
import { Hero3DBackground } from "./Hero3DBackground";
import { useSiteContext } from "@/context/SiteContext";
import gsap from "gsap";

/* Utility: wrap each word in an overflow-hidden mask span */
const MaskedWords = ({ text, className }: { text: string; className?: string }) => (
  <span className={className}>
    {text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom leading-none" style={{ paddingBottom: "0.12em" }}>
        <span className="hero-word inline-block">{word}</span>
        {i < text.split(" ").length - 1 && " "}
      </span>
    ))}
  </span>
);

export const Hero = () => {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rootRef    = useRef<HTMLElement>(null);
  const { introReady } = useSiteContext();

  /* ── GSAP entrance animation (fires once intro loader is done) ── */
  useEffect(() => {
    if (!introReady) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Eyebrow line
      tl.fromTo(".hero-eyebrow",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.1,
      );

      // Headline — each word slides up from behind its mask
      tl.fromTo(".hero-word",
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.75, stagger: 0.07 },
        0.25,
      );

      // Paragraph
      tl.fromTo(".hero-para",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.35",
      );

      // CTA buttons
      tl.fromTo(".hero-cta > *",
        { y: 16, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.1 },
        "-=0.4",
      );

      // Stats
      tl.fromTo(".hero-stat",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.3",
      );

      // Video wrapper slides in from right
      tl.fromTo(".hero-video-wrapper",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
        0.2,
      );
    }, rootRef);

    return () => { ctx.revert(); };
  }, [introReady]);

  /* ── Mouse-tracking 3D tilt on video card ── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(-4deg) rotateX(2deg)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-warm" aria-hidden />
      <Hero3DBackground />
      <FloatingParticles />

      <div className="container relative pt-10 pb-20 md:pt-20 md:pb-32 grid md:grid-cols-2 gap-10 md:gap-14 items-center">

        {/* ── Left: Text ── */}
        <div>
          <span className="hero-eyebrow eyebrow opacity-0">
            <span className="h-px w-8 bg-foreground/40" /> Bespoke Cabinetry
          </span>

          <h1 className="mt-5 font-serif text-5xl md:text-7xl leading-[1.0] tracking-tight">
            <MaskedWords text="Crafting cabinets" />
            <br />
            <MaskedWords text="that " />
            {/* "define" in accent — needs its own mask */}
            <span className="inline-block overflow-hidden align-bottom leading-none" style={{ paddingBottom: "0.12em" }}>
              <em className="hero-word text-accent not-italic font-normal inline-block">define</em>
            </span>
            <MaskedWords text=" your space." />
          </h1>

          <p className="hero-para mt-6 max-w-md text-base md:text-lg text-muted-foreground leading-relaxed opacity-0">
            Precision-built cabinets designed for durability, elegance, and modern living —
            handcrafted in our atelier from the finest materials.
          </p>

          <div className="hero-cta mt-8 flex flex-wrap items-center gap-3 opacity-0">
            <Button asChild size="lg" className="rounded-full px-7 bg-primary hover:bg-primary/90 hover:shadow-glow hover:scale-[1.03] transition-all">
              <Link to="/products">
                Explore Designs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full px-6 hover:bg-secondary">
              <Link to="/process">Our Process</Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
            <div className="hero-stat opacity-0">
              <div className="font-serif text-3xl text-foreground">22+</div>
              <div>Years of craft</div>
            </div>
            <div className="h-10 w-px bg-border hero-stat opacity-0" />
            <div className="hero-stat opacity-0">
              <div className="font-serif text-3xl text-foreground">1.4k</div>
              <div>Homes furnished</div>
            </div>
            <div className="h-10 w-px bg-border hidden sm:block hero-stat opacity-0" />
            <div className="hidden sm:block hero-stat opacity-0">
              <div className="font-serif text-3xl text-foreground">38</div>
              <div>Master artisans</div>
            </div>
          </div>
        </div>

        {/* ── Right: Video ── */}
        <div className="hero-video-wrapper relative opacity-0" style={{ perspective: "1200px" }}>
          <div className="absolute -inset-8 rounded-[2.5rem] bg-accent/20 blur-3xl animate-pulse" aria-hidden />
          <div className="absolute -inset-4 rounded-[2rem] bg-secondary/50 blur-2xl" aria-hidden />

          <div
            ref={wrapperRef}
            className="relative rounded-[2rem] overflow-hidden shadow-elegant border border-border/60 animate-float"
            style={{
              transform: "perspective(900px) rotateY(-4deg) rotateX(2deg)",
              transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <video
              ref={videoRef}
              src="/b_d_f_b_f_e_c_e_mp_.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[420px] md:h-[560px] object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 50%,rgba(255,255,255,0.06) 100%)" }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass border border-border/60 px-4 py-3">
              <div>
                <div className="text-xs text-muted-foreground">Featured</div>
                <div className="text-sm font-medium">Cabinet Factory — Craftsmanship in Motion</div>
              </div>
              <span className="h-9 w-9 rounded-full bg-accent text-accent-foreground grid place-items-center">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem]"
              style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.15)" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

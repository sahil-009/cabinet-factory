import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ModelViewer, preloadModel } from "./ModelViewer";
import ErrorBoundary from "./ErrorBoundary";

gsap.registerPlugin(ScrollTrigger);
preloadModel("/models/newoutput.glb");

export const CTASection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const paraRef     = useRef<HTMLParagraphElement>(null);
  const btnRef      = useRef<HTMLDivElement>(null);
  const orb1Ref     = useRef<HTMLDivElement>(null);
  const orb2Ref     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card pops in
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" },
        },
      );

      // Heading words cascade
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(paraRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: paraRef.current, start: "top 88%" },
        },
      );
      gsap.fromTo(btnRef.current,
        { y: 16, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.3,
          scrollTrigger: { trigger: btnRef.current, start: "top 90%" },
        },
      );

      // Floating orbs animation
      gsap.to(orb1Ref.current, {
        x: 30, y: -20, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
      gsap.to(orb2Ref.current, {
        x: -25, y: 15, duration: 8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="container py-20 md:py-28">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-[2rem] bg-primary text-primary-foreground p-10 pb-32 md:p-16 shadow-elegant"
        style={{ opacity: 0 }}
      >
        {/* Animated orbs */}
        <div ref={orb1Ref} className="absolute pointer-events-none"
          style={{ width: "55vw", height: "55vw", borderRadius: "50%", top: "-25%", right: "-15%",
            background: "radial-gradient(circle, hsl(17 60% 47% / 0.22) 0%, transparent 65%)" }} />
        <div ref={orb2Ref} className="absolute pointer-events-none"
          style={{ width: "35vw", height: "35vw", borderRadius: "50%", bottom: "-20%", left: "-5%",
            background: "radial-gradient(circle, hsl(17 60% 47% / 0.14) 0%, transparent 65%)" }} />

        {/* Ghost "CF" monogram */}
        <span className="absolute pointer-events-none select-none font-serif leading-none tracking-tighter"
          style={{ fontSize: "clamp(120px, 28vw, 400px)", right: "-0.04em", bottom: "-0.15em",
            color: "hsl(var(--primary-foreground)/0.02)", letterSpacing: "-0.05em" }}>
          CF
        </span>

        {/* Dot grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary-foreground)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="eyebrow text-primary-foreground/70">Start your project</span>
          </div>

          <h2
            ref={headingRef}
            className="font-serif text-4xl md:text-6xl leading-[1.02]"
            style={{ opacity: 0 }}
          >
            Build your dream cabinets{" "}
            <em className="text-accent not-italic">today</em>.
          </h2>

          <p
            ref={paraRef}
            className="mt-5 text-primary-foreground/75 max-w-lg leading-relaxed"
            style={{ opacity: 0 }}
          >
            Tell us about your space — we'll respond within one working day with concept directions
            and a clear plan. No obligation, just a conversation.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-8 text-sm text-primary-foreground/60">
            {[["22+", "Years of craft"], ["1.4k", "Homes furnished"], ["38", "Artisans"]].map(([v, l]) => (
              <div key={l}>
                <span className="font-serif text-2xl text-primary-foreground/90">{v} </span>
                <span>{l}</span>
              </div>
            ))}
          </div>

          <div ref={btnRef} className="mt-8 flex flex-wrap gap-3" style={{ opacity: 0 }}>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-[1.04] hover:shadow-glow transition-all"
            >
              <Link to="/contact">
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/process">See How It Works</Link>
            </Button>
          </div>
        </div>

        {/* ── Right side: 3D Model ── */}
        <div 
          className="absolute right-4 bottom-4 w-[150px] sm:w-[220px] md:w-[300px] h-[170px] sm:h-[260px] md:h-[360px] pointer-events-none z-20 overflow-visible"
        >
          {/* Inner glow for the model */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-accent/10 blur-[60px] pointer-events-none opacity-40" 
          />
          
          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <Canvas
                camera={{ fov: 40, position: [2, 1, 5] }}
                gl={{ antialias: true, alpha: true }}
                className="w-full h-full"
              >
                <ModelViewer 
                  modelPath="/models/newoutput.glb" 
                  scale={0.85} 
                  position={[0, -0.6, 0]}
                  rotation={[0, 0, 0]}
                />
              </Canvas>
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>
    </section>
  );
};

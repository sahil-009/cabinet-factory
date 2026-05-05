import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "./RevealOnScroll";
import { useEffect, useRef, useState } from "react";

const craft = "/indian_furniture.png";

const FEATURES = [
  "FSC-certified hardwoods",
  "German-engineered hinges",
  "Hand-rubbed natural oils",
  "Lifetime structural warranty",
];

export const AboutPreview = () => {
  const sectionRef      = useRef<HTMLElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const imgParallaxRef  = useRef<HTMLDivElement>(null);
  const txtParallaxRef  = useRef<HTMLDivElement>(null);
  const [count, setCount]           = useState(0);
  const [featVisible, setFeatVisible] = useState(false);

  /* ── Soothing canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* Warm palette helpers */
    const wood  = (a: number) => `rgba(139,107,71,${a})`;
    const terra = (a: number) => `rgba(190,100,60,${a})`;
    const olive = (a: number) => `rgba(108,130,74,${a})`;
    const COLS  = [wood, terra, olive];

    /* Dust motes — deterministic seeds so no re-render flicker */
    const DUST = Array.from({ length: 40 }, (_, i) => {
      const s = (n: number) => Math.abs(Math.sin(i * 17.3 + n * 13.7)) ;
      return {
        x: s(0), y: s(1),
        size:  1.2 + s(2) * 2.6,
        speed: 0.022 + s(3) * 0.04,
        drift: (s(4) - 0.5) * 0.016,
        alpha: 0.016 + s(5) * 0.028,
        col:   COLS[i % 3],
        rot:   s(6) * Math.PI * 2,
        rotS:  (s(7) - 0.5) * 0.003,
      };
    });

    /* Soft breathing orbs */
    const ORBS = [
      { bx: 0.14, by: 0.42, r: 210, p: 0,   ps: 0.0017, col: terra },
      { bx: 0.80, by: 0.58, r: 250, p: 2.1,  ps: 0.002,  col: wood  },
      { bx: 0.50, by: 0.18, r: 175, p: 4.0,  ps: 0.0014, col: olive },
    ];

    /* Wood-grain lines */
    const GRAINS = Array.from({ length: 14 }, (_, i) => ({
      y:     (i / 14) + Math.sin(i * 7) * 0.03,
      ySpd:  0.00007 + Math.abs(Math.sin(i * 3)) * 0.00013,
      alpha: 0.009  + Math.abs(Math.sin(i * 5)) * 0.012,
      lw:    0.5    + Math.abs(Math.sin(i * 9)) * 0.7,
      curve: (Math.sin(i * 11) - 0.5) * 28,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Orbs */
      for (const orb of ORBS) {
        orb.p += orb.ps;
        const ox = (orb.bx + Math.sin(orb.p) * 0.09) * W;
        const oy = (orb.by + Math.cos(orb.p * 0.65) * 0.07) * H;
        const r  = Math.max(1, orb.r * (1 + Math.sin(orb.p * 0.5) * 0.11));
        const g  = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0, orb.col(0.04));
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      /* Grain lines */
      for (const gr of GRAINS) {
        gr.y += gr.ySpd;
        if (gr.y > 1.02) gr.y = -0.02;
        const y = gr.y * H;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.quadraticCurveTo(W * 0.5, y + gr.curve, W, y);
        ctx.lineWidth   = gr.lw;
        ctx.strokeStyle = wood(gr.alpha);
        ctx.stroke();
      }

      /* Dust motes */
      for (const d of DUST) {
        d.y   -= d.speed / H;
        d.x   += d.drift / W;
        d.rot += d.rotS;
        if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); }
        if (d.x < -0.02) d.x = 1.02;
        if (d.x > 1.02)  d.x = -0.02;
        ctx.save();
        ctx.translate(d.x * W, d.y * H);
        ctx.rotate(d.rot);
        ctx.beginPath();
        ctx.arc(0, 0, d.size, 0, Math.PI * 2);
        ctx.fillStyle = d.col(d.alpha);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Mouse parallax ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      ty = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };

    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      if (imgParallaxRef.current)
        imgParallaxRef.current.style.transform = `translate(${cx * 16}px,${cy * 9}px)`;
      if (txtParallaxRef.current)
        txtParallaxRef.current.style.transform = `translate(${-cx * 7}px,${-cy * 4}px)`;
      raf = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Scroll-triggered count-up + feature reveal ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const dur = 1800;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * 22));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        setTimeout(() => setFeatVisible(true), 280);
      },
      { threshold: 0.25 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">

      {/* Soothing canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Decorative layer */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden style={{ zIndex: 1 }}>
        <span
          className="absolute font-serif leading-none tracking-tight"
          style={{
            fontSize: "clamp(80px,18vw,260px)",
            bottom: "-0.1em", left: "-0.05em",
            color: "hsl(var(--foreground)/0.028)",
            letterSpacing: "-0.03em",
          }}
        >
          ATELIER
        </span>
        <div
          className="absolute top-0 left-[4vw] right-[4vw] h-px"
          style={{ background: "linear-gradient(90deg,transparent,hsl(17 60% 47% / 0.18),transparent)" }}
        />
      </div>

      {/* Content */}
      <div className="container relative" style={{ zIndex: 2 }}>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── Image ── */}
          <RevealOnScroll>
            <div
              ref={imgParallaxRef}
              className="relative"
              style={{ willChange: "transform", transition: "transform 0.08s linear" }}
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-secondary/70 blur-2xl" aria-hidden />
              <img
                src={craft}
                alt="Artisan finishing a wooden cabinet door"
                loading="lazy"
                width={1280}
                height={1024}
                className="relative rounded-[2rem] w-full h-[480px] object-cover shadow-elegant"
                style={{ filter: "saturate(1.06) brightness(1.02)" }}
              />
              {/* Soft light sheen */}
              <div
                className="absolute inset-0 rounded-[2rem] pointer-events-none"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.09) 0%,transparent 50%,rgba(255,255,255,0.04) 100%)" }}
              />
              {/* Counter badge */}
              <div
                className="absolute -bottom-6 -right-4 md:-right-6 max-w-[240px] rounded-2xl bg-card border border-border shadow-soft p-5"
                style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
              >
                <div className="font-serif text-3xl text-accent tabular-nums">{count}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  Years perfecting the joinery
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* ── Text ── */}
          <RevealOnScroll delay={120}>
            <div
              ref={txtParallaxRef}
              style={{ willChange: "transform", transition: "transform 0.08s linear" }}
            >
              <span className="eyebrow">
                <span className="h-px w-8 bg-foreground/40" /> About the Atelier
              </span>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-[1.05]">
                A workshop where{" "}
                <em className="not-italic relative inline-block" style={{ color: "hsl(var(--accent))" }}>
                  patience
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "hsl(var(--accent)/0.38)" }}
                  />
                </em>
                {" "}meets precision.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Cabinet Factory began as a small joinery in Bangalore and has grown into a quietly ambitious atelier
                serving discerning homeowners and architects. Every cabinet is engineered in-house, cut on
                calibrated CNC, and finished by hand — the way furniture used to be made.
              </p>

              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                {FEATURES.map((f, i) => (
                  <li
                    key={f}
                    className="flex items-start gap-2"
                    style={{
                      opacity:   featVisible ? 1 : 0,
                      transform: featVisible ? "translateY(0)" : "translateY(10px)",
                      transition: `opacity 0.55s ease ${80 + i * 90}ms, transform 0.55s ease ${80 + i * 90}ms`,
                    }}
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-accent" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  asChild
                  className="group rounded-full bg-primary hover:bg-primary/90 hover:scale-[1.03] hover:shadow-glow transition-all duration-300 relative overflow-hidden"
                >
                  <Link to="/about">
                    {/* Warm radial glow on hover */}
                    <span
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle at 50% 50%,hsl(17 60% 47% / 0.22),transparent 70%)" }}
                    />
                    <span className="relative">Our Story</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};

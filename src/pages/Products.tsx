import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { CTASection } from "@/components/CTASection";
import gsap from "gsap";

type Cat = "All" | "Kitchen Cabinets" | "Wardrobes" | "Office Cabinets" | "Custom Storage";

const products: { img: string; title: string; cat: Exclude<Cat, "All">; tag: string }[] = [
  { img: "/indian_kitchen.png",      title: "Modern Kitchen Suite",        cat: "Kitchen Cabinets", tag: "Bespoke"  },
  { img: "/pic1.jpeg",               title: "Modular Kitchen Island",      cat: "Kitchen Cabinets", tag: "Modular"  },
  { img: "/indian_bedroom.png",      title: "Premium Walk-in Wardrobe",    cat: "Wardrobes",        tag: "Bespoke"  },
  { img: "/indian_workspace.png",    title: "Executive Office",            cat: "Office Cabinets",  tag: "Bespoke"  },
  { img: "/indian_living_room.png",  title: "Living Storage Wall",         cat: "Custom Storage",   tag: "Modular"  },
  { img: "/pic2.jpeg",               title: "Pantry Cabinet System",       cat: "Kitchen Cabinets", tag: "Premium"  },
  { img: "/pic3.jpeg",               title: "Master Dressing Room",        cat: "Wardrobes",        tag: "Premium"  },
  { img: "/indian_decor_accents.png",title: "Library Wall System",         cat: "Custom Storage",   tag: "Bespoke"  },
];

const cats: Cat[] = ["All", "Kitchen Cabinets", "Wardrobes", "Office Cabinets", "Custom Storage"];

/* Soothing warm canvas background for the hero */
const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const terra = (a: number) => `rgba(190,100,60,${a})`;
    const wood  = (a: number) => `rgba(139,107,71,${a})`;
    const olive = (a: number) => `rgba(108,130,74,${a})`;

    const ORBS = [
      { bx: 0.1, by: 0.5, r: 280, p: 0,   ps: 0.0016, col: terra },
      { bx: 0.7, by: 0.3, r: 320, p: 2.2,  ps: 0.0021, col: wood  },
      { bx: 0.9, by: 0.8, r: 200, p: 3.9,  ps: 0.0013, col: olive },
    ];

    const DUST = Array.from({ length: 28 }, (_, i) => {
      const s = (n: number) => Math.abs(Math.sin(i * 19 + n * 13));
      return {
        x: s(0), y: s(1),
        size:  1 + s(2) * 2.2,
        speed: 0.02 + s(3) * 0.035,
        drift: (s(4) - 0.5) * 0.014,
        alpha: 0.012 + s(5) * 0.022,
        col:   [terra, wood, olive][i % 3],
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const orb of ORBS) {
        orb.p += orb.ps;
        const ox = (orb.bx + Math.sin(orb.p) * 0.1) * W;
        const oy = (orb.by + Math.cos(orb.p * 0.7) * 0.08) * H;
        const r  = Math.max(1, orb.r * (1 + Math.sin(orb.p * 0.5) * 0.1));
        const g  = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0, orb.col(0.038));
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      for (const d of DUST) {
        d.y -= d.speed / H;
        d.x += d.drift / W;
        if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); }
        if (d.x < -0.02) d.x = 1.02;
        if (d.x > 1.02)  d.x = -0.02;
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.size, 0, Math.PI * 2);
        ctx.fillStyle = d.col(d.alpha);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

const Products = () => {
  const [cat, setCat] = useState<Cat>("All");
  const heroRef = useRef<HTMLElement>(null);
  const filtered = cat === "All" ? products : products.filter((p) => p.cat === cat);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".products-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0,
      );
      gsap.fromTo(".products-word",
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.07 },
      );
      gsap.fromTo(".products-sub",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.6 },
      );
      gsap.fromTo(".products-filters",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.8 },
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden py-16 md:py-24">
        <HeroCanvas />

        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden style={{ zIndex: 1 }}>
          <span
            className="absolute font-serif leading-none tracking-tight"
            style={{
              fontSize: "clamp(100px,22vw,320px)",
              right: "-0.04em", top: "-0.05em",
              color: "hsl(var(--foreground)/0.028)",
              letterSpacing: "-0.04em",
            }}
          >
            PRODUCTS
          </span>
          <div
            className="absolute bottom-0 left-[4vw] right-[4vw] h-px"
            style={{ background: "linear-gradient(90deg,transparent,hsl(17 60% 47% / 0.15),transparent)" }}
          />
        </div>

        <div className="container relative" style={{ zIndex: 2 }}>
          <span className="products-eyebrow eyebrow opacity-0">
            <span className="h-px w-8 bg-foreground/40" /> Collections
          </span>
          <h1 className="mt-3 font-serif text-5xl md:text-7xl leading-[1] max-w-3xl">
            {["A", "library", "of"].map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]" style={{ paddingBottom: "0.06em" }}>
                <span className="products-word inline-block">{w}</span>
              </span>
            ))}
            <span className="inline-block overflow-hidden align-bottom mr-[0.22em]" style={{ paddingBottom: "0.06em" }}>
              <em className="products-word text-accent not-italic inline-block">considered</em>
            </span>
            <span className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.06em" }}>
              <span className="products-word inline-block">cabinetry.</span>
            </span>
          </h1>
          <p className="products-sub mt-6 max-w-xl text-lg text-muted-foreground opacity-0">
            Browse our latest commissions and signature pieces. Every product can be tailored to your space.
          </p>

          <div className="products-filters mt-10 flex flex-wrap gap-2 opacity-0">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary scale-[1.04] shadow-soft"
                    : "bg-card border-border hover:border-accent/50 hover:scale-[1.02]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="container pb-16 md:pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <RevealOnScroll key={p.title + cat} delay={i * 60}>
              <article className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elegant cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.07]"
                  />
                  {/* Hover shimmer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 60%)" }}
                  />
                </div>
                <div className="p-5 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{p.cat}</div>
                    <h3 className="font-serif text-xl mt-1 group-hover:text-accent transition-colors duration-300">
                      {p.title}
                    </h3>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full bg-secondary inline-flex items-center gap-1 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300 shrink-0"
                  >
                    {p.tag} <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
                {/* Bottom accent on hover */}
                <div
                  className="h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mx-5 mb-4 rounded-full"
                  style={{ background: "linear-gradient(90deg,hsl(17 65% 55%),hsl(17 60% 47% / 0.3))" }}
                />
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Products;

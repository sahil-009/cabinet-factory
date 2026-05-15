import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";
import { SectionHeading } from "./SectionHeading";

const items = [
  { img: "/transition1.gif",       title: "Modern Kitchen",        tag: "Kitchen",  span: "md:col-span-2 md:row-span-2 h-[440px] md:h-full" },
  { img: "/indian_bedroom.png",    title: "Premium Wardrobe",      tag: "Wardrobe", span: "h-[220px]" },
  { img: "/indian_workspace.png",  title: "Home Office",           tag: "Office",   span: "h-[220px]" },
  { img: "/indian_living_room.png",title: "Living Room Storage",   tag: "Custom",   span: "md:col-span-2 h-[220px]" },
];

export const FeatureGrid = () => (
  <section className="relative overflow-hidden py-20 md:py-28">

    {/* ── Decorative background ── */}
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
      {/* Faint warm base */}
      <div className="absolute inset-0" style={{ background: "hsl(var(--secondary)/0.18)" }} />

      {/* Ghost "CF" monogram top-right */}
      <span
        className="absolute font-serif leading-none tracking-tighter"
        style={{
          fontSize: "clamp(140px, 28vw, 420px)",
          right: "-2vw",
          top: "-0.05em",
          color: "hsl(var(--foreground)/0.032)",
          letterSpacing: "-0.05em",
        }}
      >
        CF
      </span>

      {/* Terracotta blob top-left */}
      <div
        className="absolute -top-32 -left-32 rounded-full"
        style={{
          width: "44vw", height: "44vw",
          background: "radial-gradient(circle, hsl(17 60% 47% / 0.07) 0%, transparent 65%)",
        }}
      />

      {/* Olive blob bottom-right */}
      <div
        className="absolute -bottom-20 right-[10%] rounded-full"
        style={{
          width: "30vw", height: "30vw",
          background: "radial-gradient(circle, hsl(75 27% 23% / 0.05) 0%, transparent 65%)",
        }}
      />

      {/* Thin horizontal rule accent */}
      <div
        className="absolute bottom-0 left-[4vw] right-[4vw] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.18), transparent)" }}
      />
    </div>

    {/* ── Content ── */}
    <div className="container relative z-10">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <SectionHeading
          eyebrow="Selected Work"
          title="Cabinetry, considered."
          subtitle="A curated look at recent commissions across kitchens, wardrobes and bespoke storage."
        />
        <Link to="/projects" className="text-sm font-medium hover:text-accent transition-colors inline-flex items-center gap-1">
          View all projects <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-5">
        {items.map((it, i) => (
          <RevealOnScroll key={it.title} delay={i * 80} className={it.span}>
            <Link to="/projects" className="group relative block overflow-hidden rounded-2xl shadow-soft h-full">
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1200 ease-smooth group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-foreground/0" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              <div className="absolute left-5 top-5">
                <span className="inline-flex text-[11px] uppercase tracking-widest px-2.5 py-1 rounded-full glass border border-border/50">
                  {it.tag}
                </span>
              </div>
              <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between text-background">
                <h3 className="font-serif text-xl md:text-2xl">{it.title}</h3>
                <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Explore Now <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "./RevealOnScroll";

const craft = "/indian_furniture.png";

export const AboutPreview = () => (
  <section className="relative overflow-hidden py-20 md:py-28">

    {/* ── Decorative background ── */}
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
      {/* Ghost "ATELIER" watermark */}
      <span
        className="absolute font-serif leading-none tracking-tight"
        style={{
          fontSize: "clamp(80px, 18vw, 260px)",
          bottom: "-0.1em",
          left: "-0.05em",
          color: "hsl(var(--foreground)/0.028)",
          letterSpacing: "-0.03em",
        }}
      >
        ATELIER
      </span>

      {/* Terracotta glow right */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "45vw", height: "45vw",
          background: "radial-gradient(circle, hsl(17 60% 47% / 0.07) 0%, transparent 65%)",
        }}
      />

      {/* Olive glow top-left */}
      <div
        className="absolute -top-10 -left-10 rounded-full"
        style={{
          width: "25vw", height: "25vw",
          background: "radial-gradient(circle, hsl(75 27% 23% / 0.05) 0%, transparent 65%)",
        }}
      />

      {/* Top border accent */}
      <div
        className="absolute top-0 left-[4vw] right-[4vw] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.15), transparent)" }}
      />
    </div>

    {/* ── Content ── */}
    <div className="container relative z-10">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <RevealOnScroll>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-secondary/70 blur-2xl" aria-hidden />
            <img
              src={craft}
              alt="Artisan finishing a wooden cabinet door"
              loading="lazy"
              width={1280}
              height={1024}
              className="relative rounded-[2rem] w-full h-[480px] object-cover shadow-elegant"
            />
            <div className="absolute -bottom-6 -right-4 md:-right-6 max-w-[240px] rounded-2xl bg-card border border-border shadow-soft p-5">
              <div className="font-serif text-3xl text-accent">22</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Years perfecting the joinery</div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <span className="eyebrow"><span className="h-px w-8 bg-foreground/40" /> About the Atelier</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-[1.05]">
            A workshop where <em className="text-accent not-italic">patience</em> meets precision.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Cabinet Factory began as a small joinery in Bangalore and has grown into a quietly ambitious atelier
            serving discerning homeowners and architects. Every cabinet is engineered in-house, cut on
            calibrated CNC, and finished by hand — the way furniture used to be made.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            {["FSC-certified hardwoods", "German-engineered hinges", "Hand-rubbed natural oils", "Lifetime structural warranty"].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="text-foreground/80">{f}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8 rounded-full bg-primary hover:bg-primary/90 hover:scale-[1.03] hover:shadow-glow transition-all">
            <Link to="/about">Our Story <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

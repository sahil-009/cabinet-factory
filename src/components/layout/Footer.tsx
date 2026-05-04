import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  ["About",    "/about"],
  ["Products", "/products"],
  ["Process",  "/process"],
  ["Projects", "/projects"],
  ["Contact",  "/contact"],
];

export const Footer = () => {
  const footerRef  = useRef<HTMLElement>(null);
  const col1Ref    = useRef<HTMLDivElement>(null);
  const col2Ref    = useRef<HTMLDivElement>(null);
  const col3Ref    = useRef<HTMLDivElement>(null);
  const col4Ref    = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = [col1Ref.current, col2Ref.current, col3Ref.current, col4Ref.current];
      gsap.fromTo(cols,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: footerRef.current, start: "top 90%", toggleActions: "play none none none" },
        },
      );
      gsap.fromTo(bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.5,
          scrollTrigger: { trigger: footerRef.current, start: "top 90%", toggleActions: "play none none none" },
        },
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden mt-24">

      {/* ── Decorative background ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute inset-0" style={{ background: "#0f0d0a" }} />

        {/* Ghost "CF" monogram */}
        <span
          className="absolute font-serif leading-none tracking-tighter"
          style={{
            fontSize: "clamp(160px, 32vw, 480px)",
            right: "-0.04em", bottom: "-0.12em",
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "-0.05em",
          }}
        >
          CF
        </span>

        {/* Terracotta glow top-left */}
        <div className="absolute -top-20 -left-20 rounded-full"
          style={{ width: "40vw", height: "40vw", background: "radial-gradient(circle, hsl(17 60% 47% / 0.08) 0%, transparent 65%)" }} />

        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, hsl(17 65% 55%) 40%, hsl(17 60% 47%) 60%, transparent 100%)" }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
      </div>

      {/* ── Main grid ── */}
      <div className="container relative z-10 py-16 grid gap-12 md:grid-cols-12">

        {/* Brand col */}
        <div ref={col1Ref} className="md:col-span-5" style={{ opacity: 0 }}>
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-accent/30 group-hover:ring-accent/60 transition-all">
              <img src="/logo.jpeg" alt="Cabinet Factory logo" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span className="font-serif text-[16px] tracking-tight text-accent leading-none">Cabinet Factory</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 leading-none">Bespoke Cabinetry · India</span>
            </div>
          </Link>

          <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xs">
            Precision-built cabinetry for kitchens, wardrobes and considered interiors.
            Handcrafted in our Bangalore atelier since 2003.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-6">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook,  label: "Facebook" },
              { Icon: Linkedin,  label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="h-9 w-9 rounded-full grid place-items-center border border-white/10 text-white/40 hover:border-accent/60 hover:text-accent transition-all duration-300 hover:scale-110"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Nav col */}
        <div ref={col2Ref} className="md:col-span-2" style={{ opacity: 0 }}>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5 font-medium">Explore</h4>
          <ul className="space-y-3">
            {navLinks.map(([l, h]) => (
              <li key={h}>
                <Link
                  to={h}
                  className="group flex items-center gap-1.5 text-sm text-white/55 hover:text-accent transition-colors"
                >
                  <span className="h-px w-0 group-hover:w-4 bg-accent transition-all duration-300" />
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio col */}
        <div ref={col3Ref} className="md:col-span-2" style={{ opacity: 0 }}>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5 font-medium">Studio</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-white/55">
              <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent/60" />
              <span>14 Atelier Lane, Bangalore, Karnataka 560001</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-white/55">
              <Phone className="h-3.5 w-3.5 shrink-0 text-accent/60" />
              <span>+91 910 000 0000</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-white/55">
              <Mail className="h-3.5 w-3.5 shrink-0 text-accent/60" />
              <span>hello@cabinetfactory.in</span>
            </li>
          </ul>
        </div>

        {/* Newsletter col */}
        <div ref={col4Ref} className="md:col-span-3" style={{ opacity: 0 }}>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5 font-medium">Stay in touch</h4>
          <p className="text-sm text-white/50 mb-4 leading-relaxed">New projects, materials and stories — delivered occasionally.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 min-w-0 rounded-full px-4 py-2 text-sm bg-white/8 border border-white/12 text-white/80 placeholder:text-white/30
                         focus:outline-none focus:border-accent/50 focus:bg-white/12 transition-all"
            />
            <button
              type="submit"
              className="h-9 w-9 shrink-0 rounded-full grid place-items-center bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-[1.08] transition-all"
              aria-label="Subscribe"
            >
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div ref={bottomRef} className="relative z-10 border-t border-white/8" style={{ opacity: 0 }}>
        <div className="container py-5 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Cabinet Factory. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with care in Bangalore
            <span className="inline-block text-accent">·</span>
            India
          </p>
        </div>
      </div>
    </footer>
  );
};

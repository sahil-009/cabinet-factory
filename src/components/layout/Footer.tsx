import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Instagram, Pinterest, MapPin, Phone, Mail, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks: [string, string][] = [
  ["Designs",      "/products"],
  ["Features",     "/process"],
  ["Materials",    "/about"],
  ["Testimonials", "/about#testimonials"],
  ["Our Story",    "/about"],
  ["Careers",      "/contact"],
];

const contactItems = [
  { Icon: MapPin, text: "Bengaluru, Karnataka, India" },
  { Icon: Phone,  text: "+91 98765 43210" },
  { Icon: Mail,   text: "hello@cabinetfactory.in" },
  { Icon: Clock,  text: "Mon – Sat, 9am – 7pm" },
];

const socialLinks = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  {
    label: "Pinterest",
    href: "#",
    /* Pinterest has no Lucide icon — render inline SVG */
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919876543210",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const col1Ref   = useRef<HTMLDivElement>(null);
  const col2Ref   = useRef<HTMLDivElement>(null);
  const col3Ref   = useRef<HTMLDivElement>(null);
  const col4Ref   = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Banner strip
      gsap.fromTo(
        bannerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: bannerRef.current, start: "top 92%", toggleActions: "play none none none" },
        },
      );
      // Column grid
      const cols = [col1Ref.current, col2Ref.current, col3Ref.current, col4Ref.current];
      gsap.fromTo(
        cols,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.13,
          scrollTrigger: { trigger: footerRef.current, start: "top 88%", toggleActions: "play none none none" },
        },
      );
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.55,
          scrollTrigger: { trigger: footerRef.current, start: "top 88%", toggleActions: "play none none none" },
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
            fontSize: "clamp(140px, 28vw, 420px)",
            right: "-0.04em", bottom: "-0.12em",
            color: "rgba(255,255,255,0.022)",
            letterSpacing: "-0.05em",
          }}
        >
          CF
        </span>

        {/* Terracotta glow top-left */}
        <div
          className="absolute -top-24 -left-24 rounded-full"
          style={{ width: "42vw", height: "42vw", background: "radial-gradient(circle, hsl(17 60% 47% / 0.09) 0%, transparent 65%)" }}
        />

        {/* Gradient top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, hsl(17 65% 55%) 40%, hsl(17 60% 47%) 60%, transparent 100%)" }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── Pre-footer CTA banner ── */}
      <div ref={bannerRef} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12" style={{ opacity: 0 }}>
        <div
          className="relative overflow-hidden rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 px-8 sm:px-12 py-9 sm:py-11"
          style={{
            background: "linear-gradient(120deg, #1f1510 0%, #261a10 45%, #1a1108 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 1px 0 0 rgba(255,255,255,0.06) inset",
          }}
        >
          {/* Left glow */}
          <div
            className="absolute -top-10 -left-10 pointer-events-none rounded-full"
            style={{ width: "260px", height: "260px", background: "radial-gradient(circle, hsl(17 60% 47% / 0.12) 0%, transparent 65%)" }}
          />
          {/* Right glow */}
          <div
            className="absolute -bottom-8 right-32 pointer-events-none rounded-full"
            style={{ width: "180px", height: "180px", background: "radial-gradient(circle, hsl(17 60% 47% / 0.08) 0%, transparent 65%)" }}
          />

          {/* Left: heading */}
          <div className="relative z-10 text-center sm:text-left">
            <p className="text-[10px] uppercase tracking-[0.24em] text-accent/70 font-medium mb-2">
              Premium Interiors
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-white">
              Start your{" "}
              <em className="not-italic text-accent">dream</em>
              {" "}space{" "}
              <br className="hidden sm:block" />
              today
            </h2>
          </div>

          {/* Center: 3-D decorative orb blob */}
          <div
            className="relative hidden md:flex items-center justify-center shrink-0"
            style={{ width: "120px", height: "120px" }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(17 40% 28% / 0.6) 0%, transparent 70%)", filter: "blur(16px)" }}
            />
            {/* Inner blob */}
            <div
              className="relative rounded-[45%_55%_60%_40%/50%_45%_55%_50%] animate-[blob_8s_ease-in-out_infinite]"
              style={{
                width: "90px", height: "90px",
                background: "radial-gradient(135deg at 30% 30%, hsl(17 45% 38%) 0%, hsl(17 30% 18%) 60%, #0e0a08 100%)",
                boxShadow: "inset -8px -8px 20px rgba(0,0,0,0.5), inset 4px 4px 12px hsl(17 60% 50% / 0.15), 0 8px 32px hsl(17 50% 30% / 0.35)",
              }}
            />
          </div>

          {/* Right: CTA button + note */}
          <div className="relative z-10 flex flex-col items-center sm:items-end gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide text-white transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_28px_hsl(17_60%_47%/0.45)]"
              style={{ background: "linear-gradient(135deg, hsl(17 55% 42%), hsl(22 50% 35%))" }}
            >
              BOOK
              <br />
              CONSULTATION
            </Link>
            <p className="text-[11px] text-white/35 flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-accent/60">Free initial consultation</span>
              <span className="text-white/20">·</span>
              <span>No commitment</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Main 4-column grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Col 1 · Brand ── */}
          <div ref={col1Ref} className="sm:col-span-2 lg:col-span-1" style={{ opacity: 0 }}>
            {/* Logo block */}
            <Link to="/" className="inline-flex items-center gap-3 group mb-5">
              <div
                className="h-12 w-12 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-accent/50 transition-all duration-300 shrink-0"
                style={{ background: "hsl(36 30% 90% / 0.08)" }}
              >
                <img
                  src="/logo.jpeg"
                  alt="Cabinet Factory logo"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-white/50 leading-relaxed max-w-[22ch]">
              Transforming living spaces into{" "}
              <span className="text-accent/80">luxury</span> experiences through{" "}
              <span className="text-accent/80">precision</span> craftsmanship and timeless{" "}
              <span className="text-accent/80">design</span>.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 mt-6">
              {socialLinks.map(({ Icon, label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-full grid place-items-center border border-white/12 text-white/40 hover:border-accent/60 hover:text-accent transition-all duration-300 hover:scale-110"
                >
                  {svg ? svg : Icon ? <Icon className="h-4 w-4" /> : null}
                </a>
              ))}
            </div>

            {/* Since badge */}
            <div
              className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.18em] text-white/35 font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60 inline-block" />
              Since 2010
            </div>
          </div>

          {/* ── Col 2 · Navigation ── */}
          <div ref={col2Ref} style={{ opacity: 0 }}>
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-5 font-medium">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {navLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="group flex items-center gap-1.5 text-sm text-white/55 hover:text-accent transition-colors duration-200"
                  >
                    <span className="h-px w-0 group-hover:w-4 bg-accent transition-all duration-300 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 · Contact ── */}
          <div ref={col3Ref} style={{ opacity: 0 }}>
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-5 font-medium">
              Contact
            </h4>
            <ul className="space-y-4">
              {contactItems.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/55 leading-snug">
                  <span
                    className="h-7 w-7 rounded-lg grid place-items-center shrink-0 mt-0.5"
                    style={{ background: "hsl(17 60% 47% / 0.12)" }}
                  >
                    <Icon className="h-3.5 w-3.5 text-accent/70" />
                  </span>
                  <span className="pt-1">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4 · Get Started CTA ── */}
          <div ref={col4Ref} style={{ opacity: 0 }}>
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-5 font-medium">
              Get Started
            </h4>

            <p className="text-lg font-serif leading-snug text-white mb-1">
              Start your dream{" "}
              <span className="text-accent italic">space today.</span>
            </p>

            <p className="text-sm text-white/50 leading-relaxed mt-2 mb-6">
              Let's craft interiors that inspire. Every detail, perfected.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold tracking-wide text-white border border-white/20 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_hsl(17_60%_47%/0.35)]"
            >
              BOOK CONSULTATION
            </Link>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div ref={bottomRef} className="relative z-10 border-t border-white/[0.07]" style={{ opacity: 0 }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-white/28">
          <p>© {new Date().getFullYear()} Cabinet Factory. All rights reserved.</p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#" className="hover:text-accent/60 transition-colors">Privacy Policy</a>
            <span className="text-white/15">·</span>
            <a href="#" className="hover:text-accent/60 transition-colors">Terms of Service</a>
            <span className="text-white/15">·</span>
            <span className="flex items-center gap-1">
              Crafted in Bangalore
              <span className="text-accent/60 mx-0.5">·</span>
              India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

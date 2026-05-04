import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const links = [
  { to: "/",         label: "Home" },
  { to: "/about",    label: "About" },
  { to: "/products", label: "Products" },
  { to: "/process",  label: "Process" },
  { to: "/projects", label: "Projects" },
  { to: "/contact",  label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location                = useLocation();
  const navBarRef               = useRef<HTMLDivElement>(null);
  const indicatorRef            = useRef<HTMLDivElement>(null);
  const linkWrapperRefs         = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  // Slide the pill indicator to the active link
  useEffect(() => {
    const container = navBarRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const activeIdx = links.findIndex((l) =>
      l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to),
    );
    const wrapper = linkWrapperRefs.current[activeIdx];
    if (!wrapper) return;

    const cRect = container.getBoundingClientRect();
    const wRect = wrapper.getBoundingClientRect();

    gsap.to(indicator, {
      x: wRect.left - cRect.left,
      width: wRect.width,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-smooth ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-accent/30 group-hover:ring-accent/60 transition-all duration-300">
            <img
              src="/logo.jpeg"
              alt="Cabinet Factory logo"
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-serif text-[15px] tracking-tight leading-none text-accent">
              Cabinet Factory
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/50 leading-none">
              Bespoke Cabinetry
            </span>
          </div>
        </Link>

        {/* ── Desktop nav pill ── */}
        <div
          ref={navBarRef}
          className={`hidden md:flex relative items-center gap-0.5 rounded-full glass border border-border/60 shadow-soft transition-all duration-500 ${
            scrolled ? "px-2 h-12" : "px-2.5 h-14"
          }`}
        >
          {/* Sliding accent indicator */}
          <div
            ref={indicatorRef}
            className="absolute top-1.5 h-[calc(100%-12px)] rounded-full pointer-events-none"
            style={{
              background: "hsl(17 60% 47% / 0.1)",
              border: "1px solid hsl(17 60% 47% / 0.25)",
            }}
          />

          {links.map((l, i) => (
            <div key={l.to} ref={(el) => { linkWrapperRefs.current[i] = el; }}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative z-10 block px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 select-none ${
                    isActive
                      ? "text-accent"
                      : "text-foreground/60 hover:text-foreground hover:scale-[1.05]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </div>
          ))}
        </div>

        {/* ── CTA + mobile toggle ── */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            asChild
            size="sm"
            className="hidden md:flex rounded-full px-5 bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-glow transition-all hover:scale-[1.04]"
          >
            <Link to="/contact">Get Quote</Link>
          </Button>

          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden h-9 w-9 grid place-items-center rounded-full glass border border-border/60 hover:border-accent/40 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="md:hidden container mt-2 rounded-2xl glass border border-border/60 p-4 animate-fade-up">
          <div className="flex flex-col gap-1">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                style={{ animationDelay: `${i * 45}ms` }}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm transition-colors animate-fade-up ${
                    isActive
                      ? "text-accent bg-accent/8"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary/40"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button
              asChild
              className="mt-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

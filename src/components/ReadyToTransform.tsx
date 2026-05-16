import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Each sticker's resting position + float animation settings.
 * Adjusted for better responsiveness and visibility.
 */
const STICKERS = [
  {
    src: "/sticker_sofa.png",
    alt: "Sofa",
    pos: "top-[20%] left-[10%] sm:left-[10%] md:left-[15%]", // Added gap
    size: "w-20 sm:w-40 md:w-52",
    rotate: -4,
    fromX: -30, fromY: -20,
    floatY: -10, floatDur: 4.2,
  },
  {
    src: "/sticker_table.png",
    alt: "Side table",
    pos: "top-[48%] left-[4%] sm:left-[5%] md:left-[8%] hidden sm:block",
    size: "w-14 sm:w-32 md:w-40",
    rotate: 2,
    fromX: -40, fromY: 0,
    floatY: 8, floatDur: 3.6,
  },
  {
    src: "/sticker_lamp.png",
    alt: "Floor lamp",
    pos: "bottom-[18%] left-[12%] sm:left-[12%] md:left-[18%]", // Added gap
    size: "w-16 sm:w-28 md:w-36",
    rotate: -2,
    fromX: -30, fromY: 40,
    floatY: -6, floatDur: 5.0,
  },
  {
    src: "/sticker_chair.png",
    alt: "Accent chair",
    pos: "top-[18%] right-[10%] sm:right-[10%] md:right-[15%]", // Added gap
    size: "w-20 sm:w-40 md:w-48",
    rotate: 4,
    fromX: 30, fromY: -20,
    floatY: -8, floatDur: 4.6,
  },
  {
    src: "/sticker_wardrobe.png",
    alt: "Wardrobe",
    pos: "top-[45%] right-[6%] sm:right-[5%] md:right-[8%] hidden md:block",
    size: "w-20 sm:w-32 md:w-40",
    rotate: -3,
    fromX: 40, fromY: 0,
    floatY: 6, floatDur: 3.8,
  },
  {
    src: "/sticker_vase.png",
    alt: "Decorative vase",
    pos: "bottom-[16%] right-[14%] sm:right-[12%] md:right-[18%]", // Added gap
    size: "w-14 sm:w-24 md:w-32",
    rotate: 2,
    fromX: 30, fromY: 40,
    floatY: -5, floatDur: 4.0,
  },
  {
    src: "/sticker_bed.png",
    alt: "Bed",
    pos: "bottom-[0%] sm:bottom-[-2%] left-0 right-0 mx-auto", // Lowered slightly for gap
    size: "w-40 sm:w-56 md:w-72 lg:w-[28rem]",
    rotate: 0,
    fromX: 0, fromY: 20,
    floatY: -6, floatDur: 5.5,
  },
];

export const ReadyToTransform = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Heading: fade + slide up on enter, reverse on leave ── */
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Triggers sooner when scrolling down
            toggleActions: "play none none none",
          },
        },
      );

      /* ── Each sticker flies from its own unique direction ── */
      STICKERS.forEach((s, i) => {
        const el = stickerRefs.current[i];
        if (!el) return;

        /* Fly-in ScrollTrigger — highly sensitive scrub */
        gsap.fromTo(
          el,
          {
            x: s.fromX,
            y: s.fromY,
            opacity: 0,
            scale: 0.85,
            rotation: s.rotate * 2,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: s.rotate,
            ease: "none", // Use none with scrub for linear response
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom", // Starts as soon as section enters
              end: "center center", // Finishes when section is centered
              scrub: 1.5, // Smooth lag for sensitivity
            },
          },
        );

        /* Perpetual float — subtle secondary motion */
        gsap.to(el, {
          y: `+=${s.floatY}`,
          duration: s.floatDur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.1 * i,
        });
      });
      /* Force a refresh after a short delay to account for page transitions/image loads */
      setTimeout(() => ScrollTrigger.refresh(), 500);
    }, sectionRef);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full flex flex-col justify-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #08090d 0%, #0b0e14 40%, #090b11 80%, #080a0e 100%)",
      }}
    >
      {/* ── Teal spotlight beam from top ── */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "clamp(320px, 60vw, 760px)",
          height: "clamp(300px, 55vh, 580px)",
          background:
            "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(10,220,220,0.20) 0%, rgba(0,180,180,0.07) 40%, transparent 72%)",
          filter: "blur(6px)",
        }}
      />

      {/* ── Thin teal vertical line ── */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
        style={{
          height: "clamp(90px, 18vh, 160px)",
          background: "linear-gradient(to bottom, rgba(0,230,230,0.75), transparent)",
        }}
      />

      {/* ── Furniture stickers ── */}
      {STICKERS.map((s, i) => (
        <div
          key={s.alt}
          ref={el => { stickerRefs.current[i] = el; }}
          className={`absolute ${s.pos} ${s.size} pointer-events-none select-none z-10`}
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <img
            src={s.src}
            alt={s.alt}
            className="w-full h-full object-contain"
            style={{
              filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.55))",
            }}
            draggable={false}
          />
        </div>
      ))}

      {/* ── Centre content — Perfectly centered vertically ── */}
      <div
        ref={headingRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full max-w-4xl mx-auto"
        style={{ opacity: 0 }}
      >
        {/* Eyebrow */}
        <p
          className="text-[10px] sm:text-xs uppercase font-medium mb-3 sm:mb-5 tracking-[0.34em]"
          style={{ color: "rgba(0,210,210,0.65)" }}
        >
          Let&apos;s Begin
        </p>

        {/* Main heading */}
        <h2 className="font-serif font-bold text-white leading-[1.1] sm:leading-[1.02] w-full"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
        >
          Ready to transform
          <br className="hidden sm:block" />
          {" "}
          <em
            className="not-italic font-bold inline-block mt-1 sm:mt-0"
            style={{
              background: "linear-gradient(90deg, hsl(17 70% 60%), hsl(32 85% 58%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            your space?
          </em>
        </h2>

        {/* Sub-copy */}
        <p className="mt-4 sm:mt-6 leading-relaxed max-w-[90%] sm:max-w-[42ch] mx-auto"
          style={{ fontSize: "clamp(0.875rem, 1.6vw, 1.05rem)", color: "rgba(255,255,255,0.42)" }}
        >
          Book a free consultation with our design team and discover what's
          possible with premium craftsmanship and precision.
        </p>

        {/* CTA button */}
        <Link
          to="/contact"
          className="mt-6 sm:mt-8 inline-flex items-center justify-center rounded-full font-semibold tracking-wide text-white transition-all duration-300 hover:scale-[1.06]"
          style={{
            padding: "0.8rem 2.2rem",
            fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
            background: "linear-gradient(135deg, hsl(17 58% 43%), hsl(22 52% 36%))",
            boxShadow: "0 4px 24px hsl(17 60% 40% / 0.35)",
          }}
        >
          Book Consultation
        </Link>
      </div>

      {/* ── Bottom gradient into footer ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-30"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom, transparent, #0f0d0a)",
        }}
      />
    </section>
  );
};

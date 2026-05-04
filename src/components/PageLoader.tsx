import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Pune", "Chennai",
  "Hyderabad", "Ahmedabad", "Jaipur", "Surat", "Kolkata",
  "Vadodara", "Indore", "Nagpur", "Noida", "Gurugram",
];

interface Props {
  onReady: () => void;
  onComplete: () => void;
}

export const PageLoader = ({ onReady, onComplete }: Props) => {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLDivElement>(null);
  const word1Ref    = useRef<HTMLDivElement>(null);
  const word2Ref    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef      = useRef<HTMLSpanElement>(null);
  const countRef    = useRef<HTMLSpanElement>(null);
  const trustedRef  = useRef<HTMLDivElement>(null);
  const tickerRef   = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  // Store callbacks in refs so the animation effect never needs to
  // re-run when the parent re-renders with new function references.
  const onReadyCb    = useRef(onReady);
  const onCompleteCb = useRef(onComplete);
  onReadyCb.current    = onReady;
  onCompleteCb.current = onComplete;

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(tagRef.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.6 },
      0,
    );

    tl.fromTo(word1Ref.current,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0,   opacity: 1, duration: 0.9 },
      0.15,
    );
    tl.fromTo(word2Ref.current,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0,   opacity: 1, duration: 0.9 },
      0.3,
    );

    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate() {
        const v = Math.round(obj.val);
        setCount(v);
        if (progressRef.current) progressRef.current.style.width = `${v}%`;
      },
    }, 0.55);

    tl.fromTo([dotRef.current, countRef.current],
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06 },
      0.65,
    );

    tl.fromTo(".cf-stat",
      { y: 18, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.55, stagger: 0.1 },
      1.1,
    );
    tl.fromTo(trustedRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.4,
    );
    tl.fromTo(tickerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.55,
    );

    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 1.05,
      ease: "power4.inOut",
      onStart:    () => onReadyCb.current(),
      onComplete: () => onCompleteCb.current(),
    }, "+=0.25");

    return () => { tl.kill(); };
  }, []); // ← empty: runs once on mount only

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col overflow-hidden select-none"
      style={{ background: "#0d0b08" }}
      aria-hidden
    >
      {/* Top tag */}
      <div
        ref={tagRef}
        className="absolute top-7 inset-x-0 flex justify-center gap-5 opacity-0"
        style={{ letterSpacing: "0.28em" }}
      >
        <span className="text-[11px] uppercase" style={{ color: "#5a4a38" }}>Cabinet Factory</span>
        <span style={{ color: "#3a2e22" }}>·</span>
        <span className="text-[11px] uppercase" style={{ color: "#5a4a38" }}>India</span>
      </div>

      {/* Giant brand text */}
      <div className="flex-1 flex flex-col justify-center px-[4vw] overflow-hidden pt-6">
        <div className="overflow-hidden leading-none">
          <div
            ref={word1Ref}
            className="font-serif leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(72px, 18.5vw, 260px)", color: "hsl(17 65% 55%)" }}
          >
            CABINET
          </div>
        </div>
        <div className="overflow-hidden leading-none">
          <div
            ref={word2Ref}
            className="font-serif leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(72px, 18.5vw, 260px)", marginLeft: "3vw", color: "hsl(17 65% 55%)" }}
          >
            FACTORY
          </div>
        </div>
      </div>

      {/* Progress + counter */}
      <div className="px-[4vw] pb-5">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 h-px overflow-hidden" style={{ background: "#2a2018" }}>
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-0"
              style={{ background: "hsl(17 65% 55%)" }}
            />
          </div>
          <span ref={dotRef} className="opacity-0" style={{ color: "hsl(17 65% 55%)", fontSize: "10px" }}>●</span>
          <span
            ref={countRef}
            className="font-serif tabular-nums opacity-0"
            style={{ color: "hsl(17 65% 55%)", fontSize: "clamp(1.1rem,2.4vw,1.6rem)", minWidth: "3.2ch" }}
          >
            {count}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-[4vw] pb-5 flex items-end justify-between gap-6">
        <div className="flex items-center gap-8 md:gap-12">
          {[
            { v: "22+",  l: "Years of craft" },
            { v: "1.4K", l: "Homes furnished" },
            { v: "38",   l: "Master artisans" },
          ].map((s) => (
            <div key={s.l} className="cf-stat opacity-0">
              <div className="font-serif leading-none" style={{ fontSize: "clamp(1.6rem,3.8vw,2.8rem)", color: "hsl(17 65% 55%)" }}>
                {s.v}
              </div>
              <div className="mt-1 uppercase tracking-[0.18em]" style={{ fontSize: "9px", color: "#4a3a2a" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
        <div className="cf-stat opacity-0 text-right hidden sm:block" style={{ color: "#4a3a2a", fontSize: "10px", letterSpacing: "0.18em" }}>
          <div className="uppercase">Crafted for homes</div>
          <div className="uppercase">across India</div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-[4vw]" style={{ height: "1px", background: "#1e1810" }} />

      {/* Trusted by + city ticker */}
      <div className="px-[4vw] pt-4 pb-6 flex flex-col gap-3">
        <div
          ref={trustedRef}
          className="opacity-0 uppercase"
          style={{ fontSize: "9px", letterSpacing: "0.28em", color: "#3a2e22" }}
        >
          Trusted by homeowners across 50+ cities
        </div>
        <div ref={tickerRef} className="opacity-0 overflow-hidden whitespace-nowrap">
          <div className="inline-flex gap-8 animate-ticker">
            {[...CITIES, ...CITIES].map((city, i) => (
              <span key={i} className="font-serif" style={{ color: "#4a3a2a", fontSize: "clamp(13px,1.6vw,17px)" }}>
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

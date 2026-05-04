import { useEffect, useRef } from "react";
import gsap from "gsap";

export const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      const pct      = total > 0 ? scrolled / total : 0;
      gsap.set(bar, { scaleX: pct, transformOrigin: "left" });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[99997] h-[3px] origin-left"
      style={{
        background: "linear-gradient(90deg, #8c3c1e 0%, #d4713e 50%, #f2cc7a 100%)",
        scaleX: 0,
      }}
    />
  );
};

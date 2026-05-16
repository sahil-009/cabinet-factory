import { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const cur = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    // Lerp ring in GSAP ticker for silky lag
    const ticker = gsap.ticker.add(() => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.13;
      cur.current.y += (pos.current.y - cur.current.y) * 0.13;
      gsap.set(ring, { x: cur.current.x, y: cur.current.y });
    });

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']")) {
        gsap.to(ring, { scale: 1.7, borderColor: "#f2cc7a", opacity: 0.9, duration: 0.25, ease: "power2.out" });
        gsap.to(dot, { scale: 0.3, duration: 0.2 });
      }
    };

    const onOut = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      if (!to?.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']")) {
        gsap.to(ring, { scale: 1, borderColor: "#d4713e", opacity: 0.55, duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.1 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.15 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Lagged outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] opacity-55"
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: "1.5px solid #d4713e",
          transition: "opacity 0.2s",
        }}
      />
      {/* Instant inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f2cc7a, #d4713e)",
        }}
      />
    </>
  );
};

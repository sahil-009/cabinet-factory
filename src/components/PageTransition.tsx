import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export const PageTransition = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const w1Ref    = useRef<HTMLDivElement>(null);
  const w2Ref    = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip initial mount — PageLoader handles first entry
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const panel = panelRef.current;
    const w1    = w1Ref.current;
    const w2    = w2Ref.current;
    if (!panel) return;

    gsap.set(panel, { visibility: "visible", yPercent: 100 });
    gsap.set([w1, w2], { yPercent: 110, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    // Dark panel rises from bottom
    tl.to(panel, { yPercent: 0, duration: 0.55 });

    // Brand words slide up inside clip masks
    tl.fromTo(w1,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
      "-=0.2",
    );
    tl.fromTo(w2,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
      "-=0.28",
    );

    // Brief hold
    tl.to({}, { duration: 0.15 });

    // Panel slides off upward
    tl.to(panel, {
      yPercent: -100,
      duration: 0.6,
      ease: "power4.inOut",
      onComplete() {
        gsap.set(panel, { visibility: "hidden", yPercent: 100 });
      },
    });

    return () => { tl.kill(); };
  }, [pathname]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0d0b08", visibility: "hidden" }}
    >
      <div className="overflow-hidden leading-none">
        <div
          ref={w1Ref}
          className="font-serif leading-[0.88] tracking-tight opacity-0"
          style={{ fontSize: "clamp(52px, 12vw, 160px)", color: "hsl(17 65% 55%)" }}
        >
          CABINET
        </div>
      </div>
      <div className="overflow-hidden leading-none">
        <div
          ref={w2Ref}
          className="font-serif leading-[0.88] tracking-tight opacity-0"
          style={{ fontSize: "clamp(52px, 12vw, 160px)", marginLeft: "4vw", color: "hsl(17 65% 55%)" }}
        >
          FACTORY
        </div>
      </div>
    </div>
  );
};

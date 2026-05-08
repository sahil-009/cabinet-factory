import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialises Lenis smooth-scroll and bridges it to GSAP ScrollTrigger.
 * Call once at app-root level (e.g. SiteLayout).
 *
 * @param enabled - set `false` to skip (e.g. while page-loader is active)
 */
export function useLenis(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2,           // scroll inertia duration (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      touchMultiplier: 1.5,    // touch-device sensitivity
      infinite: false,
    });

    lenisRef.current = lenis;

    /* ── Bridge Lenis → GSAP ScrollTrigger ── */
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Lenis expects ms
    });
    gsap.ticker.lagSmoothing(0); // prevent GSAP from throttling

    /* Force a ScrollTrigger recalculation once Lenis settles */
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(lenis.raf as any);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}

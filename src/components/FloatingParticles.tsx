import { useEffect, useRef } from "react";

const STICKERS = [
  "/sticker_candle.png",
  "/sticker_sofa.png",
  "/sticker_table.png",
  "/sticker_vase.png",
  "/sticker_wardrobe.png",
  "/sticker_chair.png",
  "/sticker_bed.png",
  "/sticker_lamp.png",
];

// Deterministic seeded random — avoids different values on each render
const sr = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

interface Particle {
  id: number;
  isSticker: boolean;
  src?: string;
  shapeType?: 0 | 1 | 2;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotStart: number;
  rotEnd: number;
  layer: 0 | 1 | 2;
  opacity: number;
}

const PARTICLES: Particle[] = Array.from({ length: 32 }, (_, i) => {
  const r = (n: number) => sr(i * 11 + n * 7 + 3);
  const isSticker = i < 16;
  const layer = Math.floor(r(9) * 3) as 0 | 1 | 2;
  const duration = 15 + r(2) * 18;
  const rotStart = r(5) * 360;
  const rotDelta = isSticker ? (r(6) - 0.5) * 40 : (r(6) - 0.5) * 300;
  return {
    id: i,
    isSticker,
    src: isSticker ? STICKERS[i % STICKERS.length] : undefined,
    shapeType: isSticker ? undefined : ((i % 3) as 0 | 1 | 2),
    left: 2 + r(0) * 96,
    size: isSticker ? 26 + r(1) * 42 : 5 + r(1) * 15,
    duration,
    delay: -(r(3) * duration),
    drift: (r(4) - 0.5) * 100,
    rotStart,
    rotEnd: rotStart + rotDelta,
    layer,
    opacity: isSticker
      ? [0.10, 0.17, 0.24][layer]
      : 0.14 + r(7) * 0.22,
  };
});

// Pixels of parallax shift at full mouse offset, per layer (far → close)
const PARALLAX_PX = [38, 20, 9];

export const FloatingParticles = () => {
  const layer0Ref = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layerRefs = [layer0Ref, layer1Ref, layer2Ref];

  useEffect(() => {
    let tx = 0, ty = 0;
    const cx = [0, 0, 0];
    const cy = [0, 0, 0];
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      for (let l = 0; l < 3; l++) {
        const s = PARALLAX_PX[l];
        cx[l] += (tx * s - cx[l]) * 0.055;
        cy[l] += (ty * s - cy[l]) * 0.055;
        const el = layerRefs[l].current;
        if (el) el.style.transform = `translate(${cx[l].toFixed(2)}px,${cy[l].toFixed(2)}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {([0, 1, 2] as const).map((layer) => (
        <div
          key={layer}
          ref={layerRefs[layer]}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          {PARTICLES.filter((p) => p.layer === layer).map((p) => (
            <div
              key={p.id}
              className="absolute animate-float-up"
              style={
                {
                  left: `${p.left}%`,
                  bottom: "-15%",
                  width: p.size,
                  height: p.size,
                  opacity: p.opacity,
                  "--drift": `${p.drift}px`,
                  "--rot-s": `${p.rotStart}deg`,
                  "--rot-e": `${p.rotEnd}deg`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties
              }
            >
              {p.isSticker ? (
                <img
                  src={p.src}
                  alt=""
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                  style={{
                    filter:
                      layer === 0
                        ? "blur(1px) saturate(0.65)"
                        : layer === 1
                        ? "saturate(0.82)"
                        : "saturate(1.05)",
                  }}
                />
              ) : p.shapeType === 0 ? (
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: "hsl(var(--accent) / 0.28)",
                    boxShadow: "0 0 10px hsl(var(--accent) / 0.12)",
                  }}
                />
              ) : p.shapeType === 1 ? (
                <div
                  className="w-full h-full"
                  style={{
                    background: "hsl(var(--primary) / 0.22)",
                    clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                  }}
                />
              ) : (
                <div
                  className="w-full h-full rounded-sm"
                  style={{
                    background: "hsl(var(--wood) / 0.22)",
                    transform: "rotate(18deg)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

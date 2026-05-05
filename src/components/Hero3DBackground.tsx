import { useEffect, useRef } from "react";

/**
 * Canvas-based animated 3D background.
 * All shapes are pre-allocated once and recycled in a loop —
 * nothing is created per frame, so it stays buttery smooth.
 * Shapes drift upward continuously and wrap back to the bottom.
 */
export const Hero3DBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0;
    let H = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---- Palette ---- */
    const oliveAlpha = (a: number) => `rgba(108,130,74,${a})`;
    const terraAlpha = (a: number) => `rgba(190,100,60,${a})`;

    /* ---- Pre-allocate shapes (loop-recycled, never recreated) ---- */
    const SHAPE_COUNT = 22;
    const shapes = Array.from({ length: SHAPE_COUNT }, (_, i) => ({
      x: Math.random(),                          // 0-1 fraction of W
      y: Math.random(),                          // 0-1 fraction of H
      size: 10 + Math.random() * 45,
      speedY: 0.08 + Math.random() * 0.18,       // upward px / frame
      drift: (Math.random() - 0.5) * 0.04,       // slight horizontal sway
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      type: i % 3,                                // 0=circle, 1=diamond, 2=hex
      alpha: 0.04 + Math.random() * 0.06,
      colorIdx: i % 2,                            // 0=olive, 1=terra
    }));

    /* ---- Pre-allocate grid lines ---- */
    const GRID_ROWS = 14;
    const GRID_COLS = 18;

    /* ---- Helpers (no allocations) ---- */
    const drawHex = (r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        if (i === 0) ctx.moveTo(r * Math.cos(a), r * Math.sin(a));
        else ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
      }
      ctx.closePath();
    };

    /* ---- Animation loop ---- */
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 1;

      /* ---- Perspective grid (scrolls up) ---- */
      const horizonY = H * 0.3;
      const scrollPhase = (t * 0.4) % (H / GRID_ROWS);

      // Horizontal lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_ROWS; i++) {
        const frac = i / GRID_ROWS;
        const rawY = horizonY + (H - horizonY) * Math.pow(frac, 1.5) - scrollPhase * frac;
        if (rawY < horizonY || rawY > H) continue;
        const spread = 0.12 + 0.88 * Math.pow(frac, 1.2);
        const x1 = W * 0.5 - (W * 0.85 * spread) / 2;
        const x2 = W * 0.5 + (W * 0.85 * spread) / 2;
        ctx.strokeStyle = oliveAlpha(0.03 + 0.07 * frac);
        ctx.beginPath();
        ctx.moveTo(x1, rawY);
        ctx.lineTo(x2, rawY);
        ctx.stroke();
      }

      // Vertical converging lines
      ctx.strokeStyle = terraAlpha(0.05);
      ctx.lineWidth = 0.4;
      const vanishX = W * 0.5;
      for (let i = 0; i <= GRID_COLS; i++) {
        const bottomX = W * 0.075 + W * 0.85 * (i / GRID_COLS);
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(bottomX, H + 30);
        ctx.stroke();
      }

      /* ---- Shapes (move UP, wrap to bottom) ---- */
      for (let i = 0; i < SHAPE_COUNT; i++) {
        const s = shapes[i];

        // Move upward
        s.y -= s.speedY / H;
        s.x += s.drift / W;
        s.rot += s.rotSpeed;

        // Seamless wrap: when off top, reappear at bottom
        if (s.y < -0.06) {
          s.y = 1.06;
          s.x = 0.05 + Math.random() * 0.9;   // randomise x on re-entry
        }
        // Wrap horizontal
        if (s.x < -0.05) s.x = 1.05;
        if (s.x > 1.05) s.x = -0.05;

        const cx = s.x * W;
        const cy = s.y * H;
        const fill = s.colorIdx === 0 ? oliveAlpha(s.alpha) : terraAlpha(s.alpha);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(s.rot);
        ctx.fillStyle = fill;

        if (s.type === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, s.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.type === 1) {
          ctx.beginPath();
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size * 0.6, 0);
          ctx.lineTo(0, s.size);
          ctx.lineTo(-s.size * 0.6, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          drawHex(s.size);
          ctx.fill();
        }

        ctx.restore();
      }

      /* ---- Soft bokeh orbs (sine-based, no allocs) ---- */
      for (let i = 0; i < 4; i++) {
        const phase = t * 0.006 * (0.4 + i * 0.15) + i * 1.9;
        const ox = W * (0.2 + 0.6 * ((Math.sin(phase) + 1) / 2));
        const oy = H * (0.1 + 0.55 * ((Math.cos(phase * 0.7 + i) + 1) / 2));
        const or = Math.max(1, 35 + 50 * Math.sin(phase * 0.4 + i));

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, or);
        grad.addColorStop(0, i % 2 === 0 ? terraAlpha(0.05) : oliveAlpha(0.04));
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(ox, oy, or, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

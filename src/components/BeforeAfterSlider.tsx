import { useRef, useState } from "react";

export const BeforeAfterSlider = ({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
}: {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
}) => {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={ref}
      className="relative select-none overflow-hidden rounded-[2rem] shadow-elegant border border-border/60 aspect-[16/10] cursor-ew-resize"
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      <img src={after} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }} />
      </div>
      <div className="absolute top-0 bottom-0" style={{ left: `${pos}%` }}>
        <div className="absolute -translate-x-1/2 top-0 bottom-0 w-px bg-background" />
        <div className="absolute -translate-x-1/2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background border border-border shadow-soft grid place-items-center">
          <span className="text-xs">⟷</span>
        </div>
      </div>
      <span className="absolute left-3 top-3 text-[11px] uppercase tracking-widest px-2 py-1 rounded-full glass border border-border/60">Before</span>
      <span className="absolute right-3 top-3 text-[11px] uppercase tracking-widest px-2 py-1 rounded-full glass border border-border/60">After</span>
    </div>
  );
};

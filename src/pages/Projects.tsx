import { RevealOnScroll } from "@/components/RevealOnScroll";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { CTASection } from "@/components/CTASection";

const projects = [
  { img: "/transition2.gif",      title: "Hero Transition",       place: "Demo" },
  { img: "/floorplan.png",        title: "Floorplan Design",      place: "Concept" },
  { img: "/indian_kitchen.png",      title: "Modern Kitchen Suite",  place: "Bangalore, IN" },
  { img: "/indian_dining.png",       title: "Dining Room",           place: "Mumbai, IN" },
  { img: "/indian_bedroom.png",      title: "Master Bedroom",        place: "Delhi, IN" },
  { img: "/indian_workspace.png",    title: "Home Studio",           place: "Hyderabad, IN" },
  { img: "/indian_living_room.png",  title: "Living Room",           place: "Chennai, IN" },
  { img: "/indian_bathroom.png",     title: "Bathroom Vanity",       place: "Pune, IN" },
];

const Projects = () => (
  <>
    {/* ── Hero ── */}
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute inset-0" style={{ background: "hsl(var(--secondary)/0.12)" }} />
        <span className="absolute font-serif leading-none tracking-tight"
          style={{ fontSize: "clamp(80px, 18vw, 280px)", right: "-0.03em", top: "-0.05em",
            color: "hsl(var(--foreground)/0.028)", letterSpacing: "-0.04em" }}>
          WORK
        </span>
        <div className="absolute -top-20 -left-20 rounded-full"
          style={{ width: "40vw", height: "40vw", background: "radial-gradient(circle, hsl(17 60% 47% / 0.07) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-[4vw] right-[4vw] h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(17 60% 47% / 0.15), transparent)" }} />
      </div>
      <div className="container relative z-10">
        <span className="eyebrow"><span className="h-px w-8 bg-foreground/40" /> Portfolio</span>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl leading-[1] max-w-3xl">
          Spaces we've <em className="text-accent not-italic">transformed</em>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          A selection of recent residential and studio projects. Drag the slider to see the transformation.
        </p>
      </div>
    </section>

    {/* ── Before/After featured ── */}
    <section className="relative overflow-hidden py-8">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "hsl(var(--secondary)/0.15)" }} />
      <div className="container relative z-10">
        <RevealOnScroll>
          <BeforeAfterSlider
            before="/before-room.jpg"
            after="/pic5.jpeg"
            beforeAlt="Before — empty room"
            afterAlt="After — finished living room by Cabinet Factory"
          />
        </RevealOnScroll>
      </div>
    </section>

    {/* ── Project grid ── */}
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <span className="absolute font-serif leading-none tracking-tight"
          style={{ fontSize: "clamp(80px, 18vw, 260px)", left: "-0.04em", bottom: "-0.08em",
            color: "hsl(var(--foreground)/0.025)", letterSpacing: "-0.03em" }}>
          PROJECTS
        </span>
        <div className="absolute -top-10 right-[5%] rounded-full"
          style={{ width: "32vw", height: "32vw", background: "radial-gradient(circle, hsl(17 60% 47% / 0.06) 0%, transparent 65%)" }} />
      </div>
      <div className="container relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 70}>
              <figure className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-shadow duration-500">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-\\[1200ms\\] ease-smooth group-hover:scale-[1.06]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/70 to-transparent text-background">
                  <div className="font-serif text-xl">{p.title}</div>
                  <div className="text-xs uppercase tracking-widest opacity-80">{p.place}</div>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>

    <CTASection />
  </>
);

export default Projects;

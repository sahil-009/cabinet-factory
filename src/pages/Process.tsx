import { RevealOnScroll } from "@/components/RevealOnScroll";
import { CTASection } from "@/components/CTASection";

const stages = [
  { n: "01", title: "Post Design Consultation", text: "Refining designs, finalising layouts and ensuring all configurations and specs are locked." },
  { n: "02", title: "Material Selection", text: "Hand-picking premium veneers, finishes, hardware and custom matching your interior color palette." },
  { n: "03", title: "Production Design and Cutlist", text: "Creating millimeter-perfect 3D assembly models and direct CNC-optimized cutlists." },
  { n: "04", title: "Manufacturing", text: "CNC precision carcass cutting and edge-banding combined with traditional joinery assembly." },
  { n: "05", title: "Dispatch", text: "Rigorous quality check, secure packaging, quality assurance sign-offs, and dispatch." },
];

const Process = () => (
  <>
    <section className="container py-16 md:py-24">
      <span className="eyebrow"><span className="h-px w-8 bg-foreground/40" /> The Process</span>
      <h1 className="mt-3 font-serif text-5xl md:text-7xl leading-[1] max-w-3xl">
        Five steps. <em className="text-accent not-italic">Zero</em> shortcuts.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        A transparent, considered workflow that takes you from first sketch to a finished, fitted room.
      </p>
    </section>

    <section className="container pb-24">
      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border" aria-hidden />
        <ol className="space-y-12">
          {stages.map((s, i) => (
            <RevealOnScroll key={s.n} delay={i * 80}>
              <li className={`relative grid md:grid-cols-2 gap-6 md:gap-12 items-start ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`pl-20 md:pl-0 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                  <div className="font-serif text-6xl text-accent/80">{s.n}</div>
                  <h3 className="mt-2 font-serif text-2xl md:text-3xl">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-md md:inline-block">{s.text}</p>
                </div>
                <div className="hidden md:block" />
                <span className="absolute left-8 md:left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent ring-8 ring-background" />
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>

    <CTASection />
  </>
);

export default Process;

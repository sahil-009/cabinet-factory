import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { CTASection } from "@/components/CTASection";

type Cat = "All" | "Kitchen Cabinets" | "Wardrobes" | "Office Cabinets" | "Custom Storage";

const products: { img: string; title: string; cat: Exclude<Cat, "All">; tag: string }[] = [
  { img: "/indian_kitchen.png", title: "Modern Kitchen Suite", cat: "Kitchen Cabinets", tag: "Bespoke" },
  { img: "/pic1.jpeg", title: "Modular Kitchen Island", cat: "Kitchen Cabinets", tag: "Modular" },
  { img: "/indian_bedroom.png", title: "Premium Walk-in Wardrobe", cat: "Wardrobes", tag: "Bespoke" },
  { img: "/indian_workspace.png", title: "Executive Office", cat: "Office Cabinets", tag: "Bespoke" },
  { img: "/indian_living_room.png", title: "Living Storage Wall", cat: "Custom Storage", tag: "Modular" },
  { img: "/pic2.jpeg", title: "Pantry Cabinet System", cat: "Kitchen Cabinets", tag: "Premium" },
  { img: "/pic3.jpeg", title: "Master Dressing Room", cat: "Wardrobes", tag: "Premium" },
  { img: "/indian_decor_accents.png", title: "Library Wall System", cat: "Custom Storage", tag: "Bespoke" },
];

const cats: Cat[] = ["All", "Kitchen Cabinets", "Wardrobes", "Office Cabinets", "Custom Storage"];

const Products = () => {
  const [cat, setCat] = useState<Cat>("All");
  const filtered = cat === "All" ? products : products.filter((p) => p.cat === cat);

  return (
    <>
      <section className="container py-16 md:py-24">
        <span className="eyebrow"><span className="h-px w-8 bg-foreground/40" /> Collections</span>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl leading-[1] max-w-3xl">
          A library of <em className="text-accent not-italic">considered</em> cabinetry.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Browse our latest commissions and signature pieces. Every product can be tailored to your space.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-foreground/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <RevealOnScroll key={p.title + i} delay={i * 60}>
              <article className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.06]" />
                </div>
                <div className="p-5 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{p.cat}</div>
                    <h3 className="font-serif text-xl mt-1 group-hover:text-accent transition-colors">{p.title}</h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary inline-flex items-center gap-1">
                    {p.tag} <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
};

export default Products;

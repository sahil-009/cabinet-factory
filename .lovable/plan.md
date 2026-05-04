# Premium Cabinet Manufacturer Website

A multi-page, editorial-style website for a high-end cabinet brand with a calm, luxury interior-design feel.

## Design System

- **Palette (HSL tokens in `index.css`)**
  - Background: warm off-white `#F8F5EF`
  - Primary: deep olive green `#3F4A2A`
  - Accent: terracotta/rust `#C2542B` (for CTAs, hover underlines)
  - Surface: soft beige `#EFE7DA`
  - Wood/neutral: warm taupe `#8A6E4B`
  - Text: deep charcoal `#1F1B16`
- **Typography**: serif display (Playfair Display) for headlines, clean sans (Inter) for body. Large sizes, generous line-height, lots of whitespace.
- **UI**: rounded-2xl cards, soft elevated shadows, glassy navbar (`backdrop-blur`), subtle borders.
- **Motion**: tailwind keyframes for `fade-up`, `slide-in-right`, `scale-in`, `float`, `shimmer`. Scroll reveal via IntersectionObserver hook. Respect `prefers-reduced-motion`.

## Pages & Routes

```
/             Home
/about        About
/products     Products (filterable)
/process      Process
/projects     Projects (before/after)
/contact      Contact
```

Wrapped in a shared `SiteLayout` (sticky blurred navbar + footer) with a route-level crossfade transition.

## Shared Components

- **Navbar**: sticky, blur background, shrinks on scroll (height + logo size animate). Links: Home, About, Products, Process, Projects, Contact. Right: "Get Quote" pill button (olive → rust on hover, soft glow).
- **Footer**: brand mark, quick links, contact, social, newsletter input.
- **Buttons**: primary (olive), accent (rust), ghost. Hover: scale 1.03 + soft shadow glow.
- **SectionHeading**: small eyebrow label + large serif title + optional subtitle.
- **RevealOnScroll** wrapper.
- **FloatingParticles**: lightweight CSS/SVG dots drifting in hero background.

## Home Page

1. **Hero** — split layout. Left: eyebrow "Bespoke Cabinetry", H1 "Crafting Cabinets That Define Your Space", subtext, CTA "Explore Designs" + secondary "Our Process". Right: large rounded kitchen image with soft shadow. Background: drifting particles + warm radial light. Entry: text fade-up staggered, image slide-in-right, buttons scale-in.
2. **Feature Grid** — 1 large + 4 small rounded cards of cabinet/kitchen scenes, hover zoom + dark overlay revealing "Explore Now ›".
3. **About Preview** — split image/text on craftsmanship, materials, factory quality. CTA "Our Story".
4. **Why Choose Us** — 4 icon cards: Premium Materials, Precision Manufacturing, Custom Designs, Fast Delivery (lucide icons).
5. **Process** — horizontal 4-step flow (Consultation → Materials → Manufacturing → Installation) with an animated connecting line that draws in on scroll; numbered circles, short copy.
6. **Testimonials** — sliding carousel (embla), minimal cards with quote, name, project.
7. **CTA Banner** — full-width olive section, serif headline "Build Your Dream Cabinets Today", "Get a Quote" button.

## About Page

- Hero with brand story.
- Mission & Vision two-column.
- Factory image gallery (masonry-ish grid).
- Team section: rounded portraits, name, role.
- Stats strip (years, projects, artisans, cities).

## Products Page

- Filter chips: All, Kitchen Cabinets, Wardrobes, Office Cabinets, Custom Storage.
- Responsive grid of product cards (image, title, short tag). Hover: image zoom, card lift, accent underline on title. Filtering animates with fade.
- Detail handled lightly via dialog/sheet (not separate routes).

## Process Page

- Vertical timeline with alternating left/right cards for each manufacturing stage (Consult, Design, Material, CNC/Build, QA, Install). Line draws progressively on scroll.
- Diagram/illustration accents.

## Projects Page

- Portfolio grid of completed projects.
- Featured **before/after slider** component (draggable divider) on hero project; reusable for additional entries.
- Lightbox on click.

## Contact Page

- Two-column: form (Name, Phone, Email, Requirements) with validation via react-hook-form + zod, success toast.
- Contact info card (address, phone, email, hours).
- Embedded map (static iframe placeholder).
- Floating WhatsApp button (bottom-right, persistent across site) with pulse animation.

## Animations Summary

- Page load: fade-up on hero content.
- Route change: 200ms crossfade.
- Scroll reveal: opacity + translateY for sections/cards (staggered).
- Hover: image zoom (`scale-105`), card lift (`-translate-y-1` + shadow), button scale + glow.
- Navbar shrink on scroll (>40px).
- Process line: SVG `pathLength` animation when in view.
- Hero: floating particles, soft light pulse.
- All gated by `prefers-reduced-motion`.

## Imagery

Use curated Unsplash kitchen/cabinet/interior photos (warm wood, olive cabinetry, natural light) imported into `src/assets/`. Consistent warm grade. The uploaded reference image is used as design inspiration only, not embedded.

## Technical Notes

- Add Google Fonts (Playfair Display + Inter) via `index.html`.
- Extend `tailwind.config.ts` with semantic colors mapped to new HSL CSS vars; add keyframes/animations (`fade-up`, `slide-in-right`, `scale-in`, `float`, `draw-line`).
- New files: `src/components/layout/{Navbar,Footer,SiteLayout}.tsx`, `src/components/{Hero,FeatureGrid,WhyChooseUs,ProcessSteps,Testimonials,CTASection,BeforeAfterSlider,WhatsAppButton,RevealOnScroll,FloatingParticles}.tsx`, `src/pages/{About,Products,Process,Projects,Contact}.tsx`. Update `src/App.tsx` routes and `src/pages/Index.tsx`.
- Carousel via existing `embla-carousel-react`; forms via existing `react-hook-form` + `zod`; icons via `lucide-react`.
- Fully responsive (mobile-first), smooth scrolling enabled globally.

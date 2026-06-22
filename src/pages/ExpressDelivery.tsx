import { useState } from "react";
import { Search, Copy, Truck, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "351910000000";

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80",
    title: "2 Door Cylinder Unit",
    sku: "CY-2D-E/82-120-45",
    shippingText: "Delivery in 5 days",
    badges: ["Eco", "Prime", "Gold", "Prime-Minifix", "Gold-Minifix"],
    heights: [720, 820, 900],
    widths: [900, 1000, 1200],
    depths: [400, 450, 560],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    title: "Blind Corner Cylinder Unit",
    sku: "BL-CY-E/82-120-45",
    shippingText: "Delivery in 5 days",
    badges: ["Eco", "Prime", "Gold", "Prime-Minifix", "Gold-Minifix"],
    heights: [720, 820, 900],
    widths: [900, 1000, 1200],
    depths: [400, 450, 560],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&q=80",
    title: "2 Door Sink Unit",
    sku: "SK-2D-E/72-100-56",
    shippingText: "Delivery in 3 days",
    badges: ["Eco", "Prime", "Gold", "Prime-Minifix", "Gold-Minifix"],
    heights: [720, 820],
    widths: [900, 1000],
    depths: [500, 560],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80",
    title: "Left Blind Corner Unit Carousel",
    sku: "BC-L-CR-E/72-110-56",
    shippingText: "Delivery in 3 days",
    badges: ["Eco", "Prime", "Gold", "Prime-Minifix", "Gold-Minifix"],
    heights: [720, 820, 900],
    widths: [1000, 1100, 1200],
    depths: [450, 560],
  },
];

const ExpressDelivery = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container max-w-5xl mx-auto px-4">

        {/* Search Header */}
        <div className="relative mb-6">
          <div className="flex items-center w-full bg-white border border-border/60 rounded-lg shadow-sm px-4 py-3">
            <Search className="w-5 h-5 text-accent mr-3" />
            <input
              type="text"
              placeholder="Search kitchens, wardrobes, etc."
              className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Section Title */}
        <div className="border-b border-border/60 mb-6 pb-2">
          <h2 className="text-sm font-bold text-accent flex items-center tracking-wider">
            <span className="mr-2 text-[10px]">▼</span> BASE UNITS (44)
          </h2>
        </div>

        {/* Products List */}
        <div className="flex flex-col gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Promo Banner */}
          <div className="bg-[#fff9d6] border border-[#f5e38a] rounded-md py-3 px-4 my-2">
            <p className="text-sm text-[#4a4a4a]">
              <strong>FREE DELIVERY</strong> for orders <strong>above ₹50,000</strong> -{" "}
              <span className="text-accent cursor-pointer hover:underline">View Charges</span>
            </p>
          </div>

          {products.slice(3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

type Product = (typeof products)[0];

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedH, setSelectedH] = useState(product.heights[0]);
  const [selectedW, setSelectedW] = useState(product.widths[0]);
  const [selectedD, setSelectedD] = useState(product.depths[0]);
  const [selectedBadge, setSelectedBadge] = useState(product.badges[0]);

  const waMessage = encodeURIComponent(
    `Hi! I'm interested in the following product:\n\n` +
    `📦 *Product:* ${product.title}\n` +
    `🔖 *SKU:* ${product.sku}\n` +
    `📐 *Dimensions:* H ${selectedH} × W ${selectedW} × D ${selectedD} mm\n` +
    `✅ *Variant:* ${selectedBadge}\n` +
    `🚚 *${product.shippingText}*\n\n` +
    `Please share the price for this configuration.`
  );

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(product.sku);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 border border-border/40 rounded-xl bg-card hover:shadow-soft transition-all duration-300">

      {/* Product Image */}
      <div className="w-full md:w-[320px] shrink-0 bg-[#f2eee8] rounded-lg p-6 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between py-2 flex-grow">

        <div>
          <h3 className="text-lg font-semibold text-foreground">{product.title}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1 mb-4 gap-1">
            <span>{product.sku}</span>
            <button onClick={copyToClipboard} title="Copy SKU" className="hover:text-accent transition-colors">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dimensions — fully dynamic */}
          <div className="flex items-center gap-3 text-xs mb-4">
            {/* Height */}
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-medium">H</span>
              <div className="relative">
                <select
                  value={selectedH}
                  onChange={(e) => setSelectedH(Number(e.target.value))}
                  className="appearance-none border border-border rounded px-2 py-1 pr-6 cursor-pointer bg-background text-xs focus:outline-none focus:border-accent/60 transition-colors"
                >
                  {product.heights.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>

            {/* Width */}
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-medium">W</span>
              <div className="relative">
                <select
                  value={selectedW}
                  onChange={(e) => setSelectedW(Number(e.target.value))}
                  className="appearance-none border border-border rounded px-2 py-1 pr-6 cursor-pointer bg-background text-xs focus:outline-none focus:border-accent/60 transition-colors"
                >
                  {product.widths.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>

            {/* Depth */}
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-medium">D</span>
              <div className="relative">
                <select
                  value={selectedD}
                  onChange={(e) => setSelectedD(Number(e.target.value))}
                  className="appearance-none border border-border rounded px-2 py-1 pr-6 cursor-pointer bg-background text-xs focus:outline-none focus:border-accent/60 transition-colors"
                >
                  {product.depths.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Badges — click to select variant */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {product.badges.map((badge) => (
              <button
                key={badge}
                onClick={() => setSelectedBadge(badge)}
                className={`text-[11px] px-3 py-1 rounded-full border cursor-pointer transition-all duration-150 ${
                  selectedBadge === badge
                    ? "bg-[#2d2d2d] text-white border-[#2d2d2d] scale-[1.05]"
                    : "bg-background text-foreground/80 border-border hover:border-accent/40"
                }`}
              >
                {badge}
              </button>
            ))}
            <HelpCircle className="w-4 h-4 text-muted-foreground/60 cursor-pointer hover:text-accent transition-colors ml-1" title="Variant info" />
          </div>

          <a href="#" className="text-xs text-[#5c3eaf] hover:text-accent transition-colors block mb-4">
            more details &gt;&gt;
          </a>
        </div>

        {/* Shipping and CTA */}
        <div>
          <div className="flex items-center text-sm text-[#00a859] font-medium mb-3">
            <Truck className="w-4 h-4 mr-2" />
            {product.shippingText}
          </div>

          <Button
            asChild
            className="bg-[#f04f23] hover:bg-[#d9421a] text-white rounded font-medium px-6 py-2 h-auto"
          >
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
            >
              View price
            </a>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ExpressDelivery;

import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => (
  <a
    href="https://wa.me/351910000000"
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-40 group"
  >
    <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" aria-hidden />
    <span className="relative grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-elegant transition-transform group-hover:scale-110">
      <MessageCircle className="h-6 w-6" />
    </span>
  </a>
);

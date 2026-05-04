import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageTransition } from "@/components/PageTransition";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

export const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CustomCursor />
      <ScrollProgress />
      <PageTransition />
      <Navbar />
      <main key={pathname} className="flex-1 pt-24">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

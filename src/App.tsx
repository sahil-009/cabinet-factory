import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageLoader } from "@/components/PageLoader";
import { SiteProvider, useSiteContext } from "@/context/SiteContext";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Products from "./pages/Products.tsx";
import Process from "./pages/Process.tsx";
import Projects from "./pages/Projects.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const InnerApp = () => {
  const { markIntroReady } = useSiteContext();
  // Always show loader on every page load / reload
  const [showLoader, setShowLoader] = useState(true);

  // Exit animation starts → hero can begin animating underneath
  const handleLoaderReady = () => markIntroReady();

  // Exit animation fully done → safe to unmount loader from DOM
  const handleLoaderDone = () => setShowLoader(false);

  return (
    <>
      {showLoader && (
        <PageLoader onReady={handleLoaderReady} onComplete={handleLoaderDone} />
      )}
      <BrowserRouter>
        <SiteLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/process" element={<Process />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SiteLayout>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteProvider initialReady={false}>
        <InnerApp />
      </SiteProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import React, { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

import { ThemeProvider } from "@/hooks/useTheme";
import { LenisProvider, useLenisControl } from "@/contexts/LenisContext";
import { ApplicationModalProvider } from "@/contexts/ApplicationModalContext";
import { DriverApplicationModal } from "@/components/ui/DriverApplicationModal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Drivers from "@/pages/Drivers";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const lenis = useLenisControl();

  useEffect(() => {
    lenis?.scrollToTop();
    const id = requestAnimationFrame(() => lenis?.scrollToTop());
    return () => cancelAnimationFrame(id);
  }, [location, lenis]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col pt-[5.75rem] md:pt-[7.5rem]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/drivers" component={Drivers} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
      <ApplicationModalProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <div className="min-h-[100dvh] flex flex-col bg-background text-foreground overflow-x-hidden transition-colors duration-300">
                <LoadingScreen />
                <ScrollProgress />
                <Navbar />
                <Router />
                <Footer />
              </div>
              <DriverApplicationModal />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </ApplicationModalProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}

export default App;

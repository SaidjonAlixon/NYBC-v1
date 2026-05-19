import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "DRIVERS", path: "/drivers" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer z-50">
          <div className="w-8 h-8 bg-primary rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <div className="w-3 h-3 bg-background" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-foreground">
            AM<span className="text-primary">TRUCK</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`relative text-sm font-semibold tracking-widest transition-colors ${
                location === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
              {location === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-6 py-3 bg-primary text-primary-foreground text-sm font-bold tracking-widest hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(193,18,31,0.3)] hover:shadow-[0_0_30px_rgba(193,18,31,0.5)]"
          >
            GET QUOTE
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 z-40 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-2xl font-bold tracking-widest ${
                  location === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest"
            >
              GET QUOTE
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { Logo } from "@/components/layout/Logo";

export const Navbar = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openModal } = useApplicationModal();

  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "DRIVERS", path: "/drivers" },
    { name: "CONTACT", path: "/contact" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const mobileMenu =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-x-0 bottom-0 top-[5.5rem] z-[60] flex flex-col bg-background md:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
              >
                <motion.nav
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col"
                >
                  <ul className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-6 py-4">
                    {navLinks.map((link, i) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                      >
                        <Link
                          href={link.path}
                          onClick={closeMobileMenu}
                          className={`block rounded-xl px-4 py-4 text-2xl font-bold tracking-widest transition-colors ${
                            location === link.path
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="shrink-0 space-y-3 border-t border-border px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                    <button
                      type="button"
                      data-testid="button-apply-now-mobile"
                      onClick={() => {
                        closeMobileMenu();
                        openModal();
                      }}
                      className="w-full rounded-full border-2 border-primary px-8 py-4 text-center font-bold tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      APPLY NOW
                    </button>
                    <Link
                      href="/contact"
                      onClick={closeMobileMenu}
                      className="block w-full rounded-full bg-primary px-8 py-4 text-center font-bold tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      GET IN TOUCH
                    </Link>
                  </div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container relative z-[51] mx-auto flex items-center justify-between px-6">
        <Link href="/" className="group flex cursor-pointer items-center" onClick={closeMobileMenu}>
          <Logo className="h-12 w-auto transition-opacity duration-300 group-hover:opacity-90 md:h-14" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="hidden items-center gap-3 md:flex">
          <motion.button
            data-testid="button-theme-toggle"
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-foreground"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            data-testid="button-apply-now-nav"
            onClick={openModal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border-2 border-primary px-5 py-2.5 text-sm font-bold tracking-widest text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            APPLY NOW
          </motion.button>

          <Link
            href="/contact"
            className="bg-primary px-6 py-3 text-sm font-bold tracking-widest text-primary-foreground shadow-[0_0_20px_rgba(193,18,31,0.3)] transition-colors hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(193,18,31,0.5)]"
          >
            GET IN TOUCH
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            data-testid="button-theme-toggle-mobile"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            data-testid="button-mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenu}
    </header>
  );
};

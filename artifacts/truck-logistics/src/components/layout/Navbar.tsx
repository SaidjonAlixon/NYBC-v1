import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon, ArrowUpRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Drivers", path: "/drivers" },
  { name: "Contact", path: "/contact" },
] as const;

export const Navbar = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openModal } = useApplicationModal();

  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const mobileMenu =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[58] bg-foreground/40 backdrop-blur-sm md:hidden"
                  aria-label="Close menu"
                  onClick={closeMobileMenu}
                />
                <motion.aside
                  key="mobile-drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  className="fixed bottom-0 right-0 top-0 z-[60] flex w-[min(100%,340px)] flex-col border-l border-border bg-background shadow-2xl md:hidden"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation"
                >
                  <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <Logo className="h-9 w-auto" />
                    <button
                      type="button"
                      onClick={closeMobileMenu}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground"
                      aria-label="Close menu"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                    {navLinks.map((link, i) => {
                      const active = location === link.path;
                      return (
                        <Link
                          key={link.path}
                          href={link.path}
                          onClick={closeMobileMenu}
                          className={cn(
                            "group flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors",
                            active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                          )}
                        >
                          <span
                            className={cn(
                              "font-mono text-xs font-bold",
                              active ? "text-primary-foreground/70" : "text-primary",
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-lg font-bold tracking-tight">{link.name}</span>
                          <ArrowUpRight
                            size={18}
                            className={cn(
                              "ml-auto opacity-0 transition-opacity group-hover:opacity-100",
                              active && "opacity-100",
                            )}
                          />
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="space-y-3 border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                    <button
                      type="button"
                      data-testid="button-apply-now-mobile"
                      onClick={() => {
                        closeMobileMenu();
                        openModal();
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold tracking-widest text-primary-foreground"
                    >
                      Apply Now
                      <ArrowUpRight size={16} />
                    </button>
                    <Link
                      href="/contact"
                      onClick={closeMobileMenu}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-4 text-sm font-bold tracking-widest"
                    >
                      <Phone size={16} className="text-primary" />
                      Get in touch
                    </Link>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 md:pt-4">
      {/* Top strip — logistics ticker */}
      <div
        className={cn(
          "pointer-events-auto mx-auto mb-2 hidden max-w-6xl overflow-hidden rounded-full border border-border/80 bg-card/70 px-4 py-1.5 text-center backdrop-blur-md transition-all duration-500 md:block dark:border-slate-200/80 dark:bg-[hsl(210_22%_96%)]/95",
          isScrolled ? "opacity-0 -translate-y-2 h-0 mb-0 border-0 py-0 overflow-hidden" : "opacity-100",
        )}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground dark:text-slate-600">
          <span className="text-primary">48-State</span> freight network · 24/7 dispatch ·{" "}
          <span className="text-foreground dark:text-slate-900">NYBC Trucking</span>
        </p>
      </div>

      {/* Main capsule */}
      <div
        className={cn(
          "pointer-events-auto relative mx-auto max-w-6xl px-3 transition-all duration-500 md:px-4",
          isScrolled && "md:px-3",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border bg-card/85 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-500",
            "dark:border-slate-200/90 dark:bg-[hsl(210_22%_97%)] dark:shadow-[0_8px_36px_rgba(0,0,0,0.22)]",
            isScrolled
              ? "border-border/90 shadow-lg dark:border-slate-200"
              : "border-border/60",
          )}
        >
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="flex items-center gap-3 px-3 py-2.5 md:gap-4 md:px-4 md:py-3">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="group relative z-10 flex shrink-0 items-center"
            >
              <Logo className="h-9 w-auto md:h-11" />
            </Link>

            {/* Desktop nav — pill tabs */}
            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
              aria-label="Main navigation"
            >
              <ul className="flex items-center gap-0.5 rounded-full border border-border/80 bg-muted/50 p-1 dark:border-slate-200/90 dark:bg-slate-100/90">
                {navLinks.map((link) => {
                  const active = location === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className={cn(
                          "relative block rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300",
                          active
                            ? "bg-background text-primary shadow-sm dark:bg-white dark:text-primary"
                            : "text-muted-foreground hover:text-foreground dark:text-slate-600 dark:hover:text-slate-900",
                        )}
                      >
                        {link.name}
                        {active && (
                          <motion.span
                            layoutId="nav-pill-glow"
                            className="absolute inset-0 rounded-full ring-1 ring-primary/25"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop actions */}
            <div className="ml-auto hidden items-center gap-2 md:flex">
              <button
                type="button"
                data-testid="button-theme-toggle"
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-muted/40 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground dark:border-slate-200 dark:bg-white/90 dark:text-slate-700 dark:hover:text-primary"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <Sun size={17} />
                    </motion.span>
                  ) : (
                    <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Moon size={17} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <Link
                href="/contact"
                className="hidden items-center gap-1.5 rounded-xl px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary dark:text-slate-600 dark:hover:text-primary lg:flex"
              >
                <Phone size={14} />
                Contact
              </Link>

              <button
                type="button"
                data-testid="button-apply-now-nav"
                onClick={openModal}
                className="group flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.35)] transition-all hover:shadow-[0_6px_28px_hsl(var(--primary)/0.45)]"
              >
                Apply Now
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-foreground/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={14} />
                </span>
              </button>
            </div>

            {/* Mobile actions */}
            <div className="ml-auto flex items-center gap-2 md:hidden">
              <button
                type="button"
                data-testid="button-theme-toggle-mobile"
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-muted/40 text-muted-foreground dark:border-slate-200 dark:bg-white/90 dark:text-slate-700"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                type="button"
                data-testid="button-mobile-menu"
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
                  mobileMenuOpen
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/80 bg-muted/40 text-foreground dark:border-slate-200 dark:bg-white/90 dark:text-slate-800",
                )}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenu}
    </header>
  );
};

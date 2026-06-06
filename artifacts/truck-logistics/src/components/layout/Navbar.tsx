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

const NAV_PHONE = "+18166088636";
const NAV_PHONE_DISPLAY = "+1 (816) 608-8636";

const navActionSize =
  "h-10 w-[12.75rem] md:h-11 md:w-[13.5rem]";

function NavPhoneLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={`tel:${NAV_PHONE}`}
      onClick={onClick}
      className={cn(
        "group flex items-center justify-center gap-2 rounded-xl border-2 border-primary/40 bg-primary/10 px-3 transition-all hover:border-primary hover:bg-primary/15",
        navActionSize,
        className,
      )}
      aria-label={`Call ${NAV_PHONE_DISPLAY}`}
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center md:h-9 md:w-9">
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.span
          className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_14px_hsl(var(--primary)/0.55)] md:h-8 md:w-8"
          animate={{ rotate: [0, -12, 12, -8, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        >
          <Phone size={15} strokeWidth={2.5} />
        </motion.span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary">Call now</span>
        <span className="text-xs font-bold tracking-wide text-foreground transition-colors group-hover:text-primary md:text-sm">
          {NAV_PHONE_DISPLAY}
        </span>
      </span>
    </a>
  );
}

export const Navbar = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openModal } = useApplicationModal();

  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const isHome = location === "/";
  const isDocked = isHome && !isScrolled;

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
                            active
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-muted",
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
                    <NavPhoneLink
                      className="flex w-full justify-center py-3.5"
                      onClick={closeMobileMenu}
                    />
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isDocked ? "pt-0" : "pt-3 md:pt-4",
      )}
    >
      {!isDocked && (
        <div
          className={cn(
            "pointer-events-auto mx-auto mb-2 hidden max-w-6xl overflow-hidden rounded-full border px-4 py-1.5 text-center backdrop-blur-md transition-all duration-500 md:block",
            "border-border/80 bg-card/80 dark:border-border dark:bg-card/90",
            isScrolled ? "h-0 overflow-hidden border-0 py-0 opacity-0" : "opacity-100",
          )}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            <span className="text-primary">48-State</span> freight network · 24/7 dispatch ·{" "}
            <span className="text-foreground">NYBC Trucking</span>
          </p>
        </div>
      )}

      <div
        className={cn(
          "pointer-events-auto transition-all duration-500",
          isDocked ? "w-full" : "mx-auto max-w-6xl px-3 md:px-4",
        )}
      >
        <div
          className={cn(
            "relative flex overflow-hidden transition-all duration-500",
            isDocked
              ? "min-h-[4.25rem] border-b border-border/80 bg-background shadow-[0_4px_28px_hsl(var(--primary)/0.25)] dark:border-white/10 dark:bg-[hsl(223_39%_7%)] md:min-h-[4.75rem]"
              : "rounded-2xl border border-border/80 shadow-lg backdrop-blur-xl dark:border-border dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
            !isDocked && (theme === "dark" ? "bg-card/95" : "bg-background/90"),
          )}
        >
          {/* Brand wing — angled edge */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className={cn(
              "relative z-10 flex shrink-0 items-center gap-3 bg-primary px-4 py-3 md:px-6 md:py-4",
              "after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:translate-x-[calc(100%-1px)]",
              "after:bg-primary after:[clip-path:polygon(0_0,100%_0,0_100%)]",
              isDocked ? "min-w-[9.5rem] md:min-w-[11rem]" : "min-w-[8.5rem] rounded-l-2xl md:min-w-[10rem]",
            )}
          >
            <span className="rounded-lg bg-white px-2 py-1 shadow-sm">
              <Logo className="h-7 w-auto md:h-9" />
            </span>
          </Link>

          {/* Nav wing */}
          <div className="flex min-w-0 flex-1 items-center gap-2 border-l border-primary/15 px-3 py-2 md:gap-3 md:px-5 md:py-3 dark:border-white/10">
            <nav className="hidden min-w-0 flex-1 md:block" aria-label="Main navigation">
              <ul className="flex items-center gap-0.5 lg:gap-1">
                {navLinks.map((link, i) => {
                  const active = location === link.path;
                  return (
                    <li key={link.path} className="flex items-center">
                      {i > 0 && (
                        <span
                          className="mx-1.5 hidden text-[11px] font-bold text-foreground/35 lg:inline dark:text-white/35"
                          aria-hidden
                        >
                          /
                        </span>
                      )}
                      <Link
                        href={link.path}
                        className={cn(
                          "group relative rounded-lg px-2.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] transition-colors md:text-[12px] lg:px-3.5",
                          active
                            ? "text-primary"
                            : "text-foreground/90 hover:bg-primary/8 hover:text-foreground dark:text-white/92 dark:hover:bg-white/8 dark:hover:text-white",
                        )}
                      >
                        {link.name}
                        <span
                          className={cn(
                            "absolute inset-x-2.5 -bottom-0.5 h-[3px] origin-left rounded-full bg-primary transition-transform duration-300",
                            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-1.5 md:gap-2">
              <button
                type="button"
                data-testid="button-theme-toggle"
                onClick={toggleTheme}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl border-2 transition-colors md:h-10 md:w-10",
                  "border-primary/30 bg-card text-foreground shadow-sm hover:border-primary hover:bg-primary/10 hover:text-primary",
                  "dark:border-primary/40 dark:bg-white/8 dark:text-white dark:hover:bg-white/12",
                )}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <Sun size={17} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Moon size={17} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <NavPhoneLink className="hidden md:flex" />

              <button
                type="button"
                data-testid="button-apply-now-nav"
                onClick={openModal}
                className={cn(
                  "group flex items-center justify-center gap-2 rounded-xl border-2 border-primary/80 bg-primary px-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground shadow-[0_4px_18px_hsl(var(--primary)/0.45)] transition-all hover:shadow-[0_6px_24px_hsl(var(--primary)/0.55)] md:text-[11px]",
                  navActionSize,
                )}
              >
                <span>Apply Now</span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-foreground/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} />
                </span>
              </button>

              <button
                type="button"
                data-testid="button-mobile-menu"
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl border-2 transition-colors md:hidden",
                  mobileMenuOpen
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/35 bg-card text-foreground shadow-sm dark:border-primary/45 dark:bg-white/10 dark:text-white",
                )}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {isDocked && (
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          )}
        </div>
      </div>

      {mobileMenu}
    </header>
  );
};

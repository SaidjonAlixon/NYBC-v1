import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { toast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
] as const;

function showSocialWorkInProgress(label: string) {
  toast({
    title: "Work in progress",
    description: `${label} will be connected soon once our account is live.`,
  });
}

const footerLinkClass =
  "text-[15px] font-medium text-muted-foreground transition-colors hover:text-primary";

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background pt-24 pb-12 text-foreground transition-colors duration-300">
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Link
              href="/"
              className="group mb-6 flex w-max cursor-pointer items-center rounded-xl border border-black/10 bg-white px-4 py-3 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            >
              <Logo className="h-14 w-auto md:h-16" />
            </Link>
            <p className="mb-8 max-w-md pr-4 text-base font-medium leading-relaxed text-muted-foreground">
              America's premier logistics and freight transportation corporation. Built on trust, speed, and precision since 2008.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => showSocialWorkInProgress(label)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary dark:border-white/10 dark:bg-card/60"
                  aria-label={`${label} — work in progress`}
                >
                  <Icon size={18} strokeWidth={2} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-6 text-sm font-bold tracking-[0.2em] text-foreground">COMPANY</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className={footerLinkClass}>About Us</Link></li>
              <li><Link href="/drivers" className={footerLinkClass}>Careers</Link></li>
              <li><Link href="/contact" className={footerLinkClass}>Contact</Link></li>
              <li><Link href="#" className={footerLinkClass}>News & Press</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-6 text-sm font-bold tracking-[0.2em] text-foreground">SERVICES</h4>
            <ul className="space-y-4">
              <li><Link href="#" className={footerLinkClass}>Regional Cargo</Link></li>
              <li><Link href="#" className={footerLinkClass}>Local Dispatching</Link></li>
              <li><Link href="#" className={footerLinkClass}>OTR Transportation</Link></li>
              <li><Link href="#" className={footerLinkClass}>Container Cargo</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row dark:border-white/10">
          <p className="text-sm font-medium text-muted-foreground">
            &copy; {new Date().getFullYear()} American Truck Logistics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className={`text-sm ${footerLinkClass}`}>Privacy Policy</Link>
            <Link href="#" className={`text-sm ${footerLinkClass}`}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

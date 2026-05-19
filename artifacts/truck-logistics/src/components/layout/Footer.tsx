import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6 group cursor-pointer w-max">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rotate-45 group-hover:rotate-180 transition-transform duration-500">
                <div className="w-3 h-3 bg-background" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-foreground">
                AM<span className="text-primary">TRUCK</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-8 pr-4">
              America's premier logistics and freight transportation corporation. Built on trust, speed, and precision since 2008.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-foreground font-bold tracking-widest mb-6">COMPANY</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/drivers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">News & Press</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-foreground font-bold tracking-widest mb-6">SERVICES</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Freight Transportation</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Long Haul Delivery</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Refrigerated Logistics</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Heavy Cargo</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-foreground font-bold tracking-widest mb-6">STAY UPDATED</h4>
            <p className="text-muted-foreground mb-4">Subscribe to our newsletter for industry insights and company updates.</p>
            <form className="flex border border-white/10 p-1 focus-within:border-primary transition-colors bg-background rounded-sm">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none flex-1 px-4 text-foreground min-w-0"
              />
              <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 transition-colors flex items-center justify-center">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} American Truck Logistics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group cursor-pointer w-max">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <div className="w-3 h-3 bg-background" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-foreground">
                AM<span className="text-primary">TRUCK</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm font-medium">
              America's premier logistics and freight transportation corporation. Built on trust, speed, and precision.
            </p>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold tracking-widest mb-6">COMPANY</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About Us</Link></li>
              <li><Link href="/drivers" className="text-muted-foreground hover:text-primary transition-colors font-medium">Careers</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold tracking-widest mb-6">SERVICES</h4>
            <ul className="space-y-4">
              <li className="text-muted-foreground font-medium">Freight Transportation</li>
              <li className="text-muted-foreground font-medium">Long Haul Delivery</li>
              <li className="text-muted-foreground font-medium">Refrigerated Logistics</li>
              <li className="text-muted-foreground font-medium">Heavy Cargo</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm font-medium">
            &copy; {new Date().getFullYear()} American Truck Logistics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold tracking-widest">TWITTER</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold tracking-widest">LINKEDIN</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold tracking-widest">INSTAGRAM</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

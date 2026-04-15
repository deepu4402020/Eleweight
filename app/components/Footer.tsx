'use client';

import Link from 'next/link';
import { Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground pt-32 pb-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link href="/" className="flex flex-col group">
              <span className="text-2xl font-display font-bold tracking-tighter leading-none">
                ELEWEIGHT
              </span>
              <span className="text-[8px] font-bold tracking-[0.4em] uppercase opacity-40">
                Archives
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs opacity-80">
              Defining the next generation of physical pursuit. High-fidelity training architecture for the modern athlete.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Sanctuary', 'Movements', 'Nutrition', 'Locations', 'Membership'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted hover:text-foreground transition-colors flex items-center gap-2 group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-8">Intelligence</h4>
            <ul className="space-y-4">
              {['Training Ethos', 'Scientific Data', 'The Journal', 'Community', 'Support'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-8">Archives</h4>
            <p className="text-sm text-muted mb-6 opacity-80">Join the circle for weekly movement insights.</p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent border border-border rounded-none px-4 py-4 text-xs focus:outline-none focus:border-foreground transition-all uppercase tracking-widest"
              />
              <button className="absolute right-0 top-0 h-full px-6 text-[10px] font-bold bg-foreground text-background hover:bg-neutral-800 transition-all uppercase tracking-widest">
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-muted font-mono tracking-[0.3em] uppercase opacity-60">
             {currentYear} © ELEWEIGHT ARCHIVES / ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Cookies'].map((p) => (
              <a key={p} href="#" className="text-[9px] text-muted hover:text-foreground transition-colors uppercase tracking-[0.2em] font-bold">{p}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

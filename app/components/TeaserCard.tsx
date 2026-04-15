'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface TeaserCardProps {
  img: string;
  category: string;
  title: string;
  desc: string;
  link: string;
  variant?: 'light' | 'dark';
}

export default function TeaserCard({ img, category, title, desc, link, variant = 'light' }: TeaserCardProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`group relative overflow-hidden rounded-[32px] p-8 sm:p-12 aspect-[16/20] sm:aspect-square flex flex-col justify-end transition-all duration-700`}
      style={{
        background: isDark ? '#0A0A0A' : '#FFFFFF',
        border: '1px solid var(--border)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 grayscale group-hover:grayscale-0"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/40 to-transparent' : 'from-white via-white/20 to-transparent'} opacity-80`} />
      </div>

      <div className="relative z-10">
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
          {category}
        </p>
        <h3 className={`text-2xl sm:text-3xl font-display leading-[1.1] mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed mb-8 max-w-sm ${isDark ? 'text-white/50' : 'text-black/50'}`}>
          {desc}
        </p>
        <Link
          href={link}
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'} group/btn`}
        >
          Explore Now
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isDark ? 'border-white/20 group-hover/btn:bg-white group-hover/btn:text-black' : 'border-black/20 group-hover/btn:bg-black group-hover/btn:text-white'} transition-all`}>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
      </div>
    </div>
  );
}

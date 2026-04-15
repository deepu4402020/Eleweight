'use client';

import { motion } from 'framer-motion';

interface ExerciseCardProps {
  name: string;
  muscle: string;
  level: string;
  img: string;
  delay?: number;
}

export default function ExerciseCard({ name, muscle, level, img, delay = 0 }: ExerciseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
      className="group bg-surface border border-border overflow-hidden hover:border-foreground transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted-light/10">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover grayscale brightness-[0.8] contrast-[1.1] group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="absolute top-4 left-4 text-[9px] font-bold font-sans uppercase tracking-[0.2em] bg-background text-foreground px-3 py-1 border border-border">
          {level}
        </span>
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="text-[10px] font-bold font-sans uppercase tracking-[0.25em] text-muted mb-2">
          {muscle}
        </p>
        <h3 className="font-display text-xl text-foreground leading-tight mb-4">
          {name}
        </h3>
        <p className="text-sm font-sans text-muted leading-relaxed line-clamp-2 opacity-80 mb-4">
          Precision-engineered movement for the modern athlete. Refractive kinetics meet biological refinement.
        </p>
        <div className="h-px w-full bg-border group-hover:bg-foreground transition-colors duration-300" />
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';

const items = [
  'PREMIUM TRAINING',
  'ELITE NUTRITION',
  'EXPERT COACHING',
  'GLOBAL COMMUNITY',
  'SCIENTIFIC RECOVERY',
];

export default function Ticker() {
  return (
    <div className="relative overflow-hidden py-4 border-y border-[var(--border)] bg-[var(--background)]">
      <motion.div
        className="flex whitespace-nowrap gap-12 text-[10px] font-bold tracking-[0.3em] font-sans text-[var(--muted-light)]"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: 'linear',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-12">
            {items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

'use client';

import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CounterProps {
  to: number;
  suffix?: string;
}

export default function Counter({ to, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, motionValue, to]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

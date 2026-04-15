'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';
import { Utensils } from 'lucide-react';

export default function DietPlansPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background flex flex-col"
    >
      <Navbar />

      <main className="flex-1 px-6 lg:px-8 pt-24 pb-20 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <SectionLabel>Fuel Protocols</SectionLabel>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display text-foreground leading-[1] tracking-tight mt-6 mb-6">
            Bespoke Nutrition.
          </h1>
          <p className="font-sans text-lg text-muted leading-relaxed">
            Your personalized macro-aligned meal strategies will appear here. We synthesize dietary logic with peak physical exertion.
          </p>
        </div>

        <div className="border border-border bg-[#0A0A0A] p-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 border border-[#222] bg-[#111] flex items-center justify-center mb-6">
            <Utensils className="w-6 h-6 text-white/50" />
          </div>
          <p className="text-lg font-display text-white mb-2">No Active Fuel Protocols</p>
          <p className="text-sm font-sans text-white/40 max-w-md">
            Execute your preliminary biometric scan or contact your concierge trainer to initialize your personalized diet plan array.
          </p>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}

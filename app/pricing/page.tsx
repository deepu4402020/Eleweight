"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Check, Minus } from "lucide-react";
import { motion } from "framer-motion";
import SectionLabel from "../components/SectionLabel";

const plans = [
  {
    badge: "Base",
    name: "Essentials",
    desc: "Essential protocols for the dedicated beginner.",
    monthly: 19,
    annual: 14,
    features: [
      { text: "1 Profiling System", included: true },
      { text: "Basic Form Analysis", included: true },
      { text: "Smart Protocol Builder", included: true },
      { text: "Progress Analytics", included: true },
      { text: "Concierge Access", included: false },
      { text: "API Integration", included: false },
    ],
    cta: "Begin Free Trial",
    featured: false,
  },
  {
    badge: "Athlete",
    name: "Studio",
    desc: "Advanced tools for the serious physical pursuit.",
    monthly: 49,
    annual: 37,
    features: [
      { text: "3 Profiling Systems", included: true },
      { text: "Unlimited Form Analysis", included: true },
      { text: "Smart Protocol Builder", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Concierge Access", included: true },
      { text: "API Integration", included: false },
    ],
    cta: "Join Athlete Tier",
    featured: true,
    popular: true,
  },
  {
    badge: "Elite",
    name: "Scale",
    desc: "The ultimate sanctuary for peak performance tracking.",
    monthly: 99,
    annual: 74,
    features: [
      { text: "10 Profiling Systems", included: true },
      { text: "Unlimited Form Analysis", included: true },
      { text: "Smart Protocol Builder", included: true },
      { text: "Full Analytics Suite", included: true },
      { text: "Concierge Access", included: true },
      { text: "API Integration", included: true },
    ],
    cta: "Go Elite",
    featured: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background flex flex-col"
    >
      <Navbar />

      <main className="flex-1 px-6 lg:px-8 pt-24 pb-20 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 max-w-2xl mx-auto flex flex-col items-center">
          <SectionLabel>Membership</SectionLabel>
          <h1 className="text-[clamp(3rem,6vw,5rem)] font-display text-foreground leading-[1] tracking-tight mt-6 mb-6">
            Choose your <br /> discipline.
          </h1>
          <p className="text-lg text-muted font-sans leading-relaxed">
            Minimalist pricing structures for every stage of your physical refinement journey.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${annual ? "text-muted" : "text-foreground"}`}>
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setAnnual((v) => !v)}
            className={`relative w-14 h-7 border border-foreground transition-colors focus:outline-none ${
              annual ? "bg-foreground" : "bg-transparent"
            }`}
            aria-label="Toggle billing period"
            aria-pressed={annual}
          >
            <span
              className={`absolute top-1 w-4 h-4 transition-all duration-300 ${annual ? "bg-background left-[34px]" : "bg-foreground left-1"}`}
            />
          </button>
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-colors ${annual ? "text-foreground" : "text-muted"}`}>
            Annual
            <span className="text-[8px] tracking-[0.2em] bg-foreground text-background px-2 py-1">
              SAVE 25%
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-none p-8 lg:p-10 flex flex-col border transition-all duration-300 ${
                plan.featured
                  ? "border-foreground bg-foreground text-background shadow-[0_24px_48px_rgba(0,0,0,0.1)] scale-[1.02] z-10"
                  : "border-border bg-background text-foreground hover:border-foreground"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 border border-background bg-foreground text-background whitespace-nowrap">
                  Most selected
                </div>
              )}

              <span className={`inline-flex w-fit text-[9px] font-bold uppercase tracking-[0.3em] opacity-60 mb-6`}>
                {plan.badge}
              </span>

              <p className="text-xl font-bold font-sans uppercase tracking-widest mb-2">
                {plan.name}
              </p>
              <p className={`text-sm leading-relaxed mb-8 ${plan.featured ? "text-background/80" : "text-muted"}`}>
                {plan.desc}
              </p>

              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-2xl font-mono font-bold ${plan.featured ? "text-background/80" : "text-muted"}`}>$</span>
                <span className="text-6xl font-mono font-bold tracking-tighter">
                  {annual ? plan.annual : plan.monthly}
                </span>
                <span className={`text-sm ${plan.featured ? "text-background/80" : "text-muted"}`}>/mo</span>
              </div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-8 ${plan.featured ? "text-background/60" : "text-muted/60"}`}>
                {annual ? `Billed $${plan.annual * 12} yearly` : "Billed monthly"}
              </p>

              <hr className={`border-t mb-8 ${plan.featured ? "border-background/20" : "border-border"}`} />

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-4">
                    {f.included ? (
                      <span className={`mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 ${plan.featured ? "text-background" : "text-foreground"}`}>
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className={`mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 ${plan.featured ? "text-background/30" : "text-muted/30"}`}>
                        <Minus className="w-4 h-4" strokeWidth={2} />
                      </span>
                    )}
                    <span
                      className={`text-sm font-sans leading-snug ${
                        f.included
                          ? (plan.featured ? "text-background" : "text-foreground")
                          : (plan.featured ? "text-background/50" : "text-muted")
                      }`}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`w-full text-center py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${
                  plan.featured
                    ? "bg-background text-foreground hover:bg-neutral-200"
                    : "bg-foreground text-background hover:bg-neutral-800"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-border bg-background px-8 py-8">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-2">
              Enterprise Integration
            </p>
            <p className="text-xl font-display text-foreground mb-2">
              Bespoke Architecture
            </p>
            <p className="text-sm text-muted font-sans tracking-wide">
              Unlimited structural profiles, complete white-label aesthetic, & dedicated system support.
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 inline-flex justify-center text-[10px] uppercase font-bold tracking-[0.2em] px-8 py-4 border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Consult Strategy
          </Link>
        </div>

      </main>
      <Footer />
    </motion.div>
  );
}

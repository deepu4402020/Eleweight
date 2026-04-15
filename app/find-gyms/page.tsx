'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Search, AlertCircle, Loader2 } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';

export default function FindGymsPage() {
  const [radius, setRadius] = useState(1500);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation tracking is not supported by your current optics.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success - in a real app, you would use this to find nearby gyms
        console.log('Kinetic Location Locked:', position.coords);
        setTimeout(() => setIsLoading(false), 1200); // Simulated delay for visual effect
      },
      (err) => {
        setError('Unable to lock your coordinates. Please enable geospatial tracking and retry.');
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background flex flex-col"
    >
      <Navbar />

      <main className="flex-1 px-6 lg:px-8 pt-24 pb-20 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <SectionLabel>Sanctuary Locator</SectionLabel>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display text-foreground leading-[1] tracking-tight mt-6 mb-6">
            Find your <br /> discipline space.
          </h1>
          <p className="text-lg text-muted font-sans leading-relaxed max-w-2xl mx-auto">
            Discover precision training facilities in your immediate vicinity. We use geospatial tracking to map the closest sanctuaries.
          </p>
        </div>

        <div className="border border-border bg-background p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search Radius Limit
            </label>
            <span className="text-2xl font-mono text-foreground font-bold">{radius}m</span>
          </div>
          
          <div className="relative mb-4">
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-1 bg-border rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-none"
            />
          </div>
          
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-muted">
            <span>500m</span>
            <span>5000m</span>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-12 border border-border bg-neutral-50/50 dark:bg-neutral-900/50 mb-8">
            <Loader2 className="w-8 h-8 text-foreground animate-spin mb-4" />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-foreground">Triangulating Facilities...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="border border-red-500/20 bg-red-50 dark:bg-red-950/20 p-6 mb-8 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 mb-1">Geospatial Error</p>
              <p className="text-sm font-sans text-red-600/80">{error}</p>
            </div>
          </div>
        )}

        {/* Gyms List (would be populated from API) */}
        {!isLoading && !error && (
          <div className="border border-border p-12 text-center bg-[#0A0A0A] flex flex-col items-center">
            <MapPin className="w-8 h-8 text-white/30 mb-4" />
            <p className="text-sm font-sans text-white/60 mb-2">No sanctuaries identified within current parameters.</p>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Adjust the radius to expand the search grid.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </motion.div>
  );
}

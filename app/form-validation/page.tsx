'use client';

import { useCallback, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePoseDetection } from '@/app/hooks/usePoseDetection';
import type { ExerciseFormId, FormFeedback } from '@/app/utlis/formValidation';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ScanLine,
} from 'lucide-react';
import SectionLabel from '../components/SectionLabel';

const exercises: { id: ExerciseFormId; label: string; hint: string }[] = [
  { id: 'bench-press', label: 'Bench Press', hint: 'Face the camera; keep shoulders, elbows, and wrists visible.' },
  { id: 'dumbbell-curl', label: 'Dumbbell Curl', hint: 'Show your left side; keep elbow and wrist in frame.' },
  { id: 'squat', label: 'Squat', hint: 'Full body visible — hips, knees, and ankles in frame.' },
];

const initialFeedback: FormFeedback = { isCorrect: false, errors: [], score: 0 };

export default function FormValidationPage() {
  const [exercise, setExercise] = useState<ExerciseFormId>('bench-press');
  const [feedback, setFeedback] = useState<FormFeedback>(initialFeedback);

  const onFeedback = useCallback((f: FormFeedback) => setFeedback(f), []);

  const { videoRef, canvasRef, isLoading, error } = usePoseDetection({
    exercise,
    onFeedback,
  });

  const activeHint = exercises.find((e) => e.id === exercise)?.hint ?? '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background flex flex-col"
    >
      <Navbar />

      <main className="flex-1 px-6 lg:px-8 py-24 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <SectionLabel>Live Diagnostics</SectionLabel>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display text-foreground leading-[1] tracking-tight mt-4 mb-4">
            Form Analytics.
          </h1>
          <p className="font-sans text-lg text-muted max-w-2xl leading-relaxed">
            Real-time kinetic tracking. We measure alignment against strict architectural principles for each lift. Proceed with precision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="flex flex-wrap gap-3">
              {exercises.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setExercise(ex.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                    exercise === ex.id
                      ? 'bg-foreground text-background border-foreground shadow-[4px_4px_0_var(--foreground)]'
                      : 'bg-transparent text-foreground border-border hover:border-foreground'
                  }`}
                >
                  {ex.label}
                </button>
              ))}
            </div>

            <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em]">{activeHint}</p>

            <div className="relative border border-border bg-[#0A0A0A] overflow-hidden group">
              <video ref={videoRef} className="hidden" autoPlay playsInline muted />
              <canvas ref={canvasRef} className="w-full h-auto max-h-[60vh] object-contain bg-black/50" />

              {isLoading && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-4 backdrop-blur-sm">
                  <ScanLine className="w-10 h-10 text-white animate-pulse" />
                  <p className="text-white text-[10px] uppercase font-bold tracking-[0.3em]">
                    Initializing Optics...
                  </p>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/90 p-8 backdrop-blur-md">
                  <div className="border border-[#333] bg-[#0A0A0A] p-8 text-center max-w-md shadow-2xl">
                    <AlertCircle className="w-8 h-8 text-white mx-auto mb-4" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-3">Camera Offline</p>
                    <p className="text-sm font-sans text-white/60 leading-relaxed">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="border border-border bg-background p-8 relative overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between gap-4 mb-8 border-b border-border pb-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground flex items-center gap-3">
                  <Activity className="w-4 h-4" />
                  Kinetic Score
                </h2>
                <span className={`text-6xl font-mono tracking-tighter ${feedback.score >= 80 ? 'text-foreground' : 'text-muted'}`}>
                  {feedback.score}
                </span>
              </div>

              <div className="h-0.5 bg-border w-full mb-8 relative">
                <div
                  className={`absolute top-0 left-0 h-full transition-all duration-700 ease-out ${
                    feedback.score >= 80 ? 'bg-foreground shadow-[0_0_10px_var(--foreground)]' : 'bg-muted'
                  }`}
                  style={{ width: `${feedback.score}%` }}
                />
              </div>

              <div className={`p-5 mb-8 border transition-colors duration-300 ${feedback.isCorrect ? 'border-foreground bg-foreground text-background' : 'border-border bg-background text-foreground'}`}>
                <div className="flex items-start gap-4">
                  {feedback.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 line-clamp-1">
                      {feedback.isCorrect ? 'Alignment Verified' : 'Deviations Detected'}
                    </p>
                    <p className={`text-xs font-sans leading-relaxed ${feedback.isCorrect ? 'opacity-90' : 'text-muted'}`}>
                      {feedback.isCorrect
                        ? 'Form parameters met. Maintain movement protocol.'
                        : 'Review structural critiques below.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted pb-2">
                  Live Critiques
                </h3>
                <ul className="space-y-4 min-h-[140px] font-sans border-t border-border pt-4">
                  {feedback.errors.length === 0 ? (
                    <li className="text-sm text-muted italic">Awaiting deviations...</li>
                  ) : (
                    feedback.errors.map((msg, i) => (
                      <li key={i} className="flex gap-4 text-sm text-foreground items-start">
                        <span className="text-[10px] font-mono opacity-40 mt-1">[{String(i + 1).padStart(2, '0')}]</span>
                        <span className="opacity-90 leading-relaxed font-medium">{msg}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}

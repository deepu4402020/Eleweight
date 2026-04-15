'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Play, Pause, Volume2, VolumeX,
  Maximize2, ChevronRight, Target, Clock,
  Zap, AlertTriangle, CheckCircle2, RotateCcw,
} from 'lucide-react';

export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  subGroup?: string;
  description: string;
  targetArea: string;
  secondaryMuscles?: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string;
  sets?: string;
  reps?: string;
  duration?: string;
  calories?: number;
  link: string;
  steps: string[];
  tips: string[];
  commonMistakes?: string[];
  emoji: string;
}

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner: 'bg-[var(--subtle)] text-[var(--muted)] border border-[var(--border)]',
  Intermediate: 'bg-[var(--surface-3)] text-[var(--foreground)] border border-[var(--border-dark)]',
  Advanced: 'bg-[var(--foreground)] text-[var(--background)] border border-[var(--foreground)]',
};

export default function ExerciseDetailModal({ exercise, onClose }: ExerciseDetailModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'steps' | 'tips' | 'mistakes'>('steps');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = exercise ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [exercise]);

  useEffect(() => {
    if (!exercise || !videoRef.current) return;
    setProgress(0); setPlaying(false); setActiveTab('steps');
    const v = videoRef.current;
    v.currentTime = 0; v.muted = true; setMuted(true);
    v.play().then(() => setPlaying(true)).catch(() => { });
  }, [exercise]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted; setMuted(!muted);
  };
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    if (v.duration) setProgress((v.currentTime / v.duration) * 100);
  };
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * videoRef.current.duration;
  };
  const handleFullscreen = () => videoRef.current?.requestFullscreen?.();
  const restart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0; videoRef.current.play(); setPlaying(true);
  };

  if (!exercise) return null;

  const tabs: { key: 'steps' | 'tips' | 'mistakes'; label: string; icon: typeof CheckCircle2 }[] = [
    { key: 'steps', label: 'Step Guide', icon: ChevronRight },
    { key: 'tips', label: 'Pro Tips', icon: Zap },
    { key: 'mistakes', label: 'Avoid These', icon: AlertTriangle },
  ];

  const videoPanel = '#0A0A0A';

  return (
    <AnimatePresence>
      {exercise && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-5xl max-h-[92vh] rounded-[2rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row"
              style={{ background: 'var(--surface)' }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* ── LEFT: Video Panel ── */}
              <div className="lg:w-[48%] flex-shrink-0 flex flex-col" style={{ background: videoPanel }}>

                <div className="relative flex-1 min-h-[240px] lg:min-h-0 bg-black">
                  <video
                    ref={videoRef} src={exercise.link} loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'grayscale(20%)' }}
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

                  {/* Top bar */}
                  <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4">
                    <span
                      className="text-[10px] font-bold font-sans uppercase tracking-[0.18em] px-3 py-1.5 rounded-full"
                      style={{ color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      {exercise.muscleGroup}
                    </span>
                    <button
                      onClick={onClose}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-70"
                      style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Center play button */}
                  <AnimatePresence>
                    {!playing && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                          <Play className="w-8 h-8 text-black translate-x-0.5" />
                        </div>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-white/10 cursor-pointer" onClick={handleSeek}>
                  <div className="h-full bg-white transition-none" style={{ width: `${progress}%` }} />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between px-5 py-3" style={{ background: videoPanel }}>
                  <div className="flex items-center gap-2">
                    <button onClick={togglePlay}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-70"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                      {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                    </button>
                    <button onClick={restart}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={toggleMute}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>
                      {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <button onClick={handleFullscreen}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Exercise meta */}
                <div className="px-6 py-5 grid grid-cols-3 gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {[
                    { icon: Target, label: 'Target', value: exercise.targetArea },
                    { icon: Clock, label: exercise.reps ? 'Reps' : 'Duration', value: exercise.reps || exercise.duration || '—' },
                    { icon: Zap, label: 'Sets', value: exercise.sets || '3–4' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <Icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }} />
                      <p className="text-[10px] font-sans uppercase tracking-[0.12em] mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
                      <p className="text-sm font-semibold font-sans text-white leading-tight">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Info Panel ── */}
              <div className="flex-1 flex flex-col overflow-hidden">

                {/* Header */}
                <div className="px-8 pt-8 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{exercise.emoji}</span>
                        <span className={`text-[10px] font-bold font-sans uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${DIFFICULTY_COLOR[exercise.difficulty]}`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      <h2 className="font-display text-[1.85rem] leading-tight mb-1" style={{ color: 'var(--foreground)' }}>
                        {exercise.name}
                      </h2>
                      <p className="text-sm font-sans leading-relaxed max-w-sm" style={{ color: 'var(--muted)' }}>
                        {exercise.description}
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="hidden lg:flex w-8 h-8 rounded-full items-center justify-center transition-opacity hover:opacity-70 flex-shrink-0"
                      style={{ background: 'var(--subtle)', color: 'var(--muted)' }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Equipment + secondary muscles */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-medium px-3 py-1.5 rounded-full"
                      style={{ background: 'var(--foreground)', color: 'var(--background)' }}
                    >
                      🏋️ {exercise.equipment}
                    </span>
                    {exercise.secondaryMuscles?.map((m) => (
                      <span key={m}
                        className="text-xs font-sans px-3 py-1.5 rounded-full"
                        style={{ background: 'var(--subtle)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 px-8 pt-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  {tabs.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-sm font-sans font-medium transition-all border-b-2 -mb-px"
                      style={{
                        color: activeTab === key ? 'var(--foreground)' : 'var(--muted)',
                        borderColor: activeTab === key ? 'var(--foreground)' : 'transparent',
                        background: activeTab === key ? 'var(--subtle)' : 'transparent',
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'steps' && (
                      <motion.ol key="steps"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {exercise.steps.map((step, i) => (
                          <li key={i} className="flex gap-4">
                            <div
                              className="flex-shrink-0 w-7 h-7 rounded-full font-bold font-mono text-xs flex items-center justify-center mt-0.5"
                              style={{ background: 'var(--foreground)', color: 'var(--background)' }}
                            >
                              {i + 1}
                            </div>
                            <p className="text-sm font-sans leading-relaxed flex-1 pt-0.5" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                              {step}
                            </p>
                          </li>
                        ))}
                      </motion.ol>
                    )}

                    {activeTab === 'tips' && (
                      <motion.ul key="tips"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        {exercise.tips.map((tip, i) => (
                          <li key={i}
                            className="flex gap-3 p-4 rounded-2xl"
                            style={{ background: 'var(--subtle)', border: '1px solid var(--border)' }}
                          >
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--foreground)' }} />
                            <p className="text-sm font-sans leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                              {tip}
                            </p>
                          </li>
                        ))}
                      </motion.ul>
                    )}

                    {activeTab === 'mistakes' && (
                      <motion.ul key="mistakes"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        {(exercise.commonMistakes || ['No common mistakes listed.']).map((m, i) => (
                          <li key={i}
                            className="flex gap-3 p-4 rounded-2xl"
                            style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}
                          >
                            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm font-sans text-red-800/80 leading-relaxed">{m}</p>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer CTA */}
                <div
                  className="px-8 py-5 flex items-center justify-between gap-4"
                  style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}
                >
                  <p className="text-xs font-sans" style={{ color: 'var(--muted)' }}>
                    {exercise.calories ? `~${exercise.calories} kcal / 30 min` : 'Intensity varies by weight & reps'}
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-6 py-2.5 rounded-xl transition-opacity hover:opacity-80"
                    style={{ background: 'var(--foreground)', color: 'var(--background)' }}
                  >
                    Back to Library
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

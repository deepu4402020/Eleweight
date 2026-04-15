'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import ExerciseDetailModal, { type Exercise } from '../components/ExerciseDetailModal';
import {
  Search,
  SlidersHorizontal,
  Play,
  Dumbbell,
  Activity,
  Zap,
  X,
  ChevronRight,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   EXERCISE DATABASE
═══════════════════════════════════════════════════════════════ */
const ALL_EXERCISES: Exercise[] = [
  /* ── CHEST ── */
  {
    id: 1,
    name: 'Bench Press',
    muscleGroup: 'Chest',
    subGroup: 'Mid Chest',
    description: 'The king of chest exercises. A compound push movement that recruits the pectorals, anterior deltoids, and triceps for maximum upper-body strength.',
    targetArea: 'Mid Chest',
    secondaryMuscles: ['Anterior Deltoid', 'Triceps', 'Serratus Anterior'],
    difficulty: 'Intermediate',
    equipment: 'Barbell & Bench',
    sets: '4',
    reps: '6–12',
    calories: 200,
    link: '/Exe_Video/BenchPress.mp4',
    emoji: '🏋️',
    steps: [
      'Lie flat on the bench with your eyes directly below the bar. Plant feet firmly on the floor.',
      'Grip the bar slightly wider than shoulder-width with an overhand grip. Retract your shoulder blades and create a slight arch in your lower back.',
      'Unrack the bar and hold it directly above your chest with arms fully extended.',
      'Inhale and slowly lower the bar to mid-chest, keeping elbows at ~75° from your torso.',
      'Pause briefly when the bar is 1 inch from your chest — do not bounce.',
      'Exhale and press the bar back up in a straight line, driving through your heels.',
      'Lock out at the top without shrugging, then repeat.',
    ],
    tips: [
      'Maintain 5 contact points: head, upper back, lower back, both feet on the floor.',
      'Keep your wrists stacked above the elbows throughout the lift.',
      'Imagine spreading the bar apart as you press — this activates more chest fibers.',
      'Control the eccentric (lowering) phase to maximize muscle tension.',
    ],
    commonMistakes: [
      'Flaring elbows out at 90° — this stresses the shoulder joint. Keep them at ~75°.',
      'Bouncing the bar off the chest — removes tension and risks injury.',
      'Lifting the hips off the bench — reduces range of motion and power transfer.',
      'Gripping too wide which can overextend the wrists and shoulders.',
    ],
  },
  {
    id: 2,
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    subGroup: 'Upper Chest',
    description: 'Targets the under-developed clavicular (upper) pectoral head, building the "shelf" of the chest and improving visual fullness.',
    targetArea: 'Upper Chest',
    secondaryMuscles: ['Front Deltoid', 'Triceps'],
    difficulty: 'Intermediate',
    equipment: 'Dumbbells & Incline Bench',
    sets: '3',
    reps: '8–12',
    calories: 180,
    link: '/Exe_Video/InclineDumbelPress.mp4',
    emoji: '📐',
    steps: [
      "Set the bench to 30–45°. Sit with dumbbells resting on your thighs.",
      "Kick the dumbbells up with your thighs and lower back to bring them to shoulder level.",
      "Rotate palms to face forward. Retract shoulder blades and push your chest up.",
      "Press the dumbbells up and slightly inward until arms are nearly locked out.",
      "Lower slowly in a controlled arc until elbows are slightly below the bench.",
      "Press back up, squeezing the upper chest at the top.",
    ],
    tips: [
      'Keep the bench at 30–45° — higher than 45° shifts load to shoulders.',
      'Allow a slight rotation of the wrist for a natural arc of motion.',
      'Focus on squeezing at the top for an extra 1s for maximum contraction.',
    ],
    commonMistakes: [
      'Setting the bench too steep (above 45°) — turns it into a shoulder press.',
      'Flaring elbows too wide — reduces chest activation.',
      'Using excessively heavy weights with poor scapular control.',
    ],
  },
  {
    id: 3,
    name: 'Push-Up',
    muscleGroup: 'Chest',
    subGroup: 'Full Chest',
    description: 'The timeless bodyweight standard. Builds pushing strength, trains core stability, and requires zero equipment — perfectable anywhere, anytime.',
    targetArea: 'Chest, Core',
    secondaryMuscles: ['Triceps', 'Serratus Anterior', 'Core'],
    difficulty: 'Beginner',
    equipment: 'Bodyweight',
    sets: '3',
    reps: '15–25',
    calories: 140,
    link: '/Exe_Video/PushUps.mp4',
    emoji: '💪',
    steps: [
      'Start in a high plank: hands slightly wider than shoulder-width, arms straight.',
      'Keep your body in a rigid straight line from head to heels — brace your core.',
      'Lower your chest toward the floor by bending your elbows at ~45° from your torso.',
      'Pause when your chest is 1 inch from the floor.',
      'Press back up to full arm extension, maintaining the plank position.',
      'Repeat without letting your hips sag or pike upward.',
    ],
    tips: [
      'Squeeze your glutes and core throughout — it protects your lower back.',
      'Look slightly forward (not down) to keep your spine neutral.',
      'For more chest: widen your hand placement. For more triceps: narrow it.',
    ],
    commonMistakes: [
      'Hips sagging — your core must stay braced throughout.',
      'Piking the hips up — makes the movement easier but defeats the purpose.',
      'Flaring elbows out to 90° — stresses the shoulder joint.',
      'Partial reps — go full range to maximize recruitment.',
    ],
  },
  {
    id: 4,
    name: 'Chest Fly',
    muscleGroup: 'Chest',
    subGroup: 'Isolation',
    description: 'An isolation exercise that stretches and contracts the pectoral muscles through a wide arc of motion, excellent for mind-muscle connection and development.',
    targetArea: 'Pectorals',
    secondaryMuscles: ['Anterior Deltoid', 'Biceps (stabilizer)'],
    difficulty: 'Beginner',
    equipment: 'Dumbbells & Flat Bench',
    sets: '3',
    reps: '12–15',
    calories: 120,
    link: '/Exe_Video/ChestFly.mp4',
    emoji: '🦋',
    steps: [
      'Lie flat on a bench holding dumbbells directly above your chest, palms facing each other.',
      'Maintain a slight bend in your elbows — lock this angle throughout.',
      'Inhale and slowly open your arms wide in a hugging arc, lowering until you feel a chest stretch.',
      'Hold the stretched position briefly at the bottom.',
      'Exhale and squeeze the dumbbells back up in the same arc, as if hugging a barrel.',
      'Touch the dumbbells lightly at the top without letting them clank.',
    ],
    tips: [
      'Think "hugging a tree", not pushing — the elbows stay slightly bent but fixed.',
      'Prioritize the stretch at the bottom over the weight used.',
      'Keep the shoulder blades retracted and pressed into the bench.',
    ],
    commonMistakes: [
      'Going too heavy — this turns the fly into a press and loses the isolation.',
      'Excessive elbow bend — reduces the effective arc of motion.',
      'Lowering too far below the bench level — risks shoulder impingement.',
    ],
  },
  {
    id: 5,
    name: 'Cable Crossover',
    muscleGroup: 'Chest',
    subGroup: 'Isolation',
    description: 'Uses constant cable tension through the full ROM to deliver peak contraction at mid-range — excellent for shaping and defining the chest.',
    targetArea: 'Chest (inner & lower)',
    secondaryMuscles: ['Anterior Deltoid'],
    difficulty: 'Intermediate',
    equipment: 'Cable Machine',
    sets: '3',
    reps: '12–15',
    calories: 130,
    link: '/Exe_Video/CableCrossOver.mp4',
    emoji: '⚡',
    steps: [
      'Set cable pulleys at shoulder height (for mid) or high (for lower chest).',
      'Stand in the center, grab both handles, step forward with one foot for balance.',
      'Slight forward lean, elbows slightly bent — maintain this.',
      'Start with arms wide and slightly back, feeling the chest stretch.',
      'Pull both handles together in a sweeping arc in front of your body.',
      'Cross one wrist over the other at the finish for maximum contraction.',
      'Slowly return to the start under control.',
    ],
    tips: [
      'Lean forward slightly from the hips to align the force vector with the chest.',
      'Alternate which hand crosses on top each rep for balanced development.',
      'Slow the eccentric (return) phase to 3–4 seconds for more time under tension.',
    ],
    commonMistakes: [
      'Standing upright — this shifts the work away from the chest.',
      'Using too much weight causing you to lose the arc shape.',
      'Not holding the contraction at the center crossing point.',
    ],
  },
  {
    id: 6,
    name: 'Decline Bench Press',
    muscleGroup: 'Chest',
    subGroup: 'Lower Chest',
    description: 'Targets the lower pectoral fibers, helping create a defined lower chest line and completing full pectoral development.',
    targetArea: 'Lower Chest',
    secondaryMuscles: ['Triceps', 'Anterior Deltoid'],
    difficulty: 'Intermediate',
    equipment: 'Barbell & Decline Bench',
    sets: '4',
    reps: '8–12',
    calories: 195,
    link: '/Exe_Video/DeclineBenchPress.mp4',
    emoji: '📉',
    steps: [
      'Secure your legs under the decline bench pad. Lie back with eyes below the bar.',
      'Grip slightly wider than shoulder-width with an overhand grip.',
      'Unrack with arms fully extended. The bar should be over your lower chest/sternum.',
      'Lower the bar slowly to the lower chest, elbows at ~75°.',
      'Do not let the bar touch the chest — stop 1 inch above.',
      'Press powerfully upward with hip drive, returning to the start.',
    ],
    tips: [
      'The decline naturally positions you for lower chest activation with less shoulder stress.',
      'This is often one of the strongest pressing angles — use it to build strength.',
      'Keep the bar path straight, not angled toward your face.',
    ],
    commonMistakes: [
      'Touching the bar to the chest, especially on a decline where it is riskier.',
      'Letting shoulders roll forward at the bottom of the movement.',
      'Neglecting this variation assuming the flat bench covers all bases.',
    ],
  },

  /* ── BACK ── */
  {
    id: 7,
    name: 'Pull-Up',
    muscleGroup: 'Back',
    subGroup: 'Width',
    description: 'The ultimate bodyweight back builder. Wide-grip pull-ups develop lat width, bicep strength, and scapular control simultaneously.',
    targetArea: 'Latissimus Dorsi',
    secondaryMuscles: ['Biceps', 'Rear Deltoid', 'Rhomboids', 'Core'],
    difficulty: 'Intermediate',
    equipment: 'Pull-Up Bar',
    sets: '4',
    reps: '6–12',
    calories: 160,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '⬆️',
    steps: [
      'Grab the bar with an overhand grip, hands slightly wider than shoulder-width.',
      'Hang at full arm extension with a slight forward lean — dead hang position.',
      'Depress (pull down) your shoulder blades first to "pack" your shoulders.',
      'Drive your elbows toward your hips as you pull yourself up.',
      'Continue until your chin clears the bar — do not kip unless intentionally training kipping.',
      'Lower yourself slowly under full control back to the dead hang.',
    ],
    tips: [
      'Initiate with the lats, not the arms — think "elbows to your back pockets".',
      'Imagine pulling the bar down to you, not yourself up to the bar.',
      'Focus on a 3-second eccentric (lowering) for maximum muscle stimulus.',
    ],
    commonMistakes: [
      'Starting with a shrug instead of depressing the scapulae first.',
      'Using momentum or kipping unintentionally.',
      'Not achieving full arm extension at the bottom.',
      'Letting the shoulders rise toward the ears at the top.',
    ],
  },
  {
    id: 8,
    name: 'Barbell Deadlift',
    muscleGroup: 'Back',
    subGroup: 'Thickness',
    description: 'The most complete compound lift. Builds the entire posterior chain — spinal erectors, glutes, hamstrings, traps, and lats — in a single movement.',
    targetArea: 'Entire Posterior Chain',
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Quadriceps', 'Core', 'Traps'],
    difficulty: 'Advanced',
    equipment: 'Barbell & Plates',
    sets: '4',
    reps: '3–6',
    calories: 310,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-lifting-a-barbell-in-gym-4382-large.mp4',
    emoji: '⚫',
    steps: [
      'Stand with feet hip-width apart, bar over mid-foot. Toes slightly out.',
      'Hinge at the hip and grip the bar just outside your legs (double overhand or mixed).',
      'Drive your hips down, lift your chest, create a flat or slightly extended back.',
      'Take a deep breath into your belly and brace your core as if preparing for a punch.',
      'Push the floor away with your legs as you simultaneously drive your hips forward.',
      'Keep the bar dragging up your shins and thighs — the bar path must be vertical.',
      'Lock out fully at the top: hips through, shoulders back, chest tall.',
      'Hinge at the hip (not the knee) to lower with control.',
    ],
    tips: [
      'Think "leg press the floor" for the first pull off the ground.',
      'Keep lats tight as if protecting your armpits — this stabilizes the spine.',
      'Use a belt for work sets above 80% — not as a replacement for core bracing.',
    ],
    commonMistakes: [
      'Rounding the lower back — the most dangerous mistake. Brace hard before pulling.',
      'Bar drifting away from the body — must stay in contact with shins/thighs.',
      'Jerking the bar off the floor — take the slack out before driving.',
      'Hyperextending at the top — lock out means neutral spine, not backward lean.',
    ],
  },
  {
    id: 9,
    name: 'Seated Cable Row',
    muscleGroup: 'Back',
    subGroup: 'Thickness',
    description: 'A controlled horizontal pulling motion that builds mid-back thickness through the rhomboids, mid-traps, and lower lats.',
    targetArea: 'Mid Back, Rhomboids',
    secondaryMuscles: ['Biceps', 'Rear Deltoid', 'Lower Traps'],
    difficulty: 'Beginner',
    equipment: 'Cable Machine',
    sets: '4',
    reps: '10–14',
    calories: 150,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🚣',
    steps: [
      'Sit on the rowing platform with knees slightly bent, feet on the pads.',
      'Lean forward and grasp the handle. Maintain a neutral spine — do not round.',
      'Lean back to ~90° upright, creating a slight lean away. This is the start position.',
      'Drive your elbows back and squeeze your shoulder blades together.',
      'Pull the handle to your lower sternum/upper abdomen.',
      'Hold the contraction for 1–2 seconds, then slowly extend forward.',
      'Allow a full stretch at the end, feeling the mid-back lengthen.',
    ],
    tips: [
      'Initiate the pull by retracting the scapulae first, then the arms follow.',
      'Maintain an upright torso — resist the temptation to use momentum.',
      'Full stretch at the end of each rep is crucial for complete muscle development.',
    ],
    commonMistakes: [
      'Rocking the torso excessively — this turns it into a lower back exercise.',
      'Not fully retracting the shoulder blades at the end range.',
      'Pulling too high (toward upper chest) instead of lower sternum.',
    ],
  },
  {
    id: 10,
    name: 'Lat Pulldown',
    muscleGroup: 'Back',
    subGroup: 'Width',
    description: 'The cable-machine equivalent of the pull-up. Perfect for building lat width and learning the vertical pulling pattern.',
    targetArea: 'Latissimus Dorsi',
    secondaryMuscles: ['Biceps', 'Rear Deltoid', 'Teres Major'],
    difficulty: 'Beginner',
    equipment: 'Cable Machine',
    sets: '4',
    reps: '10–14',
    calories: 145,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🎿',
    steps: [
      'Sit at the lat pulldown machine, thighs secured under the pad.',
      'Grip the bar wider than shoulder-width with an overhand grip.',
      'Lean back slightly (15–20°) to allow the bar to travel toward the upper chest.',
      'Depress and retract your shoulder blades to initiate.',
      'Pull the bar down, driving elbows toward your hips.',
      'Bring the bar to upper chest / clavicle level — not behind the neck.',
      'Squeeze the lats at the bottom, then control the return to full extension.',
    ],
    tips: [
      'Never pull behind the neck — this creates dangerous cervical spine stress.',
      'Maintain the slight back lean throughout — do not swing upright.',
      'Keep your chest proud and tall at the bottom of the rep.',
    ],
    commonMistakes: [
      'Pulling behind the neck — high injury risk to the cervical spine.',
      'Leaning back too far — shifts the load from lats to lower back.',
      'Not fully extending at the top — cuts off the lat stretch.',
    ],
  },

  /* ── SHOULDERS ── */
  {
    id: 11,
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
    subGroup: 'Full Deltoid',
    description: 'The fundamental vertical pressing movement. Builds all three deltoid heads and develops true overhead strength and shoulder stability.',
    targetArea: 'All Three Delt Heads',
    secondaryMuscles: ['Triceps', 'Upper Trapezius', 'Serratus Anterior', 'Core'],
    difficulty: 'Intermediate',
    equipment: 'Barbell',
    sets: '4',
    reps: '6–10',
    calories: 190,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🏆',
    steps: [
      'Stand with feet shoulder-width apart. Grip the bar just outside the shoulders.',
      'Hold the bar at collarbone level, elbows slightly forward of the bar (not flared out).',
      'Brace your core, glutes and maintain a neutral spine.',
      'Press the bar directly upward, slightly back at the start to clear the chin.',
      'Once the bar passes your head, move it into the line of your ears.',
      'Lock out overhead with biceps in line with or slightly behind your ears.',
      'Lower with control back to collarbone, repeating the bar path in reverse.',
    ],
    tips: [
      'Squeeze your glutes throughout — it creates a stable base and protects the lower back.',
      'Keep the bar as close to your face as possible without hitting it.',
      'At lockout, actively push up into the bar to pack the shoulders.',
    ],
    commonMistakes: [
      'Leaning back excessively — this turns it into a bench press and risks lower back injury.',
      'Bar path drifting forward — keep it as vertical as possible.',
      'Flaring the elbows too wide before the press begins.',
    ],
  },
  {
    id: 12,
    name: 'Lateral Raise',
    muscleGroup: 'Shoulders',
    subGroup: 'Side Deltoid',
    description: 'The only true isolation exercise for the medial deltoid head. Essential for building shoulder width and that capped, 3D-deltoid look.',
    targetArea: 'Medial Deltoid',
    secondaryMuscles: ['Supraspinatus (rotator cuff)', 'Upper Traps'],
    difficulty: 'Beginner',
    equipment: 'Dumbbells',
    sets: '4',
    reps: '12–20',
    calories: 100,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🦅',
    steps: [
      'Stand with dumbbells at your sides, palms facing inward.',
      'Maintain a slight bend in your elbows throughout.',
      'Raise both dumbbells simultaneously out to the sides.',
      'Tilt the thumb side slightly down (like pouring water) at the top to maximize med-delt activation.',
      'Stop when your arms are parallel to the floor (90°).',
      'Hold for 1 second at the top, then lower slowly over 3–4 seconds.',
    ],
    tips: [
      'Go lighter than your ego wants — lateral raises are an isolation exercise, not a strength test.',
      'Lead with your elbows, not your hands — imagine lifting by the elbows.',
      'Slow the eccentric to 4 seconds for exceptional medial delt development.',
    ],
    commonMistakes: [
      'Shrugging the traps up — drops the challenge onto the upper trap instead of delts.',
      'Swinging the body — kills tension and risks lower back strain.',
      'Going above 90° to show range — above parallel shifts load to traps, not delts.',
      'Raising with palms up (thumbs up) instead of the slight downward tilt.',
    ],
  },
  {
    id: 13,
    name: 'Face Pull',
    muscleGroup: 'Shoulders',
    subGroup: 'Rear Deltoid',
    description: 'A critically important but often skipped exercise. Directly targets the rear deltoid and external rotators — crucial for shoulder health, posture, and balanced development.',
    targetArea: 'Rear Deltoid, External Rotators',
    secondaryMuscles: ['Mid Traps', 'Rhomboids', 'Infraspinatus'],
    difficulty: 'Beginner',
    equipment: 'Cable Machine with Rope',
    sets: '3',
    reps: '15–20',
    calories: 90,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🎯',
    steps: [
      'Set the cable pulley at forehead or eye-level height with a rope attachment.',
      'Grasp the ropes with a neutral grip, thumbs pointing away from you.',
      'Step back to create tension, stand with a staggered stance.',
      'Pull the rope toward your forehead, flaring elbows high and wide.',
      'At the end range, rotate forearms outward — hands should end at ear-level with elbows up.',
      'Hold the contraction for 2 seconds, then slowly return.',
    ],
    tips: [
      'Elbows must be high — at or above shoulder height — to fully activate the rear delt.',
      'The external rotation at the end is the most critical part — do not skip it.',
      'Perform 2 sets for every 1 set of pressing to maintain shoulder joint health.',
    ],
    commonMistakes: [
      'Pulling to the neck instead of the forehead — changes the muscle emphasis away from rear delts.',
      'Elbows dropping below shoulder level.',
      'Using too much weight and not getting the full external rotation.',
    ],
  },

  /* ── ARMS ── */
  {
    id: 14,
    name: 'Barbell Curl',
    muscleGroup: 'Arms',
    subGroup: 'Biceps',
    description: 'The classic mass-building bicep exercise. Allows the highest loads in a curl movement, driving maximum bicep hypertrophy.',
    targetArea: 'Biceps Brachii',
    secondaryMuscles: ['Brachialis', 'Brachioradialis', 'Forearm Flexors'],
    difficulty: 'Beginner',
    equipment: 'Barbell or EZ-Bar',
    sets: '4',
    reps: '8–12',
    calories: 120,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '💪',
    steps: [
      'Stand with feet shoulder-width, holding a barbell with an underhand (supinated) grip.',
      'Start with arms fully extended, elbows pinned to your sides.',
      'Curl the bar upward by flexing at the elbows only — nothing else moves.',
      'Supinate (rotate) your wrists outward as you curl to maximize bicep activation.',
      'Squeeze at the top when forearms are vertical or slightly past.',
      'Lower slowly over 3 counts back to full extension — do not let the bar drop.',
    ],
    tips: [
      'Pin your elbows to your sides like you are squeezing oranges in your armpits.',
      'The full supination (wrist outward rotation) at the top is where most reps are "lost".',
      'EZ-bar is gentler on the wrists and produces great results too.',
    ],
    commonMistakes: [
      'Swinging the torso — turns it into a whole-body exercise.',
      'Letting elbows drift forward at the top — reduces final contraction.',
      'Not achieving full extension at the bottom — cuts off bicep stretch.',
    ],
  },
  {
    id: 15,
    name: 'Skull Crusher',
    muscleGroup: 'Arms',
    subGroup: 'Triceps',
    description: 'The premier tricep isolation exercise. Targets the long head of the tricep through full range of motion — essential for arm size since the tricep comprises two-thirds of your arm.',
    targetArea: 'Triceps (all 3 heads)',
    secondaryMuscles: ['Anconeus'],
    difficulty: 'Intermediate',
    equipment: 'EZ-Bar & Flat Bench',
    sets: '3',
    reps: '10–14',
    calories: 110,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '💀',
    steps: [
      'Lie flat on the bench holding an EZ-bar above your chest, arms nearly vertical.',
      'Angle your upper arms very slightly back from perpendicular.',
      'Lock your upper arms in place — only the forearms move.',
      'Bend your elbows, lowering the bar toward your forehead or just behind your head.',
      'Stop when the bar is 1–2 inches from your forehead (do not actually hit it).',
      'Press back up to start by extending the elbows — drive the heels of your hands.',
    ],
    tips: [
      'Allowing the upper arm to drift slightly back increases long head stretch.',
      'Move slowly and with control — this exercise is high injury-risk if rushed.',
      'Pair with close-grip bench press in the same session for comprehensive tricep work.',
    ],
    commonMistakes: [
      'Elbows flaring out — reduces tricep isolation and strains the elbow joint.',
      'Moving the upper arms instead of keeping them fixed.',
      'Using too heavy a weight and shortening the range of motion.',
    ],
  },
  {
    id: 16,
    name: 'Hammer Curl',
    muscleGroup: 'Arms',
    subGroup: 'Biceps & Brachialis',
    description: 'A neutral-grip curl that develops the brachialis and brachioradialis equally to the bicep — these muscles push the bicep up for a higher peak.',
    targetArea: 'Brachialis & Biceps',
    secondaryMuscles: ['Brachioradialis', 'Forearms'],
    difficulty: 'Beginner',
    equipment: 'Dumbbells',
    sets: '3',
    reps: '10–15',
    calories: 100,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🔨',
    steps: [
      'Stand holding dumbbells at your sides with a neutral grip (palms facing each other).',
      'Keep your elbows pinned to your sides.',
      'Curl one or both dumbbells upward without rotating the wrist.',
      'The dumbbell head should face forward at all times (neutral grip maintained).',
      'Squeeze at the top, then lower with control.',
    ],
    tips: [
      'This is one of the few curls where wrist rotation does NOT help — intentionally keep neutral.',
      'An alternating hammer curl gives each arm more time under tension.',
      'These can also be performed cross-body for a different angle.',
    ],
    commonMistakes: [
      'Rotating into a supinated grip — turns it into a regular curl.',
      'Swinging the torso to add momentum.',
    ],
  },

  /* ── LEGS ── */
  {
    id: 17,
    name: 'Back Squat',
    muscleGroup: 'Legs',
    subGroup: 'Quadriceps',
    description: 'The foundational lower-body compound. Builds quad, glute, and hamstring mass while developing functional strength, balance, and hormonal adaptations.',
    targetArea: 'Quadriceps, Glutes',
    secondaryMuscles: ['Hamstrings', 'Adductors', 'Core', 'Erector Spinae'],
    difficulty: 'Advanced',
    equipment: 'Barbell & Squat Rack',
    sets: '5',
    reps: '5–8',
    calories: 300,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🦵',
    steps: [
      'Set the bar on the rack at upper-chest height. Step under and position it on your upper traps (high bar) or rear delts (low bar).',
      'Grip the bar and pull your elbows back and down — this creates a shelf.',
      'Stand tall, step back and set your feet shoulder-width+ apart with toes turned out 15–30°.',
      'Take a big breath into your belly (360° brace) and hold it.',
      'Initiate by pushing your knees out in the direction of your toes as you hinge and sit back.',
      'Descend until thighs are at least parallel to the floor (below parallel for full ROM).',
      'Drive through the full foot and push your knees out as you stand up explosively.',
      'Exhale at the top or during the most difficult portion of the ascent.',
    ],
    tips: [
      'Knees tracking over toes is critical — push them out intentionally.',
      'Break at the hip and knee simultaneously — do not sit straight down.',
      'Wear flat shoes or squat shoes for optimal force transfer.',
    ],
    commonMistakes: [
      'Knee cave (valgus collapse) — push knees out actively throughout.',
      'Heels rising off the floor — improve ankle mobility or elevate them.',
      "Butt wink at the bottom — usually hip mobility, not just 'go higher'.",
      'Forward lean causing the bar to press into the neck.',
    ],
  },
  {
    id: 18,
    name: 'Romanian Deadlift',
    muscleGroup: 'Legs',
    subGroup: 'Hamstrings',
    description: 'The premier hamstring-building exercise. Loads the hamstrings through a long range of motion under stretch — the most effective stimulus for hamstring hypertrophy.',
    targetArea: 'Hamstrings, Glutes',
    secondaryMuscles: ['Erector Spinae', 'Adductors'],
    difficulty: 'Intermediate',
    equipment: 'Barbell or Dumbbells',
    sets: '4',
    reps: '8–12',
    calories: 220,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🏹',
    steps: [
      'Stand holding the bar at hip height, shoulder-width grip.',
      'Maintain a slight knee bend (15–20°) and keep it fixed throughout.',
      'Hinge at the hip, pushing your hips backward as the bar drags down your thighs.',
      'Keep your back flat and chest proud as you lower.',
      'Descend until you feel a strong hamstring stretch (usually mid-shin).',
      'Drive the hips forward to return to standing — squeeze the glutes at the top.',
    ],
    tips: [
      'Think "hips back" not "chest down" — the hinge is driven by the hips.',
      'The bar must stay in contact with your legs the entire way down.',
      'Push the floor through your heels on the way up.',
    ],
    commonMistakes: [
      'Rounding the lower back — a flat or slightly extended spine is required.',
      'Bending the knees too much — this turns it into a conventional deadlift.',
      'Bar drifting away from the body — causes unnecessary lower back load.',
    ],
  },
  {
    id: 19,
    name: 'Walking Lunge',
    muscleGroup: 'Legs',
    subGroup: 'Quadriceps & Glutes',
    description: 'A functional unilateral movement that trains each leg independently, improves balance, hip stability, and is highly effective for leg hypertrophy and definition.',
    targetArea: 'Quadriceps, Glutes',
    secondaryMuscles: ['Hamstrings', 'Core', 'Hip Stabilizers'],
    difficulty: 'Beginner',
    equipment: 'Bodyweight or Dumbbells',
    sets: '3',
    reps: '20 steps total',
    calories: 175,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🚶',
    steps: [
      'Stand tall with dumbbells at your sides (or hands on hips for bodyweight).',
      'Step forward with your right foot — a long enough stride that your front shin stays close to vertical.',
      'Lower your back knee toward — not onto — the floor.',
      'Your front knee should track over your midfoot, not caving inward.',
      'Drive through your front heel to stand and step the back foot forward.',
      'Repeat, alternating legs with each step.',
    ],
    tips: [
      'Torso upright throughout — resist the urge to lean forward.',
      'Front knee must not collapse inward — push it out over the pinky toe.',
      'For more quad work: shorter stride. For more glute: longer stride.',
    ],
    commonMistakes: [
      'Knee touching the floor hard — creates unnecessary joint impact.',
      'Front knee caving in — hip instability and poor quad activation.',
      'Leaning the torso forward excessively.',
    ],
  },
  {
    id: 20,
    name: 'Leg Press',
    muscleGroup: 'Legs',
    subGroup: 'Quadriceps',
    description: 'Machine-based quad dominant pressing movement. Allows maximum loading without spinal compression — excellent for high-volume quad work.',
    targetArea: 'Quadriceps',
    secondaryMuscles: ['Glutes', 'Hamstrings'],
    difficulty: 'Beginner',
    equipment: '45° Leg Press Machine',
    sets: '4',
    reps: '10–15',
    calories: 240,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🚀',
    steps: [
      'Sit in the machine with your back flat against the pad.',
      'Place feet shoulder-width apart, midfoot on the platform.',
      'Release the safety handles and hold the side grips.',
      'Lower the weight by bending your knees to 90° or slightly below.',
      'Do not allow your lower back to peel off the pad.',
      'Press through your heels and midfoot back to start — do not lock out explosively.',
    ],
    tips: [
      'Higher foot placement targets more glutes and hamstrings.',
      'Lower and wider foot placement targets more inner quads.',
      'Never fully lock out the knees at the top — keep tension on the muscle.',
    ],
    commonMistakes: [
      'Placing feet too low — shifts stress to the knee joint.',
      'Knees caving inward — actively push them apart.',
      'Lower back peeling off the seat — reduce the range of motion.',
    ],
  },

  /* ── CORE ── */
  {
    id: 21,
    name: 'Hanging Leg Raise',
    muscleGroup: 'Core',
    subGroup: 'Lower Abs',
    description: 'The most effective lower abdominal exercise. Requires full hip flexion under load, producing intense core activation and building functional hip flexor strength.',
    targetArea: 'Lower Abs, Hip Flexors',
    secondaryMuscles: ['Rectus Abdominis', 'Obliques'],
    difficulty: 'Intermediate',
    equipment: 'Pull-Up Bar',
    sets: '4',
    reps: '10–15',
    calories: 80,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🪝',
    steps: [
      'Hang from a pull-up bar with a shoulder-width overhand grip.',
      'Engage your lats to stabilize the shoulder joint.',
      'Tuck your pelvis under (posterior tilt) to engage the lower abs.',
      'Raise your legs by curling your hips — try to bring your knees or ankles above hip level.',
      'Control the descent, resisting the swing.',
      'At the bottom, do not let your legs swing — maintain tension.',
    ],
    tips: [
      'The pelvic tilt is crucial — without it, you are just training hip flexors.',
      'Progress from knee raises to straight leg raises to L-sit holds.',
      'Keep your upper body completely still — no swinging.',
    ],
    commonMistakes: [
      'Swinging the body to gain momentum.',
      'Not tilting the pelvis — bypasses the abs entirely.',
      'Leg drop with no control — removes eccentric tension.',
    ],
  },
  {
    id: 22,
    name: 'Cable Crunch',
    muscleGroup: 'Core',
    subGroup: 'Upper & Mid Abs',
    description: 'The only crunch that allows progressive overload. By adding resistance, this develops visible ab definition far beyond bodyweight crunches.',
    targetArea: 'Rectus Abdominis',
    secondaryMuscles: ['Obliques', 'Hip Flexors'],
    difficulty: 'Beginner',
    equipment: 'Cable Machine with Rope',
    sets: '3',
    reps: '12–20',
    calories: 70,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🔌',
    steps: [
      'Set a cable pulley to the highest position with a rope attachment.',
      'Kneel facing the machine, rope held at either side of your head.',
      'Hinge at the hips only slightly — the movement is in the spine, not the hips.',
      'Crunch down, bringing your elbows toward your thighs while rounding the upper back.',
      'Squeeze the abs hard at the bottom — hold 1–2 seconds.',
      'Slowly extend back up, but not fully upright — maintain some tension.',
    ],
    tips: [
      'Do NOT pull down with your arms — your hands just hold the rope still.',
      'The motion is exclusively spinal flexion.',
      'Add weight progressively — this is one of the few truly scalable ab exercises.',
    ],
    commonMistakes: [
      'Using the hip flexors to pull down instead of crunching the spine.',
      'Not holding the contraction at the bottom.',
      'Going too heavy and losing form.',
    ],
  },
  {
    id: 23,
    name: 'Plank',
    muscleGroup: 'Core',
    subGroup: 'Anti-Extension',
    description: 'The gold-standard anti-extension core exercise. Builds deep stabilizer function and transfers directly to all major lifts.',
    targetArea: 'Transverse Abdominis, Core Stabilizers',
    secondaryMuscles: ['Glutes', 'Serratus Anterior', 'Rectus Abdominis'],
    difficulty: 'Beginner',
    equipment: 'Bodyweight',
    sets: '3',
    duration: '30–60s',
    calories: 60,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-4502-large.mp4',
    emoji: '🪵',
    steps: [
      'Start on forearms and toes. Elbows should be directly under your shoulders.',
      'Keep your body in one rigid line from head to heels.',
      'Squeeze your glutes, quads, and core simultaneously.',
      'Do not let your hips sag or pike up.',
      'Breathe steadily — do not hold your breath.',
      'Hold for the target duration without breaking form.',
    ],
    tips: [
      'Squeeze everything: glutes, legs, abs, and push the floor away with your forearms.',
      'Progress by: elevating feet, adding a plate to your back, or moving to a plank with reach.',
      'Quality over duration — a 20s perfect plank beats a 60s sloppy one.',
    ],
    commonMistakes: [
      'Hips sagging — your back goes into extension and you lose the training stimulus.',
      'Head drooping — keep the neck in line with the spine.',
      'Elbows too far in front — place them directly below shoulders.',
    ],
  },

  /* ── CARDIO ── */
  {
    id: 24,
    name: 'Battle Rope Waves',
    muscleGroup: 'Cardio',
    subGroup: 'HIIT',
    description: 'A brutal full-body conditioning movement. Develops cardiovascular capacity, explosive shoulder endurance, and grip strength simultaneously.',
    targetArea: 'Full Body, Cardiovascular System',
    secondaryMuscles: ['Shoulders', 'Arms', 'Core', 'Legs'],
    difficulty: 'Intermediate',
    equipment: 'Battle Ropes',
    sets: '5',
    duration: '30s on / 30s off',
    calories: 350,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-with-heavy-ropes-in-the-gym-23120-large.mp4',
    emoji: '🌊',
    steps: [
      'Stand facing the rope anchor with feet shoulder-width apart, knees slightly bent.',
      'Hold one end of the rope in each hand.',
      'Adopt an athletic stance — slight squat, hips back, chest up.',
      'Alternately raise and lower each arm to create a continuous wave pattern.',
      'Move as fast as possible while maintaining the wave amplitude.',
      'Drive from your core and legs — not just the shoulders.',
    ],
    tips: [
      'Vary between alternating waves, double waves, and slam variations.',
      'Power comes from your hips and core — not just your arms.',
      'Keep the intensity high — battle ropes should be nearly all-out effort.',
    ],
    commonMistakes: [
      'Arms-only movement — wastes lower body potential and exhausts shoulders faster.',
      'Standing too upright — lose the athletic base and reduce power.',
      'Slowing down too early — push through the burn.',
    ],
  },
  {
    id: 25,
    name: 'Box Jump',
    muscleGroup: 'Cardio',
    subGroup: 'Plyometrics',
    description: 'The premier plyometric exercise for developing explosive power, fast-twitch fiber recruitment, and lower body rate of force development.',
    targetArea: 'Quad, Glutes, Explosive Power',
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
    difficulty: 'Intermediate',
    equipment: 'Plyo Box',
    sets: '4',
    reps: '6–8',
    calories: 200,
    link: 'https://assets.mixkit.co/videos/preview/mixkit-woman-lifting-kettlebell-in-gym-4416-large.mp4',
    emoji: '📦',
    steps: [
      'Stand 1–2 feet from the box with feet hip-width apart.',
      'Load into a quarter squat, swinging your arms back behind you.',
      'Explosively extend hips, knees and ankles while swinging arms forward.',
      'Pull your knees up toward your chest to clear the box.',
      'Land softly on the box in an athletic quarter-squat position — absorb the impact.',
      'Stand tall on the box, step down, reset, and repeat.',
    ],
    tips: [
      'Land as softly as possible — a quiet landing means good force absorption.',
      'Step down, do not jump down: landing from a jump down stresses the joints.',
      'Start with a low box and increase height only when form is perfect.',
    ],
    commonMistakes: [
      'Jumping down off the box — significantly increases injury risk.',
      'Landing with knees caving in — always land with knees out over toes.',
      'Cutting the jump short and scrambling — if you need to scramble, the box is too high.',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS & TYPES
═══════════════════════════════════════════════════════════════ */
const MUSCLE_GROUPS = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio'];

const DIFFICULTY_BADGE: Record<string, string> = {
  Beginner: 'bg-[var(--subtle)] text-[var(--muted)] border border-[var(--border)]',
  Intermediate: 'bg-[var(--surface-3)] text-[var(--foreground)] border border-[var(--border-dark)]',
  Advanced: 'bg-[var(--foreground)] text-[var(--background)] border border-[var(--foreground)]',
};

const GROUP_ICONS: Record<string, typeof Dumbbell> = {
  All: Activity,
  Chest: Dumbbell,
  Back: Activity,
  Shoulders: Activity,
  Arms: Activity,
  Legs: Activity,
  Core: Zap,
  Cardio: Activity,
};

/* ═══════════════════════════════════════════════════════════════
   EXERCISE CARD
═══════════════════════════════════════════════════════════════ */
function ExerciseCard({ exercise, onOpen }: { exercise: Exercise; onOpen: (e: Exercise) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-[1.75rem] overflow-hidden transition-all duration-300 cursor-pointer flex flex-col"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-dark)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
      onClick={() => onOpen(exercise)}
    >
      {/* Video Thumbnail */}
      <div className="relative w-full h-52 overflow-hidden flex-shrink-0" style={{ background: '#0A0A0A' }}>
        <video
          src={exercise.link}
          muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500 scale-100 group-hover:scale-105"
          style={{ filter: 'grayscale(30%)' }}
          onMouseEnter={(e) => { e.currentTarget.play(); }}
          onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl">
            <Play className="w-6 h-6 text-black translate-x-0.5" />
          </div>
        </div>

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <span className="text-[10px] font-bold font-sans uppercase tracking-[0.15em] text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            {exercise.muscleGroup}
          </span>
          <span className={`text-[10px] font-bold font-sans uppercase tracking-[0.1em] px-2.5 py-1 rounded-full backdrop-blur-sm ${DIFFICULTY_BADGE[exercise.difficulty]}`}>
            {exercise.difficulty}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 text-2xl">{exercise.emoji}</div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-[1.25rem] leading-tight mb-1.5" style={{ color: 'var(--foreground)' }}>
          {exercise.name}
        </h3>
        <p className="text-xs font-sans uppercase tracking-[0.12em] mb-3" style={{ color: 'var(--muted)', opacity: 0.7 }}>
          {exercise.targetArea}
        </p>
        <p className="text-sm font-sans leading-relaxed flex-1 line-clamp-2" style={{ color: 'var(--muted)' }}>
          {exercise.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{exercise.sets || '3'}</span> sets
            <span style={{ color: 'var(--border-dark)' }}>·</span>
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{exercise.reps || exercise.duration}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold group-hover:gap-2.5 transition-all" style={{ color: 'var(--foreground)' }}>
            View Guide <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function MovementsPage() {
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return ALL_EXERCISES.filter((ex) => {
      const matchGroup = selectedGroup === 'All' || ex.muscleGroup === selectedGroup;
      const matchSearch =
        searchQuery === '' ||
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.targetArea.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDiff = selectedDifficulty === 'All' || ex.difficulty === selectedDifficulty;
      return matchGroup && matchSearch && matchDiff;
    });
  }, [selectedGroup, searchQuery, selectedDifficulty]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navbar />

      {/* ── PAGE HEADER ── */}
      <div className="bg-[#0A0A0A] pt-32 pb-16 px-6 lg:px-8 relative overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
          }}
        />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/[0.03] blur-[80px]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <Dumbbell className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.6)' }} />
              <span className="font-sans text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Movement Library
              </span>
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight mb-4" style={{ color: '#FFFFFF' }}>
              Every Exercise.<br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>Mastered.</span>
            </h1>
            <p className="font-sans text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {ALL_EXERCISES.length}+ expert-curated movements across every muscle group — with step-by-step guides, pro tips, and video demonstrations.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-6 mt-10 pt-10 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {[
              { label: 'Total Exercises', value: ALL_EXERCISES.length + '+' },
              { label: 'Muscle Groups', value: '7' },
              { label: 'With Video', value: '100%' },
              { label: 'Step Guides', value: 'All' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-mono font-bold" style={{ color: '#FFFFFF' }}>{s.value}</p>
                <p className="text-xs font-sans mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── FILTERS BAR ── */}
      <div className="sticky top-0 z-40 backdrop-blur-xl shadow-sm" style={{ background: 'rgba(var(--background),0.96)', borderBottom: '1px solid var(--border)', backgroundColor: 'color-mix(in srgb, var(--background) 96%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
              <input
                type="text"
                placeholder="Search exercises, muscles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-sans outline-none transition-all"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--border-dark)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                  style={{ background: 'var(--subtle)', color: 'var(--muted)' }}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Difficulty filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm font-sans outline-none cursor-pointer"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-sans font-medium transition-all"
              style={{
                background: filtersOpen ? 'var(--foreground)' : 'var(--surface)',
                borderColor: filtersOpen ? 'var(--foreground)' : 'var(--border)',
                color: filtersOpen ? 'var(--background)' : 'var(--muted)',
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Muscle group pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {MUSCLE_GROUPS.map((group) => {
              const Icon = GROUP_ICONS[group] || Activity;
              const count = group === 'All'
                ? ALL_EXERCISES.length
                : ALL_EXERCISES.filter((e) => e.muscleGroup === group).length;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all"
                  style={{
                    background: selectedGroup === group ? 'var(--foreground)' : 'var(--surface)',
                    color: selectedGroup === group ? 'var(--background)' : 'var(--muted)',
                    border: `1px solid ${selectedGroup === group ? 'var(--foreground)' : 'var(--border)'}`,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {group}
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: selectedGroup === group ? 'rgba(255,255,255,0.15)' : 'var(--subtle)',
                      color: selectedGroup === group ? 'var(--background)' : 'var(--muted)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── EXERCISE GRID ── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Results header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-display text-2xl" style={{ color: 'var(--foreground)' }}>
              {selectedGroup === 'All' ? 'All Movements' : selectedGroup}
            </p>
            <p className="text-sm font-sans mt-0.5" style={{ color: 'var(--muted)' }}>
              {filtered.length} exercise{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
          {(selectedGroup !== 'All' || searchQuery || selectedDifficulty !== 'All') && (
            <button
              onClick={() => { setSelectedGroup('All'); setSearchQuery(''); setSelectedDifficulty('All'); }}
              className="flex items-center gap-1.5 text-sm font-sans transition-opacity hover:opacity-70"
              style={{ color: 'var(--muted)' }}
            >
              <X className="w-3.5 h-3.5" />
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((ex) => (
                <ExerciseCard key={ex.id} exercise={ex} onOpen={setSelectedExercise} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-3xl" style={{ background: 'var(--subtle)' }}>
                🔍
              </div>
              <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)' }}>No exercises found</h3>
              <p className="text-sm font-sans max-w-xs" style={{ color: 'var(--muted)' }}>
                Try adjusting your search or filters to find what you are looking for.
              </p>
              <button
                onClick={() => { setSelectedGroup('All'); setSearchQuery(''); setSelectedDifficulty('All'); }}
                className="mt-6 inline-flex items-center gap-2 font-sans font-semibold text-sm px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: 'var(--foreground)', color: 'var(--background)' }}
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
    </div>
  );
}

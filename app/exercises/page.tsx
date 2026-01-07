'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  description: string;
  targetArea: string;
}

const exercises: Exercise[] = [
  {
    id: 1,
    name: 'Bench Press',
    muscleGroup: 'Chest',
    description: 'Lie back on flat bench, hold the barbell with a shoulder-width grip.',
    targetArea: 'Chest',
  },
  {
    id: 2,
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    description: 'Sit on an incline bench with dumbbells at shoulder level.',
    targetArea: 'Upper Chest',
  },
  {
    id: 3,
    name: 'Push-Up',
    muscleGroup: 'Chest',
    description: 'Place hands shoulder-width apart, body straight from head to heels.',
    targetArea: 'Chest',
  },
  {
    id: 4,
    name: 'Chest Fly',
    muscleGroup: 'Chest',
    description: 'Lie back on a bench, holding dumbbells above your chest.',
    targetArea: 'Chest',
  },
  {
    id: 5,
    name: 'Cable Crossover',
    muscleGroup: 'Chest',
    description: 'Stand between two cable machines, pull handles together in front of chest.',
    targetArea: 'Chest',
  },
  {
    id: 6,
    name: 'Barbell Bench Press',
    muscleGroup: 'Chest',
    description: 'Classic bench press with barbell for maximum chest development.',
    targetArea: 'Chest',
  },
  {
    id: 7,
    name: 'Chest Press Machine',
    muscleGroup: 'Chest',
    description: 'Use chest press machine for controlled movement and stability.',
    targetArea: 'Chest',
  },
  {
    id: 8,
    name: 'Dips',
    muscleGroup: 'Chest',
    description: 'Lower body between parallel bars, push up to engage chest and triceps.',
    targetArea: 'Chest',
  },
];

export default function ExercisesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'All' || exercise.muscleGroup === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Filter Muscle</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {filteredExercises.length} Exercises Found
          </h2>
          <p className="text-gray-600">
            Click on any exercise to view details and add it to your custom workout plan.
          </p>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Exercise Image Placeholder */}
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Exercise Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
                </div>
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded mb-2">
                  {exercise.muscleGroup}
                </span>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{exercise.description}</p>
                <div className="text-xs text-gray-500 mb-3">
                  <span className="font-medium">Target:</span> {exercise.targetArea}
                </div>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


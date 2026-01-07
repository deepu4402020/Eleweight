'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function FindGymsPage() {
  const [radius, setRadius] = useState(1500);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success - in a real app, you would use this to find nearby gyms
        console.log('Location:', position.coords);
        setIsLoading(false);
      },
      (err) => {
        setError('Unable to get your location. Please enable location services and try again.');
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Purple Banner Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Gyms Near You</h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Discover fitness centers in your area to kickstart your fitness journey. We&apos;ll help you find the perfect gym based on your location.
          </p>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Nearby Gyms</h2>
          <p className="text-gray-600">
            Discover fitness centers in your area to start your workout journey. We use your location to find the closest gyms.
          </p>
        </div>

        {/* Search Radius Slider */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Search Radius: {radius} meters
          </label>
          <div className="relative">
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>500m</span>
              <span>5000m</span>
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="text-gray-600">Finding gyms near you...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Gyms List (would be populated from API) */}
        {!isLoading && !error && (
          <div className="text-center py-12 text-gray-500">
            <p>No gyms found in your area. Try adjusting the search radius.</p>
          </div>
        )}
      </main>
    </div>
  );
}


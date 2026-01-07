import Navbar from './components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
              <div className="w-5 h-5 bg-purple-600 rounded"></div>
              <span className="text-sm text-gray-600 font-medium">Your Fitness Journey Starts Here</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Your Personal Guide To{' '}
                <span className="text-purple-600">Fitness</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explore customized exercises for your fitness level. Track progress, stay motivated, and build a stronger, healthier you.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/exercises"
                className="inline-flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <span>Browse Exercises</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <button className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-6 py-3 rounded-lg border-2 border-gray-300 transition-colors">
                <span>Create Workout</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Section - Illustration Placeholder */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-transparent rounded-3xl transform rotate-3"></div>
            <div className="relative bg-gray-200 rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-64 h-64 mx-auto bg-gray-300 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Fitness Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

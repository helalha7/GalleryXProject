'use client';

import Link from 'next/link';
import AnimatedBackdrop from '../shared/AnimatedBackdrop';

export default function TicketPrompt({ onBack }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] dark:bg-gray-900 text-[#111827] dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="relative z-50">
        {/* Header is injected from parent */}
      </div>

      <AnimatedBackdrop />

      <main className="flex-1 p-6 flex items-center justify-center relative z-10">
        <div className="text-center max-w-lg p-10 rounded-2xl backdrop-blur-sm shadow-2xl border transition-colors duration-300
          bg-gradient-to-b from-white via-gray-50 to-white border-gray-200
          dark:bg-gradient-to-b dark:from-gray-700/50 dark:to-gray-800/50 dark:border-gray-600/30"
        >
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 12H9v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-6.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Premium Access Required
            </h1>
          </div>

          <p className="mb-8 text-lg leading-relaxed text-[#374151] dark:text-gray-300">
            You need a virtual tour pass to unlock access to our exclusive museum galleries and immersive experiences.
          </p>

          <Link
            href="/buy-ticket"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full hover:from-blue-500 hover:to-blue-400 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 transform"
          >
            <span className="relative z-10">Get Your Ticket Now</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>

          <button
            onClick={onBack}
            className="mt-4 text-blue-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-white transition-colors duration-300 underline"
          >
            Back to Floor Plan
          </button>
        </div>
      </main>
    </div>
  );
}

// components/shared/GradientCard.tsx
'use client';

export default function GradientCard({ children, className = '', hover = true }) {
  return (
    <div
      className={`group relative rounded-2xl backdrop-blur-sm border border-gray-600/30 bg-gradient-to-b from-gray-700/30 to-gray-800/50
        ${hover ? 'hover:border-blue-500/50 hover:shadow-xl hover:scale-[1.015]' : ''}
        transition-transform duration-200 ease-out transform overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

'use client';

export default function GradientCard({ children, className = '', hover = true }) {
  return (
    <div
      className={`
        group relative rounded-2xl overflow-hidden transform transition-transform duration-200 ease-out backdrop-blur-sm
        border 
        dark:border-gray-600/30 dark:bg-gradient-to-b dark:from-gray-700/30 dark:to-gray-800/50
        bg-gradient-to-b from-white via-[#f9fafb] to-[#f9fafb] border-[#e5e7eb] shadow-sm
        ${hover ? 'hover:border-blue-500/50 hover:shadow-xl hover:scale-[1.015]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

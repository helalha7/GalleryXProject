'use client';

import GradientCard from '@/components/shared/GradientCard';

export default function ExperienceStep({ icon, title, desc }) {
  return (
    <GradientCard className="flex flex-col items-center text-center p-8 transition-colors duration-300">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center text-2xl font-bold mb-8 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold mb-4 text-[#111827] dark:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[#374151] dark:text-gray-300 leading-relaxed transition-colors duration-300">
        {desc}
      </p>
    </GradientCard>
  );
}

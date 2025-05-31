'use client';

import GradientCard from '@/components/shared/GradientCard';
import GradientButtonLink from '../shared/buttons/GradientLinkButton';

export default function CallToAction({ hasTicket }) {
  if (hasTicket) return null;

  return (
    <div className="mt-16 text-center">
      <GradientCard className="max-w-2xl mx-auto p-8">
        <h3 className="text-2xl font-display font-bold mb-4 text-[#111827] dark:text-white">
          Ready to Explore?
        </h3>
        <p className="text-[#374151] dark:text-gray-300 mb-6 leading-relaxed">
          Immerse yourself in centuries of art, culture, and history through our cutting-edge virtual museum experience.
        </p>
        <GradientButtonLink href="/tickets">
          Start Your Journey
        </GradientButtonLink>
      </GradientCard>
    </div>
  );
}

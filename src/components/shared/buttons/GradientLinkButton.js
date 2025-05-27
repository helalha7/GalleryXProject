// components/shared/GradientButtonLink.tsx
'use client';

import Link from 'next/link';

export default function GradientButtonLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-full transition-all duration-200 ease-out hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 opacity-0 group-hover:opacity-10 transition-opacity duration-200 ease-out" />
    </Link>
  );
}

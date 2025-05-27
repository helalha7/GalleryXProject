'use client';

export default function SectionHeader({ title }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
    </div>
  );
}

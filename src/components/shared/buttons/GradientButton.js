'use client';

export default function GradientButton({
  type = 'button',
  children,
  disabled = false,
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        group relative inline-flex items-center justify-center w-full px-12 py-4 text-lg font-semibold
        text-white dark:text-white
        bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500
        dark:from-blue-600 dark:via-blue-500 dark:to-cyan-500
        rounded-full transition-all duration-200 ease-out
        hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400
        hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 opacity-0 group-hover:opacity-10 transition-opacity duration-200 ease-out" />
    </button>
  );
}

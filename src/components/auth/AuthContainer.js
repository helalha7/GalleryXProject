export default function AuthContainer({ children }) {
  return (
    <main className="flex-1 flex items-center justify-center relative overflow-hidden px-6">
      <div
        className={`
          relative z-10 w-full max-w-md p-10 rounded-2xl backdrop-blur-md
          border shadow-xl transition-colors duration-300
          bg-gradient-to-b from-white via-[#f9fafb] to-white border-gray-200 shadow-blue-200/20
          dark:bg-gradient-to-b dark:from-gray-700/50 dark:to-gray-800/50 dark:border-gray-600/30 dark:shadow-blue-500/10
        `}
      >
        {children}
      </div>
    </main>
  );
}

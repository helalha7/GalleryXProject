export default function AuthContainer({ children }) {
    return (
      <main className="flex-1 flex items-center justify-center relative overflow-hidden px-6">
        <div
          className="relative z-10 w-full max-w-md p-10 rounded-2xl
                    bg-gradient-to-b from-gray-700/50 to-gray-800/50
                    backdrop-blur-md border border-gray-600/30
                    shadow-xl shadow-blue-500/10"
        >
          {children}
        </div>
      </main>
    );
  }
  
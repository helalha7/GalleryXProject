'use client';

export default function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      className="w-full py-2 px-4 rounded-lg font-semibold transition disabled:opacity-50
        bg-gradient-to-r from-blue-600 to-cyan-400 text-white hover:from-blue-700 hover:to-cyan-500"
      disabled={loading}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}

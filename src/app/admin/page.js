'use client';

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Welcome, Admin!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Use the sidebar to view users or manage content. 
        </p>
      </div>
    </div>
  );
}

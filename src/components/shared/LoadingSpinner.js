'use client';

export default function LoadingSpinner({ message = 'Loading...' }) {
    return (
        <main className="flex-1 p-6 flex items-center justify-center bg-[#f9fafb] dark:bg-gray-900">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-6" />
                <p className="text-xl font-medium text-[#374151] dark:text-gray-300">
                    {message}
                </p>
            </div>
        </main>
    );
}

'use client';

import { useEffect, useState } from 'react';
import ArtifactViewsChart from '@/components/admin/visitor-analytics/ArtifactViewsChart';

export default function AdminViewsPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchGalleryViews() {
      try {
        const res = await fetch('/api/stats/gallery-views');
        if (!res.ok) throw new Error('Failed to fetch gallery views');

        const data = await res.json();
        if (!data || data.length === 0) {
          setError('No gallery view data found.');
          return;
        }

        setData(data);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      }
    }

    fetchGalleryViews();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#f9fafb] dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-[#111827] dark:text-white">Gallery Views Graph</h1>

      {error && (
        <p className="text-red-600 dark:text-red-400 font-semibold mb-4">⚠️ {error}</p>
      )}

      {data.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <ArtifactViewsChart data={data} />
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 italic">No data to display</p>
      )}
    </div>
  );
}

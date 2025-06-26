'use client';

import { useEffect, useState } from 'react';
import ArtifactViewsChart from '@/components/admin/visitor-analytics/ArtifactViewsChart';
import { fetchAllArtifacts } from '@/lib/api/artifact';
import { getTokenFromSession } from '@/utils/sessionStorageHandler';

export default function AdminViewsPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getTokenFromSession();

    if (!token) {
      setError('Token missing in user object');
      return;
    }

    fetchAllArtifacts(token)
      .then((artifacts) => {
        if (!artifacts || artifacts.length === 0) {
          setError('No artifacts returned from API');
        }

        const chartData = artifacts.map(({ name, views }) => ({
          name,
          views: typeof views === 'number' ? views : 0,
        }));

        setData(chartData);
      })
      .catch((err) => {
        console.error('Failed to fetch artifact views:', err.message);
        setError(err.message);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#f9fafb] dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-[#111827] dark:text-white">Artifact Views Graph</h1>

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
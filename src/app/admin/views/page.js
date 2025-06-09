'use client';

import { useEffect, useState } from 'react';
import ArtifactViewsChart from '@/components/admin/visitor-analytics/ArtifactViewsChart';
import { fetchAllArtifacts } from '@/lib/api/artifact';
import {getTokenFromSession} from '@/utils/sessionStorageHandler';


export default function AdminViewsPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [raw, setRaw] = useState(null); // for optional display

  useEffect(() => {
    const token = getTokenFromSession()
    
   
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

        console.log('ARTIFACTS:', artifacts);
        console.log('CHART DATA:', chartData);

        setData(chartData);
        setRaw(artifacts); // optional: to visually confirm response
      })
      .catch((err) => {
        console.error('Failed to fetch artifact views:', err.message);
        setError(err.message);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Artifact Views Graph</h1>

      {error && (
        <p className="text-red-600 font-semibold mb-4">⚠️ {error}</p>
      )}

      {data.length > 0 ? (
        <ArtifactViewsChart data={data} />
      ) : (
        <p className="text-gray-500 italic">No data to display</p>
      )}

      {/* OPTIONAL DEBUG VIEW */}
      {raw && (
        <pre className="mt-4 bg-gray-100 text-xs p-4 rounded">
          {JSON.stringify(raw, null, 2)}
        </pre>
      )}
    </div>
  );
}

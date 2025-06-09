'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

export default function ArtifactViewsChart({ data }) {
  // Optional: Shorten long names if needed
  const formattedData = data.map(d => ({
    ...d,
    shortName: d.name.length > 20 ? d.name.split(' ').slice(0, 3).join(' ') + '…' : d.name
  }));

  return (
    <div className="w-full h-[28rem] bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Artifact Views Overview
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 30, right: 30, left: 0, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="shortName"
            angle={-20}
            textAnchor="end"
            interval={0}
            height={60}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ fontSize: '14px', borderRadius: '8px' }}
            cursor={{ fill: '#f0f0f0' }}
          />
          <Legend />
          <Bar dataKey="views" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

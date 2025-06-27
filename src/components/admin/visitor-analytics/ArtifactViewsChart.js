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

// 🔹 Custom Tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white p-3 rounded shadow text-sm text-gray-800 max-w-xs">
        <p className="font-semibold mb-2">{data.gallery}</p>
        {data.artifacts && data.artifacts.length > 0 ? (
          data.artifacts.map((artifact, idx) => (
            <p key={idx}>
              {artifact.name}: {artifact.views} views
            </p>
          ))
        ) : (
          <p className="italic text-gray-500">No artifacts</p>
        )}
      </div>
    );
  }

  return null;
};

export default function ArtifactViewsChart({ data }) {
  // Format gallery names if too long
  const formattedData = data.map(d => ({
    ...d,
    shortName: d.gallery.length > 20 ? d.gallery.slice(0, 20) + '…' : d.gallery
  }));

  return (
    <div className="w-full h-[28rem] bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Gallery Views Overview
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
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="views" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

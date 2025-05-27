'use client';

export default function StatsCard({ title, value, trend, period }) {
  let trendColor = 'text-gray-500';
  let trendIcon = null;
  
  if (trend > 0) {
    trendColor = 'text-green-500';
    trendIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    );
  } else if (trend < 0) {
    trendColor = 'text-red-500';
    trendIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    );
  }
  
  return (
    <div className="text-white dark:bg-black rounded-lg shadow-md p-6">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
        {title}
      </h3>
      <div className="text-3xl font-bold mb-2">
        {value}
      </div>
      {trend !== undefined && (
        <div className={`flex items-center ${trendColor}`}>
          {trendIcon}
          <span className="ml-1 text-sm">
            {Math.abs(trend)}% from {period}
          </span>
        </div>
      )}
    </div>
  );
}
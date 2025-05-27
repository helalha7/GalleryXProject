'use client';

import { useState, useEffect } from 'react';
import StatsCard from '../../components/admin/StatsCard';

export default function AdminDashboardPage() {
  const [visitorStats, setVisitorStats] = useState({
    today: 356,
    todayTrend: 12,
    week: 2145,
    weekTrend: 5,
    month: 8972,
    monthTrend: 15,
    annual: 104835
  });
  
  // In a real app, fetch stats from API
  useEffect(() => {
    async function fetchStats() {
      try {
        // const response = await fetch('/api/admin/stats');
        // const data = await response.json();
        // setVisitorStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    }
    
    fetchStats();
  }, []);
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-display font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Today" 
          value={visitorStats.today}
          trend={visitorStats.todayTrend}
          period="yesterday"
        />
        <StatsCard 
          title="This Week" 
          value={visitorStats.week}
          trend={visitorStats.weekTrend}
          period="last week"
        />
        <StatsCard 
          title="This Month" 
          value={visitorStats.month}
          trend={visitorStats.monthTrend}
          period="last month"
        />
        <StatsCard 
          title="Annual Projection" 
          value={visitorStats.annual}
        />
      </div>
      
      <div className="text-white dark:bg-black rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-display font-semibold mb-4">Visitor Trends</h2>
        
        <div className="h-64 flex items-center justify-center">
          {/* In a real app, use a charting library like Chart.js or Recharts */}
          <p className="text-gray-500 dark:text-gray-400">
            Visitor trend chart would be displayed here
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-white dark:bg-black rounded-lg shadow-md p-6">
          <h2 className="text-xl font-display font-semibold mb-4">Popular Artifacts</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="font-medium">Ancient Vase</span>
              <span className="text-gray-500 dark:text-gray-400">346 views</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="font-medium">Starry Night</span>
              <span className="text-gray-500 dark:text-gray-400">289 views</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="font-medium">Egyptian Scarab</span>
              <span className="text-gray-500 dark:text-gray-400">275 views</span>
            </div>
          </div>
        </div>
        
        <div className="text-white dark:bg-black rounded-lg shadow-md p-6">
          <h2 className="text-xl font-display font-semibold mb-4">Recent Updates</h2>
          
          <div className="space-y-4">
            <div className="flex items-start pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-3"></div>
              <div>
                <p className="font-medium">New artifact added to Modern Masterpieces</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Today, 9:45 AM</p>
              </div>
            </div>
            <div className="flex items-start pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 mr-3"></div>
              <div>
                <p className="font-medium">Special Exhibition gallery updated</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday, 2:30 PM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-purple-500 mr-3"></div>
              <div>
                <p className="font-medium">New audio tour added for Ancient Art</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Apr 14, 10:15 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
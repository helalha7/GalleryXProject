'use client';

import { useState, useEffect } from 'react';

export default function DatabasePage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initLoading, setInitLoading] = useState(false);
  const [initResult, setInitResult] = useState(null);

  // Check database connection on load
  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const response = await fetch('/api/db-check');
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        setError(err.message || 'Failed to check database status');
      } finally {
        setLoading(false);
      }
    };

    checkDatabase();
  }, []);

  // Initialize database
  const handleInitialize = async () => {
    setInitLoading(true);
    setInitResult(null);
    
    try {
      const response = await fetch('/api/db-init');
      const data = await response.json();
      setInitResult(data);
      
      // Refresh status after initialization
      const statusResponse = await fetch('/api/db-check');
      const statusData = await statusResponse.json();
      setStatus(statusData);
    } catch (err) {
      setInitResult({
        success: false,
        message: err.message || 'Failed to initialize database'
      });
    } finally {
      setInitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-display font-bold mb-8">Database Status</h1>
        <p>Checking database connection...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-display font-bold mb-8">Database Status</h1>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      ) : (
        <div className={`mb-6 p-4 rounded-lg ${status?.connected ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
          <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
          <p>{status?.message}</p>
          
          {status?.connected && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Collections:</h3>
              {status.collections?.length > 0 ? (
                <ul className="list-disc list-inside">
                  {status.collections.map(collection => (
                    <li key={collection}>{collection}</li>
                  ))}
                </ul>
              ) : (
                <p>No collections found</p>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="mb-6">
        <button
          onClick={handleInitialize}
          disabled={initLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {initLoading ? 'Initializing...' : 'Initialize Database'}
        </button>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          This will create required collections and sample data if they don't exist.
        </p>
      </div>
      
      {initResult && (
        <div className={`p-4 rounded-lg ${initResult.success ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
          <h2 className="text-xl font-semibold mb-2">Initialization Result</h2>
          <p>{initResult.message}</p>
        </div>
      )}
      
      <div className="mt-8 bg-gray-100 dark:bg-white p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">MongoDB Connection Help</h2>
        <p className="mb-2">If you're having trouble connecting to MongoDB:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Make sure MongoDB is running on your system</li>
          <li>Check that your connection string in .env is correct</li>
          <li>Verify that the GalleryX database exists in MongoDB Compass</li>
          <li>Use the "Initialize Database" button to create required collections</li>
          <li>Restart the Next.js application if needed</li>
        </ol>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Function to safely stringify objects
function safeStringify(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return `[Error stringifying: ${e.message}]`;
  }
}

export default function DbTestPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [insertResult, setInsertResult] = useState(null);
  const [insertLoading, setInsertLoading] = useState(false);

  useEffect(() => {
    async function testDatabase() {
      try {
        // Test basic connection
        const response = await fetch('/api/db-test');
        const data = await response.json();
        setResult(data);
        
        // Get all galleries
        const galleriesResponse = await fetch('/api/galleries');
        if (galleriesResponse.ok) {
          const galleriesData = await galleriesResponse.json();
          setGalleries(galleriesData);
        }
        
        // Get all artifacts
        const artifactsResponse = await fetch('/api/artifacts');
        if (artifactsResponse.ok) {
          const artifactsData = await artifactsResponse.json();
          setArtifacts(artifactsData);
        }
        
        // For testing only - fetch users
        const usersResponse = await fetch('/api/db-test/users');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    testDatabase();
  }, []);

  // Function to test direct MongoDB insertion
  const testDirectInsertion = async () => {
    setInsertLoading(true);
    try {
      const response = await fetch('/api/db-test/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: 'test_collection',
          document: {
            name: 'Test Document',
            description: 'This is a test document to verify direct MongoDB insertion',
            testValue: Math.random().toString(36).substring(7),
          }
        }),
      });
      
      const data = await response.json();
      setInsertResult(data);
    } catch (err) {
      setInsertResult({
        success: false,
        message: `Error: ${err.message}`
      });
    } finally {
      setInsertLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Database Connectivity Test</h1>
        
        {loading && <p>Testing database connection...</p>}
        
        {error && (
          <div className="bg-red-900 text-white p-4 rounded-lg mb-6">
            <h2 className="font-bold mb-2">Error:</h2>
            <p>{error}</p>
          </div>
        )}
        
        {result && (
          <div className={`p-6 rounded-lg mb-6 ${result.success ? 'bg-green-900' : 'bg-red-900'}`}>
            <h2 className="text-xl font-bold mb-4">Test Result: {result.success ? 'Success' : 'Failed'}</h2>
            <p className="mb-4">{result.message}</p>
            
            {result.success && (
              <>
                <div className="mb-4">
                  <h3 className="font-bold mb-2">Database Name:</h3>
                  <p>{result.databaseName}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-bold mb-2">Collections:</h3>
                  <ul className="list-disc pl-5">
                    {result.collections.map(collection => (
                      <li key={collection}>{collection}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Document Counts:</h3>
                  <ul className="list-disc pl-5">
                    <li>Users: {result.counts.users}</li>
                    <li>Galleries: {result.counts.galleries}</li>
                    <li>Artifacts: {result.counts.artifacts}</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Direct Insertion Test */}
        <div className="mb-6 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Test Direct MongoDB Insertion</h2>
          <p className="mb-4">This will attempt to insert a test document directly into MongoDB.</p>
          
          <button
            onClick={testDirectInsertion}
            disabled={insertLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
          >
            {insertLoading ? 'Testing...' : 'Test Direct Insertion'}
          </button>
          
          {insertResult && (
            <div className={`mt-4 p-4 rounded-lg ${insertResult.success ? 'bg-green-900' : 'bg-red-900'}`}>
              <h3 className="font-bold mb-2">Insertion Result:</h3>
              <p>{insertResult.message}</p>
              {insertResult.id && <p className="mt-2">Document ID: {insertResult.id}</p>}
            </div>
          )}
        </div>
        
        {/* Galleries Data */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Galleries in Database ({galleries.length})</h2>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">{safeStringify(galleries)}</pre>
          </div>
        </div>
        
        {/* Artifacts Data */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Artifacts in Database ({artifacts.length})</h2>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">{safeStringify(artifacts)}</pre>
          </div>
        </div>
        
        {/* Users Data */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Users in Database ({users.length})</h2>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">{safeStringify(users.map(user => ({ 
              _id: user._id,
              username: user.username, 
              role: user.role,
              fullName: user.fullName
            })))}</pre>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Home
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Run Test Again
          </button>
        </div>
      </div>
    </div>
  );
}
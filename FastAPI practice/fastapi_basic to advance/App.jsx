import React, { useState } from 'react';

function App() {
  // State to store the message/data received from the FastAPI backend
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FastAPI backend URL (running on port 8000)
  const BACKEND_URL = "http://127.0.0.1:8000";

  // Function to call the FastAPI API
  const fetchBackendData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Send HTTP GET request to FastAPI backend
      const response = await fetch(`${BACKEND_URL}/`);
      
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      // 2. Parse JSON response
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("CORS / Network Error:", err);
      setError(err.message || "Failed to connect to FastAPI backend. Check CORS and server status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '600px',
      margin: '40px auto',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      backgroundColor: '#ffffff'
    }}>
      <h1 style={{ color: '#009688', marginBottom: '8px' }}>FastAPI + React CORS Test</h1>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        Frontend connecting to: <code>{BACKEND_URL}</code>
      </p>

      {/* Button to trigger API call */}
      <button
        onClick={fetchBackendData}
        disabled={loading}
        style={{
          backgroundColor: '#009688',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          transition: 'all 0.2s ease'
        }}
      >
        {loading ? 'Connecting...' : 'Test Backend Connection'}
      </button>

      {/* Success Box */}
      {data && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9',
          border: '1px solid #c8e6c9',
          color: '#2e7d32'
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>✅ Connection Successful!</h3>
          <pre style={{ margin: 0, background: '#ffffff', padding: '12px', borderRadius: '6px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* Error Box */}
      {error && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#ffebee',
          border: '1px solid #ffcdd2',
          color: '#c62828'
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>❌ Connection Failed</h3>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;

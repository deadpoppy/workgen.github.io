import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import ErrorBoundary from '../components/ErrorBoundary';

export default function withLoader(WrappedComponent, fetchData) {
  return function WithLoaderWrapper(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const loadData = async () => {
        try {
          const result = await fetchData(props);
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      loadData();
    }, []);

    return (
      <ErrorBoundary>
        {loading ? (
          <Loader fullscreen />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <WrappedComponent {...props} initialData={data} />
        )}
      </ErrorBoundary>
    );
  };
} 

import { useState, useEffect } from 'react';
import { connectToDatabase } from '@/lib/db';

interface DatabaseConnection {
  connected: boolean;
  message: string;
}

export const useDatabase = () => {
  const [connection, setConnection] = useState<DatabaseConnection>({
    connected: false,
    message: 'Not connected to database'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connect = async () => {
      try {
        setLoading(true);
        const result = await connectToDatabase();
        setConnection(result);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to connect to database');
        setConnection({
          connected: false,
          message: 'Connection failed'
        });
      } finally {
        setLoading(false);
      }
    };

    connect();
  }, []);

  return {
    connection,
    loading,
    error
  };
};

export default useDatabase;

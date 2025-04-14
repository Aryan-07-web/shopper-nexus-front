
import { useDatabase } from "@/hooks/useDatabase";

const DatabaseStatus = () => {
  const { connection, loading, error } = useDatabase();

  if (loading) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-4">
        <p className="font-bold">Connecting to database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
        <p className="font-bold">Database Connection Error</p>
        <p>{error}</p>
        <p className="text-sm mt-2">
          Please check your database configuration in src/lib/db.ts
        </p>
      </div>
    );
  }

  if (connection.connected) {
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4">
        <p className="font-bold">Database Connected</p>
        <p>{connection.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-4">
      <p className="font-bold">Not Connected to Database</p>
      <p>Check your database configuration and try again.</p>
    </div>
  );
};

export default DatabaseStatus;

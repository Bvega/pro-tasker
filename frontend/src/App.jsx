import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Pro Tasker App</h1>
      <div className="space-y-4">
        <Link
          to="/login"
          className="block px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Go to Login
        </Link>
        <Link
          to="/register"
          className="block px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
        >
          Go to Register
        </Link>
      </div>
    </div>
  );
}

export default App;

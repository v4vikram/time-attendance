import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';

export const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleMockLogin = (role: 'admin' | 'employee') => {
    setUser({ id: '1', email: 'test@example.com', name: 'Test User', role });
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <div className="space-x-4">
        <button
          onClick={() => handleMockLogin('admin')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Login as Admin
        </button>
        <button
          onClick={() => handleMockLogin('employee')}
          className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          Login as Employee
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { CoordinatorPage } from './pages/CoordinatorPage';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  // Route based on user role
  switch (user.role) {
    case 'Admin':
      // For now, redirect admin to coordinator page
      return <CoordinatorPage />;
    case 'Koordinator':
      return <CoordinatorPage />;
    case 'Anggota':
      // For now, show a simple message for members
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Selamat Datang, {user.username}
            </h1>
            <p className="text-gray-600">
              Halaman anggota masih dalam pengembangan.
            </p>
          </div>
        </div>
      );
    default:
      return <LoginPage />;
  }
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
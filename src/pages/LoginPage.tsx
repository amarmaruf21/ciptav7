import React, { useState } from 'react';
import { LogIn, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username harus diisi');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await login(username.trim());
      if (!success) {
        setError('Username tidak ditemukan. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card padding="lg" className="shadow-2xl">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd4Zh4Rt3egurJkpv2YULhy3FyMr2vAb3sHoqFWOBr6T8QxnM1vCwyhWAR9-wYyTm5wDU0NKeboMAzC2fns-0LLIuLL-QP1nu4qE9auzvP8rGp8zg1sHaLGEwKaItfolmy82OyBOptq4SsEH33Aj-AHx1d8IVzBWv1fAfjOUgk86geu0U/s1600/logo%20cipta.png"
              alt="CIPTA V7 Logo"
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">CIPTA V7</h1>
            <p className="text-gray-600">Aplikasi Koperasi</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              value={username}
              onChange={setUsername}
              placeholder="Masukkan username Anda"
              icon={User}
              error={error}
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={LogIn}
              disabled={isLoading || !username.trim()}
              className="w-full"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Demo Accounts:</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <div>• <strong>admin1</strong> - Admin</div>
              <div>• <strong>koordinator1</strong> - Koordinator</div>
              <div>• <strong>koordinator2</strong> - Koordinator</div>
              <div>• <strong>anggota1</strong> - Anggota</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
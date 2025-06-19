import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onMenuClick }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-3">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd4Zh4Rt3egurJkpv2YULhy3FyMr2vAb3sHoqFWOBr6T8QxnM1vCwyhWAR9-wYyTm5wDU0NKeboMAzC2fns-0LLIuLL-QP1nu4qE9auzvP8rGp8zg1sHaLGEwKaItfolmy82OyBOptq4SsEH33Aj-AHx1d8IVzBWv1fAfjOUgk86geu0U/s1600/logo%20cipta.png"
                alt="CIPTA V7 Logo"
                className="w-8 h-8 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold">{title}</h1>
                {subtitle && <p className="text-sm text-blue-100">{subtitle}</p>}
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={LogOut}
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            Keluar
          </Button>
        </div>

        {user && (
          <div className="mt-2 text-sm text-blue-100">
            Selamat Datang, <span className="font-semibold text-white">{user.username}</span>
          </div>
        )}
      </div>
    </header>
  );
};
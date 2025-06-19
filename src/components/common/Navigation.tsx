import React from 'react';
import { Home, Users, PiggyBank, FileText, X } from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'anggota', label: 'Manajemen Anggota', icon: Users },
  { id: 'tabungan', label: 'Manajemen Tabungan', icon: PiggyBank },
  { id: 'ajuan', label: 'Ajuan', icon: FileText },
];

export const Navigation: React.FC<NavigationProps> = ({
  isOpen,
  onClose,
  activeSection,
  onSectionChange
}) => {
  const handleItemClick = (sectionId: string) => {
    onSectionChange(sectionId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Navigation Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd4Zh4Rt3egurJkpv2YULhy3FyMr2vAb3sHoqFWOBr6T8QxnM1vCwyhWAR9-wYyTm5wDU0NKeboMAzC2fns-0LLIuLL-QP1nu4qE9auzvP8rGp8zg1sHaLGEwKaItfolmy82OyBOptq4SsEH33Aj-AHx1d8IVzBWv1fAfjOUgk86geu0U/s1600/logo%20cipta.png"
                alt="CIPTA V7"
                className="w-8 h-8"
              />
              <div>
                <h2 className="font-bold text-gray-800">CIPTA V7</h2>
                <p className="text-xs text-gray-500">Aplikasi Koperasi</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="mt-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200
                  ${activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};
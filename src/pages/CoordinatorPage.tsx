import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Navigation } from '../components/common/Navigation';
import { Dashboard } from '../components/dashboard/Dashboard';
import { MemberManagement } from '../components/members/MemberManagement';
import { SavingsManagement } from '../components/savings/SavingsManagement';
import { Submissions } from '../components/submissions/Submissions';

export const CoordinatorPage: React.FC = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Dashboard Koordinator';
      case 'anggota':
        return 'Manajemen Anggota';
      case 'tabungan':
        return 'Manajemen Tabungan';
      case 'ajuan':
        return 'Ajuan';
      default:
        return 'Dashboard Koordinator';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'anggota':
        return <MemberManagement />;
      case 'tabungan':
        return <SavingsManagement />;
      case 'ajuan':
        return <Submissions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation
        isOpen={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        <Header
          title={getSectionTitle()}
          onMenuClick={() => setIsNavigationOpen(true)}
        />
        
        <main className="p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
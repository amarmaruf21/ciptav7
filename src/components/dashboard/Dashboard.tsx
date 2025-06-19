import React from 'react';
import { Users, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { SavingsChart } from './SavingsChart';
import { mockDashboardStats, mockMonthlyData } from '../../data/mockData';

export const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Anggota"
          value={stats.totalAnggota}
          icon={Users}
          color="blue"
          subtitle={`${stats.anggotaResmi} Resmi, ${stats.anggotaNonResmi} Non-Resmi`}
        />
        
        <StatsCard
          title="Anggota Pending"
          value={stats.anggotaPending}
          icon={Clock}
          color="orange"
          subtitle="Menunggu persetujuan"
        />
        
        <StatsCard
          title="Total Saldo"
          value={formatCurrency(stats.totalSaldoTabungan)}
          icon={DollarSign}
          color="green"
          subtitle="Semua program tabungan"
        />
        
        <StatsCard
          title="Tabungan Pending"
          value={formatCurrency(stats.tabunganPending)}
          icon={TrendingUp}
          color="red"
          subtitle="Belum dikirim ke Admin"
        />
      </div>

      {/* Additional Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          title="Tabungan Pokok"
          value={formatCurrency(stats.tabunganPokok)}
          icon={DollarSign}
          color="purple"
          subtitle="Tabungan wajib anggota"
        />
        
        <StatsCard
          title="Tabungan Program"
          value={formatCurrency(stats.tabunganProgram)}
          icon={TrendingUp}
          color="blue"
          subtitle="Hari Raya, Hajatan, dll"
        />
      </div>

      {/* Chart */}
      <SavingsChart data={mockMonthlyData} />
    </div>
  );
};
import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';
import { AddSavingsModal } from './AddSavingsModal';
import { SavingsDetailModal } from './SavingsDetailModal';
import { mockMembers, mockSavingsPrograms, mockSavingsTransactions } from '../../data/mockData';
import { SavingsTransaction } from '../../types';

export const SavingsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('semua');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailModal, setDetailModal] = useState<{ isOpen: boolean; memberName: string; transactions: any[] }>({
    isOpen: false,
    memberName: '',
    transactions: []
  });
  const [transactions, setTransactions] = useState<SavingsTransaction[]>(mockSavingsTransactions);

  const tabs = [
    { id: 'semua', label: 'Semua', count: transactions.length },
    { id: 'aktif', label: 'Aktif', count: transactions.filter(t => t.status_transaksi === 'Aktif').length },
    { id: 'pending', label: 'Pending', count: transactions.filter(t => t.status_transaksi === 'Pending').length },
  ];

  const programOptions = [
    { value: '', label: 'Semua Program' },
    ...mockSavingsPrograms.map(program => ({
      value: program.id_program,
      label: program.nama_program
    }))
  ];

  // Group transactions by member and program
  const groupedSavings = useMemo(() => {
    let filteredTransactions = transactions;

    // Filter by tab
    if (activeTab === 'aktif') {
      filteredTransactions = filteredTransactions.filter(t => t.status_transaksi === 'Aktif');
    } else if (activeTab === 'pending') {
      filteredTransactions = filteredTransactions.filter(t => t.status_transaksi === 'Pending');
    }

    // Filter by program
    if (selectedProgram) {
      filteredTransactions = filteredTransactions.filter(t => t.id_program_tabungan === selectedProgram);
    }

    // Group by member
    const grouped = filteredTransactions.reduce((acc, transaction) => {
      const member = mockMembers.find(m => m.id_anggota === transaction.id_anggota);
      if (!member) return acc;

      const key = member.id_anggota;
      if (!acc[key]) {
        acc[key] = {
          member,
          totalAmount: 0,
          transactions: [],
          monthlyBreakdown: {}
        };
      }

      acc[key].totalAmount += transaction.nominal_transaksi;
      acc[key].transactions.push(transaction);
      
      // Group by month for breakdown
      const month = new Date(transaction.tanggal_transaksi).toISOString().slice(0, 7);
      if (!acc[key].monthlyBreakdown[month]) {
        acc[key].monthlyBreakdown[month] = 0;
      }
      acc[key].monthlyBreakdown[month] += transaction.nominal_transaksi;

      return acc;
    }, {} as any);

    return Object.values(grouped).filter((item: any) => {
      if (!searchTerm) return true;
      return item.member.nama_anggota.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [transactions, activeTab, selectedProgram, searchTerm]);

  const handleAddSavings = (savingsData: { idAnggota: string; idProgram: string; nominal: number }) => {
    const newTransaction: SavingsTransaction = {
      id_transaksi: `TRX${String(transactions.length + 1).padStart(3, '0')}`,
      id_anggota: savingsData.idAnggota,
      id_program_tabungan: savingsData.idProgram,
      tanggal_transaksi: new Date().toISOString().split('T')[0],
      nominal_transaksi: savingsData.nominal,
      status_transaksi: 'Pending',
    };

    setTransactions([...transactions, newTransaction]);
  };

  const handleViewDetail = (memberName: string, memberTransactions: any[]) => {
    const detailTransactions = memberTransactions.map(t => ({
      id: t.id_transaksi,
      date: t.tanggal_transaksi,
      amount: t.nominal_transaksi,
      status: t.status_transaksi
    }));

    setDetailModal({
      isOpen: true,
      memberName,
      transactions: detailTransactions
    });
  };

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
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Tabungan</h2>
          <p className="text-gray-600">Kelola transaksi tabungan anggota</p>
        </div>
        
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Tabungan
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <Input
            placeholder="Cari berdasarkan nama anggota..."
            value={searchTerm}
            onChange={setSearchTerm}
            icon={Search}
          />
        </Card>
        
        <Card>
          <Select
            value={selectedProgram}
            onChange={setSelectedProgram}
            options={programOptions}
            placeholder="Filter berdasarkan program"
          />
        </Card>
      </div>

      {/* Tabs */}
      <Card padding="sm">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Card>

      {/* Savings Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Tabungan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rincian Per Bulan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {groupedSavings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data tabungan'}
                  </td>
                </tr>
              ) : (
                groupedSavings.map((item: any) => (
                  <tr key={item.member.id_anggota} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{item.member.nama_anggota}</div>
                        <div className="text-xs text-gray-500">{item.member.id_anggota}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(item.totalAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.transactions.length} transaksi
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(item.monthlyBreakdown).slice(-3).map(([month, amount]: [string, any]) => (
                          <span key={month} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {new Date(month + '-01').toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })}: {formatCurrency(amount)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          icon={Eye}
                          onClick={() => handleViewDetail(item.member.nama_anggota, item.transactions)}
                        >
                          Detail
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modals */}
      <AddSavingsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSavings}
      />

      <SavingsDetailModal
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal({ isOpen: false, memberName: '', transactions: [] })}
        memberName={detailModal.memberName}
        transactions={detailModal.transactions}
      />
    </div>
  );
};
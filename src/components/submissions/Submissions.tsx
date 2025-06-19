import React, { useState } from 'react';
import { Send, Users, PiggyBank } from 'lucide-react';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';
import { mockMembers, mockSavingsTransactions, mockSavingsPrograms, systemSettings } from '../../data/mockData';

export const Submissions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('anggota');

  // Filter pending data
  const pendingMembers = mockMembers.filter(m => m.status_aktif === 'Pending');
  const pendingTransactions = mockSavingsTransactions.filter(t => t.status_transaksi === 'Pending');

  const tabs = [
    { id: 'anggota', label: 'Ajuan Anggota', count: pendingMembers.length },
    { id: 'tabungan', label: 'Ajuan Tabungan', count: pendingTransactions.length },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmitAllMembers = () => {
    alert('Semua ajuan anggota berhasil dikirim ke Admin untuk persetujuan!');
  };

  const handleSubmitAllSavings = () => {
    alert('Semua ajuan tabungan berhasil dikirim ke Admin untuk persetujuan!');
  };

  const getMemberTotal = (member: any) => {
    if (member.jenis_anggota === 'Resmi') {
      const tabunganPokok = parseInt(systemSettings.biaya_tabungan_pokok);
      const biayaAdm = parseInt(systemSettings.biaya_adm_default);
      return tabunganPokok + biayaAdm;
    }
    return 0;
  };

  const getTransactionProgram = (programId: string) => {
    const program = mockSavingsPrograms.find(p => p.id_program === programId);
    return program?.nama_program || 'Unknown Program';
  };

  const getMemberName = (memberId: string) => {
    const member = mockMembers.find(m => m.id_anggota === memberId);
    return member?.nama_anggota || 'Unknown Member';
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Ajuan</h2>
        <p className="text-gray-600">Kelola ajuan anggota dan tabungan yang pending</p>
      </div>

      {/* Tabs */}
      <Card padding="sm">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Card>

      {/* Content based on active tab */}
      {activeTab === 'anggota' && (
        <div className="space-y-4">
          <Card>
            {pendingMembers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Tidak ada ajuan anggota yang pending</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Jenis</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Tabungan Pokok</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ADM</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingMembers.map((member) => {
                        const tabunganPokok = member.jenis_anggota === 'Resmi' ? parseInt(systemSettings.biaya_tabungan_pokok) : 0;
                        const biayaAdm = member.jenis_anggota === 'Resmi' ? parseInt(systemSettings.biaya_adm_default) : 0;
                        const total = tabunganPokok + biayaAdm;

                        return (
                          <tr key={member.id_anggota} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{member.id_anggota}</td>
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium text-gray-900">{member.nama_anggota}</div>
                                <div className="text-xs text-gray-500">{new Date(member.tanggal_daftar).toLocaleDateString('id-ID')}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                member.jenis_anggota === 'Resmi' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {member.jenis_anggota}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {tabunganPokok > 0 ? formatCurrency(tabunganPokok) : '-'}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {biayaAdm > 0 ? formatCurrency(biayaAdm) : '-'}
                            </td>
                            <td className="py-3 px-4 font-semibold text-green-600">
                              {total > 0 ? formatCurrency(total) : '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="primary"
                    icon={Send}
                    onClick={handleSubmitAllMembers}
                  >
                    Kirim Semua Ajuan Anggota
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {activeTab === 'tabungan' && (
        <div className="space-y-4">
          <Card>
            {pendingTransactions.length === 0 ? (
              <div className="text-center py-8">
                <PiggyBank className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Tidak ada ajuan tabungan yang pending</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Program</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingTransactions.map((transaction) => (
                        <tr key={transaction.id_transaksi} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{transaction.id_transaksi}</td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{getMemberName(transaction.id_anggota)}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(transaction.tanggal_transaksi).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                              {getTransactionProgram(transaction.id_program_tabungan)}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-green-600">
                            {formatCurrency(transaction.nominal_transaksi)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="primary"
                    icon={Send}
                    onClick={handleSubmitAllSavings}
                  >
                    Kirim Semua Ajuan Tabungan
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
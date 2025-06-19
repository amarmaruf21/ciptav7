import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit, ToggleLeft, ToggleRight, Eye, UserPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';
import { AddMemberModal } from './AddMemberModal';
import { mockMembers } from '../../data/mockData';
import { Member, MemberType, MemberStatus } from '../../types';

export const MemberManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('semua');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>(mockMembers);

  const tabs = [
    { id: 'semua', label: 'Semua', count: members.length },
    { id: 'aktif', label: 'Aktif', count: members.filter(m => m.status_aktif === 'Aktif').length },
    { id: 'pending', label: 'Pending', count: members.filter(m => m.status_aktif === 'Pending').length },
    { id: 'resmi', label: 'Resmi', count: members.filter(m => m.jenis_anggota === 'Resmi').length },
    { id: 'non-resmi', label: 'Non-Resmi', count: members.filter(m => m.jenis_anggota === 'Non-Resmi').length },
  ];

  const filteredMembers = useMemo(() => {
    let filtered = members;

    // Filter by tab
    switch (activeTab) {
      case 'aktif':
        filtered = filtered.filter(m => m.status_aktif === 'Aktif');
        break;
      case 'pending':
        filtered = filtered.filter(m => m.status_aktif === 'Pending');
        break;
      case 'resmi':
        filtered = filtered.filter(m => m.jenis_anggota === 'Resmi');
        break;
      case 'non-resmi':
        filtered = filtered.filter(m => m.jenis_anggota === 'Non-Resmi');
        break;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.nama_anggota.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.id_anggota.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [members, activeTab, searchTerm]);

  const handleAddMember = (memberData: { nama: string; jenis: MemberType }) => {
    const newMember: Member = {
      id_anggota: `ANG${String(members.length + 1).padStart(3, '0')}`,
      nama_anggota: memberData.nama,
      username: memberData.nama.toLowerCase().replace(/\s+/g, '_'),
      id_koordinator: 'KOR001', // Current coordinator
      jenis_anggota: memberData.jenis,
      status_aktif: 'Pending',
      tanggal_daftar: new Date().toISOString().split('T')[0],
    };

    setMembers([...members, newMember]);
  };

  const toggleMemberStatus = (memberId: string) => {
    setMembers(members.map(member => {
      if (member.id_anggota === memberId) {
        return {
          ...member,
          status_aktif: member.status_aktif === 'Aktif' ? 'Non-Aktif' : 'Aktif' as MemberStatus
        };
      }
      return member;
    }));
  };

  const getStatusBadge = (status: MemberStatus) => {
    const statusClasses = {
      'Aktif': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Non-Aktif': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: MemberType) => {
    const typeClasses = {
      'Resmi': 'bg-blue-100 text-blue-800',
      'Non-Resmi': 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeClasses[type]}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Anggota</h2>
          <p className="text-gray-600">Kelola data anggota koperasi</p>
        </div>
        
        <Button
          variant="primary"
          icon={UserPlus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Anggota
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <Input
          placeholder="Cari berdasarkan nama atau ID anggota..."
          value={searchTerm}
          onChange={setSearchTerm}
          icon={Search}
        />
      </Card>

      {/* Tabs */}
      <Card padding="sm">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Card>

      {/* Members Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Username</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Jenis</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm ? 'Tidak ada anggota yang sesuai dengan pencarian' : 'Belum ada data anggota'}
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id_anggota} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{member.id_anggota}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{member.nama_anggota}</div>
                        <div className="text-xs text-gray-500">Bergabung: {new Date(member.tanggal_daftar).toLocaleDateString('id-ID')}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{member.username}</td>
                    <td className="py-3 px-4">{getTypeBadge(member.jenis_anggota)}</td>
                    <td className="py-3 px-4">{getStatusBadge(member.status_aktif)}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => toggleMemberStatus(member.id_anggota)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          {member.status_aktif === 'Aktif' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMember}
      />
    </div>
  );
};
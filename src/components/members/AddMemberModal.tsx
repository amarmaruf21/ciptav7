import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { User, Plus } from 'lucide-react';
import { MemberType } from '../../types';
import { systemSettings } from '../../data/mockData';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memberData: { nama: string; jenis: MemberType }) => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [nama, setNama] = useState('');
  const [jenis, setJenis] = useState<MemberType | ''>('');
  const [errors, setErrors] = useState<{ nama?: string; jenis?: string }>({});

  const memberTypeOptions = [
    { value: 'Resmi', label: 'Anggota Resmi' },
    { value: 'Non-Resmi', label: 'Anggota Non-Resmi' }
  ];

  const validateForm = () => {
    const newErrors: { nama?: string; jenis?: string } = {};
    
    if (!nama.trim()) {
      newErrors.nama = 'Nama anggota harus diisi';
    }
    
    if (!jenis) {
      newErrors.jenis = 'Jenis anggota harus dipilih';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ nama, jenis: jenis as MemberType });
      setNama('');
      setJenis('');
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setNama('');
    setJenis('');
    setErrors({});
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const tabunganPokok = parseInt(systemSettings.biaya_tabungan_pokok);
  const biayaAdm = parseInt(systemSettings.biaya_adm_default);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Tambah Anggota Baru">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nama Anggota"
          value={nama}
          onChange={setNama}
          placeholder="Masukkan nama lengkap"
          icon={User}
          required
          error={errors.nama}
        />

        <Select
          label="Jenis Anggota"
          value={jenis}
          onChange={(value) => setJenis(value as MemberType)}
          options={memberTypeOptions}
          required
          error={errors.jenis}
        />

        {jenis === 'Resmi' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Rincian Biaya Anggota Resmi:</h4>
            <div className="space-y-1 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>Tabungan Pokok:</span>
                <span className="font-medium">{formatCurrency(tabunganPokok)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Administrasi:</span>
                <span className="font-medium">{formatCurrency(biayaAdm)}</span>
              </div>
              <div className="flex justify-between border-t border-blue-300 pt-1 font-semibold">
                <span>Total:</span>
                <span>{formatCurrency(tabunganPokok + biayaAdm)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={Plus}
            className="flex-1"
          >
            Tambahkan Anggota
          </Button>
        </div>
      </form>
    </Modal>
  );
};
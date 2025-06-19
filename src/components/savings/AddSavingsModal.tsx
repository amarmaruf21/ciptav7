import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';
import { mockMembers, mockSavingsPrograms } from '../../data/mockData';

interface AddSavingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (savingsData: { 
    idAnggota: string; 
    idProgram: string; 
    nominal: number; 
  }) => void;
}

export const AddSavingsModal: React.FC<AddSavingsModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [idAnggota, setIdAnggota] = useState('');
  const [idProgram, setIdProgram] = useState('');
  const [nominal, setNominal] = useState('');
  const [errors, setErrors] = useState<{ idAnggota?: string; idProgram?: string; nominal?: string }>({});

  const activeMembers = mockMembers.filter(m => m.status_aktif === 'Aktif');
  const activePrograms = mockSavingsPrograms.filter(p => p.status_program);

  const memberOptions = activeMembers.map(member => ({
    value: member.id_anggota,
    label: `${member.nama_anggota} (${member.id_anggota})`
  }));

  const programOptions = activePrograms.map(program => ({
    value: program.id_program,
    label: program.nama_program
  }));

  const validateForm = () => {
    const newErrors: { idAnggota?: string; idProgram?: string; nominal?: string } = {};
    
    if (!idAnggota) {
      newErrors.idAnggota = 'Anggota harus dipilih';
    }
    
    if (!idProgram) {
      newErrors.idProgram = 'Program tabungan harus dipilih';
    }
    
    if (!nominal || parseFloat(nominal) <= 0) {
      newErrors.nominal = 'Nominal harus diisi dan lebih dari 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ 
        idAnggota, 
        idProgram, 
        nominal: parseFloat(nominal) 
      });
      setIdAnggota('');
      setIdProgram('');
      setNominal('');
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setIdAnggota('');
    setIdProgram('');
    setNominal('');
    setErrors({});
    onClose();
  };

  const formatCurrency = (value: string) => {
    const number = parseFloat(value);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('id-ID').format(number);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Tambah Tabungan">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Pilih Anggota"
          value={idAnggota}
          onChange={setIdAnggota}
          options={memberOptions}
          placeholder="Pilih anggota..."
          required
          error={errors.idAnggota}
        />

        <Select
          label="Program Tabungan"
          value={idProgram}
          onChange={setIdProgram}
          options={programOptions}
          placeholder="Pilih program tabungan..."
          required
          error={errors.idProgram}
        />

        <div>
          <Input
            label="Nominal Tabungan"
            type="number"
            value={nominal}
            onChange={setNominal}
            placeholder="Masukkan nominal"
            required
            error={errors.nominal}
          />
          {nominal && parseFloat(nominal) > 0 && (
            <p className="mt-1 text-sm text-gray-600">
              Terbilang: Rp {formatCurrency(nominal)}
            </p>
          )}
        </div>

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
            Kirim Tabungan
          </Button>
        </div>
      </form>
    </Modal>
  );
};
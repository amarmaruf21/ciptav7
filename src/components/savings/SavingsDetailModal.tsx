import React from 'react';
import { Modal } from '../ui/Modal';
import { Card } from '../ui/Card';
import { Calendar, DollarSign } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'Aktif' | 'Pending';
}

interface SavingsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  transactions: Transaction[];
}

export const SavingsDetailModal: React.FC<SavingsDetailModalProps> = ({
  isOpen,
  onClose,
  memberName,
  transactions
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: 'Aktif' | 'Pending') => {
    const statusClasses = {
      'Aktif': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Detail Tabungan - ${memberName}`}
      size="lg"
    >
      <div className="space-y-4">
        {/* Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tabungan</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Transaksi</p>
              <p className="text-lg font-semibold text-gray-900">{transactions.length}</p>
            </div>
          </div>
        </Card>

        {/* Transactions List */}
        <div className="max-h-96 overflow-y-auto">
          <h4 className="font-semibold text-gray-800 mb-3">Riwayat Transaksi</h4>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Belum ada transaksi</p>
            ) : (
              transactions.map((transaction) => (
                <Card key={transaction.id} padding="sm" className="hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Calendar size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{formatCurrency(transaction.amount)}</p>
                        <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
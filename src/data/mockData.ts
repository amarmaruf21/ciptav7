import { Member, SavingsProgram, SavingsTransaction, DashboardStats, MonthlyData, Coordinator } from '../types';

export const mockCoordinators: Coordinator[] = [
  {
    id_koordinator: 'KOR001',
    nama_koordinator: 'Budi Santoso',
    status_aktif: true,
  },
  {
    id_koordinator: 'KOR002',
    nama_koordinator: 'Siti Rahayu',
    status_aktif: true,
  },
];

export const mockMembers: Member[] = [
  {
    id_anggota: 'ANG001',
    nama_anggota: 'Ahmad Wijaya',
    username: 'ahmad_wijaya',
    id_koordinator: 'KOR001',
    jenis_anggota: 'Resmi',
    status_aktif: 'Aktif',
    tanggal_daftar: '2024-01-15',
  },
  {
    id_anggota: 'ANG002',
    nama_anggota: 'Dewi Sartika',
    username: 'dewi_sartika',
    id_koordinator: 'KOR001',
    jenis_anggota: 'Resmi',
    status_aktif: 'Aktif',
    tanggal_daftar: '2024-01-20',
  },
  {
    id_anggota: 'ANG003',
    nama_anggota: 'Rizki Pratama',
    username: 'rizki_pratama',
    id_koordinator: 'KOR001',
    jenis_anggota: 'Non-Resmi',
    status_aktif: 'Pending',
    tanggal_daftar: '2024-12-01',
  },
  {
    id_anggota: 'ANG004',
    nama_anggota: 'Maya Indah',
    username: 'maya_indah',
    id_koordinator: 'KOR001',
    jenis_anggota: 'Resmi',
    status_aktif: 'Aktif',
    tanggal_daftar: '2024-02-10',
  },
  {
    id_anggota: 'ANG005',
    nama_anggota: 'Toni Hermawan',
    username: 'toni_hermawan',
    id_koordinator: 'KOR001',
    jenis_anggota: 'Non-Resmi',
    status_aktif: 'Aktif',
    tanggal_daftar: '2024-03-05',
  },
];

export const mockSavingsPrograms: SavingsProgram[] = [
  {
    id_program: 'PRG001',
    nama_program: 'Tabungan Pokok',
    status_program: true,
  },
  {
    id_program: 'PRG002',
    nama_program: 'Tabungan Hari Raya',
    status_program: true,
  },
  {
    id_program: 'PRG003',
    nama_program: 'Tabungan Hajatan',
    status_program: true,
  },
  {
    id_program: 'PRG004',
    nama_program: 'Tabungan Haji',
    status_program: true,
  },
];

export const mockSavingsTransactions: SavingsTransaction[] = [
  {
    id_transaksi: 'TRX001',
    id_anggota: 'ANG001',
    id_program_tabungan: 'PRG001',
    tanggal_transaksi: '2024-12-01',
    nominal_transaksi: 100000,
    status_transaksi: 'Aktif',
  },
  {
    id_transaksi: 'TRX002',
    id_anggota: 'ANG001',
    id_program_tabungan: 'PRG002',
    tanggal_transaksi: '2024-12-01',
    nominal_transaksi: 50000,
    status_transaksi: 'Aktif',
  },
  {
    id_transaksi: 'TRX003',
    id_anggota: 'ANG002',
    id_program_tabungan: 'PRG001',
    tanggal_transaksi: '2024-12-02',
    nominal_transaksi: 100000,
    status_transaksi: 'Pending',
  },
  {
    id_transaksi: 'TRX004',
    id_anggota: 'ANG002',
    id_program_tabungan: 'PRG002',
    tanggal_transaksi: '2024-12-02',
    nominal_transaksi: 75000,
    status_transaksi: 'Aktif',
  },
  {
    id_transaksi: 'TRX005',
    id_anggota: 'ANG004',
    id_program_tabungan: 'PRG001',
    tanggal_transaksi: '2024-12-03',
    nominal_transaksi: 100000,
    status_transaksi: 'Aktif',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalAnggota: 5,
  anggotaResmi: 3,
  anggotaNonResmi: 2,
  anggotaPending: 1,
  totalSaldoTabungan: 8250000,
  tabunganPokok: 5000000,
  tabunganProgram: 3250000,
  tabunganPending: 450000,
};

export const mockMonthlyData: MonthlyData[] = [
  { month: 'Jan', total: 2500000 },
  { month: 'Feb', total: 3200000 },
  { month: 'Mar', total: 2800000 },
  { month: 'Apr', total: 3500000 },
  { month: 'May', total: 4100000 },
  { month: 'Jun', total: 3800000 },
  { month: 'Jul', total: 4500000 },
  { month: 'Aug', total: 5200000 },
  { month: 'Sep', total: 4800000 },
  { month: 'Oct', total: 5500000 },
  { month: 'Nov', total: 6200000 },
  { month: 'Dec', total: 8250000 },
];

export const systemSettings = {
  biaya_adm_default: '10000',
  biaya_tabungan_pokok: '100000',
  tahun_anggaran: '2024',
  nama_koperasi: 'CIPTA V7',
};
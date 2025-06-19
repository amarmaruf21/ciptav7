export type UserRole = 'Admin' | 'Koordinator' | 'Anggota';

export type MemberType = 'Resmi' | 'Non-Resmi';

export type MemberStatus = 'Aktif' | 'Pending' | 'Non-Aktif';

export type TransactionStatus = 'Pending' | 'Aktif' | 'Ditolak';

export interface User {
  username: string;
  role: UserRole;
  id_terkait?: string;
}

export interface Coordinator {
  id_koordinator: string;
  nama_koordinator: string;
  status_aktif: boolean;
}

export interface Member {
  id_anggota: string;
  nama_anggota: string;
  username: string;
  id_koordinator: string;
  jenis_anggota: MemberType;
  status_aktif: MemberStatus;
  tanggal_daftar: string;
}

export interface SavingsProgram {
  id_program: string;
  nama_program: string;
  status_program: boolean;
}

export interface SavingsTransaction {
  id_transaksi: string;
  id_anggota: string;
  id_program_tabungan: string;
  tanggal_transaksi: string;
  nominal_transaksi: number;
  status_transaksi: TransactionStatus;
}

export interface SystemSettings {
  key: string;
  value: string;
}

export interface DashboardStats {
  totalAnggota: number;
  anggotaResmi: number;
  anggotaNonResmi: number;
  anggotaPending: number;
  totalSaldoTabungan: number;
  tabunganPokok: number;
  tabunganProgram: number;
  tabunganPending: number;
}

export interface MonthlyData {
  month: string;
  total: number;
}
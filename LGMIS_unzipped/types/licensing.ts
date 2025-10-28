import { FileAttachment, BaseEntity } from './shared';

export interface License extends BaseEntity {
  licenseNumber: string;
  type: LicenseType;
  applicantId: string;
  businessDetails: BusinessDetails;
  financialAccount: FinancialAccount;
  validFrom: Date;
  validUntil: Date;
  status: LicenseStatus;
  fees: LicenseFee[];
  documents: FileAttachment[];
  renewalHistory?: LicenseRenewal[];
}

export type LicenseType = 'business' | 'liquor' | 'trading' | 'special';
export type LicenseStatus = 'active' | 'expired' | 'suspended' | 'pending' | 'rejected';

export interface BusinessDetails {
  name: string;
  type: string;
  registrationNumber?: string;
  tradingName?: string;
  physicalAddress: string;
  contactPerson: string;
  phone: string;
  email: string;
  employees: number;
}

export interface FinancialAccount {
  accountNumber: string;
  balance: number;
  lastPaymentDate?: Date;
  lastPaymentAmount?: number;
}

export interface LicenseFee {
  id: string;
  type: string;
  amount: number;
  dueDate: Date;
  paidAmount: number;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue';
}

export interface LicenseRenewal {
  id: string;
  renewalDate: Date;
  previousLicenseId: string;
  fees: LicenseFee[];
  status: 'pending' | 'approved' | 'rejected';
  documents: FileAttachment[];
  comments?: string;
}
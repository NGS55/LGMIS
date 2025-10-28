import { FileAttachment } from './shared';

export interface LegalClient {
  id: string;
  clientNumber: string;
  name: string;
  type: 'individual' | 'company';
  identityNumber: string;
  contactInfo: ContactInfo;
  applications: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface LegalOwnership {
  id: string;
  caseNumber: string;
  clientId: string;
  propertyId: string;
  status: 'pending' | 'approved' | 'rejected' | 'review';
  plotDetails: PlotDetails;
  documents: FileAttachment[];
  approvalSteps: ApprovalStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlotDetails {
  plotNumber: string;
  location: string;
  size: number;
}

export interface ApprovalStep {
  step: string;
  status: 'pending' | 'completed';
  date?: Date;
  comments?: string;
  approver?: string;
}
import { FileAttachment, GeoLocation, ApplicationStatus } from './shared';

export interface HousingApplication {
  id: string;
  applicationNumber: string;
  applicantName: string;
  propertyType: 'house' | 'apartment' | 'land';
  status: ApplicationStatus;
  settlementArea: string;
  householdSize: number;
  monthlyIncome: number;
  applicationDate: Date;
  documents: FileAttachment[];
  inspectionDetails?: InspectionDetails;
  approvalDetails?: ApprovalDetails;
  createdAt: Date;
  updatedAt: Date;
}

export interface InspectionDetails {
  id: string;
  inspectionDate: Date;
  inspector: string;
  status: 'pending' | 'passed' | 'failed';
  comments: string;
  attachments: FileAttachment[];
}

export interface ApprovalDetails {
  id: string;
  approvalDate: Date;
  approvedBy: string;
  comments: string;
  validUntil: Date;
  conditions?: string[];
}
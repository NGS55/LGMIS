import { FileAttachment } from './shared';

export type HousingApplicationStatus =
  | 'draft'
  | 'pending'
  | 'inspection'
  | 'settlementReview'
  | 'approved'
  | 'confirmed'
  | 'rejected';

export interface HouseholdMember {
  id: string;
  name: string;
  age: number;
  relationship: string;
  employed: boolean;
}

export interface HouseholdRecord {
  id: string;
  headOfHousehold: string;
  contactNumber: string;
  members: HouseholdMember[];
  totalIncome: number;
}

export interface SettlementRecord {
  id: string;
  settlementArea: string;
  plotReference?: string;
  coordinates?: { latitude: number; longitude: number };
  accessToUtilities: {
    water: boolean;
    electricity: boolean;
    sanitation: boolean;
  };
}

export interface HousingApplication {
  id: string;
  applicationNumber: string;
  applicantName: string;
  propertyType: 'house' | 'apartment' | 'land';
  status: HousingApplicationStatus;
  settlementArea: string;
  householdSize: number;
  monthlyIncome: number;
  applicationDate: Date;
  documents: FileAttachment[];
  inspectionReports: InspectionDetails[];
  settlementRecord: SettlementRecord;
  householdRecord: HouseholdRecord;
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

export interface OwnershipApplicationHousing extends HousingApplication {
  caseLocked: boolean;
  reasonLocked?: string;
}

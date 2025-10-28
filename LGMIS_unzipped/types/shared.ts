import type { PropertyValuation } from '@/types/valuation';

// Common types used across multiple modules
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  personalDetails: PersonalDetails;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

export interface MinuteBook extends BaseEntity {
  referenceNumber: string;
  meetingDate: Date;
  agenda: string;
  decisions: string;
  attachments: FileAttachment[];
  leaseholdApprovals: string[]; // References to leasehold approvals
}

export interface FileAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
}

export interface Billboard extends BaseEntity {
  applicationNumber: string;
  applicantId: string;
  location: GeoLocation;
  size: BillboardSize;
  tariffId: string;
  status: ApplicationStatus;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface BillboardSize {
  width: number;
  height: number;
  unit: 'meters' | 'feet';
}

export interface Property extends BaseEntity {
  title: string;
  plotNumber: string;
  size: number;
  location: GeoLocation;
  owner: string;
  propertyType: PropertyType;
  valuation?: PropertyValuation;
  status: PropertyStatus;
}

export type PropertyType = 'residential' | 'commercial' | 'industrial' | 'institutional';
export type PropertyStatus = 'active' | 'inactive' | 'underInspection';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'underReview';

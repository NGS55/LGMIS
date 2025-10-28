import { FileAttachment, BaseEntity, GeoLocation } from './shared';

export interface Plot extends BaseEntity {
  plotNumber: string;
  provisionalPlotNumber?: string;
  location: GeoLocation;
  size: number;
  zoning: ZoningType;
  status: PlotStatus;
  owner?: string;
  applicantId?: string;
  area?: PlanningArea;
  gpsPoints: GpsPoint[];
  rezoningRequests: RezoningRequest[];
  offerDetails?: PlotOffer;
  attachments: FileAttachment[];
  notes?: string;
}

export interface BuildingPlan extends BaseEntity {
  planNumber: string;
  plotId: string;
  applicantId: string;
  planType: 'new' | 'modification' | 'renovation';
  status: 'pending' | 'approved' | 'rejected' | 'review';
  documents: FileAttachment[];
  checklistItems: ChecklistItem[];
  erectionApplication?: ErectionApplication;
}

export type ZoningType = 'residential' | 'commercial' | 'industrial' | 'agricultural' | 'mixed';
export type PlotStatus = 'available' | 'allocated' | 'developed' | 'reserved';

export interface GpsPoint {
  latitude: number;
  longitude: number;
  elevation?: number;
  order: number;
}

export interface PlotOffer {
  id: string;
  offeredTo: string;
  offerDate: Date;
  expiryDate: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  terms: string[];
  price: number;
}

export interface PlanningArea {
  id: string;
  name: string;
  description?: string;
}

export interface RezoningRequest extends BaseEntity {
  requestNumber: string;
  currentZoning: ZoningType;
  requestedZoning: ZoningType;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  committeeDecision?: string;
  meetingDate?: Date;
  attachments: FileAttachment[];
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  department: string;
  requirement: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  checkedBy?: string;
  checkedDate?: Date;
}

export interface ErectionApplication {
  id: string;
  applicationDate: Date;
  startDate?: Date;
  completionDate?: Date;
  contractor?: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
  inspections: BuildingInspection[];
}

export interface BuildingInspection {
  id: string;
  stage: string;
  scheduledDate: Date;
  actualDate?: Date;
  inspector?: string;
  status: 'scheduled' | 'completed' | 'failed';
  findings: string;
  photos: FileAttachment[];
}

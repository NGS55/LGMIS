import type { Property, ApplicationStatus, FileAttachment, BaseEntity } from '@/types/shared';

export interface PropertyValuation extends BaseEntity {
  propertyId: string;
  property: Property;
  assessedValue: number;
  valuationDate: Date;
  nextReviewDate: Date;
  assessor: string;
  status: ApplicationStatus;
  documents: FileAttachment[];
  formulaFactors: ValuationFormula;
}

export interface ValuationFormula {
  landUseMultiplier: number;
  zoneFactor: number;
  sizeFactor: number;
  baseRate: number;
  adjustments: ValuationAdjustment[];
}

export interface ValuationAdjustment {
  type: string;
  description: string;
  value: number;
  multiplier: number;
}

export interface PropertyRate extends BaseEntity {
  propertyId: string;
  valuationId: string;
  ratePercentage: number;
  annualAmount: number;
  billingCycle: 'annual' | 'quarterly' | 'monthly';
  dueDate: Date;
  status: 'current' | 'overdue' | 'paid';
  balance: number;
  payments: RatePayment[];
}

export interface RatePayment {
  id: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  reference: string;
  receipt: string;
}

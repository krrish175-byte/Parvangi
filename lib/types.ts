export type LocationType = 'midc' | 'municipal' | 'rural';

export type ScaleTier = 'micro' | 'small' | 'medium';

export type BusinessStage = 'new_unit' | 'expansion' | 'formalize';

export type ApprovalStatus = 'pending' | 'in_progress' | 'completed';

export interface BusinessCategory {
  id: string;
  name: string;
  marathi_name: string;
  hindi_name: string;
  description: string;
  marathi_description?: string;
  hindi_description?: string;
  icon: string;
  examples: string;
  marathi_examples?: string;
  hindi_examples?: string;
  badge: string;
  marathi_badge?: string;
  hindi_badge?: string;
  requiresPollutionClearance: boolean;
  requiresFactoryLicense: boolean;
}

export interface UserProfileInput {
  category: string;
  location: LocationType;
  scale: ScaleTier;
  investmentInLakhs: number;
  employeeCount?: number;
  stage: BusinessStage;
  district?: string;
}

export interface ApprovalRecord {
  id: string;
  name: string;
  marathi_name: string;
  hindi_name: string;
  issuing_authority: string;
  department: string;
  act_and_rule: string;
  marathi_act_and_rule?: string;
  hindi_act_and_rule?: string;
  category_tags: string[];
  location_tags: string[];
  scale_tags: string[];
  stage_tags: string[];
  mandatory_or_conditional: 'Mandatory' | 'Conditional';
  conditional_reason?: string;
  typical_timeline: string;
  timeline_days_min: number;
  timeline_days_max: number;
  fee_structure: string;
  marathi_fee_structure?: string;
  hindi_fee_structure?: string;
  depends_on: string[];
  one_line_description: string;
  marathi_one_line_description?: string;
  hindi_one_line_description?: string;
  portal_url: string;
  stage_phase: 1 | 2 | 3 | 4;
  phase_name: string;
  inspection_required: boolean;
  documents_preview: string[];
}

export interface PhaseGroup {
  phase: 1 | 2 | 3 | 4;
  name: string;
  marathi_name: string;
  hindi_name: string;
  description: string;
  marathi_description: string;
  hindi_description: string;
  items: ApprovalRecord[];
}

export interface ChecklistMetrics {
  total: number;
  mandatoryCount: number;
  conditionalCount: number;
  estimatedDaysMin: number;
  estimatedDaysMax: number;
  departmentCount: number;
  authorities: string[];
}

export interface ChecklistResult {
  profile: UserProfileInput;
  approvals: ApprovalRecord[];
  phaseGroups: PhaseGroup[];
  metrics: ChecklistMetrics;
  referenceId: string;
  generatedAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  createdAt: string;
}

export type ApplicationStatus = 'Submitted' | 'In Process' | 'Approved' | 'Denied';

export interface ApplicationSubmission {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userAge: number;
  userEmail?: string;
  approvalId: string;
  approvalName: string;
  approvalMarathiName?: string;
  approvalHindiName?: string;
  department: string;
  issuingAuthority: string;
  phase: number;
  acknowledgementNumber: string;
  sourcePortal: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  officerRemarks?: string;
  sanctionCertificateId?: string;
}

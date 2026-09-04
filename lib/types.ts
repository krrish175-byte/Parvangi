export type LocationType = 'midc' | 'municipal' | 'rural';

export type ScaleTier = 'micro' | 'small' | 'medium';

export type BusinessStage = 'new_unit' | 'expansion' | 'formalize';

export type ApprovalStatus = 'pending' | 'in_progress' | 'completed';

export interface BusinessCategory {
  id: string;
  name: string;
  marathi_name: string;
  description: string;
  icon: string;
  examples: string;
  badge: string;
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
  issuing_authority: string;
  department: string;
  act_and_rule: string;
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
  depends_on: string[];
  one_line_description: string;
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
  description: string;
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

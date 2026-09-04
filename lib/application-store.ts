import { ApplicationStatus, ApplicationSubmission } from './types';
import { ALL_APPROVALS } from './rules-engine';

const APPLICATIONS_STORAGE_KEY = 'parvangi_applications_data';

export const SEEDED_APPLICATIONS: ApplicationSubmission[] = [
  {
    id: 'APP-2026-001',
    userId: 'user_ramesh_01',
    userName: 'Ramesh Patil',
    userPhone: '9822012345',
    userAge: 34,
    userEmail: 'ramesh.patil@maha-msme.in',
    approvalId: 'udyam-registration',
    approvalName: 'Udyam MSME Online Registration',
    approvalMarathiName: 'उद्यम नोंदणी (सूक्ष्म, लघु व मध्यम उद्योग)',
    approvalHindiName: 'उद्यम एमएसएमई ऑनलाइन पंजीकरण',
    department: 'District Industries Centre (DIC) / MSME Directorate',
    issuingAuthority: 'Ministry of Micro, Small & Medium Enterprises, Govt. of India',
    phase: 1,
    acknowledgementNumber: 'UDYAM-MH-26-0048192',
    sourcePortal: 'Udyam Portal (udyamregistration.gov.in)',
    status: 'Approved',
    submittedAt: '2026-02-16T11:20:00Z',
    updatedAt: '2026-02-16T11:25:00Z',
    officerRemarks: 'Auto-verified via Aadhaar-linked CBDT database. Udyam Registration Certificate issued.',
    sanctionCertificateId: 'UDYAM-MH-26-0048192'
  },
  {
    id: 'APP-2026-002',
    userId: 'user_ramesh_01',
    userName: 'Ramesh Patil',
    userPhone: '9822012345',
    userAge: 34,
    userEmail: 'ramesh.patil@maha-msme.in',
    approvalId: 'fire-noc-provisional',
    approvalName: 'Provisional Fire NOC (Pre-Construction Blueprint Sanction)',
    approvalMarathiName: 'तात्पुरता अग्निशमन ना हरकत दाखला (बांधकाम पूर्व)',
    approvalHindiName: 'अनंतिम अग्नि एनओसी (निर्माण पूर्व खाका स्वीकृति)',
    department: 'MIDC Fire Brigade / Urban Development Dept',
    issuingAuthority: 'Chief Fire Officer, MIDC Fire Services',
    phase: 2,
    acknowledgementNumber: 'MIDC/FIRE/PN/2026/0194',
    sourcePortal: 'MIDC Single Window (midcindia.org)',
    status: 'Approved',
    submittedAt: '2026-02-18T09:45:00Z',
    updatedAt: '2026-02-24T15:30:00Z',
    officerRemarks: 'Static water tank layout and access road setbacks compliant with Maharashtra Fire Prevention Act 2006. Provisional sanction granted.',
    sanctionCertificateId: 'MIDC-FNOC-2026-0194'
  },
  {
    id: 'APP-2026-003',
    userId: 'user_ramesh_01',
    userName: 'Ramesh Patil',
    userPhone: '9822012345',
    userAge: 34,
    userEmail: 'ramesh.patil@maha-msme.in',
    approvalId: 'mpcb-cte',
    approvalName: 'MPCB Consent to Establish (CTE)',
    approvalMarathiName: 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ - स्थापनेची संमती (CTE)',
    approvalHindiName: 'एमपीसीबी स्थापना सहमति (सीटीई)',
    department: 'Environment and Climate Change Department, Government of Maharashtra',
    issuingAuthority: 'Maharashtra Pollution Control Board (MPCB)',
    phase: 3,
    acknowledgementNumber: 'MPCB/CTE/PN-RO/2026/0812',
    sourcePortal: 'e-MPCB (ecmpcb.mpcb.gov.in)',
    status: 'In Process',
    submittedAt: '2026-03-01T14:10:00Z',
    updatedAt: '2026-03-03T16:00:00Z',
    officerRemarks: 'Application scrutinized. Field Officer inspection report for proposed ETP site at Ranjangaon MIDC scheduled for 10-Mar-2026.'
  },
  {
    id: 'APP-2026-004',
    userId: 'user_sneha_02',
    userName: 'Sneha Kulkarni',
    userPhone: '9822067890',
    userAge: 29,
    userEmail: 'sneha.kulkarni@maha-msme.in',
    approvalId: 'dish-factory-license',
    approvalName: 'Factory Building Plan Approval & Factory License',
    approvalMarathiName: 'कारखाना नकाशा मंजुरी व कारखाना परवाना (DISH)',
    approvalHindiName: 'कारखाना भवन योजना अनुमोदन और कारखाना लाइसेंस (DISH)',
    department: 'Industries, Energy and Labour Department, Government of Maharashtra',
    issuingAuthority: 'Directorate of Industrial Safety & Health (DISH)',
    phase: 3,
    acknowledgementNumber: 'DISH/LMS/2026/49210',
    sourcePortal: 'DISH LMS Portal (lms.mahaonline.gov.in)',
    status: 'Submitted',
    submittedAt: '2026-03-02T10:00:00Z',
    updatedAt: '2026-03-02T10:00:00Z',
    officerRemarks: 'Awaiting initial document verification by Assistant Director of Industrial Safety, Pune Circle.'
  }
];

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function getAllApplications(): ApplicationSubmission[] {
  if (!isClient()) return SEEDED_APPLICATIONS;
  try {
    const stored = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(SEEDED_APPLICATIONS));
      return SEEDED_APPLICATIONS;
    }
    return JSON.parse(stored);
  } catch {
    return SEEDED_APPLICATIONS;
  }
}

export function getApplicationsByUser(userId: string): ApplicationSubmission[] {
  const all = getAllApplications();
  return all.filter((app) => app.userId === userId);
}

export function getApplicationByApproval(
  userId: string,
  approvalId: string
): ApplicationSubmission | undefined {
  const userApps = getApplicationsByUser(userId);
  return userApps.find((app) => app.approvalId === approvalId);
}

/**
 * Checks if the prerequisite statutory clearances for an approval have been completed/approved.
 */
export function verifyPrerequisitesStatus(
  approvalId: string,
  userApplications: ApplicationSubmission[]
): { satisfied: boolean; missing: string[] } {
  const approval = ALL_APPROVALS.find((a) => a.id === approvalId);
  if (!approval || approval.depends_on.length === 0) {
    return { satisfied: true, missing: [] };
  }

  const approvedIds = new Set(
    userApplications
      .filter((a) => a.status === 'Approved')
      .map((a) => a.approvalId)
  );

  const missing = approval.depends_on
    .filter((depId) => !approvedIds.has(depId))
    .map((depId) => {
      const parent = ALL_APPROVALS.find((a) => a.id === depId);
      return parent ? parent.name : depId;
    });

  return {
    satisfied: missing.length === 0,
    missing
  };
}

export function submitOrSyncApplication(input: {
  userId: string;
  userName: string;
  userPhone: string;
  userAge: number;
  userEmail?: string;
  approvalId: string;
  acknowledgementNumber?: string;
  sourcePortal?: string;
  status?: ApplicationStatus;
}): ApplicationSubmission {
  const all = getAllApplications();
  const approval = ALL_APPROVALS.find((a) => a.id === input.approvalId);

  // Generate realistic official ack number if not provided
  const ack =
    input.acknowledgementNumber && input.acknowledgementNumber.trim()
      ? input.acknowledgementNumber.trim().toUpperCase()
      : generateRealisticAckNumber(input.approvalId);

  const portal =
    input.sourcePortal ||
    (approval?.portal_url.includes('mahaonline')
      ? 'Aaple Sarkar / MahaOnline'
      : approval?.portal_url.includes('mpcb')
      ? 'e-MPCB Integrated Portal'
      : approval?.portal_url.includes('midc')
      ? 'MIDC EODB Single Window'
      : approval?.portal_url.includes('udyam')
      ? 'Ministry of MSME (Udyam)'
      : 'Official Department Portal');

  // Check if existing record for this user and approval
  const existingIdx = all.findIndex(
    (a) => a.userId === input.userId && a.approvalId === input.approvalId
  );

  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    // Update existing
    all[existingIdx] = {
      ...all[existingIdx],
      acknowledgementNumber: ack,
      sourcePortal: portal,
      updatedAt: now,
      status: input.status || all[existingIdx].status
    };
    if (isClient()) {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(all));
      window.dispatchEvent(new Event('parvangi_applications_change'));
    }
    return all[existingIdx];
  }

  const newSubmission: ApplicationSubmission = {
    id: `APP-2026-${Math.floor(100 + Math.random() * 900)}`,
    userId: input.userId,
    userName: input.userName,
    userPhone: input.userPhone,
    userAge: input.userAge,
    userEmail: input.userEmail,
    approvalId: input.approvalId,
    approvalName: approval ? approval.name : input.approvalId,
    approvalMarathiName: approval?.marathi_name,
    approvalHindiName: approval?.hindi_name,
    department: approval ? approval.department : 'Government of Maharashtra',
    issuingAuthority: approval ? approval.issuing_authority : 'Designated Authority',
    phase: approval ? approval.stage_phase : 1,
    acknowledgementNumber: ack,
    sourcePortal: portal,
    status: input.status || 'Submitted',
    submittedAt: now,
    updatedAt: now,
    officerRemarks: 'Application received and registered in Maharashtra Single-Window Scrutiny Console.'
  };

  all.unshift(newSubmission);
  if (isClient()) {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event('parvangi_applications_change'));
  }

  return newSubmission;
}

export function updateApplicationByAdmin(
  applicationId: string,
  updates: {
    status: ApplicationStatus;
    officerRemarks?: string;
    sanctionCertificateId?: string;
  }
): boolean {
  const all = getAllApplications();
  const idx = all.findIndex((a) => a.id === applicationId);
  if (idx < 0) return false;

  all[idx] = {
    ...all[idx],
    status: updates.status,
    officerRemarks: updates.officerRemarks || all[idx].officerRemarks,
    sanctionCertificateId: updates.sanctionCertificateId || all[idx].sanctionCertificateId,
    updatedAt: new Date().toISOString()
  };

  if (isClient()) {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event('parvangi_applications_change'));
  }

  return true;
}

function generateRealisticAckNumber(approvalId: string): string {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  switch (approvalId) {
    case 'mpcb-cte':
      return `MPCB/CTE/PN/${year}/${randomDigits}`;
    case 'mpcb-cto':
      return `MPCB/CTO/PN/${year}/${randomDigits}`;
    case 'dish-factory-license':
      return `DISH/LMS/${year}/${randomDigits}`;
    case 'fire-noc-provisional':
      return `MIDC/FIRE/PRV/${year}/${randomDigits}`;
    case 'fire-noc-final':
      return `MIDC/FIRE/FNL/${year}/${randomDigits}`;
    case 'udyam-registration':
      return `UDYAM-MH-26-${randomDigits}91`;
    case 'gst-registration':
      return `GST/MH/ARN/${year}/${randomDigits}10`;
    case 'shops-and-establishment':
      return `MH/LAB/GUM/${year}/${randomDigits}`;
    case 'building-plan-approval':
      return `MIDC/SPA/BP/${year}/${randomDigits}`;
    case 'msedcl-power-connection':
      return `MSEDCL/IND/LT/${year}/${randomDigits}`;
    case 'water-supply-connection':
      return `MIDC/WTR/${year}/${randomDigits}`;
    case 'fssai-license':
      return `FSSAI/MH/${year}/${randomDigits}50`;
    default:
      return `MH/GOV/${year}/${randomDigits}`;
  }
}

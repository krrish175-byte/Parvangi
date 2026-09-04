import rawApprovals from '@/data/regulatory-approvals.json';
import rawCategories from '@/data/categories.json';
import {
  ApprovalRecord,
  BusinessCategory,
  ChecklistMetrics,
  ChecklistResult,
  PhaseGroup,
  UserProfileInput
} from './types';

export const ALL_APPROVALS: ApprovalRecord[] = rawApprovals as ApprovalRecord[];
export const ALL_CATEGORIES: BusinessCategory[] = rawCategories as BusinessCategory[];

export function getCategoryById(categoryId: string): BusinessCategory | undefined {
  return ALL_CATEGORIES.find((cat) => cat.id === categoryId);
}

export function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `MH-PRV-${year}-${randomNum}`;
}

/**
 * Filter approvals based on category, location, scale tier, and business stage.
 * Uses tag matching: an approval matches if its tag list includes 'all' OR the specific user value.
 */
export function filterApprovals(profile: UserProfileInput): ApprovalRecord[] {
  return ALL_APPROVALS.filter((approval) => {
    const matchesCategory =
      approval.category_tags.includes('all') ||
      approval.category_tags.includes(profile.category);

    const matchesLocation =
      approval.location_tags.includes('all') ||
      approval.location_tags.includes(profile.location);

    const matchesScale =
      approval.scale_tags.includes('all') ||
      approval.scale_tags.includes(profile.scale);

    const matchesStage =
      approval.stage_tags.includes('all') ||
      approval.stage_tags.includes(profile.stage);

    return matchesCategory && matchesLocation && matchesScale && matchesStage;
  });
}

/**
 * Topologically sorts approvals using Kahn's Algorithm to guarantee legal sequencing
 * (e.g. MPCB CTE must precede Factory License; Provisional Fire NOC must precede Building Plan / Final NOC).
 */
export function topologicalSortApprovals(matchedApprovals: ApprovalRecord[]): ApprovalRecord[] {
  const approvalMap = new Map<string, ApprovalRecord>();
  matchedApprovals.forEach((app) => approvalMap.set(app.id, app));

  // Build active dependencies: only consider dependencies that exist in matched set
  const inDegree = new Map<string, number>();
  const dependentsMap = new Map<string, string[]>(); // prerequisite -> list of items waiting for it

  matchedApprovals.forEach((app) => {
    inDegree.set(app.id, 0);
    dependentsMap.set(app.id, []);
  });

  matchedApprovals.forEach((app) => {
    const activePrerequisites = app.depends_on.filter((depId) => approvalMap.has(depId));
    inDegree.set(app.id, activePrerequisites.length);

    activePrerequisites.forEach((depId) => {
      dependentsMap.get(depId)!.push(app.id);
    });
  });

  // Priority Queue / Array: sort by phase first, then min timeline
  const getComparator = (aId: string, bId: string) => {
    const a = approvalMap.get(aId)!;
    const b = approvalMap.get(bId)!;
    if (a.stage_phase !== b.stage_phase) {
      return a.stage_phase - b.stage_phase;
    }
    if (a.timeline_days_min !== b.timeline_days_min) {
      return a.timeline_days_min - b.timeline_days_min;
    }
    return a.name.localeCompare(b.name);
  };

  const queue: string[] = [];
  matchedApprovals.forEach((app) => {
    if (inDegree.get(app.id) === 0) {
      queue.push(app.id);
    }
  });

  queue.sort(getComparator);

  const sortedResult: ApprovalRecord[] = [];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    sortedResult.push(approvalMap.get(currentId)!);

    const dependents = dependentsMap.get(currentId) || [];
    for (const depId of dependents) {
      const currentDeg = inDegree.get(depId)! - 1;
      inDegree.set(depId, currentDeg);
      if (currentDeg === 0) {
        queue.push(depId);
        queue.sort(getComparator);
      }
    }
  }

  // Defensive check: If any circular dependency prevented dequeueing, append remaining by phase
  if (sortedResult.length < matchedApprovals.length) {
    const includedIds = new Set(sortedResult.map((a) => a.id));
    const leftovers = matchedApprovals
      .filter((a) => !includedIds.has(a.id))
      .sort((a, b) => a.stage_phase - b.stage_phase);
    sortedResult.push(...leftovers);
  }

  return sortedResult;
}

/**
 * Group topologically sorted approvals into 4 canonical phases
 */
export function groupIntoPhases(approvals: ApprovalRecord[]): PhaseGroup[] {
  const phaseDefinitions: {
    phase: 1 | 2 | 3 | 4;
    name: string;
    marathi_name: string;
    hindi_name: string;
    description: string;
    marathi_description: string;
    hindi_description: string;
  }[] = [
    {
      phase: 1,
      name: 'Phase 1: Legal Identity & Business Registration',
      marathi_name: 'टप्पा १: कायदेशीर ओळख व प्राथमिक नोंदणी',
      hindi_name: 'चरण १: कानूनी पहचान और प्रारंभिक पंजीकरण',
      description: 'Zero-cost and quick digital registrations establishing legal persona, tax identification, and local business intimation.',
      marathi_description: 'कायदेशीर व्यक्तिमत्व, कर ओळख आणि स्थानिक व्यवसाय सूचना स्थापित करणारी विनामूल्य आणि जलद डिजिटल नोंदणी.',
      hindi_description: 'कानूनी व्यक्तित्व, कर पहचान और स्थानीय व्यवसाय सूचना स्थापित करने वाला शून्य-लागत और त्वरित डिजिटल पंजीकरण।'
    },
    {
      phase: 2,
      name: 'Phase 2: Land, Planning & Construction Clearances',
      marathi_name: 'टप्पा २: जागा, नियोजन व बांधकाम परवानग्या',
      hindi_name: 'चरण २: भूमि, योजना और निर्माण मंजूरी',
      description: 'Zoning approvals, architectural blueprints, and preliminary fire safety clearances required prior to commencing civil site construction.',
      marathi_description: 'स्थापत्य बांधकाम सुरू करण्यापूर्वी आवश्यक झोनिंग मान्यता, वास्तुशास्त्रीय ब्ल्यूप्रिंट्स आणि प्राथमिक अग्निसुरक्षा परवानग्या.',
      hindi_description: 'सिविल निर्माण शुरू करने से पहले आवश्यक ज़ोनिंग अनुमोदन, वास्तुशिल्प ब्लूप्रिंट और प्रारंभिक अग्नि सुरक्षा मंजूरी।'
    },
    {
      phase: 3,
      name: 'Phase 3: Environmental, Safety & Structural Approvals',
      marathi_name: 'टप्पा ३: पर्यावरण, कामगार सुरक्षा व वैधानिक दाखले',
      hindi_name: 'चरण ३: पर्यावरण, श्रम सुरक्षा और वैधानिक प्रमाण पत्र',
      description: 'Critical statutory clearances including MPCB Consent to Establish and Factory License approval; legally binding before equipment commissioning.',
      marathi_description: 'एमपीसिबी (MPCB) संमती आणि फॅक्टरी लायसन्स मंजुरी यांसारखे महत्त्वपूर्ण वैधानिक परवाने; यंत्रसामग्री सुरू करण्यापूर्वी कायदेशीररित्या बंधनकारक.',
      hindi_description: 'एमपीसीबी स्थापना सहमति और फैक्ट्री लाइसेंस अनुमोदन सहित महत्वपूर्ण वैधानिक मंजूरी; उपकरण चालू करने से पहले कानूनी रूप से बाध्यकारी।'
    },
    {
      phase: 4,
      name: 'Phase 4: Operational Licenses, Consents & Utility Connections',
      marathi_name: 'टप्पा ४: प्रत्यक्ष संचालन, वीज-पाणी जोडणी व अंतिम परवाने',
      hindi_name: 'चरण ४: संचालन लाइसेंस, बिजली-पानी कनेक्शन और अंतिम परमिट',
      description: 'Final physical inspections, industrial high-tension/low-tension power energization, piped water allotment, and MPCB Consent to Operate.',
      marathi_description: 'अंतिम भौतिक तपासणी, औद्योगिक उच्च/कमी दाबाची वीज जोडणी, पाणी वाटप आणि एमपीसिबी (MPCB) संमती.',
      hindi_description: 'अंतिम भौतिक निरीक्षण, औद्योगिक उच्च/निम्न-तनाव बिजली कनेक्शन, पाइप जलापूर्ति आवंटन, और एमपीसीबी संचालन सहमति।'
    }
  ];

  return phaseDefinitions
    .map((def) => {
      const items = approvals.filter((a) => a.stage_phase === def.phase);
      return {
        ...def,
        items
      };
    })
    .filter((group) => group.items.length > 0);
}

/**
 * Calculate key operational metrics for the generated checklist
 */
export function calculateMetrics(approvals: ApprovalRecord[]): ChecklistMetrics {
  const total = approvals.length;
  const mandatoryCount = approvals.filter((a) => a.mandatory_or_conditional === 'Mandatory').length;
  const conditionalCount = total - mandatoryCount;

  // Estimate timeline: Critical path is roughly the sum of sequential phase bottlenecks
  // Phase 1 (parallel ~5 days) + Phase 2 (~35 days) + Phase 3 (~45 days) + Phase 4 (~25 days)
  let estimatedDaysMin = 0;
  let estimatedDaysMax = 0;

  const phases = [1, 2, 3, 4] as const;
  phases.forEach((p) => {
    const phaseItems = approvals.filter((a) => a.stage_phase === p);
    if (phaseItems.length > 0) {
      const phaseMaxMin = Math.max(...phaseItems.map((i) => i.timeline_days_min));
      const phaseMaxMax = Math.max(...phaseItems.map((i) => i.timeline_days_max));
      estimatedDaysMin += phaseMaxMin;
      estimatedDaysMax += phaseMaxMax;
    }
  });

  const departmentSet = new Set(approvals.map((a) => a.department));
  const authoritySet = new Set(approvals.map((a) => a.issuing_authority));

  return {
    total,
    mandatoryCount,
    conditionalCount,
    estimatedDaysMin: Math.max(1, estimatedDaysMin),
    estimatedDaysMax: Math.max(1, estimatedDaysMax),
    departmentCount: departmentSet.size,
    authorities: Array.from(authoritySet)
  };
}

/**
 * Master engine entry point: generates complete, legally sequenced approval plan
 */
export function generateApprovalChecklist(profile: UserProfileInput): ChecklistResult {
  const filtered = filterApprovals(profile);
  const sorted = topologicalSortApprovals(filtered);
  const phaseGroups = groupIntoPhases(sorted);
  const metrics = calculateMetrics(sorted);
  const referenceId = generateReferenceId();
  const generatedAt = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    profile,
    approvals: sorted,
    phaseGroups,
    metrics,
    referenceId,
    generatedAt
  };
}

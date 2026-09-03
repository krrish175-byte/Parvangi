import { ScaleTier } from './types';

export interface MSMEClassificationDetails {
  tier: ScaleTier;
  title: string;
  marathi_title: string;
  investmentRange: string;
  turnoverRange: string;
  description: string;
  subsidiesEligible: string[];
}

export function classifyMSME(investmentInLakhs: number, turnoverInLakhs?: number): MSMEClassificationDetails {
  const effectiveTurnover = turnoverInLakhs ?? investmentInLakhs * 3;

  if (investmentInLakhs <= 100 && effectiveTurnover <= 500) {
    return {
      tier: 'micro',
      title: 'Micro Enterprise (सूक्ष्म उद्योग)',
      marathi_title: 'सूक्ष्म उद्योग',
      investmentRange: 'Investment up to ₹1 Crore',
      turnoverRange: 'Turnover up to ₹5 Crore',
      description: 'Ideal for workshops, individual entrepreneurs, and small food processing centers with minimal regulatory burden.',
      subsidiesEligible: [
        '100% Stamp Duty Exemption under Maharashtra PSI Scheme',
        'Electricity Duty Exemption for 7 years',
        'Interest subsidy up to 5% p.a.'
      ]
    };
  }

  if (investmentInLakhs <= 1000 && effectiveTurnover <= 5000) {
    return {
      tier: 'small',
      title: 'Small Enterprise (लघु उद्योग)',
      marathi_title: 'लघु उद्योग',
      investmentRange: 'Investment > ₹1 Cr up to ₹10 Crore',
      turnoverRange: 'Turnover up to ₹50 Crore',
      description: 'Standard industrial units with multi-machine production, dedicated worker teams, and formal safety compliances.',
      subsidiesEligible: [
        'Capital Subsidy up to 25% of Fixed Capital Investment',
        'Power Tariff Subsidy of ₹1 to ₹2 per unit for 3–5 years',
        'Industrial cluster infrastructure incentives'
      ]
    };
  }

  return {
    tier: 'medium',
    title: 'Medium Enterprise (मध्यम उद्योग)',
    marathi_title: 'मध्यम उद्योग',
    investmentRange: 'Investment > ₹10 Cr up to ₹50 Crore',
    turnoverRange: 'Turnover up to ₹250 Crore',
    description: 'High-throughput manufacturing or processing plants with formal environmental treatment infrastructure.',
    subsidiesEligible: [
      'Mega project facilitation via MIDC single-window FastTrack',
      'ETP/STP Green Technology grant up to ₹50 Lakhs',
      'Anchor unit tax incentives'
    ]
  };
}

export function formatINR(lakhs: number): string {
  if (lakhs < 100) {
    return `₹${lakhs} Lakhs`;
  }
  const crores = (lakhs / 100).toFixed(2).replace(/\.00$/, '');
  return `₹${crores} Crore${Number(crores) > 1 ? 's' : ''}`;
}

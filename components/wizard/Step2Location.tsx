'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { LocationType } from '@/lib/types';

interface Step2LocationProps {
  selectedLocation: LocationType;
  onSelect: (location: LocationType) => void;
}

export default function Step2Location({ selectedLocation, onSelect }: Step2LocationProps) {
  const { language } = useApp();

  const locations: {
    id: LocationType;
    title: string;
    marathiTitle: string;
    badge: string;
    jurisdictionAuthority: string;
    description: string;
    clearancesImpact: string;
    icon: string;
  }[] = [
    {
      id: 'midc',
      title: 'MIDC Industrial Estate / Industrial Zone',
      marathiTitle: 'एमआयडीसी औद्योगिक वसाहत',
      badge: 'Single Planning Authority',
      jurisdictionAuthority: 'MIDC Special Planning Authority (SPA) & MIDC Fire Dept.',
      description: 'Zoned industrial plots developed by Maharashtra Industrial Development Corporation with dedicated power, roads, and effluent pipelines.',
      clearancesImpact: 'Building plan approved directly by MIDC SPA; Fire NOC issued by MIDC Fire Officer; Water allotted by MIDC Water Works.',
      icon: '🏗️'
    },
    {
      id: 'municipal',
      title: 'Municipal Corporation / Municipal Council Area',
      marathiTitle: 'महानगरपालिका / नगरपरिषद क्षेत्र',
      badge: 'Urban Local Body (ULB)',
      jurisdictionAuthority: 'Local Municipal Corporation (e.g. BMC, PMC, PCMC, NMMC) & Town Planning',
      description: 'Urban municipal limits within city boundaries, industrial gallis, or notified commercial commercial zones.',
      clearancesImpact: 'Requires Municipal Trade License; Building plan sanctioned by ULB Town Planning; Fire NOC by Municipal Chief Fire Officer.',
      icon: '🏢'
    },
    {
      id: 'rural',
      title: 'Rural / Gram Panchayat Area (Outside MIDC/ULB)',
      marathiTitle: 'ग्रामीण / ग्रामपंचायत क्षेत्र',
      badge: 'District Collectorate & Panchayat',
      jurisdictionAuthority: 'Gram Panchayat & District Collectorate (Town Planning Branch)',
      description: 'Agricultural land converted to industrial use (Non-Agricultural NA permission) or Gaothan industrial belts.',
      clearancesImpact: 'Gram Panchayat Trade NOC; NA Order by District Collector / Sub-Divisional Officer (SDO); Rural water supply via MJP.',
      icon: '🌾'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gov-navy)' }}>
          {language === 'mr'
            ? 'टप्पा २: उद्योगाच्या जागेचे अधिकारक्षेत्र निवडा'
            : 'Step 2: Select Your Proposed Location Jurisdiction'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--gov-text-secondary)', marginTop: '4px' }}>
          {language === 'mr'
            ? 'जागेचे स्थान अत्यंत महत्त्वाचे आहे, कारण अधिकारक्षेत्र बदलल्यास बांधकाम मंजुरी, अग्निशमन दाखला व पाणी जोडणी देणारे प्राधिकरण बदलते.'
            : 'Location type dictates jurisdiction — determining whether MIDC, the local Municipal Corporation, or the Gram Panchayat sanctions your building plans and issues your Fire NOC.'}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}
      >
        {locations.map((loc) => {
          const isSelected = selectedLocation === loc.id;

          return (
            <div
              key={loc.id}
              onClick={() => onSelect(loc.id)}
              style={{
                backgroundColor: isSelected ? 'var(--gov-navy-subtle)' : '#ffffff',
                border: isSelected ? '2px solid var(--gov-navy)' : '1px solid var(--gov-border)',
                borderRadius: 'var(--gov-radius)',
                padding: '18px',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 3px 8px rgba(11, 56, 102, 0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(loc.id)}
              aria-pressed={isSelected}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid var(--gov-navy)' : '2px solid #94a3b8',
                      backgroundColor: '#ffffff',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ fontSize: '24px' }}>{loc.icon}</span>
                </div>

                <span
                  style={{
                    backgroundColor: isSelected ? '#dbeafe' : '#f1f5f9',
                    color: isSelected ? 'var(--gov-navy)' : 'var(--gov-text-muted)',
                    border: '1px solid #cbd5e1',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '3px'
                  }}
                >
                  {loc.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '3px' }}>
                {loc.title}
              </h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gov-saffron)', marginBottom: '8px' }}>
                {loc.marathiTitle}
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
                {loc.description}
              </p>

              <div
                style={{
                  backgroundColor: isSelected ? '#ffffff' : '#f8fafc',
                  border: '1px solid var(--gov-border-subtle)',
                  borderRadius: '3px',
                  padding: '9px 11px',
                  fontSize: '12px'
                }}
              >
                <div style={{ color: 'var(--gov-navy)', fontWeight: 700, marginBottom: '2px' }}>
                  ⚖️ {language === 'mr' ? 'अधिकारक्षेत्र परिणाम:' : 'Statutory Routing Impact:'}
                </div>
                <div style={{ color: 'var(--gov-text-muted)', lineHeight: 1.45 }}>
                  {loc.clearancesImpact}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

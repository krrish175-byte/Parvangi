'use client';

import React from 'react';
import { useApp } from '@/lib/context';

interface TrustBannerProps {
  referenceId: string;
  generatedAt: string;
}

export default function TrustBanner({ referenceId, generatedAt }: TrustBannerProps) {
  const { language } = useApp();

  return (
    <div
      style={{
        backgroundColor: '#0f2942',
        border: '1.5px solid var(--gov-saffron)',
        borderRadius: 'var(--gov-radius)',
        padding: '14px 18px',
        marginBottom: '20px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', maxWidth: '780px' }}>
        <span style={{ fontSize: '24px', flexShrink: 0 }}>🛡️</span>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '3px' }}>
            <strong style={{ fontSize: '14.5px', color: '#ffb74d' }}>
              {language === 'mr'
                ? 'अधिकृत वैधानिक नियम डेटाबेसमधून व्युत्पन्न — एआय अनुमान नाही'
                : 'Generated from a structured regulatory database — not AI-guessed.'}
            </strong>
            <span
              style={{
                backgroundColor: 'rgba(255, 153, 51, 0.25)',
                color: '#ffb74d',
                border: '1px solid #ff9933',
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '2px'
              }}
            >
              VERIFIED COMPLIANCE
            </span>
          </div>

          <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
            {language === 'mr' ? (
              <span>
                सदर अनुक्रम MIDC, महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB), औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH) आणि महाराष्ट्र नगररचना अधिनियम नियमावलीनुसार काटेकोरपणे क्रमबद्ध आहे. (उदा. कारखाना परवान्यापूर्वी MPCB CTE ची वैधानिक पूर्वअट अनिवार्य आहे).
              </span>
            ) : (
              <span>
                Every clearance in this schedule is strictly sequenced via topological dependency mapping according to the Factories Act 1948, Water/Air Acts, and Maharashtra Fire Safety Act 2006. (e.g. MPCB CTE is an explicit, statutory prerequisite before DISH Factory License application).
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Reference Stamp */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          border: '1px dashed #64748b',
          borderRadius: '3px',
          padding: '8px 14px',
          textAlign: 'right',
          flexShrink: 0
        }}
      >
        <div style={{ fontSize: '10.5px', color: '#94a3b8', textTransform: 'uppercase' }}>
          Verification Reference
        </div>
        <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.5px' }}>
          {referenceId}
        </div>
        <div style={{ fontSize: '10.5px', color: '#cbd5e1' }}>
          {generatedAt}
        </div>
      </div>
    </div>
  );
}

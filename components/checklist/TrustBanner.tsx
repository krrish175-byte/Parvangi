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
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', maxWidth: '780px' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 153, 51, 0.2)',
            border: '1.5px solid #ff9933',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px'
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffb74d" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
            <strong style={{ fontSize: '14.5px', color: '#ffb74d' }}>
              {language === 'mr'
                ? 'उद्योग संचालनालय अधिकृत वैधानिक नियामक अनुक्रम'
                : language === 'hi'
                ? 'उद्योग निदेशालय आधिकारिक वैधानिक नियामक अनुक्रम'
                : 'Directorate of Industries Statutory Regulatory Compliance Schedule'}
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
              {language === 'mr' ? 'सत्यापित अनुपालन' : language === 'hi' ? 'सत्यापित अनुपालन' : 'VERIFIED COMPLIANCE'}
            </span>
          </div>

          <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
            {language === 'mr' ? (
              <span>
                सदर अनुक्रम MIDC, महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB), औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH) आणि महाराष्ट्र नगररचना अधिनियम नियमावलीनुसार काटेकोरपणे क्रमबद्ध आहे. (उदा. कारखाना परवान्यापूर्वी MPCB CTE ची वैधानिक पूर्वअट अनिवार्य आहे).
              </span>
            ) : language === 'hi' ? (
              <span>
                इस अनुसूची में प्रत्येक निकासी कारखाना अधिनियम 1948, जल/वायु अधिनियम, और महाराष्ट्र अग्नि सुरक्षा अधिनियम 2006 के अनुसार वैधानिक निर्भरता मानचित्रण के माध्यम से कड़ाई से अनुक्रमित है। (उदा. DISH फैक्ट्री लाइसेंस आवेदन से पहले MPCB CTE एक स्पष्ट वैधानिक शर्त है)।
              </span>
            ) : (
              <span>
                Every clearance in this schedule is strictly sequenced via statutory dependency mapping according to the Factories Act 1948, Water/Air Acts, and Maharashtra Fire Safety Act 2006 (e.g. MPCB CTE is an explicit statutory prerequisite before DISH Factory License application).
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
          {language === 'mr' ? 'सत्यापन संदर्भ' : language === 'hi' ? 'सत्यापन संदर्भ' : 'Verification Reference'}
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

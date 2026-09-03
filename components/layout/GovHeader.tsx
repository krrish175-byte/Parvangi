'use client';

import React from 'react';
import { useApp } from '@/lib/context';

interface GovHeaderProps {
  onHomeClick?: () => void;
}

export default function GovHeader({ onHomeClick }: GovHeaderProps) {
  const { language } = useApp();

  return (
    <header className="gov-header">
      <div className="gov-container">
        <div className="gov-header-inner">
          <div
            className="gov-brand"
            style={{ cursor: 'pointer' }}
            onClick={onHomeClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onHomeClick?.()}
          >
            <div className="gov-emblem-container">
              {/* Maharashtra State Seal Representation */}
              <div className="gov-state-seal" title="महाराष्ट्र शासन राजमुद्रा">
                <svg viewBox="0 0 100 100" width="46" height="46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="46" stroke="#ffb74d" strokeWidth="3" fill="#002244" />
                  <circle cx="50" cy="50" r="41" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                  {/* Stylized Fort / Rajmudra Symbol */}
                  <polygon points="50,14 62,32 58,32 58,68 42,68 42,32 38,32" fill="#ff9933" />
                  <rect x="36" y="68" width="28" height="8" rx="1" fill="#ffffff" />
                  <circle cx="50" cy="46" r="6" fill="#002244" stroke="#ffffff" strokeWidth="1.5" />
                  <path d="M26 80 Q50 90 74 80" stroke="#ff9933" strokeWidth="2.5" fill="none" />
                  <text x="50" y="87" fill="#ffffff" fontSize="6.5" textAnchor="middle" fontWeight="bold">
                    सत्यमेव जयते
                  </text>
                </svg>
              </div>
            </div>

            <div className="gov-title-block">
              <span className="gov-title-marathi">
                महाराष्ट्र शासन · उद्योग, ऊर्जा, कामगार व कौशल्य विकास विभाग
              </span>
              <div className="gov-wordmark">
                <span>PARVANGI</span>
                <span className="gov-wordmark-devanagari">परवानगी</span>
              </div>
              <span className="gov-subtitle">
                {language === 'mr'
                  ? 'महाराष्ट्र राज्य नाविन्यता सोसायटी · सूक्ष्म व लघु उद्योगांसाठी वैधानिक परवानगी प्रणाली'
                  : 'Maharashtra State Innovation Society (MSIS) · Statutory Approval Checklist Engine'}
              </span>
            </div>
          </div>

          <div className="gov-header-meta no-print">
            <span className="gov-initiative-tag">
              {language === 'mr' ? 'राज्य नवोपक्रम व्यासपीठ' : 'State Innovation Initiative'}
            </span>
            <span className="gov-sih-tag">
              <strong>SIH26130</strong> · Govt of Maharashtra
            </span>
            <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
              ● {language === 'mr' ? 'नियम डेटाबेस अद्ययावत (फेब्रुवारी २०२५)' : 'Rules Database Live (Feb 2025)'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

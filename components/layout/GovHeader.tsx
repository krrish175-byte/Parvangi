'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';

interface GovHeaderProps {
  onHomeClick?: () => void;
}

export default function GovHeader({ onHomeClick }: GovHeaderProps) {
  const { language } = useApp();
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const formatDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const locale = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
      return now.toLocaleString(locale, options);
    };

    setCurrentDateTime(formatDateTime());
    const timer = setInterval(() => {
      setCurrentDateTime(formatDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [language]);

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
                {language === 'mr' ? 'महाराष्ट्र राज्य नाविन्यता सोसायटी · सूक्ष्म व लघु उद्योगांसाठी वैधानिक परवानगी प्रणाली' : language === 'hi' ? 'Maharashtra State Innovation Society (MSIS) · Statutory Approval Checklist Engine' : 'Maharashtra State Innovation Society (MSIS) · Statutory Approval Checklist Engine'}
              </span>
            </div>
          </div>

          <div className="gov-header-meta no-print">
            <span className="gov-initiative-tag">
              {language === 'mr' ? 'राज्य नवोपक्रम व्यासपीठ' : language === 'hi' ? 'राज्य नवाचार पहल' : 'State Innovation Initiative'}
            </span>
            {currentDateTime && (
              <span
                style={{
                  fontSize: '11px',
                  color: '#475569',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginTop: '2px',
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#002244' }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {currentDateTime}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

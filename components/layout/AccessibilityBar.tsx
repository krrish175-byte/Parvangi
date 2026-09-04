'use client';

import React from 'react';
import { useApp } from '@/lib/context';

export default function AccessibilityBar() {
  const { language, setLanguage } = useApp();

  return (
    <div className="gov-accessibility-strip no-print">
      <div className="gov-container">
        <div className="gov-strip-content">
          <div className="gov-strip-left">
            <span className="gov-strip-item">
              <span style={{ color: '#ff9933', fontWeight: 700 }}>🇮🇳</span>
              <span>
                {language === 'mr'
                  ? 'महाराष्ट्र शासन | महाराष्ट्र राज्य नाविन्यता सोसायटी'
                  : language === 'hi'
                  ? 'महाराष्ट्र शासन | महाराष्ट्र राज्य नवाचार सोसायटी'
                  : 'Government of Maharashtra | Maharashtra State Innovation Society'}
              </span>
            </span>
            <span className="gov-strip-item" style={{ borderLeft: '1px solid #1e3a5f', paddingLeft: '12px' }}>
              <span>{language === 'mr' ? 'हेल्पलाइन:' : language === 'hi' ? 'हेल्पलाइन:' : 'Citizen Toll-Free:'}</span>
              <strong style={{ color: '#ffb74d' }}>1800-120-8040</strong>
              <span style={{ opacity: 0.7 }}>(09:00 AM – 06:00 PM)</span>
            </span>
          </div>

          <div className="gov-strip-right">
            {/* Language Switcher */}
            <div className="gov-strip-item">
              <span style={{ fontSize: '11px', marginRight: '4px' }}>
                {language === 'mr' ? 'भाषा:' : language === 'hi' ? 'भाषा:' : 'Language:'}
              </span>
              <div className="gov-font-toggles" role="group" aria-label="Language controls">
                <button
                  type="button"
                  className={`gov-font-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => setLanguage('en')}
                  title="English"
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`gov-font-btn ${language === 'mr' ? 'active' : ''}`}
                  onClick={() => setLanguage('mr')}
                  title="मराठी"
                >
                  MR
                </button>
                <button
                  type="button"
                  className={`gov-font-btn ${language === 'hi' ? 'active' : ''}`}
                  onClick={() => setLanguage('hi')}
                  title="हिंदी"
                >
                  HI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/lib/context';

export default function AccessibilityBar() {
  const { language, setLanguage, fontSize, setFontSize, highContrast, setHighContrast } = useApp();
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(
        new Intl.DateTimeFormat('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'medium',
          timeZone: 'Asia/Kolkata'
        }).format(new Date())
      );
    };

    updateDateTime();
    const intervalId = window.setInterval(updateDateTime, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

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
                  : 'Government of Maharashtra | Maharashtra State Innovation Society'}
              </span>
            </span>
            <span className="gov-strip-item" style={{ borderLeft: '1px solid #1e3a5f', paddingLeft: '12px' }}>
              <span>{language === 'mr' ? 'हेल्पलाइन:' : 'Citizen Toll-Free:'}</span>
              <strong style={{ color: '#ffb74d' }}>1800-120-8040</strong>
              <span style={{ opacity: 0.7 }}>(09:00 AM – 06:00 PM)</span>
            </span>
          </div>

          <div className="gov-strip-right">
            <time className="gov-live-clock" dateTime={currentDateTime || undefined} aria-live="polite">
              {currentDateTime || 'Loading time...'}
            </time>

            {/* Font Size Scaling Controls */}
            <div className="gov-strip-item">
              <span style={{ fontSize: '11px', marginRight: '4px' }}>
                {language === 'mr' ? 'अक्षर आकार:' : 'Text Size:'}
              </span>
              <div className="gov-font-toggles" role="group" aria-label="Font size controls">
                <button
                  type="button"
                  className={`gov-font-btn ${fontSize === 'small' ? 'active' : ''}`}
                  onClick={() => setFontSize('small')}
                  aria-pressed={fontSize === 'small'}
                  title="Smaller Text"
                >
                  A-
                </button>
                <button
                  type="button"
                  className={`gov-font-btn ${fontSize === 'normal' ? 'active' : ''}`}
                  onClick={() => setFontSize('normal')}
                  aria-pressed={fontSize === 'normal'}
                  title="Normal Text"
                >
                  A
                </button>
                <button
                  type="button"
                  className={`gov-font-btn ${fontSize === 'large' ? 'active' : ''}`}
                  onClick={() => setFontSize('large')}
                  aria-pressed={fontSize === 'large'}
                  title="Larger Text"
                >
                  A+
                </button>
              </div>
            </div>

            <button
              type="button"
              className="gov-contrast-toggle"
              onClick={() => setHighContrast(!highContrast)}
              aria-pressed={highContrast}
              title="Toggle high contrast"
            >
              {language === 'mr' ? 'उच्च कॉन्ट्रास्ट' : 'Contrast'}
            </button>

            {/* Language Switcher */}
            <div className="gov-strip-item">
              <button
                type="button"
                className="gov-lang-toggle"
                onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
                title="Toggle Language"
              >
                {language === 'en' ? 'मराठी (MR)' : 'English (EN)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

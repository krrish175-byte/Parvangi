'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/lib/context';

export default function AccessibilityBar() {
  const { language, setLanguage, fontSize, setFontSize } = useApp();
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
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  width: '16px',
                  height: '11px',
                  borderRadius: '1px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.3)',
                  verticalAlign: 'middle',
                  marginRight: '6px'
                }}
                title="National Flag of India"
              >
                <span style={{ display: 'block', width: '100%', height: '33.3%', backgroundColor: '#FF9933' }} />
                <span style={{ display: 'block', width: '100%', height: '33.3%', backgroundColor: '#FFFFFF' }} />
                <span style={{ display: 'block', width: '100%', height: '33.3%', backgroundColor: '#138808' }} />
              </span>
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
              <span style={{ opacity: 0.7 }}>(09:00 AM - 06:00 PM)</span>
            </span>
          </div>

          <div className="gov-strip-right">
            <time className="gov-live-clock" dateTime={currentDateTime || undefined} aria-live="polite">
              {currentDateTime || 'Loading time...'}
            </time>

            {/* Font Size Scaling Controls */}
            <div className="gov-strip-item">
              <span style={{ fontSize: '11px', marginRight: '4px' }}>
                {language === 'mr' ? 'अक्षर आकार:' : language === 'hi' ? 'अक्षर आकार:' : 'Text Size:'}
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

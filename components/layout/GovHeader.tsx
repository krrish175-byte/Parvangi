'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/context';
import { getCurrentUser, isAdminLoggedIn, logout } from '@/lib/auth-store';
import { UserAccount } from '@/lib/types';

interface GovHeaderProps {
  onHomeClick?: () => void;
  onOpenAuth?: (tab: 'citizen_login' | 'citizen_signup' | 'admin_login') => void;
  onNavigateAdmin?: () => void;
}

export default function GovHeader({ onHomeClick, onOpenAuth, onNavigateAdmin }: GovHeaderProps) {
  const { language } = useApp();
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      setCurrentUser(getCurrentUser());
      setIsAdmin(isAdminLoggedIn());
    };
    checkAuth();
    window.addEventListener('parvangi_auth_change', checkAuth);
    return () => window.removeEventListener('parvangi_auth_change', checkAuth);
  }, []);

  const handleLogout = () => {
    logout();
  };

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
              {/* National Emblem of India (Local SVG) */}
              <div className="gov-national-emblem" title="भारत सरकारचे राजचिन्ह / State Emblem of India">
                <Image
                  src="/emblem-of-india.svg"
                  alt="State Emblem of India"
                  width={34}
                  height={44}
                  priority
                />
              </div>

              <div className="gov-emblem-divider" aria-hidden="true" />

              {/* Official PARVANGI Project Logo */}
              <div className="gov-project-logo" title="PARVANGI (परवानगी) — अधिकृत बोधचिन्ह">
                <Image
                  src="/logo.png"
                  alt="PARVANGI Official Project Logo"
                  width={54}
                  height={54}
                  priority
                />
              </div>
            </div>

            <div className="gov-title-block">
              <span className="gov-title-marathi">
                {language === 'mr'
                  ? 'महाराष्ट्र शासन · उद्योग, ऊर्जा, कामगार व कौशल्य विकास विभाग'
                  : language === 'hi'
                  ? 'महाराष्ट्र शासन · उद्योग, ऊर्जा, श्रम एवं कौशल विकास विभाग'
                  : 'Government of Maharashtra · Industry, Energy, Labour & Skill Development Dept.'}
              </span>
              <div className="gov-wordmark">
                <span>PARVANGI</span>
                <span className="gov-wordmark-devanagari">परवानगी</span>
              </div>
              <span className="gov-subtitle">
                {language === 'mr'
                  ? 'महाराष्ट्र राज्य नाविन्यता सोसायटी · सूक्ष्म व लघु उद्योगांसाठी वैधानिक परवानगी प्रणाली'
                  : language === 'hi'
                  ? 'महाराष्ट्र राज्य नवाचार सोसायटी · सूक्ष्म व लघु उद्योगों के लिए वैधानिक मंजूरी प्रणाली'
                  : 'Maharashtra State Innovation Society (MSIS) · Statutory Approval Checklist Engine'}
              </span>
            </div>
          </div>

          <div className="gov-header-actions no-print" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Authentication Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isAdmin ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={onNavigateAdmin}
                    style={{
                      backgroundColor: '#991b1b',
                      color: '#ffffff',
                      border: 'none',
                      padding: '5px 12px',
                      borderRadius: '3px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>🛡️</span>
                    <span>{language === 'mr' ? 'अधिकारी कक्ष (DIC)' : language === 'hi' ? 'अधिकारी कक्ष' : 'Officer Console (DIC)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#64748b',
                      border: '1px solid #cbd5e1',
                      padding: '4px 8px',
                      borderRadius: '3px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      backgroundColor: '#eff6ff',
                      color: 'var(--gov-navy)',
                      border: '1px solid #bfdbfe',
                      padding: '4px 8px',
                      borderRadius: '3px',
                      fontSize: '11.5px',
                      fontWeight: 700
                    }}
                  >
                    👤 {currentUser.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#64748b',
                      border: '1px solid #cbd5e1',
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => onOpenAuth?.('citizen_login')}
                    style={{
                      backgroundColor: 'var(--gov-navy)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '5px 12px',
                      borderRadius: '3px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>👤</span>
                    <span>{language === 'mr' ? 'नागरिक लॉगिन' : language === 'hi' ? 'नागरिक लॉगिन' : 'Citizen Sign In'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenAuth?.('admin_login')}
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#991b1b',
                      border: '1px solid #f87171',
                      padding: '4px 10px',
                      borderRadius: '3px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>🛡️</span>
                    <span>{language === 'mr' ? 'अधिकारी' : language === 'hi' ? 'अधिकारी' : 'Officer'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

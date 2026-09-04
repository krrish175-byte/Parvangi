'use client';

import React, { useState, useEffect } from 'react';
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
              {/* Maharashtra State Seal Representation */}
              <div className="gov-state-seal" title="महाराष्ट्र शासन राजमुद्रा">
                <svg viewBox="0 0 100 100" width="46" height="46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="46" stroke="#ffb74d" strokeWidth="3" fill="#002244" />
                  <circle cx="50" cy="50" r="41" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" fill="none" />
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

          <div className="gov-header-meta no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            {/* Authentication Strip in Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {isAdmin ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={onNavigateAdmin}
                    style={{
                      backgroundColor: '#991b1b',
                      color: '#ffffff',
                      border: 'none',
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
                    <span>{language === 'mr' ? 'अधिकारी कक्ष (DIC)' : 'Officer Console (DIC)'}</span>
                  </button>
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
              ) : currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      backgroundColor: '#eff6ff',
                      color: 'var(--gov-navy)',
                      border: '1px solid #bfdbfe',
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontSize: '11.5px',
                      fontWeight: 700
                    }}
                  >
                    👤 {currentUser.name} (Age: {currentUser.age})
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
                    <span>{language === 'mr' ? 'नागरिक लॉगिन' : 'Citizen Sign In'}</span>
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
                    <span>{language === 'mr' ? 'अधिकारी' : 'Officer'}</span>
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

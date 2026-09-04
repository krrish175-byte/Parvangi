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
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const checkAuth = () => {
      setCurrentUser(getCurrentUser());
      setIsAdmin(isAdminLoggedIn());
    };
    checkAuth();
    window.addEventListener('parvangi_auth_change', checkAuth);
    return () => window.removeEventListener('parvangi_auth_change', checkAuth);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentDateTime(now.toLocaleString('en-IN', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
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
              {/* National Emblem of India */}
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

              {/* Official PARVANGI Seal / Logo */}
              <div className="gov-project-logo" title="PARVANGI (परवानगी) - अधिकृत बोधचिन्ह">
                <Image
                  src="/logo.png"
                  alt="PARVANGI Official Project Logo"
                  width={48}
                  height={48}
                  priority
                />
              </div>
            </div>

            <div className="gov-title-block">
              <span className="gov-title-marathi">
                {language === 'mr'
                  ? 'महाराष्ट्र शासन · उद्योग संचालनालय'
                  : language === 'hi'
                  ? 'महाराष्ट्र शासन · उद्योग निदेशालय'
                  : 'Government of Maharashtra · Directorate of Industries'}
              </span>
              <div className="gov-wordmark">
                <span>PARVANGI</span>
                <span className="gov-wordmark-devanagari">परवानगी</span>
              </div>
              <span className="gov-subtitle">
                {language === 'mr'
                  ? 'औद्योगिक वैधानिक मंजुरी व एकल खिडकी अनुपालन प्रणाली'
                  : language === 'hi'
                  ? 'औद्योगिक वैधानिक अनुमोदन एवं एकल खिड़की अनुपालन प्रणाली'
                  : 'Statutory Regulatory Sequencing & Single Window Compliance Portal'}
              </span>
            </div>
          </div>

          <div className="gov-header-actions no-print" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {currentDateTime && (
              <div
                style={{
                  fontSize: '11px',
                  color: '#475569',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <svg
                  width="13"
                  height="13"
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
              </div>
            )}

            <div>
              {isAdmin ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={onNavigateAdmin}
                    style={{
                      backgroundColor: '#991b1b',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '3px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {language === 'mr' ? 'अधिकारी नियंत्रण कक्ष' : 'Officer Console (DIC)'}
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#64748b',
                      border: '1px solid #cbd5e1',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      backgroundColor: '#eff6ff',
                      color: 'var(--gov-navy)',
                      border: '1px solid #bfdbfe',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      fontSize: '11.5px',
                      fontWeight: 700
                    }}
                  >
                    {currentUser.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#64748b',
                      border: '1px solid #cbd5e1',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenAuth?.('citizen_login')}
                  style={{
                    backgroundColor: 'var(--gov-navy)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '3px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {language === 'mr' ? 'पोर्टल प्रवेश' : language === 'hi' ? 'पोर्टल लॉगिन' : 'Portal Login'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

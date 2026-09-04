'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { isAdminLoggedIn } from '@/lib/auth-store';
import { getAllApplications } from '@/lib/application-store';

interface GovNavBarProps {
  currentView: 'home' | 'wizard' | 'checklist' | 'directory' | 'maitri_gap' | 'admin';
  onNavigate: (view: 'home' | 'wizard' | 'checklist' | 'directory' | 'maitri_gap' | 'admin') => void;
  hasExistingChecklist?: boolean;
}

export default function GovNavBar({ currentView, onNavigate, hasExistingChecklist }: GovNavBarProps) {
  const { language } = useApp();
  const [isAdmin, setIsAdmin] = useState(false);
  const [appCount, setAppCount] = useState(0);

  useEffect(() => {
    const update = () => {
      setIsAdmin(isAdminLoggedIn());
      setAppCount(getAllApplications().length);
    };
    update();
    window.addEventListener('parvangi_auth_change', update);
    window.addEventListener('parvangi_applications_change', update);
    return () => {
      window.removeEventListener('parvangi_auth_change', update);
      window.removeEventListener('parvangi_applications_change', update);
    };
  }, []);

  return (
    <nav className="gov-nav-bar no-print" aria-label="Main Navigation">
      <div className="gov-container">
        <ul className="gov-nav-list">
          <li
            className={`gov-nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            <span>🏛️</span>
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : language === 'hi' ? 'होम' : 'Home'}</span>
          </li>

          {hasExistingChecklist && (
            <li
              className={`gov-nav-item ${currentView === 'checklist' ? 'active' : ''}`}
              onClick={() => onNavigate('checklist')}
            >
              <span>📋</span>
              <span>{language === 'mr' ? 'माझी परवानगी सूची (Checklist)' : language === 'hi' ? 'मेरी सक्रिय सूची' : 'My Active Checklist'}</span>
            </li>
          )}

          {isAdmin && (
            <li
              className={`gov-nav-item ${currentView === 'admin' ? 'active' : ''}`}
              onClick={() => onNavigate('admin')}
              style={{
                backgroundColor: currentView === 'admin' ? '#7f1d1d' : '#991b1b',
                marginLeft: 'auto'
              }}
            >
              <span>🛡️</span>
              <span>{language === 'mr' ? 'अधिकारी नियंत्रण कक्ष' : language === 'hi' ? 'अधिकारी नियंत्रण कक्ष' : 'Officer Console'}</span>
              <span
                style={{
                  backgroundColor: '#ffffff',
                  color: '#991b1b',
                  fontSize: '9.5px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: 800
                }}
              >
                {appCount}
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

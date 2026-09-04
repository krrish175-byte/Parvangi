'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { isAdminLoggedIn } from '@/lib/auth-store';
import { getAllApplications } from '@/lib/application-store';

interface GovNavBarProps {
  currentView: 'home' | 'wizard' | 'checklist' | 'directory' | 'admin';
  onNavigate: (view: 'home' | 'wizard' | 'checklist' | 'directory' | 'admin') => void;
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
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : language === 'hi' ? 'होम' : 'Home'}</span>
          </li>

          <li
            className={`gov-nav-item highlight-cta ${currentView === 'wizard' ? 'active' : ''}`}
            onClick={() => onNavigate('wizard')}
          >
            <span>{language === 'mr' ? 'मंजुरी आवश्यकता पडताळणी' : language === 'hi' ? 'स्वीकृति आवश्यकता जांचें' : 'Statutory Clearance Wizard'}</span>
          </li>

          {hasExistingChecklist && (
            <li
              className={`gov-nav-item ${currentView === 'checklist' ? 'active' : ''}`}
              onClick={() => onNavigate('checklist')}
            >
              <span>{language === 'mr' ? 'माझी सक्रिय मंजुरी सूची' : language === 'hi' ? 'सक्रिय चेकलिस्ट' : 'My Active Checklist'}</span>
            </li>
          )}

          <li
            className={`gov-nav-item ${currentView === 'directory' ? 'active' : ''}`}
            onClick={() => onNavigate('directory')}
          >
            <span>{language === 'mr' ? 'वैधानिक मंजुरी मार्गदर्शिका' : language === 'hi' ? 'वैधानिक निर्देशिका' : 'Approvals Repository'}</span>
          </li>

          {isAdmin && (
            <li
              className={`gov-nav-item ${currentView === 'admin' ? 'active' : ''}`}
              onClick={() => onNavigate('admin')}
              style={{
                backgroundColor: currentView === 'admin' ? '#7f1d1d' : '#991b1b',
                marginLeft: 'auto'
              }}
            >
              <span>{language === 'mr' ? 'अधिकारी नियंत्रण कक्ष' : language === 'hi' ? 'अधिकारी नियंत्रण कक्ष' : 'Officer Scrutiny Console'}</span>
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

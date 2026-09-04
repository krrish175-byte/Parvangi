'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { Home, Zap, ClipboardList, BookOpen, Scale } from 'lucide-react';

interface GovNavBarProps {
  currentView: 'home' | 'wizard' | 'checklist' | 'directory' | 'maitri_gap';
  onNavigate: (view: 'home' | 'wizard' | 'checklist' | 'directory' | 'maitri_gap' | 'what_if') => void;
  hasExistingChecklist?: boolean;
  onOpenWhatIf?: () => void;
}

export default function GovNavBar({ currentView, onNavigate, hasExistingChecklist, onOpenWhatIf }: GovNavBarProps) {
  const { language } = useApp();

  return (
    <nav className="gov-nav-bar no-print" aria-label="Main Navigation">
      <div className="gov-container">
        <ul className="gov-nav-list">
          <li
            className={`gov-nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            <Home size={15} />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </li>

          <li
            className={`gov-nav-item highlight-cta ${currentView === 'wizard' ? 'active' : ''}`}
            onClick={() => onNavigate('wizard')}
          >
            <Zap size={15} />
            <span>{language === 'mr' ? 'नवीन परवानगी तपासा (Wizard)' : 'Check What You Need'}</span>
            <span
              style={{
                backgroundColor: '#ffffff',
                color: '#bf360c',
                fontSize: '9.5px',
                padding: '1px 5px',
                borderRadius: '2px',
                fontWeight: 800
              }}
            >
              NEW
            </span>
          </li>

          {/* ⚡ WHAT-IF ENGINE FEATURE ITEM */}
          <li
            className="gov-nav-item"
            onClick={onOpenWhatIf}
            style={{
              backgroundColor: 'rgba(255, 153, 51, 0.15)',
              border: '1px solid #ff9933',
              color: '#ffb74d',
              fontWeight: 700
            }}
          >
            <Zap size={15} color="#ff9933" />
            <span>{language === 'mr' ? '⚡ What-If सिम्युलेटर' : '⚡ What-If Engine'}</span>
            <span
              style={{
                backgroundColor: '#ff9933',
                color: '#000000',
                fontSize: '9px',
                padding: '1px 4px',
                borderRadius: '2px',
                fontWeight: 900
              }}
            >
              SIMULATOR
            </span>
          </li>

          {hasExistingChecklist && (
            <li
              className={`gov-nav-item ${currentView === 'checklist' ? 'active' : ''}`}
              onClick={() => onNavigate('checklist')}
            >
              <ClipboardList size={15} />
              <span>{language === 'mr' ? 'माझी परवानगी सूची (Checklist)' : 'My Active Checklist'}</span>
            </li>
          )}

          <li
            className={`gov-nav-item ${currentView === 'directory' ? 'active' : ''}`}
            onClick={() => onNavigate('directory')}
          >
            <BookOpen size={15} />
            <span>{language === 'mr' ? 'सर्व १६ परवानग्या (Repository)' : 'Know Your Approvals'}</span>
          </li>

          <li
            className={`gov-nav-item ${currentView === 'maitri_gap' ? 'active' : ''}`}
            onClick={() => onNavigate('maitri_gap')}
          >
            <Scale size={15} />
            <span>{language === 'mr' ? 'MAITRI 2.0 तुलना (The Gap)' : 'MAITRI 2.0 vs Parvangi'}</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}


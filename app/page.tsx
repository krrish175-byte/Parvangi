'use client';

import React, { useState } from 'react';
import { ChecklistResult, UserProfileInput } from '@/lib/types';
import { generateApprovalChecklist, ALL_APPROVALS } from '@/lib/rules-engine';
import AccessibilityBar from '@/components/layout/AccessibilityBar';
import GovHeader from '@/components/layout/GovHeader';
import GovNavBar from '@/components/layout/GovNavBar';
import NoticeTicker from '@/components/layout/NoticeTicker';
import GovFooter from '@/components/layout/GovFooter';
import HeroBanner from '@/components/home/HeroBanner';
import QuickLinksRow from '@/components/home/QuickLinksRow';
import WizardContainer from '@/components/wizard/WizardContainer';
import ChecklistDashboard from '@/components/checklist/ChecklistDashboard';
import TrackChecklistModal from '@/components/tracking/TrackChecklistModal';
import ApprovalsDirectoryModal from '@/components/directory/ApprovalsDirectoryModal';
import MaitriGapModal from '@/components/home/MaitriGapModal';
import HelpdeskModal from '@/components/helpdesk/HelpdeskModal';
import { useApp } from '@/lib/context';

const SAVED_CHECKLIST_KEY = 'parvangi-saved-checklist';

function getSavedChecklist(): ChecklistResult | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = window.localStorage.getItem(SAVED_CHECKLIST_KEY);
    return saved ? (JSON.parse(saved) as ChecklistResult) : null;
  } catch {
    return null;
  }
}

export default function HomePage() {
  const { language } = useApp();

  const [savedChecklist] = useState<ChecklistResult | null>(() => getSavedChecklist());
  const [currentView, setCurrentView] = useState<'home' | 'wizard' | 'checklist' | 'directory' | 'maitri_gap'>(
    savedChecklist ? 'checklist' : 'home'
  );
  const [activeResult, setActiveResult] = useState<ChecklistResult | null>(savedChecklist);
  const [profileForEdit, setProfileForEdit] = useState<UserProfileInput | undefined>(undefined);

  // Modals
  const [showTrackModal, setShowTrackModal] = useState<boolean>(false);
  const [showDirectoryModal, setShowDirectoryModal] = useState<boolean>(false);
  const [showMaitriModal, setShowMaitriModal] = useState<boolean>(false);
  const [showHelpdeskModal, setShowHelpdeskModal] = useState<boolean>(false);

  // Handlers
  const handleStartWizard = () => {
    setProfileForEdit(undefined);
    setCurrentView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChecklistGenerated = (result: ChecklistResult) => {
    setActiveResult(result);
    window.localStorage.setItem(SAVED_CHECKLIST_KEY, JSON.stringify(result));
    setCurrentView('checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModifyProfile = () => {
    if (activeResult) {
      setProfileForEdit(activeResult.profile);
    }
    setCurrentView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSampleProfile = (profile: UserProfileInput) => {
    const result = generateApprovalChecklist(profile);
    setActiveResult(result);
    window.localStorage.setItem(SAVED_CHECKLIST_KEY, JSON.stringify(result));
    setShowTrackModal(false);
    setCurrentView('checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Official Tricolor National Stripe */}
      <div className="gov-tricolor-stripe no-print" />

      {/* Accessibility Strip */}
      <AccessibilityBar />

      {/* Header */}
      <GovHeader onHomeClick={() => setCurrentView('home')} />

      {/* Navigation Bar */}
      <GovNavBar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'directory') {
            setShowDirectoryModal(true);
          } else if (view === 'maitri_gap') {
            setShowMaitriModal(true);
          } else {
            setCurrentView(view);
          }
        }}
        hasExistingChecklist={Boolean(activeResult)}
      />

      {/* Official Notice Ticker */}
      <NoticeTicker />

      {/* Main Content Area */}
      <main id="main-content" style={{ flex: 1 }}>
        {/* VIEW 1: HOMEPAGE */}
        {currentView === 'home' && (
          <div>
            {savedChecklist && activeResult && (
              <div className="saved-checklist-banner gov-container no-print">
                <div>
                  <strong>{language === 'mr' ? 'तुमची जतन केलेली तपासणी उपलब्ध आहे' : 'Your saved checklist is ready'}</strong>
                  <span>{language === 'mr' ? 'तुमचा मागील परवानगी अनुक्रम पुन्हा उघडा.' : 'Resume your previous approval roadmap.'}</span>
                </div>
                <button type="button" className="btn-gov-secondary" onClick={() => setCurrentView('checklist')}>
                  {language === 'mr' ? 'पुन्हा उघडा' : 'Resume Checklist'}
                </button>
              </div>
            )}

            <HeroBanner
              onStartWizard={handleStartWizard}
              onViewDirectory={() => setShowDirectoryModal(true)}
              onViewMaitriGap={() => setShowMaitriModal(true)}
            />

            <QuickLinksRow
              onStartWizard={handleStartWizard}
              onTrackChecklist={() => setShowTrackModal(true)}
              onViewDirectory={() => setShowDirectoryModal(true)}
              onViewHelpdesk={() => setShowHelpdeskModal(true)}
            />

            {/* Why Maharashtra Entrepreneurs Trust Parvangi Section */}
            <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--gov-border)', padding: '36px 0 40px 0' }}>
              <div className="gov-container">
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <span
                      style={{
                        backgroundColor: 'var(--gov-navy-subtle)',
                        color: 'var(--gov-navy)',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '2px',
                        letterSpacing: '0.4px',
                        textTransform: 'uppercase'
                      }}
                    >
                      THE VERIFIABLE COMPLIANCE ARCHITECTURE
                    </span>
                    <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--gov-navy-dark)', marginTop: '8px' }}>
                      {language === 'mr'
                        ? 'परवानगी हे इतर साधनांपेक्षा वेगळे कसे आहे?'
                        : 'How Parvangi Eliminates the Compliance Roadblock'}
                    </h2>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                    <div className="gov-card" style={{ borderTop: '3px solid var(--gov-navy)' }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎯</div>
                      <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                        {language === 'mr' ? 'सूक्ष्म उद्योजकांसाठी विशेष' : 'Built for the ₹10-Lakh Founder'}
                      </h3>
                      <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', lineHeight: 1.55 }}>
                        While MAITRI focuses on ₹10 Cr+ large investments, Parvangi is tailored for small workshops, food processors, and fabrication units setting up with personal savings.
                      </p>
                    </div>

                    <div className="gov-card" style={{ borderTop: '3px solid var(--gov-saffron)' }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚖️</div>
                      <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                        {language === 'mr' ? 'कायदेशीर पूर्वअटींची खात्री' : 'Strict Legal Precedence'}
                      </h3>
                      <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', lineHeight: 1.55 }}>
                        Guarantees that prerequisite approvals (e.g. MPCB CTE must precede DISH Factory License) are executed in strictly valid statutory sequence to prevent costly civil modifications.
                      </p>
                    </div>

                    <div className="gov-card" style={{ borderTop: '3px solid var(--gov-green)' }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛡️</div>
                      <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                        {language === 'mr' ? 'सत्यापित नियम डेटाबेस' : 'Deterministic Rules Engine'}
                      </h3>
                      <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', lineHeight: 1.55 }}>
                        Flat, version-controlled regulatory dataset matching MIDC, MPCB, and DISH official frameworks. Verifiable rules — never guessed by generative hallucinations.
                      </p>
                    </div>
                  </div>

                  {/* Launch CTA Banner */}
                  <div
                    style={{
                      marginTop: '28px',
                      backgroundColor: 'var(--gov-navy-subtle)',
                      border: '1.5px solid #bfdbfe',
                      borderRadius: 'var(--gov-radius)',
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '14.5px', color: 'var(--gov-navy)' }}>
                        {language === 'mr' ? 'आपला उद्योग सुरू करण्यास सज्ज आहात?' : 'Ready to verify your approval roadmap?'}
                      </strong>
                      <div style={{ fontSize: '12px', color: 'var(--gov-text-muted)' }}>
                        Takes less than 60 seconds across 4 simple guided steps.
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-gov-primary"
                      onClick={handleStartWizard}
                      style={{ fontSize: '13.5px', padding: '10px 22px' }}
                    >
                      Start Free Wizard →
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: 4-STEP WIZARD */}
        {currentView === 'wizard' && (
          <WizardContainer
            initialProfile={profileForEdit}
            onChecklistGenerated={handleChecklistGenerated}
            onCancel={() => setCurrentView(activeResult ? 'checklist' : 'home')}
          />
        )}

        {/* VIEW 3: CHECKLIST DASHBOARD */}
        {currentView === 'checklist' && activeResult && (
          <ChecklistDashboard
            result={activeResult}
            onModifyProfile={handleModifyProfile}
            onRestartWizard={handleStartWizard}
          />
        )}
      </main>

      {/* Official Government Footer */}
      <GovFooter />

      {/* MODALS */}
      {showTrackModal && (
        <TrackChecklistModal
          onClose={() => setShowTrackModal(false)}
          onLoadProfile={handleLoadSampleProfile}
        />
      )}

      {showDirectoryModal && (
        <ApprovalsDirectoryModal onClose={() => setShowDirectoryModal(false)} />
      )}

      {showMaitriModal && (
        <MaitriGapModal
          onClose={() => setShowMaitriModal(false)}
          onStartWizard={() => {
            setShowMaitriModal(false);
            handleStartWizard();
          }}
        />
      )}

      {showHelpdeskModal && (
        <HelpdeskModal onClose={() => setShowHelpdeskModal(false)} />
      )}
    </div>
  );
}

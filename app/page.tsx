'use client';

import React, { useEffect, useState } from 'react';
import { ChecklistResult, UserProfileInput } from '@/lib/types';
import { generateApprovalChecklist } from '@/lib/rules-engine';
import AccessibilityBar from '@/components/layout/AccessibilityBar';
import GovHeader from '@/components/layout/GovHeader';
import GovNavBar from '@/components/layout/GovNavBar';
import NoticeTicker from '@/components/layout/NoticeTicker';
import GovFooter from '@/components/layout/GovFooter';
import HeroBanner from '@/components/home/HeroBanner';
import QuickLinksRow from '@/components/home/QuickLinksRow';
import HomeImpactSection from '@/components/home/HomeImpactSection';
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

  const [savedChecklist, setSavedChecklist] = useState<ChecklistResult | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'wizard' | 'checklist' | 'directory' | 'maitri_gap'>('home');
  const [activeResult, setActiveResult] = useState<ChecklistResult | null>(null);
  const [profileForEdit, setProfileForEdit] = useState<UserProfileInput | undefined>(undefined);

  useEffect(() => {
    const saved = getSavedChecklist();
    if (saved) {
      setSavedChecklist(saved);
      setActiveResult(saved);
    }
  }, []);

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
    setSavedChecklist(result);
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
    setSavedChecklist(result);
    window.localStorage.setItem(SAVED_CHECKLIST_KEY, JSON.stringify(result));
    setShowTrackModal(false);
    setCurrentView('checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSavedChecklist = (result: ChecklistResult) => {
    setActiveResult(result);
    setSavedChecklist(result);
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
      <GovHeader
        onHomeClick={() => setCurrentView('home')}
        onSearchSelect={() => {
          setShowDirectoryModal(true);
          setCurrentView('home');
        }}
      />

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
            />

            <QuickLinksRow
              onStartWizard={handleStartWizard}
              onTrackChecklist={() => setShowTrackModal(true)}
              onViewDirectory={() => setShowDirectoryModal(true)}
              onViewHelpdesk={() => setShowHelpdeskModal(true)}
            />

            <HomeImpactSection />

            {/* Official Statutory Framework & Legal Precedence Section */}
            <section className="gov-statutory-section" aria-label="Statutory Framework and Legal Mandates">
              <div className="gov-container">
                <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <span className="gov-section-tag">
                      {language === 'mr' ? 'कायदेशीर वैधानिक चौकट' : 'STATUTORY REGULATORY MANDATES'}
                    </span>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gov-navy-dark)', marginTop: '8px', letterSpacing: '-0.3px' }}>
                      {language === 'mr'
                        ? 'महाराष्ट्र शासनाचे वैधानिक कायदे आणि कायदेशीर पूर्वअटींची खात्री'
                        : 'Statutory Acts, Legal Precedence & Regulatory Guarantees'}
                    </h2>
                    <p style={{ fontSize: '13.5px', color: 'var(--gov-text-secondary)', maxWidth: '780px', margin: '8px auto 0 auto', lineHeight: 1.6 }}>
                      {language === 'mr'
                        ? 'परवानगी इंजिन हे खालील अधिकृत संसदीय व राज्य कायदे आणि नियमावलीनुसार पूर्वअटींचा काटेकोर क्रम निश्चित करते.'
                        : 'Every approval sequence generated by Parvangi is anchored in state and central statutory frameworks, ensuring complete legal compliance and zero circular delays.'}
                    </p>
                  </div>

                  <div className="gov-framework-grid">
                    <div className="gov-framework-card" style={{ borderTop: '4px solid #d97706' }}>
                      <div className="gov-framework-header">
                        <span className="gov-framework-icon">🏭</span>
                        <span className="gov-framework-act-id">Act No. 63 of 1948</span>
                      </div>
                      <h3 className="gov-framework-title">
                        {language === 'mr' ? 'कारखाना कायदा १९४८ व महाराष्ट्र नियम १९६३' : 'The Factories Act, 1948 & Maharashtra Rules'}
                      </h3>
                      <div className="gov-framework-dept">
                        {language === 'mr' ? 'औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH)' : 'Directorate of Industrial Safety & Health (DISH)'}
                      </div>
                      <p className="gov-framework-desc">
                        {language === 'mr'
                          ? 'कलम ६ व नियम ३ अंतर्गत बांधकाम सुरू करण्यापूर्वी कारखाना नकाशा मंजुरी अनिवार्य आहे. व्यावसायिक उत्पादन सुरू करण्यापूर्वी अधिकृत कारखाना परवाना मिळणे आवश्यक आहे.'
                          : 'Mandates prior approval of factory architectural & machinery layouts under Section 6 before civil erection. Factory License is obligatory prior to running manufacturing operations.'}
                      </p>
                    </div>

                    <div className="gov-framework-card" style={{ borderTop: '4px solid #059669' }}>
                      <div className="gov-framework-header">
                        <span className="gov-framework-icon">🌿</span>
                        <span className="gov-framework-act-id">Acts 6/1974 & 14/1981</span>
                      </div>
                      <h3 className="gov-framework-title">
                        {language === 'mr' ? 'जल व वायू प्रदूषण प्रतिबंधक कायदे' : 'Water Act 1974 & Air Act 1981'}
                      </h3>
                      <div className="gov-framework-dept">
                        {language === 'mr' ? 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)' : 'Maharashtra Pollution Control Board (MPCB)'}
                      </div>
                      <p className="gov-framework-desc">
                        {language === 'mr'
                          ? 'कोणत्याही औद्योगिक बांधकामापूर्वी किंवा यंत्रसामग्री बसवण्यापूर्वी स्थापना संमती (Consent to Establish - CTE) घेणे कायदेशीर अनिवार्य आहे. प्रकल्प कार्यान्वित करण्यापूर्वी संचालन संमती (CTO) आवश्यक आहे.'
                          : 'Prohibits setting up manufacturing facilities without prior Consent to Establish (CTE). Subsequent Consent to Operate (CTO) is statutory prior to plant commissioning.'}
                      </p>
                    </div>

                    <div className="gov-framework-card" style={{ borderTop: '4px solid #dc2626' }}>
                      <div className="gov-framework-header">
                        <span className="gov-framework-icon">🚒</span>
                        <span className="gov-framework-act-id">Mah. Act III of 2007</span>
                      </div>
                      <h3 className="gov-framework-title">
                        {language === 'mr' ? 'महाराष्ट्र अग्निसुरक्षा व जीवनरक्षा कायदा २००६' : 'Maharashtra Fire Prevention Act, 2006'}
                      </h3>
                      <div className="gov-framework-dept">
                        {language === 'mr' ? 'महाराष्ट्र अग्निशमन सेवा व स्थानिक नियोजन प्राधिकरण' : 'Maharashtra Fire Services & Planning Authorities'}
                      </div>
                      <p className="gov-framework-desc">
                        {language === 'mr'
                          ? 'औद्योगिक इमारतीचे बांधकाम सुरू करण्यापूर्वी तात्पुरती अग्निसुरक्षा NOC अनिवार्य असून अंतिम भोगवटा प्रमाणपत्रासाठी (Occupancy) अंतिम फायर NOC आवश्यक ठरते.'
                          : 'Requires Provisional Fire NOC prior to commencement of structural works. Final Fire Safety Certificate is mandatory before grant of Building Occupancy Certificate.'}
                      </p>
                    </div>

                    <div className="gov-framework-card" style={{ borderTop: '4px solid #2563eb' }}>
                      <div className="gov-framework-header">
                        <span className="gov-framework-icon">⚡</span>
                        <span className="gov-framework-act-id">Mah. Act XXXI of 2015</span>
                      </div>
                      <h3 className="gov-framework-title">
                        {language === 'mr' ? 'महाराष्ट्र लोकसेवा हक्क कायदा व EODB धोरण' : 'Maharashtra Right to Public Services Act & EODB'}
                      </h3>
                      <div className="gov-framework-dept">
                        {language === 'mr' ? 'उद्योग, ऊर्जा व कामगार विभाग, महाराष्ट्र शासन' : 'Industries, Energy & Labour Department'}
                      </div>
                      <p className="gov-framework-desc">
                        {language === 'mr'
                          ? 'नागरिकांना विहीत कालमर्यादेत पारदर्शक सेवा देण्याची कायदेशीर हमी. परवानगी प्रणालीमुळे अर्जांचा अयोग्य क्रम टळतो आणि परवानग्या वेळेत मिळतात.'
                          : 'Statutory guarantee of time-bound public services. Eliminates circular rejections and redundant fees by ordering approvals in verifiable prerequisite progression.'}
                      </p>
                    </div>
                  </div>

                  {/* Official Launch Callout Banner */}
                  <div className="gov-launch-banner">
                    <div>
                      <strong style={{ fontSize: '15px', color: 'var(--gov-navy-dark)', display: 'block', marginBottom: '3px' }}>
                        {language === 'mr' ? 'आपला उद्योग सुरू करण्यासाठी वैधानिक सूची तपासा' : 'Verify your statutory approval roadmap in 4 guided steps'}
                      </strong>
                      <div style={{ fontSize: '12px', color: 'var(--gov-text-muted)' }}>
                        {language === 'mr'
                          ? 'कोणत्याही लॉगिनशिवाय, विनामूल्य व संपूर्ण पारदर्शक नियामक पडताळणी.'
                          : 'Open public service · Zero registration fee · Instant statutory clearance certificate generation.'}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-gov-primary"
                      onClick={handleStartWizard}
                      style={{ fontSize: '13.5px', padding: '10px 24px', whiteSpace: 'nowrap' }}
                      id="statutory-framework-start-btn"
                    >
                      {language === 'mr' ? 'नवीन तपासणी सुरू करा →' : 'Launch Approval Engine →'}
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
            onCancel={() => setCurrentView('home')}
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
          savedChecklist={savedChecklist}
          onLoadSavedResult={handleLoadSavedChecklist}
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

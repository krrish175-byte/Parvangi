'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { BusinessStage, ChecklistResult, LocationType, ScaleTier, UserProfileInput } from '@/lib/types';
import { generateApprovalChecklist } from '@/lib/rules-engine';
import WizardStepper from './WizardStepper';
import Step1Category from './Step1Category';
import Step2Location from './Step2Location';
import Step3Scale from './Step3Scale';
import Step4Stage from './Step4Stage';

interface WizardContainerProps {
  initialProfile?: UserProfileInput;
  onChecklistGenerated: (result: ChecklistResult) => void;
  onCancel: () => void;
}

const MAHARASHTRA_DISTRICTS = [
  'Pune',
  'Thane',
  'Mumbai Suburban',
  'Mumbai City',
  'Nashik',
  'Chhatrapati Sambhaji Nagar (Aurangabad)',
  'Nagpur',
  'Kolhapur',
  'Solapur',
  'Ahmednagar',
  'Satara',
  'Sangli',
  'Raigad',
  'Palghar',
  'Amravati',
  'Nanded',
  'Jalgaon',
  'Latur',
  'Chandrapur',
  'Dhule',
  'Other Maharashtra District'
];

export default function WizardContainer({
  initialProfile,
  onChecklistGenerated,
  onCancel
}: WizardContainerProps) {
  const { language } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxStepAllowed, setMaxStepAllowed] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Form State
  const [category, setCategory] = useState<string>(initialProfile?.category || 'small_manufacturing');
  const [location, setLocation] = useState<LocationType>(initialProfile?.location || 'midc');
  const [investmentInLakhs, setInvestmentInLakhs] = useState<number>(initialProfile?.investmentInLakhs || 45);
  const [scaleTier, setScaleTier] = useState<ScaleTier>(initialProfile?.scale || 'micro');
  const [stage, setStage] = useState<BusinessStage>(initialProfile?.stage || 'new_unit');
  const [district, setDistrict] = useState<string>(initialProfile?.district || 'Pune');

  const goToNextStep = () => {
    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setMaxStepAllowed((prev) => Math.max(prev, next));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      handleComplete();
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleComplete = () => {
    if (isGenerating) return;

    setIsGenerating(true);
    const profile: UserProfileInput = {
      category,
      location,
      scale: scaleTier,
      investmentInLakhs,
      stage,
      district
    };

    window.setTimeout(() => {
      const result = generateApprovalChecklist(profile);
      onChecklistGenerated(result);
      setIsGenerating(false);
    }, 250);
  };

  return (
    <section style={{ padding: '28px 0 48px 0' }}>
      <div className="gov-container">
        {/* Breadcrumb / Top Bar */}
        <div className="wizard-top-bar" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: 'var(--gov-text-muted)' }}>
            <span
              style={{ color: 'var(--gov-navy)', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={onCancel}
            >
              {language === 'mr' ? 'मुख्यपृष्ठ' : language === 'hi' ? 'होम' : 'Home'}
            </span>{' '}
            / {language === 'mr' ? 'वैयक्तिक परवानगी इंजिन' : language === 'hi' ? 'व्यक्तिगत अनुमोदन इंजन' : 'Personalized Approval Engine'}
          </div>

          <button
            type="button"
            className="btn-gov-outline-danger"
            onClick={onCancel}
            title="Cancel and return to home"
          >
            ✕ {language === 'mr' ? 'रद्द करा' : language === 'hi' ? 'रद्द करें' : 'Cancel'}
          </button>
        </div>

        {/* 4-Step Visual Stepper */}
        <WizardStepper
          currentStep={currentStep}
          maxStepAllowed={maxStepAllowed}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Main Wizard Form Card */}
        <div className="gov-card wizard-form-card" style={{ padding: '28px' }}>
          {/* Step 1: Category */}
          {currentStep === 1 && (
            <Step1Category
              selectedCategory={category}
              onSelect={(catId) => setCategory(catId)}
            />
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div>
              <Step2Location
                selectedLocation={location}
                onSelect={(loc) => setLocation(loc)}
              />

              {/* District Dropdown (Helpful for DIC routing) */}
              <div
                style={{
                  marginTop: '24px',
                  padding: '14px 18px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--gov-border)',
                  borderRadius: 'var(--gov-radius)'
                }}
              >
                <label
                  htmlFor="district-select"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '6px' }}
                >
                  📍 {language === 'mr' ? 'महाराष्ट्रातील जिल्हा निवडा:' : language === 'hi' ? 'महाराष्ट्र में जिले का चयन करें:' : 'Select District in Maharashtra:'}
                </label>
                <select
                  id="district-select"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    padding: '8px 12px',
                    fontSize: '13.5px',
                    border: '1px solid #94a3b8',
                    borderRadius: '3px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {MAHARASHTRA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)', marginTop: '4px' }}>
                  {language === 'mr' ? 'हे तुमचे संबंधित जिल्हा उद्योग केंद्र (DIC) आणि MPCB चे प्रादेशिक कार्यालय निश्चित करण्यासाठी वापरले जाते.' : language === 'hi' ? 'आपके विशिष्ट जिला उद्योग केंद्र (DIC) और क्षेत्रीय MPCB उप-क्षेत्रीय कार्यालय की पहचान करने के लिए उपयोग किया जाता है।' : 'Used to identify your specific District Industries Centre (DIC) and regional MPCB sub-regional office.'}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Scale */}
          {currentStep === 3 && (
            <Step3Scale
              investmentInLakhs={investmentInLakhs}
              onInvestmentChange={(val) => setInvestmentInLakhs(val)}
              scaleTier={scaleTier}
              onScaleTierChange={(tier) => setScaleTier(tier)}
            />
          )}

          {/* Step 4: Stage */}
          {currentStep === 4 && (
            <Step4Stage
              selectedStage={stage}
              onSelect={(stg) => setStage(stg)}
            />
          )}

          {/* Navigation Bar */}
          <div
            className="wizard-navigation"
            style={{
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '2px solid var(--gov-border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              {currentStep > 1 ? (
                <button
                  type="button"
                  className="btn-gov-outline"
                  onClick={goToPrevStep}
                >
                  ← {language === 'mr' ? 'मागे' : language === 'hi' ? 'पीछे' : 'Back'}
                </button>
              ) : (
              <span style={{ fontSize: '12px', color: 'var(--gov-text-muted)' }}>
                {language === 'mr' ? '४ पैकी टप्पा १: उद्योग प्रकार' : language === 'hi' ? '4 में से चरण 1: व्यवसाय श्रेणी' : 'Step 1 of 4: Business Category'}
              </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--gov-text-muted)', fontWeight: 600 }}>
                {language === 'mr' ? `टप्पा ${currentStep} / ४` : language === 'hi' ? `चरण ${currentStep} / 4` : `Step ${currentStep} of 4`}
              </span>

              {currentStep < 4 ? (
                <button
                  type="button"
                  className="btn-gov-secondary"
                  onClick={goToNextStep}
                >
                  <span>{language === 'mr' ? 'पुढील टप्पा' : language === 'hi' ? 'अगले चरण पर जारी रखें' : 'Continue to Next Step'}</span>
                  <span>→</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-gov-primary"
                  onClick={goToNextStep}
                  disabled={isGenerating}
                  style={{ fontSize: '15px', padding: '12px 28px' }}
                >
                  <span>{isGenerating ? '⏳' : '⚡'}</span>
                  <span>
                    {language === 'mr' ? 'माझी वैधानिक परवानगी सूची तयार करा' : language === 'hi' ? 'मेरी अनुमोदन चेकलिस्ट जनरेट करें' : 'Generate My Approval Checklist'}
                    {isGenerating
                      ? language === 'mr' ? 'तयार होत आहे...' : 'Generating...'
                      : language === 'mr'
                      ? 'माझी वैधानिक परवानगी सूची तयार करा'
                      : 'Generate My Approval Checklist'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

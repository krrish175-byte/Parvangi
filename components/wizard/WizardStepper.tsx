'use client';

import React from 'react';
import { useApp } from '@/lib/context';

interface WizardStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  maxStepAllowed: number;
}

export default function WizardStepper({ currentStep, onStepClick, maxStepAllowed }: WizardStepperProps) {
  const { language } = useApp();

  const steps = [
    {
      step: 1,
      name: language === 'mr' ? '१. उद्योग प्रकार' : language === 'hi' ? '१. श्रेणी' : '1. Category',
      subtext: language === 'mr' ? 'कामाचे स्वरूप' : language === 'hi' ? 'क्षेत्र / व्यापार' : 'Sector / Trade'
    },
    {
      step: 2,
      name: language === 'mr' ? '२. जागेचे स्थान' : language === 'hi' ? '२. स्थान' : '2. Location',
      subtext: language === 'mr' ? 'MIDC / मनपा / ग्रामीण' : language === 'hi' ? 'अधिकार क्षेत्र' : 'Jurisdiction'
    },
    {
      step: 3,
      name: language === 'mr' ? '३. गुंतवणूक व आकार' : language === 'hi' ? '३. आकार (MSME)' : '3. Scale (MSME)',
      subtext: language === 'mr' ? 'भांडवल / कामगार' : language === 'hi' ? 'पूंजी और आकार' : 'Capital & Sizing'
    },
    {
      step: 4,
      name: language === 'mr' ? '४. प्रकल्प टप्पा' : language === 'hi' ? '४. परियोजना चरण' : '4. Project Stage',
      subtext: language === 'mr' ? 'नवीन / विस्तार' : language === 'hi' ? 'नया / विस्तार' : 'New / Expansion'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--gov-border)',
        borderRadius: 'var(--gov-radius)',
        padding: '16px 20px',
        marginBottom: '24px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}
      aria-label="Wizard Steps"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          position: 'relative'
        }}
      >
        {steps.map((s) => {
          const isActive = s.step === currentStep;
          const isCompleted = s.step < currentStep;
          const isClickable = s.step <= maxStepAllowed;

          return (
            <div
              key={s.step}
              onClick={() => isClickable && onStepClick?.(s.step)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '3px',
                backgroundColor: isActive
                  ? 'var(--gov-navy-subtle)'
                  : isCompleted
                  ? '#f0fdf4'
                  : 'transparent',
                border: isActive
                  ? '1.5px solid var(--gov-navy)'
                  : isCompleted
                  ? '1px solid #bbf7d0'
                  : '1px solid transparent',
                cursor: isClickable ? 'pointer' : 'default',
                opacity: isClickable ? 1 : 0.6
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isActive
                    ? 'var(--gov-navy)'
                    : isCompleted
                    ? 'var(--gov-green)'
                    : '#cbd5e1',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {isCompleted ? '✓' : s.step}
              </div>

              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive
                      ? 'var(--gov-navy-dark)'
                      : isCompleted
                      ? 'var(--gov-green)'
                      : 'var(--gov-text-muted)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{
                    fontSize: '10.5px',
                    color: 'var(--gov-text-muted)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  {s.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

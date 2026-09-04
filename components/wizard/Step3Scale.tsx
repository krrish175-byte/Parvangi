'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { ScaleTier } from '@/lib/types';
import { classifyMSME, formatINR } from '@/lib/msme-classifier';

const MIN_INVESTMENT_LAKHS = 5;
const MAX_INVESTMENT_LAKHS = 5000;

interface Step3ScaleProps {
  investmentInLakhs: number;
  onInvestmentChange: (val: number) => void;
  scaleTier: ScaleTier;
  onScaleTierChange: (tier: ScaleTier) => void;
}

export default function Step3Scale({
  investmentInLakhs,
  onInvestmentChange,
  scaleTier,
  onScaleTierChange
}: Step3ScaleProps) {
  const { language } = useApp();

  const presets = [
    {
      label: '₹10 Lakhs',
      lakhs: 10,
      tier: 'micro' as ScaleTier,
      tag: 'Micro · First-Time Artisan / Bakery',
      description: 'Minimum capital investment'
    },
    {
      label: '₹45 Lakhs',
      lakhs: 45,
      tier: 'micro' as ScaleTier,
      tag: 'Micro · CNC Machine Workshop',
      description: 'Standard single-shift unit'
    },
    {
      label: '₹2.50 Crores',
      lakhs: 250,
      tier: 'small' as ScaleTier,
      tag: 'Small · Automated Manufacturing',
      description: '10–25 worker factory'
    },
    {
      label: '₹15.00 Crores',
      lakhs: 1500,
      tier: 'medium' as ScaleTier,
      tag: 'Medium · Processing Plant',
      description: 'Industrial line & boilers'
    }
  ];

  const currentClassification = classifyMSME(investmentInLakhs);

  const updateInvestment = (value: number) => {
    const normalizedValue = Math.min(MAX_INVESTMENT_LAKHS, Math.max(MIN_INVESTMENT_LAKHS, value));
    onInvestmentChange(normalizedValue);
    onScaleTierChange(classifyMSME(normalizedValue).tier);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInvestment(Number(e.target.value));
  };

  const handlePresetSelect = (p: (typeof presets)[0]) => {
    onInvestmentChange(p.lakhs);
    onScaleTierChange(p.tier);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gov-navy)' }}>
          {language === 'mr'
            ? 'टप्पा ३: भांडवली गुंतवणूक व MSME वर्गीकरण'
            : 'Step 3: Investment Scale & MSME Sizing'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--gov-text-secondary)', marginTop: '4px' }}>
          {language === 'mr'
            ? 'उद्यम नोंदणी, प्रदूषण नियंत्रण शुल्क (MPCB Fees) आणि फॅक्टरी लायसन्सचे निकष भांडवली गुंतवणुकीनुसार ठरतात.'
            : 'Udyam registration tier, MPCB application fee slabs, and Factory Act worker thresholds depend on fixed capital investment in plant and machinery.'}
        </p>
      </div>

      {/* Quick Select Presets */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
          {language === 'mr' ? 'जलद निवड (सामान्य उदाहरणे):' : 'One-Click Investment Presets:'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {presets.map((p) => {
            const isMatch = investmentInLakhs === p.lakhs;
            return (
              <button
                type="button"
                key={p.label}
                onClick={() => handlePresetSelect(p)}
                style={{
                  padding: '10px 14px',
                  backgroundColor: isMatch ? 'var(--gov-navy)' : '#ffffff',
                  color: isMatch ? '#ffffff' : 'var(--gov-text-primary)',
                  border: isMatch ? '1.5px solid var(--gov-navy)' : '1px solid var(--gov-border)',
                  borderRadius: 'var(--gov-radius)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: isMatch ? '0 2px 5px rgba(11, 56, 102, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '15px' }}>{p.label}</strong>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      backgroundColor: isMatch ? 'var(--gov-saffron)' : 'var(--gov-navy-subtle)',
                      color: isMatch ? '#ffffff' : 'var(--gov-navy)',
                      padding: '1px 5px',
                      borderRadius: '2px'
                    }}
                  >
                    {p.tier.toUpperCase()}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: isMatch ? '#cbd5e1' : 'var(--gov-text-muted)',
                    marginTop: '3px'
                  }}
                >
                  {p.tag}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Capital Amount Input & Range Slider */}
      <div
        className="gov-card"
        style={{
          marginBottom: '20px',
          borderLeft: '4px solid var(--gov-navy)',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <label
              htmlFor="investment-input"
              style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: 'var(--gov-navy)' }}
            >
              {language === 'mr'
                ? 'यंत्रसामग्री व उपकरणांमधील अंदाजे भांडवली गुंतवणूक (₹ लाख):'
                : 'Estimated Investment in Plant & Machinery (in ₹ Lakhs):'}
            </label>
            <span style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)' }}>
              {language === 'mr' ? 'जमीन व इमारतीचा खर्च वगळून' : 'Excluding land & building cost'}
            </span>
          </div>

          <div className="investment-value-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gov-navy)' }}>₹</span>
            <input
              id="investment-input"
              type="number"
              min={MIN_INVESTMENT_LAKHS}
              max={MAX_INVESTMENT_LAKHS}
              value={investmentInLakhs}
              onChange={(e) => updateInvestment(Number(e.target.value))}
              style={{
                width: '120px',
                padding: '8px 10px',
                fontSize: '16px',
                fontWeight: 700,
                border: '2px solid var(--gov-navy)',
                borderRadius: '3px',
                textAlign: 'right'
              }}
            />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Lakhs</span>
            <span
              style={{
                backgroundColor: 'var(--gov-saffron-light)',
                color: 'var(--gov-saffron)',
                border: '1px solid var(--gov-saffron-border)',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '3px',
                fontSize: '14px'
              }}
            >
              = {formatINR(investmentInLakhs)}
            </span>
          </div>
        </div>

        {/* Range Slider */}
        <div style={{ marginTop: '16px' }}>
          <input
            type="range"
            min={MIN_INVESTMENT_LAKHS}
            max={MAX_INVESTMENT_LAKHS}
            step="1"
            value={Math.min(MAX_INVESTMENT_LAKHS, Math.max(MIN_INVESTMENT_LAKHS, investmentInLakhs))}
            onChange={handleSliderChange}
            style={{
              width: '100%',
              accentColor: 'var(--gov-navy)',
              cursor: 'pointer'
            }}
          />
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', textAlign: 'center', marginTop: '6px' }}>
            {language === 'mr' ? 'निवडलेली गुंतवणूक:' : 'Selected investment:'} ₹{investmentInLakhs} Lakhs ({formatINR(investmentInLakhs)})
          </div>
        </div>
      </div>

      {/* Internal Classification Result Banner */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid #002244',
          borderRadius: 'var(--gov-radius)',
          padding: '16px 20px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🏷️</span>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--gov-text-muted)', fontWeight: 700 }}>
                {language === 'mr' ? 'अधिकृत एमएसएमई वर्गीकरण' : 'Official MSME Sizing Category'}
              </div>
              <strong style={{ fontSize: '17px', color: 'var(--gov-navy-dark)' }}>
                {currentClassification.title}
              </strong>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--gov-green-light)',
              color: 'var(--gov-green)',
              border: '1px solid var(--gov-green-border)',
              padding: '4px 10px',
              borderRadius: '3px',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            ✓ {currentClassification.investmentRange}
          </div>
        </div>

        <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', marginBottom: '10px' }}>
          {currentClassification.description}
        </p>

        {/* Incentives Callout */}
        <div style={{ borderTop: '1px solid var(--gov-border-subtle)', paddingTop: '10px', marginTop: '10px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
            💰 {language === 'mr' ? 'पात्र राज्य औद्योगिक प्रोत्साहने (PSI Scheme):' : 'Key Applicable State Incentives (Maharashtra PSI):'}
          </div>
          <ul style={{ listStyleType: 'square', paddingLeft: '18px', fontSize: '12px', color: 'var(--gov-text-muted)' }}>
            {currentClassification.subsidiesEligible.map((sub, i) => (
              <li key={i}>{sub}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

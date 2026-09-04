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
  scaleTier?: ScaleTier;
  onScaleTierChange: (tier: ScaleTier) => void;
}

export default function Step3Scale({
  investmentInLakhs,
  onInvestmentChange,
  onScaleTierChange
}: Step3ScaleProps) {
  const { language } = useApp();
  const [investmentError, setInvestmentError] = React.useState<string>('');

  const presets = [
    {
      label: language === 'mr' ? '₹१० लाख' : language === 'hi' ? '₹10 लाख' : '₹10 Lakhs',
      lakhs: 10,
      tier: 'micro' as ScaleTier,
      tag: language === 'mr' ? 'सूक्ष्म · नवउद्योजक / बेकरी' : language === 'hi' ? 'सूक्ष्म · पहली बार कारीगर / बेकरी' : 'Micro · First-Time Artisan / Bakery',
      description: 'Minimum capital investment'
    },
    {
      label: language === 'mr' ? '₹४५ लाख' : language === 'hi' ? '₹45 लाख' : '₹45 Lakhs',
      lakhs: 45,
      tier: 'micro' as ScaleTier,
      tag: language === 'mr' ? 'सूक्ष्म · CNC मशीन वर्कशॉप' : language === 'hi' ? 'सूक्ष्म · सीएनसी मशीन वर्कशॉप' : 'Micro · CNC Machine Workshop',
      description: 'Standard single-shift unit'
    },
    {
      label: language === 'mr' ? '₹२.५० कोटी' : language === 'hi' ? '₹2.50 करोड़' : '₹2.50 Crores',
      lakhs: 250,
      tier: 'small' as ScaleTier,
      tag: language === 'mr' ? 'लघु · स्वयंचलित उत्पादन' : language === 'hi' ? 'लघु · स्वचालित विनिर्माण' : 'Small · Automated Manufacturing',
      description: '10–25 worker factory'
    },
    {
      label: language === 'mr' ? '₹१५.०० कोटी' : language === 'hi' ? '₹15.00 करोड़' : '₹15.00 Crores',
      lakhs: 1500,
      tier: 'medium' as ScaleTier,
      tag: language === 'mr' ? 'मध्यम · प्रोसेसिंग प्लांट' : language === 'hi' ? 'मध्यम · प्रसंस्करण संयंत्र' : 'Medium · Processing Plant',
      description: 'Industrial line & boilers'
    }
  ];

  const currentClassification = classifyMSME(investmentInLakhs);

  const updateInvestment = (value: number) => {
    const normalizedValue = Math.min(MAX_INVESTMENT_LAKHS, Math.max(MIN_INVESTMENT_LAKHS, value));
    onInvestmentChange(normalizedValue);
    onScaleTierChange(classifyMSME(normalizedValue).tier);
    setInvestmentError('');
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
            : language === 'hi'
            ? 'उद्यम पंजीकरण स्तर, MPCB आवेदन शुल्क स्लैब, और फैक्ट्री अधिनियम कार्यकर्ता सीमा संयंत्र और मशीनरी में निश्चित पूंजी निवेश पर निर्भर करती है।'
            : 'Udyam registration tier, MPCB application fee slabs, and Factory Act worker thresholds depend on fixed capital investment in plant and machinery.'}
        </p>
      </div>

      {/* Quick Select Presets */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
          {language === 'mr' ? 'जलद निवड (सामान्य उदाहरणे):' : language === 'hi' ? 'एक-क्लिक निवेश प्रीसेट:' : 'One-Click Investment Presets:'}
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
                : language === 'hi'
                ? 'संयंत्र और मशीनरी में अनुमानित निवेश (₹ लाख में):'
                : 'Estimated Investment in Plant & Machinery (in ₹ Lakhs):'}
            </label>
            <span style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)' }}>
              {language === 'mr' ? 'जमीन व इमारतीचा खर्च वगळून' : language === 'hi' ? 'भूमि और भवन लागत को छोड़कर' : 'Excluding land & building cost'}
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
              onChange={(e) => {
                const rawValue = e.target.value.trim();
                const value = Number(rawValue);
                if (!rawValue || !Number.isFinite(value) || value < MIN_INVESTMENT_LAKHS || value > MAX_INVESTMENT_LAKHS) {
                  setInvestmentError(
                    language === 'mr'
                      ? `कृपया ₹${MIN_INVESTMENT_LAKHS} ते ₹${MAX_INVESTMENT_LAKHS} लाखांदरम्यान रक्कम निवडा.`
                      : language === 'hi'
                      ? `कृपया ₹${MIN_INVESTMENT_LAKHS} से ₹${MAX_INVESTMENT_LAKHS} लाख के बीच निवेश दर्ज करें।`
                      : `Enter an investment between ₹${MIN_INVESTMENT_LAKHS} and ₹${MAX_INVESTMENT_LAKHS} lakhs.`
                  );
                  return;
                }
                updateInvestment(value);
              }}
              onBlur={(e) => {
                const rawValue = e.target.value.trim();
                const value = Number(rawValue);
                if (!rawValue || !Number.isFinite(value) || value < MIN_INVESTMENT_LAKHS || value > MAX_INVESTMENT_LAKHS) {
                  setInvestmentError(
                    language === 'mr'
                      ? `कृपया ₹${MIN_INVESTMENT_LAKHS} ते ₹${MAX_INVESTMENT_LAKHS} लाखांदरम्यान रक्कम निवडा.`
                      : language === 'hi'
                      ? `कृपया ₹${MIN_INVESTMENT_LAKHS} से ₹${MAX_INVESTMENT_LAKHS} लाख के बीच निवेश दर्ज करें।`
                      : `Enter an investment between ₹${MIN_INVESTMENT_LAKHS} and ₹${MAX_INVESTMENT_LAKHS} lakhs.`
                  );
                }
              }}
              aria-invalid={Boolean(investmentError)}
              aria-describedby={investmentError ? 'investment-error' : undefined}
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
            <span style={{ fontSize: '14px', fontWeight: 600 }}>{language === 'mr' ? 'लाख' : language === 'hi' ? 'लाख' : 'Lakhs'}</span>
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
          {investmentError && (
            <div id="investment-error" role="alert" style={{ width: '100%', color: 'var(--gov-status-mandatory)', fontSize: '12px', marginTop: '6px' }}>
              {investmentError}
            </div>
          )}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--gov-text-muted)', marginTop: '4px' }}>
            <span>{language === 'mr' ? '₹५ लाख (सूक्ष्म)' : language === 'hi' ? '₹5 लाख (सूक्ष्म)' : '₹5 Lakhs (Micro)'}</span>
            <span>{language === 'mr' ? '₹१०० लाख (₹१ कोटी मर्यादा)' : language === 'hi' ? '₹100 लाख (₹1 करोड़ सीमा)' : '₹100 Lakhs (₹1 Cr Threshold)'}</span>
            <span>{language === 'mr' ? '₹५०० लाख (₹५ कोटी)' : language === 'hi' ? '₹500 लाख (₹5 करोड़)' : '₹500 Lakhs (₹5 Cr)'}</span>
            <span>{language === 'mr' ? '₹१००० लाख (₹१० कोटी लघु मर्यादा)' : language === 'hi' ? '₹1000 लाख (₹10 करोड़ लघु सीमा)' : '₹1000 Lakhs (₹10 Cr Small Limit)'}</span>
            <span>{language === 'mr' ? '₹१५०० लाख+ (मध्यम)' : language === 'hi' ? '₹1500 लाख+ (मध्यम)' : '₹1500 Lakhs+ (Medium)'}</span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', textAlign: 'center', marginTop: '6px' }}>
            {language === 'mr' ? 'निवडलेली गुंतवणूक:' : language === 'hi' ? 'चयनित निवेश:' : 'Selected investment:'} ₹{investmentInLakhs} Lakhs ({formatINR(investmentInLakhs)})
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
                {language === 'mr' ? 'अधिकृत एमएसएमई वर्गीकरण' : language === 'hi' ? 'आधिकारिक एमएसएमई आकार श्रेणी' : 'Official MSME Sizing Category'}
              </div>
              <strong style={{ fontSize: '17px', color: 'var(--gov-navy-dark)' }}>
                {language === 'mr' ? currentClassification.marathi_title : language === 'hi' ? currentClassification.hindi_title : currentClassification.title}
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
            ✓ {language === 'mr' ? currentClassification.marathi_investmentRange : language === 'hi' ? currentClassification.hindi_investmentRange : currentClassification.investmentRange}
          </div>
        </div>

        <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', marginBottom: '10px' }}>
          {language === 'mr' ? currentClassification.marathi_description : language === 'hi' ? currentClassification.hindi_description : currentClassification.description}
        </p>

        {/* Incentives Callout */}
        <div style={{ borderTop: '1px solid var(--gov-border-subtle)', paddingTop: '10px', marginTop: '10px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
            💰 {language === 'mr' ? 'पात्र राज्य औद्योगिक प्रोत्साहने (PSI Scheme):' : language === 'hi' ? 'प्रमुख लागू राज्य प्रोत्साहन (महाराष्ट्र पीएसआई):' : 'Key Applicable State Incentives (Maharashtra PSI):'}
          </div>
          <ul style={{ listStyleType: 'square', paddingLeft: '18px', fontSize: '12px', color: 'var(--gov-text-muted)' }}>
            {(language === 'mr' ? currentClassification.marathi_subsidiesEligible : language === 'hi' ? currentClassification.hindi_subsidiesEligible : currentClassification.subsidiesEligible).map((sub, i) => (
              <li key={i}>{sub}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

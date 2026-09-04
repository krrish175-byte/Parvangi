'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { Zap, Search, ShieldCheck, CheckCircle2, Star, ArrowRight, Building, MapPin, DollarSign } from 'lucide-react';

interface HeroBannerProps {
  onStartWizard: () => void;
  onViewDirectory: () => void;
  onViewMaitriGap: () => void;
}

export default function HeroBanner({
  onStartWizard,
  onViewDirectory,
  onViewMaitriGap
}: HeroBannerProps) {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'evaluate' | 'track'>('evaluate');

  return (
    <section
      style={{
        position: 'relative',
        backgroundImage: 'linear-gradient(90deg, rgba(0, 28, 56, 0.92) 0%, rgba(0, 34, 68, 0.84) 45%, rgba(0, 34, 68, 0.72) 100%), url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        borderBottom: '4px solid var(--gov-saffron)',
        padding: '36px 0 44px 0'
      }}
    >
      <div className="gov-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}
        >
          
          {/* LEFT COLUMN: IRCTC-Style Floating White Evaluation Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
              overflow: 'hidden',
              borderTop: '4px solid var(--gov-saffron)'
            }}
          >
            {/* Card Header Tabs */}
            <div style={{ display: 'flex', backgroundColor: '#002244', color: '#ffffff' }}>
              <button
                type="button"
                onClick={() => setActiveTab('evaluate')}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  backgroundColor: activeTab === 'evaluate' ? '#ffffff' : '#002244',
                  color: activeTab === 'evaluate' ? 'var(--gov-navy)' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Zap size={15} color={activeTab === 'evaluate' ? 'var(--gov-saffron)' : '#94a3b8'} />
                <span>{language === 'mr' ? 'नवीन परवानगी तपासा' : 'GET CHECKLIST'}</span>
              </button>

              <button
                type="button"
                onClick={onViewDirectory}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  backgroundColor: '#001a35',
                  color: '#e2e8f0',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Search size={15} />
                <span>{language === 'mr' ? 'सर्व १६ परवानग्या' : 'ALL 16 CLEARANCES'}</span>
              </button>
            </div>

            {/* Form Inputs inside IRCTC Card */}
            <div style={{ padding: '22px 20px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--gov-navy-dark)', marginBottom: '14px' }}>
                {language === 'mr'
                  ? 'उद्योगासाठी लागणाऱ्या परवानग्या शोधा'
                  : 'Evaluate Statutory Clearances'}
              </h3>

              {/* Input 1: Sector */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px', textTransform: 'uppercase' }}>
                  {language === 'mr' ? 'उद्योगाचा प्रकार (Sector):' : '1. Business Sector / Type'}
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 34px',
                      fontSize: '13.5px',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '4px',
                      backgroundColor: '#f8fafc',
                      fontWeight: 600
                    }}
                  >
                    <option>Small Manufacturing / Workshop</option>
                    <option>Food Processing & Agro Unit</option>
                    <option>Textile & Garment Unit</option>
                    <option>Chemical & Plastic Processing</option>
                    <option>Engineering & Auto Ancillary</option>
                    <option>IT & Digital Services</option>
                  </select>
                  <Building size={16} color="var(--gov-navy)" style={{ position: 'absolute', left: '10px', top: '12px' }} />
                </div>
              </div>

              {/* Input 2: Location */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px', textTransform: 'uppercase' }}>
                  {language === 'mr' ? 'जागा (Location):' : '2. Proposed Location'}
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 34px',
                      fontSize: '13.5px',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '4px',
                      backgroundColor: '#f8fafc',
                      fontWeight: 600
                    }}
                  >
                    <option>MIDC Industrial Area (Industrial Zone)</option>
                    <option>Non-MIDC Gram Panchayat / Rural</option>
                    <option>Municipal Corporation / Urban City</option>
                  </select>
                  <MapPin size={16} color="var(--gov-saffron)" style={{ position: 'absolute', left: '10px', top: '12px' }} />
                </div>
              </div>

              {/* Main Submit Action Button */}
              <button
                type="button"
                className="btn-gov-primary"
                onClick={onStartWizard}
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '15px',
                  fontWeight: 800,
                  borderRadius: '4px',
                  gap: '8px',
                  marginTop: '6px'
                }}
              >
                <span>{language === 'mr' ? 'माझी परवानगी सूची तयार करा' : 'GENERATE MY CHECKLIST'}</span>
                <ArrowRight size={17} />
              </button>

              <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', textAlign: 'center', marginTop: '10px' }}>
                ✓ Instant 4-step personalized statutory evaluation
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Institutional Headline & Trust Features */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,153,51,0.2)', border: '1px solid #ff9933', color: '#ffb74d', fontSize: '11.5px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', marginBottom: '16px' }}>
              <Star size={13} fill="#ffb74d" />
              <span>GOVERNMENT OF MAHARASHTRA INNOVATION INITIATIVE</span>
            </div>

            <h1
              style={{
                fontSize: '34px',
                fontWeight: 800,
                lineHeight: 1.18,
                marginBottom: '14px',
                color: '#ffffff',
                letterSpacing: '-0.5px'
              }}
            >
              {language === 'mr' ? (
                <>उद्योग उभारणीसाठी लागणाऱ्या सर्व परवानग्या एकाच ठिकाणी</>
              ) : (
                <>Know What You Need, Before You Need It.</>
              )}
            </h1>

            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '24px' }}>
              {language === 'mr'
                ? 'महाराष्ट्र राज्यातील सूक्ष्म व लघु उद्योजकांसाठी MIDC, MPCB, आणि फॅक्टरी नियमांनुसार सत्यापित वैधानिक मार्गदर्शक.'
                : 'Dedicated Statutory Approval Checklist Engine for first-time Micro & Small Entrepreneurs in Maharashtra (₹10 Lakh to ₹10 Crore).'}
            </p>

            {/* Feature Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#f1f5f9' }}>
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />
                <span><strong>Structured Regulatory Rules:</strong> 100% verifiable MIDC, MPCB & DISH rules (not AI guessed).</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#f1f5f9' }}>
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />
                <span><strong>Legal Precedence Order:</strong> Prerequisite approvals (e.g. MPCB CTE before DISH Factory License) sequenced automatically.</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#f1f5f9' }}>
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />
                <span><strong>Built for ₹10-Lakh Founder:</strong> Tailored specifically for small workshops & first-time entrepreneurs.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}




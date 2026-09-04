'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Zap,
  Search,
  ShieldCheck,
  CheckCircle2,
  Star,
  ArrowRight,
  Building,
  MapPin,
  Clock,
  Layers,
  Sparkles,
  Sliders
} from 'lucide-react';

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
        backgroundImage: 'linear-gradient(135deg, rgba(0, 24, 48, 0.94) 0%, rgba(0, 36, 72, 0.88) 50%, rgba(0, 48, 96, 0.78) 100%), url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        borderBottom: '4px solid var(--gov-saffron)',
        padding: '40px 0 36px 0',
        boxShadow: 'inset 0 -10px 25px rgba(0,0,0,0.3)'
      }}
    >
      <div className="gov-container">
        
        {/* TOP STATUS BADGES STRIP */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255, 153, 51, 0.18)', border: '1px solid #ff9933', color: '#ffb74d', fontSize: '11.5px', fontWeight: 800, padding: '5px 14px', borderRadius: '20px', letterSpacing: '0.4px' }}>
            <Star size={13} fill="#ffb74d" />
            <span>GOVERNMENT OF MAHARASHTRA • MSINS INNOVATION INITIATIVE</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
            <span>EODB COMPLIANCE ENGINE v1.0 LIVE</span>
          </div>
        </div>

        {/* HERO CONTENT GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'center'
          }}
        >
          
          {/* LEFT COLUMN: IRCTC-Style Floating White Evaluation Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
              overflow: 'hidden',
              borderTop: '5px solid var(--gov-saffron)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {/* Card Header Tabs */}
            <div style={{ display: 'flex', backgroundColor: '#002244', color: '#ffffff' }}>
              <button
                type="button"
                onClick={() => setActiveTab('evaluate')}
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  fontSize: '13px',
                  fontWeight: 800,
                  backgroundColor: activeTab === 'evaluate' ? '#ffffff' : '#002244',
                  color: activeTab === 'evaluate' ? 'var(--gov-navy)' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  letterSpacing: '0.3px'
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
                  padding: '14px 16px',
                  fontSize: '13px',
                  fontWeight: 800,
                  backgroundColor: '#001a35',
                  color: '#e2e8f0',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  letterSpacing: '0.3px'
                }}
              >
                <Search size={15} />
                <span>{language === 'mr' ? 'सर्व १६ परवानग्या' : 'ALL 16 CLEARANCES'}</span>
              </button>
            </div>

            {/* Form Inputs inside IRCTC Card */}
            <div style={{ padding: '24px 22px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gov-navy-dark)', marginBottom: '4px' }}>
                {language === 'mr'
                  ? 'उद्योगासाठी लागणाऱ्या परवानग्या शोधा'
                  : 'Evaluate Statutory Clearances'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--gov-text-muted)', marginBottom: '16px' }}>
                {language === 'mr'
                  ? 'आपल्या उद्योगाचे स्वरूप आणि ठिकाण निवडा:'
                  : 'Select your business type & location for instant evaluation:'}
              </p>

              {/* Input 1: Sector */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  {language === 'mr' ? 'उद्योगाचा प्रकार (Sector):' : '1. Business Sector / Industry Type'}
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 36px',
                      fontSize: '13.5px',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      backgroundColor: '#f8fafc',
                      fontWeight: 600,
                      color: 'var(--gov-navy-dark)'
                    }}
                  >
                    <option>Small Manufacturing / Workshop</option>
                    <option>Food Processing & Agro Unit</option>
                    <option>Textile & Garment Unit</option>
                    <option>Chemical & Plastic Processing</option>
                    <option>Engineering & Auto Ancillary</option>
                    <option>IT & Digital Services</option>
                  </select>
                  <Building size={16} color="var(--gov-navy)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                </div>
              </div>

              {/* Input 2: Location */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  {language === 'mr' ? 'जागा (Location):' : '2. Proposed Location in Maharashtra'}
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 36px',
                      fontSize: '13.5px',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      backgroundColor: '#f8fafc',
                      fontWeight: 600,
                      color: 'var(--gov-navy-dark)'
                    }}
                  >
                    <option>MIDC Industrial Area (Industrial Zone)</option>
                    <option>Non-MIDC Gram Panchayat / Rural</option>
                    <option>Municipal Corporation / Urban City Limit</option>
                  </select>
                  <MapPin size={16} color="var(--gov-saffron)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                </div>
              </div>

              {/* Main Submit Action Button */}
              <button
                type="button"
                className="btn-gov-primary"
                onClick={onStartWizard}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '15px',
                  fontWeight: 800,
                  borderRadius: '6px',
                  gap: '8px',
                  marginTop: '4px',
                  boxShadow: '0 4px 12px rgba(255, 153, 51, 0.4)'
                }}
              >
                <span>{language === 'mr' ? 'माझी परवानगी सूची तयार करा' : 'GENERATE MY CHECKLIST'}</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)', textAlign: 'center', marginTop: '12px', fontWeight: 600 }}>
                ✓ Instant 4-Step Personalized Statutory Evaluation (0 Cost)
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Institutional Headline & Trust Features */}
          <div>
            
            <h1
              style={{
                fontSize: '36px',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: '16px',
                color: '#ffffff',
                letterSpacing: '-0.6px'
              }}
            >
              {language === 'mr' ? (
                <>उद्योग उभारणीसाठी लागणाऱ्या सर्व परवानग्या एकाच ठिकाणी</>
              ) : (
                <>Know What You Need,<br />Before You Need It.</>
              )}
            </h1>

            <p style={{ fontSize: '16.5px', color: '#cbd5e1', lineHeight: 1.55, marginBottom: '24px' }}>
              {language === 'mr'
                ? 'महाराष्ट्र राज्यातील सूक्ष्म व लघु उद्योजकांसाठी MIDC, MPCB, आणि फॅक्टरी नियमांनुसार सत्यापित वैधानिक मार्गदर्शक.'
                : 'Dedicated Statutory Clearance Engine for first-time Micro & Small Entrepreneurs in Maharashtra (₹10 Lakh to ₹10 Crore).'}
            </p>

            {/* Feature Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#f1f5f9' }}>
                <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0 }} />
                <span><strong>Verifiable Regulatory Database:</strong> 100% official MIDC, MPCB & DISH rules framework.</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#f1f5f9' }}>
                <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0 }} />
                <span><strong>Legal Precedence Order:</strong> Prerequisite approvals (e.g. MPCB CTE before DISH Factory License) sequenced automatically.</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#f1f5f9' }}>
                <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0 }} />
                <span><strong>Built for ₹10-Lakh Founder:</strong> Tailored specifically for small workshops, agro units & first-time founders.</span>
              </div>
            </div>

            {/* FEATURE CHIPS / BADGES */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#ffb74d" />
                <span>Topological Clearance Graph</span>
              </span>

              <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={14} color="#60a5fa" />
                <span>What-If Impact Simulator</span>
              </span>

              <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#34d399" />
                <span>Zero Hallucinations</span>
              </span>
            </div>

          </div>

        </div>

        {/* BOTTOM QUICK STATS STRIP */}
        <div
          style={{
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            textAlign: 'center'
          }}
        >
          <div>
            <strong style={{ fontSize: '22px', color: '#ffb74d', display: 'block', fontWeight: 900 }}>16 Clearances</strong>
            <span style={{ fontSize: '11.5px', color: '#cbd5e1', fontWeight: 600 }}>Master Statutory Repository</span>
          </div>

          <div>
            <strong style={{ fontSize: '22px', color: '#60a5fa', display: 'block', fontWeight: 900 }}>100% Verifiable</strong>
            <span style={{ fontSize: '11.5px', color: '#cbd5e1', fontWeight: 600 }}>MIDC, MPCB & DISH Rules</span>
          </div>

          <div>
            <strong style={{ fontSize: '22px', color: '#34d399', display: 'block', fontWeight: 900 }}>₹0 Free Service</strong>
            <span style={{ fontSize: '11.5px', color: '#cbd5e1', fontWeight: 600 }}>Zero Evaluation Charges</span>
          </div>

          <div>
            <strong style={{ fontSize: '22px', color: '#f472b6', display: 'block', fontWeight: 900 }}>36 Districts</strong>
            <span style={{ fontSize: '11.5px', color: '#cbd5e1', fontWeight: 600 }}>Maharashtra DIC Coverage</span>
          </div>
        </div>

      </div>
    </section>
  );
}

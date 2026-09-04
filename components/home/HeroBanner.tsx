'use client';

import React from 'react';
import { useApp } from '@/lib/context';

interface HeroBannerProps {
  onStartWizard: () => void;
  onViewDirectory: () => void;
}

export default function HeroBanner({
  onStartWizard,
  onViewDirectory
}: HeroBannerProps) {
  const { language } = useApp();

  const stats = language === 'mr'
    ? [
        { count: '१६', label: 'वैधानिक परवानग्या', sub: 'MPCB, DISH, MIDC, Fire' },
        { count: '०५', label: 'नियामक प्राधिकरणे', sub: 'अधिकृत शासकीय विभाग' },
        { count: '३६', label: 'जिल्हे समाविष्ट', sub: 'राज्यव्यापी DIC नेटवर्क' },
        { count: '१००%', label: 'कायदेशीर अचूकता', sub: 'पूर्वतपासणी क्रम हमी' }
      ]
    : [
        { count: '16', label: 'Statutory Clearances', sub: 'MPCB, DISH, MIDC, Fire, Power' },
        { count: '05', label: 'Regulatory Bodies', sub: 'State & Central Authorities' },
        { count: '36', label: 'Districts Covered', sub: 'Statewide DIC Network' },
        { count: '100%', label: 'Precedence Order', sub: 'Statutorily Verified Flow' }
      ];

  return (
    <section className="gov-hero-section">
      <div className="gov-container">
        <div className="gov-hero-inner">
          {/* Subtle Institutional Kicker */}
          <div className="gov-hero-tag-wrap">
            <span className="gov-hero-kicker">
              🏛️ {language === 'mr' ? 'महाराष्ट्र शासन · अधिकृत औद्योगिक मंजुरी पोर्टल' : 'GOVERNMENT OF MAHARASHTRA · OFFICIAL REGULATORY CLEARANCE PORTAL'}
        <div style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
          {/* Institutional Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 153, 51, 0.18)',
                border: '1px solid #ff9933',
                color: '#ffb74d',
                fontSize: '11.5px',
                fontWeight: 700,
                padding: '3px 12px',
                borderRadius: '3px',
                letterSpacing: '0.5px'
              }}
            >
              ★ {language === 'mr' ? 'महाराष्ट्र राज्य नाविन्यता उपक्रम' : language === 'hi' ? 'राज्य नवाचार सुविधा' : 'STATE INNOVATION FACILITATION'}
            </span>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '3px'
              }}
            >
              SIH26130
            </span>
          </div>

          {/* Main Hero Header */}
          <h1 className="gov-hero-heading">
            {language === 'mr' ? (
              <>
                उद्योग उभारण्यापूर्वी लागणाऱ्या सर्व वैधानिक परवानग्यांची अचूक कायदेशीर सूची
              </>
            ) : language === 'hi' ? (
              <>
                महाराष्ट्र में लघु औद्योगिक इकाइयों के लिए वैधानिक अनुमोदन चेकलिस्ट इंजन
              </>
            ) : (
              <>
                Statutory Industrial Approval & Compliance Clearance Engine
              </>
            )}
          </h1>

          {/* Lead Subtitle */}
          <p className="gov-hero-lead">
            {language === 'mr' ? (
              <>
                महाराष्ट्रात नवीन सूक्ष्म व लघु उद्योग सुरू करणाऱ्या उद्योजकांसाठी वैधानिक मंजुऱ्या, पर्यावरण संमती, कारखाना परवाना आणि ना-हरकत प्रमाणपत्रांची <strong>कायदेशीर अनुक्रमाने तयार केलेली अधिकृत तपासणी सूची</strong>.
              </>
            ) : (
              <>
                A single-window pre-establishment compliance roadmap for Micro & Small industrial enterprises across Maharashtra. Automatically sequences <strong>MPCB, DISH, MIDC, and Fire clearances in legally mandatory topological order</strong> before you spend capital.
              </>
            )}
          </p>

          {/* Action Buttons */}
          <div className="gov-hero-actions">
          {/* Official Tagline */}
          <p
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#ffb74d',
              marginBottom: '14px'
            }}
          >
            &ldquo;{language === 'mr' ? 'काय हवे आहे ते वेळेपूर्वी जाणून घ्या.' : language === 'hi' ? 'जानें कि आपको क्या चाहिए, इससे पहले कि आपको इसकी आवश्यकता हो।' : 'Know what you need, before you need it.'}&rdquo;
          </p>

          {/* Problem Statement & Differentiator Box */}
          <div
            style={{
              backgroundColor: 'rgba(11, 56, 102, 0.75)',
              border: '1px solid #2563eb',
              borderRadius: '4px',
              padding: '14px 20px',
              margin: '0 auto 24px auto',
              textAlign: 'left',
              fontSize: '13px',
              lineHeight: 1.6,
              color: '#f1f5f9'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '20px', lineHeight: 1 }}>🛡️</span>
              <div>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>
                  {language === 'mr' ? 'सत्यापित नियम डेटाबेस — एआय अनुमानावर आधारित नाही' : language === 'hi' ? 'सत्यापित नियामक अंतर:' : 'The Verified Regulatory Difference:'}
                </strong>
                {language === 'mr' ? (
                  <span>
                    कोणीही सामान्य एआय कडून परवानग्यांची माहिती विचारू शकतो, मात्र ती असत्यापित असू शकते. परवानगीची ही तपासणी सूची महाराष्ट्र शासनाच्या अधिकृत नियमावली आणि कायदेशीर अनुक्रमावर आधारित आहे. <strong>आणि मुख्य म्हणजे, MAITRI 2.0 जिथे ₹१० कोटींवरील मोठ्या प्रकल्पांवर लक्ष केंद्रित करते, तिथे ‘परवानगी’ ही ₹१० लाखांच्या सामान्य सूक्ष्म उद्योजकासाठी तयार केली गेली आहे.</strong>
                  </span>
                ) : language === 'hi' ? (
                  <span>
                    कोई भी एआई से पूछ सकता है कि उन्हें किस लाइसेंस की आवश्यकता है और एक असत्यापित उत्तर प्राप्त कर सकता है। परवानगी की चेकलिस्ट एक <strong>संरचित नियामक डेटाबेस से आती है — सत्यापित, अनुमानित नहीं</strong>। और MAITRI (जो ₹10 करोड़+ बड़े निवेश को पूरा करता है) के विपरीत, <strong>यह ₹10-लाख वाले उद्यमी के लिए बनाया गया है</strong>।
                  </span>
                ) : (
                  <span>
                    Anyone can ask ChatGPT what license they need and get a plausible-sounding, unverified answer. Parvangi&apos;s checklist comes from a <strong>structured regulatory database — verifiable, not guessed</strong>. And unlike MAITRI (which serves ₹10 Cr+ large investments), <strong>it&apos;s built for the ₹10-lakh entrepreneur, not just the ₹10-crore one</strong>.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="home-action-row" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <button
              type="button"
              className="btn-gov-primary gov-hero-btn-primary"
              onClick={onStartWizard}
              id="hero-start-wizard-btn"
            >
              <span className="btn-icon">⚡</span>
              <span>
                {language === 'mr'
                  ? 'माझी वैयक्तिक परवानगी सूची तपासा (४ टप्पे)'
                  : 'Check What You Need (4-Step Engine)'}
                {language === 'mr' ? 'माझी वैयक्तिक परवानगी सूची तपासा (४ टप्पे)' : language === 'hi' ? 'जांचें कि आपको क्या चाहिए (4-चरणीय विज़ार्ड)' : 'Check What You Need (4-Step Wizard)'}
              </span>
            </button>

            <button
              type="button"
              className="btn-gov-outline gov-hero-btn-secondary"
              onClick={onViewDirectory}
              id="hero-browse-approvals-btn"
            >
              <span className="btn-icon">📚</span>
              <span>
                {language === 'mr'
                  ? 'सर्व १६ परवानग्यांची माहिती (Directory)'
                  : 'Know Your Approvals (Directory)'}
              </span>
              <span>📚</span>
              <span>{language === 'mr' ? 'सर्व १६ परवानग्यांची सूची' : language === 'hi' ? 'अपनी मंजूरी जानें' : 'Know Your Approvals'}</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="gov-hero-trust-bar">
            <span>✓ {language === 'mr' ? 'कोणत्याही लॉगिनशिवाय विनामूल्य' : 'Free Public Service · No Login Required'}</span>
            <span className="gov-hero-trust-dot">•</span>
            <span>✓ {language === 'mr' ? 'कायद्यानुसार प्रमाणित अनुक्रम' : 'Statutorily Verified Legal Order'}</span>
            <span className="gov-hero-trust-dot">•</span>
            <span>✓ {language === 'mr' ? '६० सेकंदांत वैयक्तिक वेळापत्रक' : 'Personalized Clearance Schedule in 60s'}</span>
          </div>

          {/* Statistics Ribbon */}
          <div className="gov-hero-stats-ribbon" role="region" aria-label="Portal Statistics">
            {stats.map((stat, index) => (
              <div key={index} className="gov-stat-item">
                <div className="gov-stat-number">{stat.count}</div>
                <div className="gov-stat-content">
                  <div className="gov-stat-label">{stat.label}</div>
                  <div className="gov-stat-sub">{stat.sub}</div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn-gov-outline"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.3)',
                color: '#ffffff'
              }}
              onClick={onViewMaitriGap}
            >
              <span>⚖️</span>
              <span style={{ fontWeight: 600 }}>
                {language === 'mr' ? 'MAITRI 2.0 मधील उणीवा (फरक)' : language === 'hi' ? 'MAITRI 2.0 क्यों एक अंतर छोड़ती है' : 'Why MAITRI Leaves a Gap'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

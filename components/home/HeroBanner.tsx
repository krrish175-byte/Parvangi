'use client';

import React from 'react';
import { useApp } from '@/lib/context';

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

  return (
    <section
      style={{
        backgroundColor: '#002244',
        backgroundImage: 'linear-gradient(180deg, #001f3f 0%, #002b55 100%)',
        color: '#ffffff',
        borderBottom: '4px solid var(--gov-saffron)',
        padding: '36px 0 32px 0'
      }}
    >
      <div className="gov-container">
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
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '12px',
              letterSpacing: '-0.3px',
              color: '#ffffff'
            }}
          >
            {language === 'mr' ? (
              <>
                उद्योग उभारण्यापूर्वी लागणाऱ्या सर्व वैधानिक परवानग्यांची अचूक आणि कायदेशीर सूची
              </>
            ) : language === 'hi' ? (
              <>
                महाराष्ट्र में लघु औद्योगिक इकाइयों के लिए वैधानिक अनुमोदन चेकलिस्ट इंजन
              </>
            ) : (
              <>
                Statutory Approval Checklist Engine for Small Industrial Units in Maharashtra
              </>
            )}
          </h1>

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
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <button
              type="button"
              className="btn-gov-primary"
              style={{ fontSize: '15px', padding: '12px 28px' }}
              onClick={onStartWizard}
            >
              <span>⚡</span>
              <span>
                {language === 'mr' ? 'माझी वैयक्तिक परवानगी सूची तपासा (४ टप्पे)' : language === 'hi' ? 'जांचें कि आपको क्या चाहिए (4-चरणीय विज़ार्ड)' : 'Check What You Need (4-Step Wizard)'}
              </span>
            </button>

            <button
              type="button"
              className="btn-gov-outline"
              style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', color: '#002244' }}
              onClick={onViewDirectory}
            >
              <span>📚</span>
              <span>{language === 'mr' ? 'सर्व १६ परवानग्यांची सूची' : language === 'hi' ? 'अपनी मंजूरी जानें' : 'Know Your Approvals'}</span>
            </button>

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

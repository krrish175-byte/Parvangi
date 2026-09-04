'use client';

import React from 'react';
import { useApp } from '@/lib/context';

export default function HomeImpactSection() {
  const { language } = useApp();

  const updates = language === 'mr'
    ? ['नवीन उद्योग सुरू करण्यापूर्वी योग्य परवानग्या तपासा', 'MPCB, DISH आणि MIDC नियम एका ठिकाणी', 'तुमचा वैयक्तिक परवानगी रोडमॅप ६० सेकंदांत तयार करा']
    : ['Check the right approvals before starting your unit', 'MPCB, DISH and MIDC guidance in one place', 'Build your personalized approval roadmap in 60 seconds'];

  const schemes = language === 'mr'
    ? [
        { label: 'PSI योजना', title: 'महाराष्ट्र औद्योगिक प्रोत्साहन', text: 'पात्र सूक्ष्म व लघु उद्योगांसाठी भांडवली, वीज आणि व्याज सवलतींची माहिती पहा.', color: 'var(--gov-saffron)' },
        { label: 'उद्यम नोंदणी', title: 'व्यवसायाची अधिकृत सुरुवात', text: 'तुमच्या गुंतवणूक श्रेणीनुसार योग्य MSME वर्गीकरण आणि पुढील पायरी समजून घ्या.', color: 'var(--gov-navy)' },
        { label: 'DIC मदत', title: 'जिल्हा उद्योग केंद्राशी संपर्क', text: 'तुमच्या जिल्ह्यातील मार्गदर्शन आणि प्रत्यक्ष पडताळणीसाठी अधिकृत संपर्क शोधा.', color: 'var(--gov-green)' }
      ]
    : [
        { label: 'PSI SCHEME', title: 'Maharashtra Industrial Incentives', text: 'Explore capital, electricity and interest benefits available to eligible micro and small units.', color: 'var(--gov-saffron)' },
        { label: 'UDYAM REGISTRATION', title: 'Start With The Right Classification', text: 'Understand your MSME tier and next compliance step from your investment range.', color: 'var(--gov-navy)' },
        { label: 'DIC ASSISTANCE', title: 'Find Your District Support', text: 'Connect with official district guidance and physical verification assistance when needed.', color: 'var(--gov-green)' }
      ];

  return (
    <section className="home-impact-section">
      <div className="gov-container">
        <div className="updates-rail" aria-label={language === 'mr' ? 'महत्त्वाच्या सूचना' : 'Important updates'}>
          <span className="updates-label">{language === 'mr' ? 'ताज्या सूचना' : 'Latest updates'}</span>
          <div className="updates-window">
            <div className="updates-track">
              {[...updates, ...updates].map((update, index) => (
                <span className="update-item" key={`${update}-${index}`}>
                  <span className="update-dot" />{update}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="impact-grid">
          <div className="impact-image-panel">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
              alt={language === 'mr' ? 'यंत्रसामग्रीसह औद्योगिक कार्यशाळा' : 'Industrial workshop with machinery'}
            />
            <div className="impact-image-caption">
              <span className="impact-caption-kicker">PARVANGI / 01</span>
              <strong>{language === 'mr' ? 'कल्पनेपासून उद्योगापर्यंत' : 'From idea to operating unit'}</strong>
              <span>{language === 'mr' ? 'योग्य क्रमाने, योग्य वेळी.' : 'The right approvals, in the right order.'}</span>
            </div>
          </div>

          <div className="impact-copy-panel">
            <span className="section-kicker">{language === 'mr' ? 'तुमच्यासाठी काय सोपे होते' : 'WHY THIS HELPS'}</span>
            <h2>{language === 'mr' ? 'कागदपत्रांच्या गोंधळातून स्पष्ट पुढची पायरी.' : 'Turn compliance confusion into a clear next step.'}</h2>
            <p>
              {language === 'mr'
                ? 'परवानगी तुमच्या उद्योगाचा प्रकार, ठिकाण, गुंतवणूक आणि टप्पा समजून घेते. त्यामुळे तुम्हाला फक्त लागू होणाऱ्या मंजुरी दिसतात आणि त्यांचा कायदेशीर क्रम समजतो.'
                : 'Parvangi understands your sector, location, investment and business stage. You see only the approvals that apply to you, in the legal order you need them.'}
            </p>
            <div className="impact-proof-row">
              <div><strong>4</strong><span>{language === 'mr' ? 'सोपे प्रश्न' : 'Simple questions'}</span></div>
              <div><strong>16</strong><span>{language === 'mr' ? 'सत्यापित मंजुरी' : 'Verified approvals'}</span></div>
              <div><strong>1</strong><span>{language === 'mr' ? 'स्पष्ट रोडमॅप' : 'Clear roadmap'}</span></div>
            </div>
          </div>
        </div>

        <div className="scheme-section-heading">
          <div>
            <span className="section-kicker">{language === 'mr' ? 'उपयुक्त माहिती' : 'Useful information'}</span>
            <h2>{language === 'mr' ? 'योजना आणि उद्योग सहाय्य' : 'Schemes and business support'}</h2>
          </div>
          <span>{language === 'mr' ? 'अधिकृत मार्गदर्शन एका ठिकाणी' : 'Official guidance, brought together'}</span>
        </div>

        <div className="scheme-grid">
          {schemes.map((scheme) => (
            <article className="scheme-card" key={scheme.label} style={{ borderTopColor: scheme.color }}>
              <span className="scheme-label" style={{ color: scheme.color }}>{scheme.label}</span>
              <h3>{scheme.title}</h3>
              <p>{scheme.text}</p>
              <span className="scheme-link">{language === 'mr' ? 'अधिक जाणून घ्या' : 'Learn more'} <span>→</span></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

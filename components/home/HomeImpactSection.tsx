'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/context';
import { ALL_APPROVALS } from '@/lib/rules-engine';

export default function HomeImpactSection() {
  const { language } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeApprovalSlide, setActiveApprovalSlide] = useState(0);

  const approvalSlides = language === 'mr'
    ? [
        { department: 'MPCB', approval: 'पर्यावरण व प्रदूषण संमती', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85', alt: 'प्रयोगशाळेतील पर्यावरण तपासणी' },
        { department: 'MIDC', approval: 'औद्योगिक भूखंड व पायाभूत सुविधा', image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85', alt: 'भारतीय औद्योगिक उत्पादन केंद्र' },
        { department: 'DISH', approval: 'कारखाना सुरक्षा व कामगार कल्याण', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85', alt: 'सुरक्षित औद्योगिक कामाचे ठिकाण' },
        { department: 'Fire Department', approval: 'अग्निसुरक्षा प्रमाणपत्र', image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=85', alt: 'औद्योगिक अग्निसुरक्षा उपकरणे' },
        { department: 'MSEDCL', approval: 'वीज जोडणी व औद्योगिक भार', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=85', alt: 'वीज पायाभूत सुविधा' },
        { department: 'Central Government', approval: 'उद्यम व वैधानिक नोंदणी', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85', alt: 'भारत सरकारचे प्रशासकीय भवन' }
      ]
    : [
        { department: 'MPCB', approval: 'Environment & Pollution Consent', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85', alt: 'Environmental inspection laboratory' },
        { department: 'MIDC', approval: 'Industrial Land & Infrastructure', image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85', alt: 'Indian industrial production facility' },
        { department: 'DISH', approval: 'Factory Safety & Worker Welfare', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85', alt: 'Safe industrial workplace' },
        { department: 'Fire Department', approval: 'Fire Safety Certificate', image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=85', alt: 'Industrial fire safety equipment' },
        { department: 'MSEDCL', approval: 'Power Connection & Load', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=85', alt: 'Electricity infrastructure' },
        { department: 'Central Government', approval: 'Udyam & Statutory Registration', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85', alt: 'Government administrative building in India' }
      ];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % approvalSlides.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [approvalSlides.length]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveApprovalSlide((slide) => (slide + 1) % ALL_APPROVALS.slice(0, 16).length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);

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

  const approvalDirectory = ALL_APPROVALS.slice(0, 16);

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
          <div className="impact-image-panel" aria-roledescription="carousel" aria-label={language === 'mr' ? 'परवानगी विभाग चित्रपट्टी' : 'Approval department image carousel'}>
            {approvalSlides.map((slide, index) => (
              <Image
                className={`impact-slide-image ${index === activeSlide ? 'active' : ''}`}
                key={slide.department}
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                aria-hidden={index !== activeSlide}
                onError={(event) => {
                  event.currentTarget.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85';
                }}
              />
            ))}
            <div className="impact-image-caption">
              <span className="impact-caption-kicker">PARVANGI / {String(activeSlide + 1).padStart(2, '0')}</span>
              <strong>{approvalSlides[activeSlide].department}</strong>
              <span>{approvalSlides[activeSlide].approval}</span>
            </div>
            <div className="impact-slide-controls">
              <button type="button" onClick={() => setActiveSlide((activeSlide - 1 + approvalSlides.length) % approvalSlides.length)} aria-label="Previous approval department">←</button>
              <div className="impact-slide-dots">
                {approvalSlides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide.department}
                    className={index === activeSlide ? 'active' : ''}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show ${slide.department}`}
                    aria-pressed={index === activeSlide}
                  />
                ))}
              </div>
              <button type="button" onClick={() => setActiveSlide((activeSlide + 1) % approvalSlides.length)} aria-label="Next approval department">→</button>
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

        <div className="approval-index-heading">
          <div>
            <span className="section-kicker">{language === 'mr' ? 'संपूर्ण परवानगी निर्देशिका' : 'Complete approval index'}</span>
            <h2>{language === 'mr' ? '१६ विभाग, एक स्पष्ट मार्गदर्शक' : '16 departments, one clear guide'}</h2>
          </div>
          <span>{language === 'mr' ? 'नियम डेटाबेसमधून थेट' : 'Sourced directly from the rules database'}</span>
        </div>

        <div className="approval-index-carousel" aria-roledescription="carousel" aria-label={language === 'mr' ? '१६ परवानग्यांची चित्रपट्टी' : '16 approval guide carousel'}>
          <article className="approval-index-card">
            <span className="approval-index-number">{String(activeApprovalSlide + 1).padStart(2, '0')}</span>
            <div>
              <span className="approval-index-department">{approvalDirectory[activeApprovalSlide].department}</span>
              <h3>{language === 'mr' ? approvalDirectory[activeApprovalSlide].marathi_name : approvalDirectory[activeApprovalSlide].name}</h3>
              <p>{approvalDirectory[activeApprovalSlide].one_line_description}</p>
            </div>
            <span className={`approval-index-status ${approvalDirectory[activeApprovalSlide].mandatory_or_conditional === 'Mandatory' ? 'mandatory' : 'conditional'}`}>
              {approvalDirectory[activeApprovalSlide].mandatory_or_conditional}
            </span>
          </article>
          <div className="approval-index-controls">
            <button type="button" onClick={() => setActiveApprovalSlide((activeApprovalSlide - 1 + approvalDirectory.length) % approvalDirectory.length)} aria-label="Previous approval">←</button>
            <span>{activeApprovalSlide + 1} / {approvalDirectory.length}</span>
            <button type="button" onClick={() => setActiveApprovalSlide((activeApprovalSlide + 1) % approvalDirectory.length)} aria-label="Next approval">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

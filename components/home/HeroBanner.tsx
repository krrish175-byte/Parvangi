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
        { count: '१६', label: 'वैधानिक परवानग्या', sub: 'MPCB, DISH, MIDC, Fire, Power' },
        { count: '०५', label: 'नियामक प्राधिकरणे', sub: 'अधिकृत शासकीय विभाग' },
        { count: '३६', label: 'जिल्हे समाविष्ट', sub: 'राज्यव्यापी DIC नेटवर्क' },
        { count: '१००%', label: 'कायदेशीर अचूकता', sub: 'पूर्वतपासणी क्रम हमी' }
      ]
    : language === 'hi'
    ? [
        { count: '१६', label: 'वैधानिक अनुमोदन', sub: 'MPCB, DISH, MIDC, Fire, Power' },
        { count: '०५', label: 'नियामक निकाय', sub: 'राज्य और केंद्रीय प्राधिकरण' },
        { count: '३६', label: 'जिले शामिल', sub: 'राज्यव्यापी DIC नेटवर्क' },
        { count: '१००%', label: 'प्राथमिकता क्रम', sub: 'वैधानिक रूप से सत्यापित प्रवाह' }
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
                padding: '3px 14px',
                borderRadius: '3px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              {language === 'mr' ? 'उद्योग संचालनालय · महाराष्ट्र शासन' : language === 'hi' ? 'उद्योग निदेशालय · महाराष्ट्र शासन' : 'Directorate of Industries · Government of Maharashtra'}
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
                महाराष्ट्र में औद्योगिक इकाइयों के लिए वैधानिक अनुमोदन एवं नियामक अनुक्रम प्रणाली
              </>
            ) : (
              <>
                Statutory Regulatory Clearance & Sequencing Single Window for Maharashtra Enterprises
              </>
            )}
          </h1>

          {/* Official Tagline */}
          <p
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#f8fafc',
              marginBottom: '18px',
              lineHeight: 1.6
            }}
          >
            {language === 'mr' ? (
              <>
                महाराष्ट्रात नवीन सूक्ष्म, लघू व मध्यम उद्योग सुरू करणाऱ्या उद्योजकांसाठी वैधानिक मंजुऱ्या, पर्यावरण संमती, कारखाना परवाना आणि ना-हरकत प्रमाणपत्रांची कायदेशीर अनुक्रमाने तयार केलेली अधिकृत तपासणी सूची.
              </>
            ) : language === 'hi' ? (
              <>
                महाराष्ट्र में नई औद्योगिक इकाइयाँ स्थापित करने वाले उद्यमियों के लिए वैधानिक स्वीकृतियों, पर्यावरण सहमति, कारखाना लाइसेंस और अनापत्ति प्रमाण पत्रों की वैधानिक अनुक्रम अनुसूची।
              </>
            ) : (
              <>
                A dedicated statutory compliance roadmap for Micro, Small and Medium industrial enterprises in Maharashtra. Automatically sequences MPCB, DISH, MIDC, and Fire clearances in legally mandated order.
              </>
            )}
          </p>

          {/* Official Statutory Framework Notice Box */}
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
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 183, 77, 0.2)',
                  border: '1.5px solid #ffb74d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffb74d" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>
                  {language === 'mr' ? 'वैधानिक नियामक अनुक्रम व पडताळणी रचना:' : language === 'hi' ? 'वैधानिक विनियामक अनुक्रम रूपरेखा:' : 'Statutory Regulatory Clearance Framework:'}
                </strong>
                {language === 'mr' ? (
                  <span>
                    कारखाने कायदा १९४८, जल व वायू प्रदूषण नियंत्रण कायदे, आणि महाराष्ट्र अग्निशमन सुरक्षा कायदा २००६ अंतर्गत येणाऱ्या सर्व परवानग्यांचा कायदेशीर अनुक्रम येथे उपलब्ध आहे. जिल्हा उद्योग केंद्र (DIC) व संबंधित विभागांशी थेट समन्वय साधून अद्ययावत माहिती पुरवली जाते.
                  </span>
                ) : language === 'hi' ? (
                  <span>
                    कारखाना अधिनियम 1948, जल और वायु प्रदूषण निवारण अधिनियम, और महाराष्ट्र अग्नि सुरक्षा अधिनियम 2006 के तहत आवश्यक सभी स्वीकृतियों का वैधानिक अनुक्रम। जिला उद्योग केंद्रों (DIC) के साथ एकीकृत समन्वय।
                  </span>
                ) : (
                  <span>
                    Every clearance sequence is mapped directly to statutory mandates under the Factories Act 1948, Water & Air (Prevention & Control of Pollution) Acts, and Maharashtra Fire Prevention Act 2006, coordinated directly with District Industries Centres (DIC).
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="home-action-row" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <button
              type="button"
              className="btn-gov-primary"
              style={{ fontSize: '14px', padding: '12px 28px' }}
              onClick={onStartWizard}
              id="hero-start-wizard-btn"
            >
              <span>
                {language === 'mr' ? 'वैयक्तिक परवानगी सूची तपासा (४ टप्पे) →' : language === 'hi' ? 'मंजूरी आवश्यकता जांचें (4 चरण) →' : 'Initiate Statutory Assessment (4 Steps) →'}
              </span>
            </button>

            <button
              type="button"
              className="btn-gov-outline"
              style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', color: '#002244', fontSize: '13.5px', padding: '12px 24px' }}
              onClick={onViewDirectory}
              id="hero-browse-approvals-btn"
            >
              <span>{language === 'mr' ? 'सर्व वैधानिक परवानग्यांची संकलित सूची' : language === 'hi' ? 'वैधानिक निर्देशिका देखें' : 'View Clearances Directory'}</span>
            </button>
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
          </div>
        </div>
      </div>
    </section>
  );
}

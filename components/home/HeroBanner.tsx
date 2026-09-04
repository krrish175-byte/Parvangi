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
            </span>
          </div>

          {/* Main Hero Header */}
          <h1 className="gov-hero-heading">
            {language === 'mr' ? (
              <>
                उद्योग उभारण्यापूर्वी लागणाऱ्या सर्व वैधानिक परवानग्यांची अचूक कायदेशीर सूची
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
          </div>
        </div>
      </div>
    </section>
  );
}

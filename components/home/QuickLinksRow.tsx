'use client';

import React from 'react';
import { useApp } from '@/lib/context';

interface QuickLinksRowProps {
  onStartWizard: () => void;
  onTrackChecklist: () => void;
  onViewDirectory: () => void;
  onViewHelpdesk: () => void;
}

export default function QuickLinksRow({
  onStartWizard,
  onTrackChecklist,
  onViewDirectory,
  onViewHelpdesk
}: QuickLinksRowProps) {
  const { language } = useApp();

  const cards = [
    {
      id: 'wizard',
      title: language === 'mr' ? 'काय हवे आहे ते तपासा' : 'Check What You Need',
      marathiSubtitle: 'नवीन परवानगी तपासणी इंजिन',
      subtitle: '4-Step Personalized Engine',
      description:
        language === 'mr'
          ? 'आपल्या उद्योगाचे स्वरूप, जागा, गुंतवणूक व टप्पा निवडा आणि कायदेशीर अनुक्रमाने लागणाऱ्या सर्व परवानग्यांची अचूक सूची मिळवा.'
          : 'Answer 4 basic questions about your sector, location, scale, and stage to generate a topologically sequenced approval roadmap.',
      actionText: language === 'mr' ? 'प्रारंभ करा →' : 'Start Wizard →',
      badge: 'CORE ENGINE',
      badgeColor: 'var(--gov-saffron)',
      icon: '⚡',
      onClick: onStartWizard,
      highlight: true
    },
    {
      id: 'track',
      title: language === 'mr' ? 'सूची ट्रॅक करा / संदर्भ शोधा' : 'Track My Checklist',
      marathiSubtitle: 'संदर्भ क्रमांकावरून तपासणी',
      subtitle: 'Retrieve via Reference ID',
      description:
        language === 'mr'
          ? 'पूर्वी तयार केलेल्या संदर्भ क्रमांकाने (उदा. MH-PRV-2025-XXXXX) आपली परवानगी सूची पुन्हा पहा किंवा प्रिंट करा.'
          : 'Enter your 16-character Parvangi Reference Code to reload your tailored clearance schedule or verify compliance order.',
      actionText: language === 'mr' ? 'संदर्भ शोधा →' : 'Track Code →',
      badge: 'INSTANT LOOKUP',
      badgeColor: 'var(--gov-navy)',
      icon: '🔍',
      onClick: onTrackChecklist,
      highlight: false
    },
    {
      id: 'directory',
      title: language === 'mr' ? 'सर्व परवानग्यांची माहिती' : 'Know Your Approvals',
      marathiSubtitle: '१६ वैधानिक दाखल्यांचे संकलन',
      subtitle: 'Statutory Master Directory',
      description:
        language === 'mr'
          ? 'MPCB, DISH, अग्निशमन, MSEDCL आणि उद्योग संचालनालयाच्या सर्व वैधानिक परवानग्यांचे नियम व शुल्काची माहिती पहा.'
          : 'Browse all 16 state and central industrial approvals, timelines, issuing bodies, legal acts, and direct portal links.',
      actionText: language === 'mr' ? 'सूची उघडा →' : 'Browse All 16 →',
      badge: 'VERIFIED REPOSITORY',
      badgeColor: '#1e3a5f',
      icon: '📚',
      onClick: onViewDirectory,
      highlight: false
    },
    {
      id: 'helpdesk',
      title: language === 'mr' ? 'जिल्हा उद्योग केंद्र (DIC)' : 'District Helpdesk & DIC',
      marathiSubtitle: '३६ जिल्ह्यांमधील मदत केंद्रे',
      subtitle: 'Citizen Facilitation',
      description:
        language === 'mr'
          ? 'महाराष्ट्र राज्यातील ३६ जिल्हा उद्योग केंद्रे (DIC) आणि जिल्हाधिकारी कार्यालयांशी संपर्क साधण्यासाठी अधिकृत हेल्पलाइन.'
          : 'Direct contact coordinates for General Managers of District Industries Centres (DIC) and department escalation matrices.',
      actionText: language === 'mr' ? 'मदत संपर्क →' : 'View Directory →',
      badge: '36 DISTRICTS',
      badgeColor: 'var(--gov-green)',
      icon: '🏛️',
      onClick: onViewHelpdesk,
      highlight: false
    }
  ];

  return (
    <section style={{ padding: '36px 0 24px 0' }}>
      <div className="gov-container">
        {/* Section Title Header */}
        <div style={{ marginBottom: '20px', borderBottom: '2px solid var(--gov-border)', paddingBottom: '10px' }}>
          <div className="quick-links-title-row" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--gov-navy)',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>📌</span>
              <span>{language === 'mr' ? 'नागरिक जलद सेवा व साधने' : 'Citizen Quick Services & Portals'}</span>
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--gov-text-muted)' }}>
              {language === 'mr' ? 'अधिकृत उद्योजक सहाय्यता व सेवा प्रणाली' : 'Official Citizen Facilitation Framework'}
            </span>
          </div>
        </div>

        {/* 4-Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px'
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="gov-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: card.highlight ? '4px solid var(--gov-saffron)' : '4px solid var(--gov-navy)',
                backgroundColor: card.highlight ? '#ffffff' : '#ffffff',
                boxShadow: card.highlight ? '0 3px 8px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onClick={card.onClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && card.onClick()}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '26px' }}>{card.icon}</span>
                  <span
                    style={{
                      backgroundColor: card.highlight ? 'var(--gov-saffron-light)' : 'var(--gov-navy-subtle)',
                      color: card.highlight ? 'var(--gov-saffron)' : 'var(--gov-navy)',
                      border: `1px solid ${card.highlight ? 'var(--gov-saffron-border)' : '#bfdbfe'}`,
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '2px',
                      letterSpacing: '0.4px'
                    }}
                  >
                    {card.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--gov-navy-dark)',
                    lineHeight: 1.25,
                    marginBottom: '4px'
                  }}
                >
                  {card.title}
                </h3>

                <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)', fontWeight: 600, marginBottom: '10px' }}>
                  {card.subtitle}
                </div>

                <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', lineHeight: 1.55 }}>
                  {card.description}
                </p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--gov-border-subtle)' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: card.highlight ? 'var(--gov-saffron)' : 'var(--gov-navy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {card.actionText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

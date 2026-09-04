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
      title: language === 'mr' ? 'काय हवे आहे ते तपासा' : language === 'hi' ? 'जांचें कि आपको क्या चाहिए' : 'Check What You Need',
      subtitle: language === 'mr' ? 'नवीन परवानगी तपासणी इंजिन' : language === 'hi' ? '4-चरणीय व्यक्तिगत इंजन' : '4-Step Personalized Engine',
      description:
        language === 'mr' ? 'आपल्या उद्योगाचे स्वरूप, जागा, गुंतवणूक व टप्पा निवडा आणि कायदेशीर अनुक्रमाने लागणाऱ्या सर्व परवानग्यांची अचूक सूची मिळवा.' : language === 'hi' ? 'अपने क्षेत्र, स्थान, पैमाने और चरण के बारे में 4 बुनियादी सवालों के जवाब दें और अपनी अनुमोदन सूची प्राप्त करें।' : 'Answer 4 basic questions about your sector, location, scale, and stage to generate a topologically sequenced approval roadmap.',
      actionText: language === 'mr' ? 'प्रारंभ करा →' : language === 'hi' ? 'प्रारंभ करें →' : 'Start Wizard →',
      badge: language === 'mr' ? 'मुख्य इंजिन' : language === 'hi' ? 'मुख्य इंजन' : 'CORE ENGINE',
      badgeColor: 'var(--gov-saffron)',
      icon: '⚡',
      onClick: onStartWizard,
      highlight: true
    },
    {
      id: 'track',
      title: language === 'mr' ? 'सूची ट्रॅक करा / संदर्भ शोधा' : language === 'hi' ? 'मेरी चेकलिस्ट ट्रैक करें' : 'Track My Checklist',
      subtitle: language === 'mr' ? 'संदर्भ क्रमांकावरून तपासणी' : language === 'hi' ? 'संदर्भ आईडी द्वारा प्राप्त करें' : 'Retrieve via Reference ID',
      description:
        language === 'mr' ? 'पूर्वी तयार केलेल्या संदर्भ क्रमांकाने (उदा. MH-PRV-2025-XXXXX) आपली परवानगी सूची पुन्हा पहा किंवा प्रिंट करा.' : language === 'hi' ? 'अपनी तैयार की गई मंजूरी सूची को फिर से लोड करने के लिए अपना 16-अंकीय संदर्भ कोड दर्ज करें।' : 'Enter your 16-character Parvangi Reference Code to reload your tailored clearance schedule or verify compliance order.',
      actionText: language === 'mr' ? 'संदर्भ शोधा →' : language === 'hi' ? 'कोड ट्रैक करें →' : 'Track Code →',
      badge: language === 'mr' ? 'त्वरित शोध' : language === 'hi' ? 'त्वरित खोज' : 'INSTANT LOOKUP',
      badgeColor: 'var(--gov-navy)',
      icon: '🔍',
      onClick: onTrackChecklist,
      highlight: false
    },
    {
      id: 'directory',
      title: language === 'mr' ? 'सर्व परवानग्यांची माहिती' : language === 'hi' ? 'अपनी मंजूरी जानें' : 'Know Your Approvals',
      subtitle: language === 'mr' ? '१६ वैधानिक दाखल्यांचे संकलन' : language === 'hi' ? 'वैधानिक मास्टर निर्देशिका' : 'Statutory Master Directory',
      description:
        language === 'mr' ? 'MPCB, DISH, अग्निशमन, MSEDCL आणि उद्योग संचालनालयाच्या सर्व वैधानिक परवानग्यांचे नियम व शुल्काची माहिती पहा.' : language === 'hi' ? 'सभी 16 राज्य और केंद्रीय औद्योगिक मंजूरियों, समय-सीमा, जारी करने वाले निकायों और पोर्टल लिंक ब्राउज़ करें।' : 'Browse all 16 state and central industrial approvals, timelines, issuing bodies, legal acts, and direct portal links.',
      actionText: language === 'mr' ? 'सूची उघडा →' : language === 'hi' ? 'सभी 16 ब्राउज़ करें →' : 'Browse All 16 →',
      badge: language === 'mr' ? 'सत्यापित संकलन' : language === 'hi' ? 'सत्यापित रिपॉजिटरी' : 'VERIFIED REPOSITORY',
      badgeColor: '#1e3a5f',
      icon: '📚',
      onClick: onViewDirectory,
      highlight: false
    },
    {
      id: 'helpdesk',
      title: language === 'mr' ? 'जिल्हा उद्योग केंद्र (DIC)' : language === 'hi' ? 'जिला हेल्पडेस्क और डीआईसी' : 'District Helpdesk & DIC',
      subtitle: language === 'mr' ? '३६ जिल्ह्यांमधील मदत केंद्रे' : language === 'hi' ? 'नागरिक सुविधा' : 'Citizen Facilitation',
      description:
        language === 'mr' ? 'महाराष्ट्र राज्यातील ३६ जिल्हा उद्योग केंद्रे (DIC) आणि जिल्हाधिकारी कार्यालयांशी संपर्क साधण्यासाठी अधिकृत हेल्पलाइन.' : language === 'hi' ? 'जिला उद्योग केंद्रों (DIC) के महाप्रबंधकों के लिए सीधे संपर्क जानकारी।' : 'Direct contact coordinates for General Managers of District Industries Centres (DIC) and department escalation matrices.',
      actionText: language === 'mr' ? 'मदत संपर्क →' : language === 'hi' ? 'निर्देशिका देखें →' : 'View Directory →',
      badge: language === 'mr' ? '३६ जिल्हे' : language === 'hi' ? '36 जिले' : '36 DISTRICTS',
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
              <span>{language === 'mr' ? 'नागरिक जलद सेवा व साधने' : language === 'hi' ? 'नागरिक त्वरित सेवाएं और पोर्टल' : 'Citizen Quick Services & Portals'}</span>
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--gov-text-muted)' }}>
              {language === 'mr' ? 'पासपोर्ट सेवा / IRCTC प्रमाणे रचना' : language === 'hi' ? 'आधिकारिक पोर्टल ढांचा' : 'Official Portal Framework'}
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

                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                  {card.title}
                </h3>
                <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.2px' }}>
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

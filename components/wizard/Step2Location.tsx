'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { LocationType } from '@/lib/types';

interface Step2LocationProps {
  selectedLocation: LocationType;
  onSelect: (location: LocationType) => void;
}

export default function Step2Location({ selectedLocation, onSelect }: Step2LocationProps) {
  const { language } = useApp();

  const renderLocationIcon = (id: LocationType) => {
    switch (id) {
      case 'midc':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gov-navy)" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case 'municipal':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gov-navy)" strokeWidth="2">
            <path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7H3l2-4h14l2 4" />
          </svg>
        );
      case 'rural':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gov-navy)" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        );
    }
  };

  const locations: {
    id: LocationType;
    title: string;
    marathiTitle: string;
    badge: string;
    jurisdictionAuthority: string;
    description: string;
    clearancesImpact: string;
  }[] = [
    {
      id: 'midc',
      title: language === 'mr' ? 'MIDC औद्योगिक वसाहत / औद्योगिक झोन' : language === 'hi' ? 'एमआईडीसी औद्योगिक एस्टेट / औद्योगिक क्षेत्र' : 'MIDC Industrial Estate / Industrial Zone',
      marathiTitle: 'एमआयडीसी औद्योगिक वसाहत',
      badge: language === 'mr' ? 'एकल नियोजन प्राधिकरण (SPA)' : language === 'hi' ? 'एकल योजना प्राधिकरण' : 'Single Planning Authority',
      jurisdictionAuthority: 'MIDC Special Planning Authority (SPA) & MIDC Fire Dept.',
      description: language === 'mr' ? 'महाराष्ट्र औद्योगिक विकास महामंडळाने (MIDC) विकसित केलेले औद्योगिक भूखंड, जेथे वीज, रस्ते आणि सांडपाण्याची स्वतंत्र व्यवस्था आहे.' : language === 'hi' ? 'महाराष्ट्र औद्योगिक विकास निगम द्वारा विकसित औद्योगिक भूखंड, जिसमें बिजली, सड़क और अपशिष्ट पाइपलाइनों की सुविधा है।' : 'Zoned industrial plots developed by Maharashtra Industrial Development Corporation with dedicated power, roads, and effluent pipelines.',
      clearancesImpact: language === 'mr' ? 'बांधकाम आराखडा थेट MIDC SPA कडून मंजूर; MIDC अग्निशमन अधिकाऱ्याकडून Fire NOC; MIDC कडून पाणीपुरवठा.' : language === 'hi' ? 'भवन योजना सीधे MIDC SPA द्वारा स्वीकृत; MIDC फायर ऑफिसर द्वारा जारी फायर एनओसी; MIDC वाटर वर्क्स द्वारा जल आवंटन।' : 'Building plan approved directly by MIDC SPA; Fire NOC issued by MIDC Fire Officer; Water allotted by MIDC Water Works.'
    },
    {
      id: 'municipal',
      title: language === 'mr' ? 'महानगरपालिका / नगरपरिषद क्षेत्र' : language === 'hi' ? 'नगर निगम / नगर परिषद क्षेत्र' : 'Municipal Corporation / Municipal Council Area',
      marathiTitle: 'महानगरपालिका / नगरपरिषद क्षेत्र',
      badge: language === 'mr' ? 'नागरी स्थानिक स्वराज्य संस्था (ULB)' : language === 'hi' ? 'शहरी स्थानीय निकाय (ULB)' : 'Urban Local Body (ULB)',
      jurisdictionAuthority: 'Local Municipal Corporation (e.g. BMC, PMC, PCMC, NMMC) & Town Planning',
      description: language === 'mr' ? 'शहराच्या हद्दीतील महानगरपालिका क्षेत्र, औद्योगिक वसाहती किंवा अधिकृत व्यावसायिक झोन.' : language === 'hi' ? 'शहर की सीमाओं, औद्योगिक गलियों, या अधिसूचित वाणिज्यिक क्षेत्रों के भीतर शहरी नगरपालिका सीमाएँ।' : 'Urban municipal limits within city boundaries, industrial gallis, or notified commercial commercial zones.',
      clearancesImpact: language === 'mr' ? 'महानगरपालिका गुमास्ता (Trade License) आवश्यक; बांधकाम आराखडा नगररचना विभागाकडून (Town Planning) मंजूर; महानगरपालिकेच्या अग्निशमन अधिकाऱ्याकडून Fire NOC.' : language === 'hi' ? 'नगर निगम व्यापार लाइसेंस की आवश्यकता है; ULB टाउन प्लानिंग द्वारा स्वीकृत भवन योजना; मुख्य अग्निशमन अधिकारी द्वारा फायर एनओसी।' : 'Requires Municipal Trade License; Building plan sanctioned by ULB Town Planning; Fire NOC by Municipal Chief Fire Officer.'
    },
    {
      id: 'rural',
      title: language === 'mr' ? 'ग्रामीण / ग्रामपंचायत क्षेत्र (MIDC/ULB च्या बाहेर)' : language === 'hi' ? 'ग्रामीण / ग्राम पंचायत क्षेत्र (MIDC/ULB के बाहर)' : 'Rural / Gram Panchayat Area (Outside MIDC/ULB)',
      marathiTitle: 'ग्रामीण / ग्रामपंचायत क्षेत्र',
      badge: language === 'mr' ? 'जिल्हाधिकारी कार्यालय व पंचायत' : language === 'hi' ? 'जिला कलेक्ट्रेट और पंचायत' : 'District Collectorate & Panchayat',
      jurisdictionAuthority: 'Gram Panchayat & District Collectorate (Town Planning Branch)',
      description: language === 'mr' ? 'औद्योगिक वापरासाठी रूपांतरित केलेली शेतजमीन (NA परवानगी) किंवा गावठाण औद्योगिक पट्टे.' : language === 'hi' ? 'औद्योगिक उपयोग (गैर-कृषि NA अनुमति) या गाँवठान औद्योगिक बेल्ट में परिवर्तित कृषि भूमि।' : 'Agricultural land converted to industrial use (Non-Agricultural NA permission) or Gaothan industrial belts.',
      clearancesImpact: language === 'mr' ? 'ग्रामपंचायत ना हरकत प्रमाणपत्र (Trade NOC); जिल्हाधिकारी / उपविभागीय अधिकारी (SDO) यांच्याकडून अकृषिक (NA) आदेश; MJP द्वारे ग्रामीण पाणीपुरवठा.' : language === 'hi' ? 'ग्राम पंचायत व्यापार एनओसी; जिला कलेक्टर / उप-विभागीय अधिकारी (SDO) द्वारा एनए आदेश; एमजेपी के माध्यम से ग्रामीण जल आपूर्ति।' : 'Gram Panchayat Trade NOC; NA Order by District Collector / Sub-Divisional Officer (SDO); Rural water supply via MJP.'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gov-navy)' }}>
          {language === 'mr'
            ? 'टप्पा २: उद्योगाच्या जागेचे अधिकारक्षेत्र निवडा'
            : language === 'hi' 
            ? 'चरण 2: अपने प्रस्तावित स्थान का चयन करें'
            : 'Step 2: Select Your Proposed Location Jurisdiction'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--gov-text-secondary)', marginTop: '4px' }}>
          {language === 'mr'
            ? 'जागेचे स्थान अत्यंत महत्त्वाचे आहे, कारण अधिकारक्षेत्र बदलल्यास बांधकाम मंजुरी, अग्निशमन दाखला व पाणी जोडणी देणारे प्राधिकरण बदलते.'
            : language === 'hi'
            ? 'स्थान का प्रकार अधिकार क्षेत्र तय करता है, जिससे यह निर्धारित होता है कि एमआईडीसी, स्थानीय नगर निगम, या ग्राम पंचायत आपकी भवन योजनाओं को मंजूरी देते हैं और आपकी फायर एनओसी जारी करते हैं।'
            : 'Location type dictates jurisdiction, determining whether MIDC, the local Municipal Corporation, or the Gram Panchayat sanctions your building plans and issues your Fire NOC.'}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}
      >
        {locations.map((loc) => {
          const isSelected = selectedLocation === loc.id;

          return (
            <div
              key={loc.id}
              onClick={() => onSelect(loc.id)}
              style={{
                backgroundColor: isSelected ? 'var(--gov-navy-subtle)' : '#ffffff',
                border: isSelected ? '2px solid var(--gov-navy)' : '1px solid var(--gov-border)',
                borderRadius: 'var(--gov-radius)',
                padding: '18px',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 3px 8px rgba(11, 56, 102, 0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(loc.id)}
              aria-pressed={isSelected}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid var(--gov-navy)' : '2px solid #94a3b8',
                      backgroundColor: '#ffffff',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>{renderLocationIcon(loc.id)}</span>
                </div>

                <span
                  style={{
                    backgroundColor: isSelected ? '#dbeafe' : '#f1f5f9',
                    color: isSelected ? 'var(--gov-navy)' : 'var(--gov-text-muted)',
                    border: '1px solid #cbd5e1',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '3px'
                  }}
                >
                  {loc.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '3px' }}>
                {loc.title}
              </h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gov-saffron)', marginBottom: '8px' }}>
                {loc.marathiTitle}
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
                {loc.description}
              </p>

              <div
                style={{
                  backgroundColor: isSelected ? '#ffffff' : '#f8fafc',
                  border: '1px solid var(--gov-border-subtle)',
                  borderRadius: '3px',
                  padding: '9px 11px',
                  fontSize: '12px'
                }}
              >
                <div style={{ color: 'var(--gov-navy)', fontWeight: 700, marginBottom: '2px' }}>
                  {language === 'mr' ? 'अधिकारक्षेत्र परिणाम:' : language === 'hi' ? 'वैधानिक रूटिंग प्रभाव:' : 'Statutory Routing Impact:'}
                </div>
                <div style={{ color: 'var(--gov-text-muted)', lineHeight: 1.45 }}>
                  {loc.clearancesImpact}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { ALL_CATEGORIES } from '@/lib/rules-engine';

interface Step1CategoryProps {
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}

export default function Step1Category({ selectedCategory, onSelect }: Step1CategoryProps) {
  const { language } = useApp();

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'utensils':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gov-navy)" strokeWidth="2">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        );
      case 'cogs':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gov-navy)" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case 'tshirt':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gov-navy)" strokeWidth="2">
            <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
          </svg>
        );
      case 'flask':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gov-navy)" strokeWidth="2">
            <path d="M10 2v7.31L4.1 19.46A2 2 0 0 0 5.8 22h12.4a2 2 0 0 0 1.7-2.54L14 9.31V2" />
            <line x1="8.5" y1="2" x2="15.5" y2="2" />
            <line x1="14" y1="9" x2="10" y2="9" />
          </svg>
        );
      case 'laptop':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gov-navy)" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="2" y1="20" x2="22" y2="20" />
          </svg>
        );
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gov-navy)" strokeWidth="2">
            <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gov-navy)' }}>
          {language === 'mr' ? 'टप्पा १: आपला प्रस्तावित उद्योग प्रकार निवडा' : language === 'hi' ? 'चरण 1: अपनी प्रस्तावित व्यवसाय श्रेणी का चयन करें' : 'Step 1: Select Your Proposed Business Category'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--gov-text-secondary)', marginTop: '4px' }}>
          {language === 'mr' ? 'कायदेशीर परवानग्या, प्रदूषण वर्गवारी आणि फॅक्टरी सुरक्षिततेची आवश्यकता मुख्यतः आपल्या उद्योगाच्या स्वरूपावर अवलंबून असते.' : language === 'hi' ? 'वैधानिक मंजूरी, प्रदूषण वर्गीकरण और कारखाने की सुरक्षा प्रयोज्यता मुख्य रूप से आपकी गतिविधि के क्षेत्र पर निर्भर करती है।' : 'Statutory approvals, pollution classification, and factory safety applicability depend primarily on your sector of activity.'}
        </p>
      </div>

      {/* Grid of Category Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}
      >
        {ALL_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              style={{
                backgroundColor: isSelected ? 'var(--gov-navy-subtle)' : '#ffffff',
                border: isSelected ? '2px solid var(--gov-navy)' : '1px solid var(--gov-border)',
                borderRadius: 'var(--gov-radius)',
                padding: '18px',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: isSelected ? '0 3px 8px rgba(11, 56, 102, 0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(cat.id)}
              aria-pressed={isSelected}
            >
              {/* Radio Indicator & Badge */}
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
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>{renderCategoryIcon(cat.icon)}</span>
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
                  {language === 'mr' ? cat.marathi_badge || cat.badge : language === 'hi' ? cat.hindi_badge || cat.badge : cat.badge}
                </span>
              </div>

              {/* Titles */}
              <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '3px' }}>
                {language === 'mr' ? cat.name : language === 'hi' ? cat.name : cat.name}
              </h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gov-saffron)', marginBottom: '8px' }}>
                {language === 'hi' ? cat.hindi_name : cat.marathi_name}
              </div>

              {/* Description */}
              <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', marginBottom: '10px', lineHeight: 1.5 }}>
                {language === 'mr' ? cat.marathi_description || cat.description : language === 'hi' ? cat.hindi_description || cat.description : cat.description}
              </p>

              {/* Typical Examples Box */}
              <div
                style={{
                  backgroundColor: isSelected ? '#ffffff' : '#f8fafc',
                  border: '1px solid var(--gov-border-subtle)',
                  borderRadius: '3px',
                  padding: '7px 10px',
                  fontSize: '11.5px',
                  color: 'var(--gov-text-muted)'
                }}
              >
                <strong style={{ color: 'var(--gov-text-primary)' }}>
                  {language === 'mr' ? 'उदाहरणे:' : language === 'hi' ? 'उदाहरण:' : 'Examples:'}{' '}
                </strong>
                {language === 'mr' ? cat.marathi_examples || cat.examples : language === 'hi' ? cat.hindi_examples || cat.examples : cat.examples}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '16px',
          padding: '10px 14px',
          backgroundColor: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '4px',
          fontSize: '12px',
          color: 'var(--gov-text-muted)'
        }}
      >
        <span style={{ fontWeight: 700, color: 'var(--gov-navy)' }}>
          {language === 'mr' ? 'शासकीय नोंद:' : language === 'hi' ? 'शासकीय टिप्पणी:' : 'Official Regulatory Notice:'}
        </span>{' '}
        {language === 'mr'
          ? 'उद्योगाचे वर्गीकरण महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB) प्रदूषण श्रेणीनुसार (लाल, नारंगी, हिरवा, पांढरा) नियमित केले जाते.'
          : language === 'hi'
          ? 'उद्योगों का वर्गीकरण महाराष्ट्र प्रदूषण नियंत्रण बोर्ड (MPCB) के प्रदूषण रंग सूचकांक (लाल, नारंगी, हरा, सफेद) के तहत मान्य है।'
          : 'Industrial categorization is aligned directly with the Maharashtra Pollution Control Board (MPCB) environmental index classification (Red, Orange, Green, White).'}
      </div>
    </div>
  );
}

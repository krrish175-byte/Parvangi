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

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'utensils':
        return '🍲';
      case 'cogs':
        return '⚙️';
      case 'tshirt':
        return '🧵';
      case 'flask':
        return '🧪';
      case 'laptop':
        return '💻';
      default:
        return '🏭';
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

      {/* Grid of Category Cards (Card-Select, NOT Dropdown) */}
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
                  <span style={{ fontSize: '24px' }}>{getCategoryIcon(cat.icon)}</span>
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
          border: '1px dashed #cbd5e1',
          borderRadius: '4px',
          fontSize: '12px',
          color: 'var(--gov-text-muted)'
        }}
      >
        💡 <span style={{ fontWeight: 600 }}>
          {language === 'mr' ? 'विस्तार करण्यायोग्य प्रणाली:' : language === 'hi' ? 'विस्तार योग्य वास्तुकला:' : 'Extensible Architecture:'}
        </span>{' '}
        {language === 'mr' ? 'श्रेणीची व्याख्या data/categories.json मधून डायनॅमिकरित्या लोड केली जाते. भविष्यात नवीन क्लस्टर्स (उदा. इलेक्ट्रॉनिक्स, औषधनिर्माण, सौर) जोडण्यासाठी कोड बदलण्याची आवश्यकता नाही.' : language === 'hi' ? 'श्रेणी परिभाषाएँ data/categories.json से गतिशील रूप से लोड की जाती हैं। भविष्य के क्लस्टर (जैसे, इलेक्ट्रॉनिक्स, फार्मास्यूटिकल्स, सोलर) को जोड़ने के लिए शून्य कोड संशोधन की आवश्यकता होती है।' : 'Category definitions are dynamically loaded from data/categories.json. Adding future clusters (e.g., Electronics, Pharmaceuticals, Solar) requires zero code modifications.'}
      </div>
    </div>
  );
}

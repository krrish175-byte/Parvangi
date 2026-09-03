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
          {language === 'mr'
            ? 'टप्पा १: आपल्या प्रस्तावित उद्योगाचा प्रकार निवडा'
            : 'Step 1: Select Your Proposed Business Category'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--gov-text-secondary)', marginTop: '4px' }}>
          {language === 'mr'
            ? 'परवानग्या आणि आवश्यक पर्यावरण संमती (MPCB Orange/Green/Red) उद्योगाच्या प्रकारावर थेट अवलंबून असतात.'
            : 'Statutory approvals, pollution classification, and factory safety applicability depend primarily on your sector of activity.'}
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
                  {cat.badge}
                </span>
              </div>

              {/* Titles */}
              <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '3px' }}>
                {cat.name}
              </h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gov-saffron)', marginBottom: '8px' }}>
                {cat.marathi_name}
              </div>

              {/* Description */}
              <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', marginBottom: '10px', lineHeight: 1.5 }}>
                {cat.description}
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
                  {language === 'mr' ? 'उदाहरणे:' : 'Examples:'}{' '}
                </strong>
                {cat.examples}
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
        💡 <strong>Extensible Architecture:</strong> Category definitions are dynamically loaded from{' '}
        <code>data/categories.json</code>. Adding future clusters (e.g., Electronics, Pharmaceuticals, Solar) requires zero code modifications.
      </div>
    </div>
  );
}

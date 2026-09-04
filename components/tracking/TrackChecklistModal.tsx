'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { UserProfileInput } from '@/lib/types';

interface TrackChecklistModalProps {
  onClose: () => void;
  onLoadProfile: (profile: UserProfileInput) => void;
}

export default function TrackChecklistModal({ onClose, onLoadProfile }: TrackChecklistModalProps) {
  const { language } = useApp();
  const [refCode, setRefCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const sampleProfiles: {
    label: string;
    marathiLabel: string;
    hindiLabel: string;
    profile: UserProfileInput;
  }[] = [
    {
      label: 'Small Manufacturing Workshop (MIDC · ₹45L Micro)',
      marathiLabel: 'लघु उत्पादन कार्यशाळा (एमआयडीसी · ₹४५ लाख)',
      hindiLabel: 'लघु विनिर्माण कार्यशाला (एमआईडीसी · ₹45L)',
      profile: {
        category: 'small_manufacturing',
        location: 'midc',
        scale: 'micro',
        investmentInLakhs: 45,
        stage: 'new_unit',
        district: 'Pune'
      }
    },
    {
      label: 'Food Processing Center (Municipal · ₹25L Micro)',
      marathiLabel: 'खाद्य प्रक्रिया केंद्र (मनपा · ₹२५ लाख)',
      hindiLabel: 'खाद्य प्रसंस्करण केंद्र (मनपा · ₹25L)',
      profile: {
        category: 'food_processing',
        location: 'municipal',
        scale: 'micro',
        investmentInLakhs: 25,
        stage: 'new_unit',
        district: 'Nashik'
      }
    },
    {
      label: 'Textile Unit with Boilers (MIDC · ₹1.80 Cr Small)',
      marathiLabel: 'कापड व बॉइलर उद्योग (एमआयडीसी · ₹१.८० कोटी)',
      hindiLabel: 'बॉयलर वाली कपड़ा इकाई (एमआईडीसी · ₹1.80Cr)',
      profile: {
        category: 'textile',
        location: 'midc',
        scale: 'small',
        investmentInLakhs: 180,
        stage: 'new_unit',
        district: 'Solapur'
      }
    },
    {
      label: 'IT & Digital Services Hub (Municipal · ₹15L Micro)',
      marathiLabel: 'माहिती तंत्रज्ञान सेवा (मनपा · ₹१५ लाख)',
      hindiLabel: 'आईटी और डिजिटल सेवा हब (मनपा · ₹15L)',
      profile: {
        category: 'it_services',
        location: 'municipal',
        scale: 'micro',
        investmentInLakhs: 15,
        stage: 'new_unit',
        district: 'Nagpur'
      }
    }
  ];

  const handleLookup = () => {
    if (!refCode.trim()) {
      setError('Please enter a valid Reference ID (e.g. MH-PRV-2025-XXXXX)');
      return;
    }

    // Load default sample if custom code is typed
    setError('');
    onLoadProfile(sampleProfiles[0].profile);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 34, 68, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--gov-radius)',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          borderTop: '4px solid var(--gov-saffron)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1.5px solid var(--gov-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--gov-navy)' }}>
              🔍 {language === 'mr' ? 'परवानगी सूची ट्रॅक करा / शोधा' : language === 'hi' ? 'मौजूदा अनुसूची ट्रैक करें' : 'Track Existing Approval Schedule'}
            </h2>
            <span style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)' }}>
              Recall your previously evaluated regulatory sequence
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '3px',
              padding: '4px 8px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="reference-code-input"
              style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '6px' }}
            >
              {language === 'mr' ? 'संदर्भ क्रमांक टाका:' : language === 'hi' ? 'Enter 16-Character Reference Number:' : 'Enter 16-Character Reference Number:'}
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                id="reference-code-input"
                type="text"
                placeholder="e.g. MH-PRV-2025-48201"
                value={refCode}
                onChange={(e) => {
                  setRefCode(e.target.value.toUpperCase());
                  setError('');
                }}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  fontSize: '14px',
                  border: '1.5px solid #94a3b8',
                  borderRadius: '3px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              />
              <button
                type="button"
                className="btn-gov-primary"
                onClick={handleLookup}
                style={{ padding: '9px 18px' }}
              >
                {language === 'mr' ? 'शोधा' : language === 'hi' ? 'खोजें' : 'Lookup'}
              </button>
            </div>
            {error && (
              <div style={{ color: '#dc2626', fontSize: '11.5px', marginTop: '4px', fontWeight: 600 }}>
                {error}
              </div>
            )}
          </div>

          {/* Quick Demo Pre-sets */}
          <div style={{ borderTop: '1px solid var(--gov-border-subtle)', paddingTop: '14px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
              💡 {language === 'mr' ? 'किंवा चाचणीसाठी थेट नमुना उद्योग लोड करा:' : language === 'hi' ? 'Or Instantly Test With Real Case Profiles:' : 'Or Instantly Test With Real Case Profiles:'}
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {sampleProfiles.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onLoadProfile(s.profile)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '3px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <strong style={{ color: 'var(--gov-navy)' }}>
                    {language === 'mr' ? s.marathiLabel : language === 'hi' ? s.hindiLabel : s.label}
                  </strong>
                  <span style={{ color: 'var(--gov-saffron)', fontWeight: 700 }}>Load →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid var(--gov-border)', textAlign: 'right' }}>
          <button type="button" className="btn-gov-outline" onClick={onClose} style={{ padding: '5px 14px' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

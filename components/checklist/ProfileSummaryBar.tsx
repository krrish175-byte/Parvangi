'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { UserProfileInput } from '@/lib/types';
import { getCategoryById } from '@/lib/rules-engine';
import { formatINR } from '@/lib/msme-classifier';

interface ProfileSummaryBarProps {
  profile: UserProfileInput;
  onEdit: () => void;
}

export default function ProfileSummaryBar({ profile, onEdit }: ProfileSummaryBarProps) {
  const { language } = useApp();
  const categoryDetails = getCategoryById(profile.category);

  const getLocationLabel = (loc: string) => {
    switch (loc) {
      case 'midc':
        return language === 'mr' ? 'एमआयडीसी वसाहत' : language === 'hi' ? 'एमआईडीसी औद्योगिक क्षेत्र' : 'MIDC Industrial Area';
      case 'municipal':
        return language === 'mr' ? 'महानगरपालिका क्षेत्र' : language === 'hi' ? 'नगर निगम' : 'Municipal Corporation';
      case 'rural':
        return language === 'mr' ? 'ग्रामीण / ग्रामपंचायत' : language === 'hi' ? 'ग्रामीण / ग्राम पंचायत' : 'Rural / Gram Panchayat';
      default:
        return loc;
    }
  };

  const getStageLabel = (stg: string) => {
    switch (stg) {
      case 'new_unit':
        return language === 'mr' ? 'नवीन उद्योग घटक' : language === 'hi' ? 'नई ग्रीनफील्ड इकाई' : 'New Greenfield Unit';
      case 'expansion':
        return language === 'mr' ? 'विद्यमान विस्तार' : language === 'hi' ? 'विस्तार / आधुनिकीकरण' : 'Expansion / Modernization';
      case 'formalize':
        return language === 'mr' ? 'नियमितीकरण' : language === 'hi' ? 'औपचारिकीकरण' : 'Formalization';
      default:
        return stg;
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--gov-border)',
        borderRadius: 'var(--gov-radius)',
        padding: '14px 18px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', textTransform: 'uppercase' }}>
          {language === 'mr' ? 'निवडलेली पार्श्वभूमी:' : language === 'hi' ? 'चयनित प्रोफ़ाइल:' : 'Selected Profile:'}
        </span>

        {/* Category Pill */}
        <span
          style={{
            backgroundColor: 'var(--gov-navy-subtle)',
            color: 'var(--gov-navy)',
            border: '1px solid #bfdbfe',
            fontSize: '12px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '3px'
          }}
        >
          🏭 {categoryDetails?.name || profile.category}
        </span>

        {/* Location Pill */}
        <span
          style={{
            backgroundColor: '#f1f5f9',
            color: '#334155',
            border: '1px solid #cbd5e1',
            fontSize: '12px',
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: '3px'
          }}
        >
          📍 {getLocationLabel(profile.location)}
        </span>

        {/* Scale Pill */}
        <span
          style={{
            backgroundColor: 'var(--gov-saffron-light)',
            color: 'var(--gov-saffron)',
            border: '1px solid var(--gov-saffron-border)',
            fontSize: '12px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '3px'
          }}
        >
          💰 {formatINR(profile.investmentInLakhs)} ({profile.scale.toUpperCase()})
        </span>

        {/* Stage Pill */}
        <span
          style={{
            backgroundColor: '#f1f5f9',
            color: '#334155',
            border: '1px solid #cbd5e1',
            fontSize: '12px',
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: '3px'
          }}
        >
          ⚡ {getStageLabel(profile.stage)}
        </span>

        {/* District Pill */}
        {profile.district && (
          <span
            style={{
              backgroundColor: '#f8fafc',
              color: 'var(--gov-text-muted)',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              padding: '3px 8px',
              borderRadius: '3px'
            }}
          >
            🏛️ {profile.district} {language === 'mr' ? 'जिल्हा' : language === 'hi' ? 'ज़िला' : 'District'}
          </span>
        )}
      </div>

      <button
        type="button"
        className="btn-gov-outline"
        onClick={onEdit}
        style={{ padding: '6px 14px', fontSize: '12.5px' }}
      >
        ✏️ {language === 'mr' ? 'माहिती बदला' : language === 'hi' ? 'विवरण बदलें' : 'Modify Inputs'}
      </button>
    </div>
  );
}

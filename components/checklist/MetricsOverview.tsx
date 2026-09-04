'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { ChecklistMetrics } from '@/lib/types';

interface MetricsOverviewProps {
  metrics: ChecklistMetrics;
}

export default function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const { language } = useApp();

  const stats = [
    {
      id: 'total',
      label: language === 'mr' ? 'एकूण वैधानिक परवानग्या' : language === 'hi' ? 'कुल आवश्यक मंजूरी' : 'Total Required Approvals',
      value: metrics.total,
      badge: language === 'mr' ? '१००% सत्यापित' : language === 'hi' ? '100% सत्यापित' : '100% Verified',
      color: 'var(--gov-navy)'
    },
    {
      id: 'mandatory',
      label: language === 'mr' ? 'अनिवार्य परवानग्या' : language === 'hi' ? 'अनिवार्य मंजूरी' : 'Mandatory Clearances',
      value: metrics.mandatoryCount,
      badge: language === 'mr' ? 'कायदेशीररित्या बंधनकारक' : language === 'hi' ? 'कानूनी रूप से अनिवार्य' : 'Legally Compulsory',
      color: 'var(--gov-status-mandatory)'
    },
    {
      id: 'conditional',
      label: language === 'mr' ? 'सशर्त / प्रक्रियेनुसार' : language === 'hi' ? 'सशर्त मंजूरी' : 'Conditional Clearances',
      value: metrics.conditionalCount,
      badge: metrics.conditionalCount > 0 ? (language === 'mr' ? 'प्रक्रियेवर अवलंबून' : language === 'hi' ? 'प्रक्रिया पर निर्भर' : 'Process Dependent') : (language === 'mr' ? 'लागू नाही' : language === 'hi' ? 'लागू नहीं' : 'None Applicable'),
      color: 'var(--gov-status-conditional)'
    },
    {
      id: 'timeline',
      label: language === 'mr' ? 'अंदाजे कालावधी (समांतर टप्पे)' : language === 'hi' ? 'अनुमानित समय' : 'Est. Sequential Turnaround',
      value: language === 'mr' ? `${metrics.estimatedDaysMin}–${metrics.estimatedDaysMax} दिवस` : language === 'hi' ? `${metrics.estimatedDaysMin}–${metrics.estimatedDaysMax} दिन` : `${metrics.estimatedDaysMin}–${metrics.estimatedDaysMax} Days`,
      badge: language === 'mr' ? 'टप्प्याटप्प्याने प्रक्रिया' : language === 'hi' ? 'चरणबद्ध प्रसंस्करण' : 'Phased Processing',
      color: '#0f766e'
    },
    {
      id: 'departments',
      label: language === 'mr' ? 'नियमन विभाग व प्राधिकरणे' : language === 'hi' ? 'विनियमन विभाग' : 'Regulating Departments',
      value: metrics.departmentCount,
      badge: language === 'mr' ? 'राज्य व केंद्र' : language === 'hi' ? 'राज्य और केंद्र' : 'State & Central',
      color: 'var(--gov-navy-light)'
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '12px',
        marginBottom: '24px'
      }}
    >
      {stats.map((st) => (
        <div
          key={st.id}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--gov-border)',
            borderTop: `3px solid ${st.color}`,
            borderRadius: 'var(--gov-radius)',
            padding: '12px 14px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', color: 'var(--gov-text-muted)', fontWeight: 600 }}>
              {st.label}
            </span>
          </div>

          <div style={{ fontSize: '22px', fontWeight: 800, color: st.color, lineHeight: 1.1 }}>
            {st.value}
          </div>

          <div style={{ marginTop: '4px', fontSize: '10.5px', color: 'var(--gov-text-muted)', fontWeight: 600 }}>
            {st.badge}
          </div>
        </div>
      ))}
    </div>
  );
}

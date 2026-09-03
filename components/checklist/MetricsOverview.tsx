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
      label: language === 'mr' ? 'एकूण वैधानिक परवानग्या' : 'Total Required Approvals',
      value: metrics.total,
      badge: '100% Verified',
      color: 'var(--gov-navy)'
    },
    {
      id: 'mandatory',
      label: language === 'mr' ? 'अनिवार्य परवानग्या' : 'Mandatory Clearances',
      value: metrics.mandatoryCount,
      badge: 'Legally Compulsory',
      color: 'var(--gov-status-mandatory)'
    },
    {
      id: 'conditional',
      label: language === 'mr' ? 'सशर्त / प्रक्रियेनुसार' : 'Conditional Clearances',
      value: metrics.conditionalCount,
      badge: metrics.conditionalCount > 0 ? 'Process Dependent' : 'None Applicable',
      color: 'var(--gov-status-conditional)'
    },
    {
      id: 'timeline',
      label: language === 'mr' ? 'अंदाजे कालावधी (समांतर टप्पे)' : 'Est. Sequential Turnaround',
      value: `${metrics.estimatedDaysMin}–${metrics.estimatedDaysMax} Days`,
      badge: 'Phased Processing',
      color: '#0f766e'
    },
    {
      id: 'departments',
      label: language === 'mr' ? 'नियमन विभाग व प्राधिकरणे' : 'Regulating Departments',
      value: metrics.departmentCount,
      badge: 'State & Central',
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

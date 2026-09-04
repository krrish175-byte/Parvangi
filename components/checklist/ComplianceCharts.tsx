'use client';

import React from 'react';
import { ApprovalRecord } from '@/lib/types';
import { useApp } from '@/lib/context';
import { Clock, CheckCircle2, DollarSign, Layers } from 'lucide-react';

interface ComplianceChartsProps {
  approvals: ApprovalRecord[];
}

export default function ComplianceCharts({ approvals }: ComplianceChartsProps) {
  const { language } = useApp();

  // 1. Calculate Phase-wise timelines
  const phases = [
    { id: 1, name: language === 'mr' ? '१. नोंदणी व कर (Tax & ID)' : '1. Legal Person & Tax ID', icon: '📝', color: '#0284c7' },
    { id: 2, name: language === 'mr' ? '२. जागा व बांधकाम (Site & Plan)' : '2. Land & Construction', icon: '🏭', color: '#d97706' },
    { id: 3, name: language === 'mr' ? '३. पर्यावरण व फॅक्टरी (Safety)' : '3. Safety & Environment', icon: '🛡️', color: '#dc2626' },
    { id: 4, name: language === 'mr' ? '४. वीज-पाणी जोडणी (Utilities)' : '4. Utilities & Production', icon: '⚡', color: '#16a34a' }
  ];

  const phaseData = phases.map((p) => {
    const phaseItems = approvals.filter((a) => a.stage_phase === p.id);
    const count = phaseItems.length;
    const minDays = count > 0 ? Math.max(...phaseItems.map((i) => i.timeline_days_min)) : 0;
    const maxDays = count > 0 ? Math.max(...phaseItems.map((i) => i.timeline_days_max)) : 0;
    return { ...p, count, minDays, maxDays };
  });

  // Calculate Zero-Cost vs Paid Clearances
  const zeroCostCount = approvals.filter(
    (a) => a.fee_structure.includes('₹0') || a.fee_structure.toLowerCase().includes('free')
  ).length;

  return (
    <div style={{ marginTop: '20px', marginBottom: '24px' }}>
      {/* Visual Roadmap Cards Header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        
        {/* CARD 1: Total Steps */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '3px solid var(--gov-navy)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', backgroundColor: 'var(--gov-navy-subtle)', borderRadius: '6px' }}>
              <Layers size={20} color="var(--gov-navy)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'mr' ? 'एकूण वैधानिक परवानग्या' : 'Total Required Clearances'}
              </div>
              <strong style={{ fontSize: '20px', color: 'var(--gov-navy)' }}>
                {approvals.length} {language === 'mr' ? 'परवानग्या' : 'Clearances'}
              </strong>
            </div>
          </div>
        </div>

        {/* CARD 2: Zero-Cost Clearances */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '3px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', backgroundColor: '#dcfce7', borderRadius: '6px' }}>
              <DollarSign size={20} color="#16a34a" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'mr' ? 'मोफत परवानग्या (Zero Fee)' : 'Zero-Cost Approvals'}
              </div>
              <strong style={{ fontSize: '20px', color: '#16a34a' }}>
                {zeroCostCount} {language === 'mr' ? 'मोफत' : 'Free Clearances'}
              </strong>
            </div>
          </div>
        </div>

        {/* CARD 3: Timeline Summary */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '3px solid var(--gov-saffron)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', backgroundColor: 'var(--gov-saffron-light)', borderRadius: '6px' }}>
              <Clock size={20} color="var(--gov-saffron)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'mr' ? 'अंदाजे प्रक्रिया वेळ' : 'Estimated Time Duration'}
              </div>
              <strong style={{ fontSize: '20px', color: 'var(--gov-navy)' }}>
                30 – 120 {language === 'mr' ? 'दिवस' : 'Days Total'}
              </strong>
            </div>
          </div>
        </div>

      </div>

      {/* Simplified 4-Stage Execution Timeline for Non-Tech Users */}
      <div className="gov-card" style={{ padding: '20px', borderTop: '3px solid var(--gov-navy)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '14px' }}>
          🛣️ {language === 'mr' ? 'उद्योग उभारणीचा ४-टप्प्यांचा सोपा आराखडा (Simple Stage Roadmap)' : 'Step-by-Step Business Setup Stage Roadmap'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {phaseData.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: '#f8fafc',
                border: `1.5px solid ${p.color}`,
                borderRadius: '6px',
                padding: '14px'
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{p.icon}</div>
              <strong style={{ display: 'block', fontSize: '13.5px', color: 'var(--gov-navy)', marginBottom: '4px' }}>
                {p.name}
              </strong>
              <div style={{ fontSize: '12px', fontWeight: 700, color: p.color, marginBottom: '6px' }}>
                {p.count} {language === 'mr' ? 'परवानग्या' : 'Clearances'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)' }}>
                ⏱️ {p.minDays}–{p.maxDays} {language === 'mr' ? 'दिवस' : 'Days'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

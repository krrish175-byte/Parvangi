'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { ApprovalStatus, PhaseGroup as PhaseGroupType } from '@/lib/types';
import ApprovalItemCard from './ApprovalItemCard';

interface PhaseGroupProps {
  group: PhaseGroupType;
  globalStartIndex: number;
  statuses: Record<string, ApprovalStatus>;
  onStatusChange: (approvalId: string, status: ApprovalStatus) => void;
}

export default function PhaseGroup({ group, globalStartIndex, statuses, onStatusChange }: PhaseGroupProps) {
  const { language } = useApp();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const getPhaseBadgeColor = (phase: number) => {
    switch (phase) {
      case 1:
        return '#0284c7';
      case 2:
        return '#d97706';
      case 3:
        return '#dc2626';
      case 4:
        return '#16a34a';
      default:
        return 'var(--gov-navy)';
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        border: '1px solid var(--gov-border)',
        borderRadius: 'var(--gov-radius)',
        marginBottom: '20px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}
    >
      {/* Phase Header Strip */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottom: isExpanded ? '1.5px solid var(--gov-border)' : 'none',
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span
            style={{
              backgroundColor: getPhaseBadgeColor(group.phase),
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '3px',
              letterSpacing: '0.4px'
            }}
          >
            PHASE {group.phase}
          </span>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--gov-navy-dark)', lineHeight: 1.2 }}>
              {language === 'mr' ? group.marathi_name : language === 'hi' ? group.hindi_name : group.name}
            </h3>
            <span style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)' }}>
              {language === 'mr' ? group.name : group.marathi_name}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              backgroundColor: 'var(--gov-navy-subtle)',
              color: 'var(--gov-navy)',
              fontSize: '11.5px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid #bfdbfe'
            }}
          >
            {group.items.length} {language === 'mr' ? 'परवानग्या' : language === 'hi' ? 'मंजूरी' : 'Approvals'}
          </span>

          <span style={{ fontSize: '13px', color: 'var(--gov-navy)', fontWeight: 'bold' }}>
            {isExpanded ? '▲' : '▼'}
          </span>
        </div>
      </div>

      {/* Phase Description Banner */}
      {isExpanded && (
        <p style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', padding: '10px 18px', backgroundColor: '#f8fafc', borderBottom: '1px solid var(--gov-border-subtle)', margin: 0 }}>
          <span style={{ fontWeight: 700, color: 'var(--gov-navy)' }}>ℹ</span> {language === 'hi' ? group.hindi_description : language === 'mr' ? group.marathi_description : group.description}
        </p>
      )}

      {/* Items Container */}
      {isExpanded && (
        <div style={{ padding: '14px 16px 6px 16px' }}>
          {group.items.map((app, idx) => (
            <ApprovalItemCard
              key={app.id}
              approval={app}
              itemIndex={globalStartIndex + idx}
              status={statuses[app.id] || 'pending'}
              onStatusChange={(status) => onStatusChange(app.id, status)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

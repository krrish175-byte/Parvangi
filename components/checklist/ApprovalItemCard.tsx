'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { ApprovalRecord } from '@/lib/types';
import { ALL_APPROVALS } from '@/lib/rules-engine';
import { Clock, Building2, ExternalLink, ChevronDown, ChevronRight, FileText, CheckCircle2, Circle, Clock3, Link2 } from 'lucide-react';

export type ItemStatus = 'pending' | 'in_progress' | 'completed';

interface ApprovalItemCardProps {
  approval: ApprovalRecord;
  itemIndex: number;
  status?: ItemStatus;
  onStatusChange?: (id: string, newStatus: ItemStatus) => void;
}

export default function ApprovalItemCard({
  approval,
  itemIndex,
  status = 'pending',
  onStatusChange
}: ApprovalItemCardProps) {
  const { language } = useApp();
  const [showDocs, setShowDocs] = useState<boolean>(false);

  // Find parent names for prerequisite display
  const prerequisiteNames = approval.depends_on
    .map((depId) => ALL_APPROVALS.find((a) => a.id === depId)?.name)
    .filter(Boolean);

  const isMandatory = approval.mandatory_or_conditional === 'Mandatory';

  const handleCycleStatus = () => {
    if (!onStatusChange) return;
    if (status === 'pending') onStatusChange(approval.id, 'in_progress');
    else if (status === 'in_progress') onStatusChange(approval.id, 'completed');
    else onStatusChange(approval.id, 'pending');
  };

  return (
    <div
      id={approval.id}
      style={{
        backgroundColor: status === 'completed' ? '#f0fdf4' : '#ffffff',
        border: status === 'completed' ? '1.5px solid #86efac' : '1px solid var(--gov-border)',
        borderLeft: isMandatory ? '4px solid var(--gov-navy)' : '4px solid var(--gov-status-conditional)',
        borderRadius: '6px',
        padding: '16px 20px',
        marginBottom: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Top Meta Line: Sequence # + Badges + Authority + Interactive Status Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              backgroundColor: 'var(--gov-navy)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '3px'
            }}
          >
            #{itemIndex + 1}
          </span>

          <span className={isMandatory ? 'badge-mandatory' : 'badge-conditional'}>
            {isMandatory
              ? language === 'mr' ? 'अनिवार्य परवाना' : 'Mandatory'
              : language === 'mr' ? 'सशर्त परवाना' : 'Conditional'}
          </span>

          <span style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} color="var(--gov-text-muted)" />
            <strong>{approval.typical_timeline}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge-authority" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Building2 size={12} />
            <span>{approval.issuing_authority}</span>
          </span>

          {/* Interactive Status Toggle Button */}
          {onStatusChange && (
            <button
              type="button"
              onClick={handleCycleStatus}
              title="Click to cycle status: Pending ➔ In Progress ➔ Completed"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {status === 'pending' && (
                <span className="badge-status-pending">
                  <Circle size={11} />
                  <span>{language === 'mr' ? 'प्रलंबित' : 'Pending'}</span>
                </span>
              )}
              {status === 'in_progress' && (
                <span className="badge-status-in-progress">
                  <Clock3 size={11} />
                  <span>{language === 'mr' ? 'प्रक्रियेत' : 'In Progress'}</span>
                </span>
              )}
              {status === 'completed' && (
                <span className="badge-status-completed">
                  <CheckCircle2 size={11} />
                  <span>{language === 'mr' ? 'पूर्ण' : 'Completed ✓'}</span>
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Clearance Title & Marathi Translation */}
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 800,
          color: 'var(--gov-navy-dark)',
          marginBottom: '2px',
          lineHeight: 1.3,
          textDecoration: status === 'completed' ? 'line-through' : 'none'
        }}
      >
        {approval.name}{' '}
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gov-saffron)', marginLeft: '6px' }}>
          ({approval.marathi_name})
        </span>
      </h3>

      {/* 1-Line Clean Description */}
      <p style={{ fontSize: '13px', color: 'var(--gov-text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>
        {approval.one_line_description}
      </p>

      {/* Prerequisite Line if applicable */}
      {prerequisiteNames.length > 0 && (
        <div style={{ fontSize: '11.5px', color: '#1e40af', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '4px 10px', borderRadius: '4px', marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Link2 size={13} color="#1e40af" />
          <span>
            <strong>Prerequisite:</strong> Must be preceded by <u>{prerequisiteNames.join(' & ')}</u>
          </span>
        </div>
      )}

      {/* Clean Metadata Line: Act & Fee */}
      <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)', marginBottom: '10px' }}>
        <span><strong>Act:</strong> {approval.act_and_rule}</span>
        <span style={{ margin: '0 8px' }}>•</span>
        <span style={{ color: 'var(--gov-navy)', fontWeight: 700 }}><strong>Statutory Fee:</strong> {approval.fee_structure}</span>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <button
          type="button"
          onClick={() => setShowDocs(!showDocs)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--gov-navy)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '2px 0',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {showDocs ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span>{showDocs ? 'Hide Documents' : 'View Key Required Documents'}</span>
          <span style={{ color: 'var(--gov-text-muted)', fontWeight: 400 }}>({approval.documents_preview.length})</span>
        </button>

        <a
          href={approval.portal_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: 'var(--gov-navy)',
            color: '#ffffff',
            padding: '5px 14px',
            fontSize: '11.5px',
            fontWeight: 700,
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <span>{language === 'mr' ? 'शासकीय पोर्टल उघडा' : 'Access Official Portal'}</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Collapsible Documents List */}
      {showDocs && (
        <div style={{ marginTop: '10px', padding: '10px 14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gov-navy)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FileText size={13} />
            <span>Required Documents Checklist:</span>
          </div>
          <ul style={{ listStyleType: 'disc', paddingLeft: '18px', fontSize: '12px', color: 'var(--gov-text-secondary)', lineHeight: 1.5 }}>
            {approval.documents_preview.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



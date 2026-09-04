'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { ApprovalRecord, ApprovalStatus, ApplicationSubmission } from '@/lib/types';
import { ALL_APPROVALS } from '@/lib/rules-engine';
import { getCurrentUser } from '@/lib/auth-store';
import { getApplicationByApproval } from '@/lib/application-store';

interface ApprovalItemCardProps {
  approval: ApprovalRecord;
  itemIndex: number;
  status: ApprovalStatus;
  onStatusChange: (status: ApprovalStatus) => void;
  onApplyClick?: (approval: ApprovalRecord) => void;
}

export default function ApprovalItemCard({
  approval,
  itemIndex,
  status,
  onStatusChange,
  onApplyClick
}: ApprovalItemCardProps) {
  const { language } = useApp();
  const [showDocs, setShowDocs] = useState<boolean>(false);
  const [liveApp, setLiveApp] = useState<ApplicationSubmission | undefined>(undefined);

  useEffect(() => {
    const updateApp = () => {
      const user = getCurrentUser();
      if (user) {
        setLiveApp(getApplicationByApproval(user.id, approval.id));
      } else {
        setLiveApp(undefined);
      }
    };
    updateApp();
    window.addEventListener('parvangi_auth_change', updateApp);
    window.addEventListener('parvangi_applications_change', updateApp);
    return () => {
      window.removeEventListener('parvangi_auth_change', updateApp);
      window.removeEventListener('parvangi_applications_change', updateApp);
    };
  }, [approval.id]);

  // Find parent names for prerequisite display
  const prerequisiteNames = approval.depends_on
    .map((depId) => ALL_APPROVALS.find((a) => a.id === depId)?.name)
    .filter(Boolean);

  const isMandatory = approval.mandatory_or_conditional === 'Mandatory';
  const statusLabels: Record<ApprovalStatus, string> = {
    pending: language === 'mr' ? 'प्रलंबित' : language === 'hi' ? 'लंबित' : 'Pending',
    in_progress: language === 'mr' ? 'प्रगतीपथावर' : language === 'hi' ? 'प्रगति पर' : 'In Progress',
    completed: language === 'mr' ? 'पूर्ण' : language === 'hi' ? 'पूर्ण' : 'Completed'
  };

  return (
    <div
      id={approval.id}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--gov-border)',
        borderLeft: isMandatory ? '4px solid var(--gov-navy)' : '4px solid var(--gov-status-conditional)',
        borderRadius: 'var(--gov-radius)',
        padding: '16px 20px',
        marginBottom: '12px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}
    >
      {/* Top Meta Line: Sequence # + Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              backgroundColor: 'var(--gov-navy)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '2px'
            }}
          >
            SEQ #{itemIndex + 1}
          </span>

          <span className={isMandatory ? 'badge-mandatory' : 'badge-conditional'}>
            {isMandatory
              ? language === 'mr' ? 'अनिवार्य परवाना' : language === 'hi' ? 'अनिवार्य अनुमोदन' : 'Mandatory Approval'
              : language === 'mr' ? 'सशर्त परवाना' : language === 'hi' ? 'सशर्त अनुमोदन' : 'Conditional Approval'}
          </span>

          <span
            style={{
              fontSize: '11px',
              color: 'var(--gov-text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ⏱️ <strong>{approval.typical_timeline}</strong>
          </span>
        </div>

        {/* Live Gov Application Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {liveApp ? (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '3px',
                color: '#ffffff',
                backgroundColor:
                  liveApp.status === 'Approved'
                    ? '#15803d'
                    : liveApp.status === 'In Process'
                    ? '#d97706'
                    : liveApp.status === 'Denied'
                    ? '#dc2626'
                    : '#0284c7'
              }}
            >
              {liveApp.status === 'Approved'
                ? '✅ SANCTIONED'
                : liveApp.status === 'In Process'
                ? '🔄 IN PROCESS'
                : liveApp.status === 'Denied'
                ? '❌ ACTION REQUIRED'
                : '⏳ SUBMITTED'}
            </span>
          ) : (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 7px',
                borderRadius: '3px',
                backgroundColor: '#f1f5f9',
                color: '#64748b',
                border: '1px solid #cbd5e1'
              }}
            >
              Not Applied
            </span>
          )}

          <span className="badge-authority">
            🏛️ {approval.issuing_authority}
          </span>
        </div>
      </div>

      {/* Clearance Name */}
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 800,
          color: 'var(--gov-navy-dark)',
          marginBottom: '2px',
          lineHeight: 1.3
        }}
      >
        {language === 'hi' ? approval.hindi_name || approval.name : language === 'mr' ? approval.marathi_name || approval.name : approval.name}
      </h3>

      <div
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--gov-saffron)',
          marginBottom: '8px'
        }}
      >
        {language === 'hi' || language === 'mr' ? approval.name : approval.marathi_name}
      </div>

      {/* Plain Description */}
      <p style={{ fontSize: '13px', color: 'var(--gov-text-secondary)', lineHeight: 1.55, marginBottom: '10px' }}>
        {language === 'mr' ? approval.marathi_one_line_description || approval.one_line_description : language === 'hi' ? approval.hindi_one_line_description || approval.one_line_description : approval.one_line_description}
      </p>

      {/* Live Application Details Box (if applied) */}
      {liveApp && (
        <div
          style={{
            backgroundColor:
              liveApp.status === 'Approved'
                ? '#f0fdf4'
                : liveApp.status === 'In Process'
                ? '#fffbeb'
                : liveApp.status === 'Denied'
                ? '#fef2f2'
                : '#f0f9ff',
            border: `1px solid ${
              liveApp.status === 'Approved'
                ? '#bbf7d0'
                : liveApp.status === 'In Process'
                ? '#fde68a'
                : liveApp.status === 'Denied'
                ? '#fecaca'
                : '#bae6fd'
            }`,
            borderRadius: '3px',
            padding: '8px 12px',
            marginBottom: '10px',
            fontSize: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
            <div>
              <span style={{ color: '#64748b' }}>Gov Ack #:</span>{' '}
              <strong style={{ fontFamily: 'monospace', color: '#002244' }}>{liveApp.acknowledgementNumber}</strong>
            </div>
            {liveApp.sanctionCertificateId && (
              <div style={{ color: '#15803d', fontWeight: 700 }}>
                Certificate: <code>{liveApp.sanctionCertificateId}</code>
              </div>
            )}
          </div>
          {liveApp.officerRemarks && (
            <div style={{ marginTop: '4px', fontStyle: 'italic', color: '#334155' }}>
              <strong>Officer Scrutiny Remarks:</strong> &ldquo;{liveApp.officerRemarks}&rdquo;
            </div>
          )}
        </div>
      )}

      {/* Explicit Prerequisite Alert Banner */}
      {prerequisiteNames.length > 0 && (
        <div
          style={{
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '3px',
            padding: '7px 12px',
            marginBottom: '10px',
            fontSize: '12px',
            color: '#1e40af',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '14px' }}>🔗</span>
          <span>
            <strong>
              {language === 'mr' ? 'कायदेशीर पूर्वअट (Prerequisite):' : language === 'hi' ? 'कानूनी प्राथमिकता पूर्वापेक्षा:' : 'Legal Precedence Prerequisite:'}
            </strong>{' '}
            {language === 'mr' ? `हा अर्ज करण्यापूर्वी खालील मंजुरी आवश्यक आहे: ` : language === 'hi' ? `इस अनुमोदन से पहले निम्नलिखित मंजूरी आवश्यक है: ` : `Must be preceded by approval of `}
            <span style={{ textDecoration: 'underline', fontWeight: 700 }}>
              {prerequisiteNames.join(' & ')}
            </span>
          </span>
        </div>
      )}

      {/* Conditional Reason if Conditional */}
      {!isMandatory && approval.conditional_reason && (
        <div
          style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '3px',
            padding: '6px 12px',
            marginBottom: '10px',
            fontSize: '11.5px',
            color: '#92400e'
          }}
        >
          ⚠️ <strong>{language === 'mr' ? 'लागू असण्याची अट:' : language === 'hi' ? 'शर्त ट्रिगर:' : 'Conditionality Trigger:'}</strong>{' '}
          {approval.conditional_reason}
        </div>
      )}

      {/* Details Row: Act & Rules + Fee Structure */}
      <div
        style={{
          backgroundColor: '#f8fafc',
          border: '1px solid var(--gov-border-subtle)',
          borderRadius: '3px',
          padding: '8px 12px',
          fontSize: '11.5px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '8px',
          marginBottom: '10px'
        }}
      >
        <div>
          <span style={{ color: 'var(--gov-text-muted)', display: 'block' }}>
            {language === 'mr' ? 'संबंधित कायदा / नियम:' : language === 'hi' ? 'वैधानिक अधिनियम और नियम:' : 'Statutory Act & Rules:'}
          </span>
          <strong style={{ color: 'var(--gov-text-primary)' }}>
            {language === 'mr' ? approval.marathi_act_and_rule || approval.act_and_rule : language === 'hi' ? approval.hindi_act_and_rule || approval.act_and_rule : approval.act_and_rule}
          </strong>
        </div>

        <div>
          <span style={{ color: 'var(--gov-text-muted)', display: 'block' }}>
            {language === 'mr' ? 'अधिकृत सरकारी शुल्क रचना:' : language === 'hi' ? 'वैधानिक शुल्क अनुसूची:' : 'Statutory Fee Schedule:'}
          </span>
          <strong style={{ color: 'var(--gov-text-primary)' }}>
            {language === 'mr' ? approval.marathi_fee_structure || approval.fee_structure : language === 'hi' ? approval.hindi_fee_structure || approval.fee_structure : approval.fee_structure}
          </strong>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <label className="approval-status-control">
          <span>{language === 'mr' ? 'स्थिती:' : language === 'hi' ? 'स्थिति:' : 'Status:'}</span>
          <select value={status} onChange={(e) => onStatusChange(e.target.value as ApprovalStatus)} aria-label={`${approval.name} status`}>
            {(Object.keys(statusLabels) as ApprovalStatus[]).map((option) => (
              <option key={option} value={option}>{statusLabels[option]}</option>
            ))}
          </select>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <label className="approval-status-control">
            <span>{language === 'mr' ? 'स्थिती:' : 'Status:'}</span>
            <select value={status} onChange={(e) => onStatusChange(e.target.value as ApprovalStatus)} aria-label={`${approval.name} status`}>
              {(Object.keys(statusLabels) as ApprovalStatus[]).map((option) => (
                <option key={option} value={option}>{statusLabels[option]}</option>
              ))}
            </select>
          </label>

          {/* Primary Action Button: Apply / Sync Status */}
          {onApplyClick && (
            <button
              type="button"
              onClick={() => onApplyClick(approval)}
              style={{
                backgroundColor: liveApp ? '#0284c7' : '#002244',
                color: '#ffffff',
                border: 'none',
                padding: '5px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
                borderRadius: '3px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>{liveApp ? '🔄' : '📝'}</span>
              <span>
                {liveApp
                  ? language === 'mr' ? 'अर्ज अद्ययावत / ट्रॅक करा' : 'Manage / Track Application'
                  : language === 'mr' ? 'अर्ज करा / क्रमांक जोडा' : 'Apply / Link Gov Ack #'}
              </span>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              padding: '4px 0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{showDocs ? '▼' : '►'}</span>
            <span>
              {showDocs
                ? language === 'mr' ? 'कागदपत्रे लपवा' : language === 'hi' ? 'दस्तावेज छुपाएं' : 'Hide Required Documents'
                : language === 'mr' ? 'आवश्यक कागदपत्रे पहा' : language === 'hi' ? 'आवश्यक दस्तावेज देखें' : 'View Key Required Documents'}
            </span>
            <span style={{ color: 'var(--gov-text-muted)', fontWeight: 'normal' }}>
              ({approval.documents_preview.length})
            </span>
          </button>

          <a
            href={approval.portal_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: 'var(--gov-navy-subtle)',
              color: 'var(--gov-navy)',
              border: '1px solid #bfdbfe',
              padding: '5px 12px',
              fontSize: '11.5px',
              fontWeight: 700,
              borderRadius: '3px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>🌐</span>
            <span>{language === 'mr' ? 'शासकीय पोर्टल उघडा' : language === 'hi' ? 'सरकारी पोर्टल तक पहुंचें' : 'Access Government Portal'}</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Collapsible Documents Preview */}
      {showDocs && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px 14px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '3px'
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gov-navy)', textTransform: 'uppercase', marginBottom: '4px' }}>
            📑 {language === 'mr' ? 'अर्जासाठी लागणारी प्राथमिक कागदपत्रे:' : language === 'hi' ? 'अनिवार्य प्रस्तुत दस्तावेज सूची:' : 'Mandatory Submission Documents Checklist:'}
          </div>
          <ul style={{ listStyleType: 'disc', paddingLeft: '18px', fontSize: '12px', color: 'var(--gov-text-secondary)', lineHeight: 1.6 }}>
            {approval.documents_preview.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

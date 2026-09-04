'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { ApprovalRecord, ApplicationSubmission } from '@/lib/types';
import { getCurrentUser } from '@/lib/auth-store';
import {
  getApplicationByApproval,
  getApplicationsByUser,
  verifyPrerequisitesStatus,
  submitOrSyncApplication
} from '@/lib/application-store';

interface ApplyModalProps {
  approval: ApprovalRecord;
  onClose: () => void;
  onOpenAuthModal: () => void;
  onApplicationSaved?: (submission: ApplicationSubmission) => void;
}

export default function ApplyModal({
  approval,
  onClose,
  onOpenAuthModal,
  onApplicationSaved
}: ApplyModalProps) {
  const { language } = useApp();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userApps, setUserApps] = useState<ApplicationSubmission[]>(() =>
    currentUser ? getApplicationsByUser(currentUser.id) : []
  );

  const existingApp = currentUser ? getApplicationByApproval(currentUser.id, approval.id) : undefined;

  const [mode, setMode] = useState<'single_window' | 'sync_ack'>('single_window');
  const [ackNumber, setAckNumber] = useState(existingApp?.acknowledgementNumber || '');
  const [sourcePortal, setSourcePortal] = useState(existingApp?.sourcePortal || '');
  const [isSuccess, setIsSuccess] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState<ApplicationSubmission | null>(existingApp || null);

  useEffect(() => {
    const handleAuthChange = () => {
      const user = getCurrentUser();
      setCurrentUser(user);
      if (user) {
        setUserApps(getApplicationsByUser(user.id));
      }
    };
    window.addEventListener('parvangi_auth_change', handleAuthChange);
    return () => window.removeEventListener('parvangi_auth_change', handleAuthChange);
  }, []);

  // Prerequisite check
  const prereqCheck = verifyPrerequisitesStatus(approval.id, userApps);

  const handleAutoGenerateAck = () => {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    let sample = `MH/GOV/${year}/${rand}`;

    if (approval.id === 'mpcb-cte') sample = `MPCB/CTE/PN/${year}/${rand}`;
    else if (approval.id === 'mpcb-cto') sample = `MPCB/CTO/PN/${year}/${rand}`;
    else if (approval.id === 'dish-factory-license') sample = `DISH/LMS/${year}/${rand}`;
    else if (approval.id === 'fire-noc-provisional') sample = `MIDC/FIRE/PRV/${year}/${rand}`;
    else if (approval.id === 'fire-noc-final') sample = `MIDC/FIRE/FNL/${year}/${rand}`;
    else if (approval.id === 'udyam-registration') sample = `UDYAM-MH-26-${rand}42`;
    else if (approval.id === 'gst-registration') sample = `GST/MH/ARN/${year}/${rand}99`;
    else if (approval.id === 'building-plan-approval') sample = `MIDC/SPA/BP/${year}/${rand}`;

    setAckNumber(sample);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuthModal();
      return;
    }

    const submission = submitOrSyncApplication({
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      userAge: currentUser.age,
      userEmail: currentUser.email,
      approvalId: approval.id,
      acknowledgementNumber: mode === 'sync_ack' ? ackNumber : undefined,
      sourcePortal: sourcePortal || (mode === 'single_window' ? 'Parvangi Single Window Console' : undefined),
      status: 'Submitted'
    });

    setLatestSubmission(submission);
    setIsSuccess(true);
    onApplicationSaved?.(submission);
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 34, 68, 0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '560px',
          borderRadius: '4px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          border: '1.5px solid var(--gov-navy)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: 'var(--gov-navy)',
            color: '#ffffff',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '3px solid var(--gov-saffron)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>📋</span>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>
                {language === 'mr' ? 'परवानगी अर्ज व स्थिती ट्रॅकिंग' : 'Approval Application & Status Tracking'}
              </div>
              <div style={{ fontSize: '11px', color: '#ffb74d' }}>
                {approval.department}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '20px 24px', maxHeight: '80vh', overflowY: 'auto' }}>
          {/* Target Clearance Card */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderLeft: '4px solid var(--gov-navy)',
              borderRadius: '3px',
              padding: '12px 16px',
              marginBottom: '16px'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gov-navy)', textTransform: 'uppercase' }}>
              Phase {approval.stage_phase} · {approval.mandatory_or_conditional} Approval
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--gov-navy-dark)', margin: '4px 0 2px 0' }}>
              {language === 'mr' ? approval.marathi_name || approval.name : approval.name}
            </h4>
            <div style={{ fontSize: '12px', color: 'var(--gov-text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
              <span>🏛️ {approval.issuing_authority}</span>
              <span>⏱️ {approval.typical_timeline}</span>
            </div>
          </div>

          {/* Prerequisite Alert if not satisfied */}
          {!prereqCheck.satisfied && (
            <div
              style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '3px',
                padding: '10px 14px',
                marginBottom: '16px',
                fontSize: '12px',
                color: '#92400e',
                display: 'flex',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '16px' }}>⚠️</span>
              <div>
                <strong>
                  {language === 'mr' ? 'कायदेशीर पूर्वअट प्रलंबित आहे:' : 'Statutory Precedence Warning:'}
                </strong>{' '}
                {language === 'mr'
                  ? `या मंजुरीसाठी खालील पूर्वपरवानग्या आवश्यक आहेत: `
                  : `This clearance strictly depends on approved status of: `}
                <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                  {prereqCheck.missing.map((name, i) => (
                    <li key={i} style={{ fontWeight: 700 }}>
                      {name}
                    </li>
                  ))}
                </ul>
                <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.9 }}>
                  {language === 'mr'
                    ? 'अगोदर पूर्वपरवानगी मंजूर झाल्याशिवाय अर्ज छाननी प्रक्रियेत अडकू शकतो.'
                    : 'Submitting before prior clearance sanction may delay scrutiny or trigger department objections.'}
                </div>
              </div>
            </div>
          )}

          {/* User Status: Logged in vs Logged out */}
          {!currentUser ? (
            <div
              style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '4px',
                padding: '16px',
                textAlign: 'center',
                marginBottom: '16px'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>👤</div>
              <h5 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                {language === 'mr' ? 'नागरिक लॉगिन आवश्यक आहे' : 'Citizen Sign-In Required'}
              </h5>
              <p style={{ fontSize: '12px', color: 'var(--gov-text-secondary)', marginBottom: '14px' }}>
                {language === 'mr'
                  ? 'शासकीय अर्जांची स्थिती ट्रॅक करण्यासाठी व अधिकाऱ्यांशी जोडण्यासाठी आपले नाव व मोबाईल क्रमांक प्रविष्ट करा.'
                  : 'Sign in with your name and phone number to submit applications and view real-time department status.'}
              </p>
              <button
                type="button"
                className="btn-gov-primary"
                onClick={onOpenAuthModal}
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                {language === 'mr' ? 'लॉगिन / नवीन नोंदणी करा →' : 'Sign In / Register Now →'}
              </button>
            </div>
          ) : (
            <div>
              {/* Applicant Summary */}
              <div
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '3px',
                  padding: '10px 14px',
                  marginBottom: '16px',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span style={{ color: '#64748b' }}>Applicant:</span>{' '}
                  <strong style={{ color: 'var(--gov-navy)' }}>{currentUser.name}</strong>{' '}
                  <span style={{ color: '#64748b' }}>| Age: {currentUser.age} | 📞 {currentUser.phone}</span>
                </div>
                <span
                  style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '2px 6px',
                    borderRadius: '2px',
                    fontSize: '10.5px',
                    fontWeight: 700
                  }}
                >
                  VERIFIED CITIZEN
                </span>
              </div>

              {/* Already Submitted / Existing App Display */}
              {existingApp && !isSuccess && (
                <div
                  style={{
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: '3px',
                    padding: '12px 16px',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#065f46' }}>
                      CURRENT APPLICATION STATUS:
                    </span>
                    <span
                      style={{
                        backgroundColor:
                          existingApp.status === 'Approved'
                            ? '#15803d'
                            : existingApp.status === 'In Process'
                            ? '#d97706'
                            : existingApp.status === 'Denied'
                            ? '#dc2626'
                            : '#0284c7',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '2px'
                      }}
                    >
                      {existingApp.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#1f2937' }}>
                    <strong>Ack #:</strong> <code>{existingApp.acknowledgementNumber}</code>
                  </div>
                  {existingApp.officerRemarks && (
                    <div
                      style={{
                        marginTop: '6px',
                        fontSize: '11.5px',
                        backgroundColor: '#ffffff',
                        padding: '6px 10px',
                        borderRadius: '2px',
                        border: '1px solid #cbd5e1',
                        color: '#334155'
                      }}
                    >
                      <strong>Officer Remarks:</strong> <em>&ldquo;{existingApp.officerRemarks}&rdquo;</em>
                    </div>
                  )}
                  {existingApp.sanctionCertificateId && (
                    <div style={{ marginTop: '6px', fontSize: '11.5px', color: '#15803d', fontWeight: 700 }}>
                      🎉 Sanction Certificate ID: {existingApp.sanctionCertificateId}
                    </div>
                  )}
                </div>
              )}

              {/* Success Banner */}
              {isSuccess && latestSubmission ? (
                <div
                  style={{
                    backgroundColor: '#ecfdf5',
                    border: '1.5px solid #10b981',
                    borderRadius: '4px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '4px' }}>✅</div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#065f46', marginBottom: '4px' }}>
                    {language === 'mr' ? 'अर्ज यशस्वीरीत्या नोंदवला गेला!' : 'Application Successfully Synced & Registered!'}
                  </h4>
                  <div style={{ fontSize: '12.5px', color: '#1f2937', marginBottom: '10px' }}>
                    Official Acknowledgement Number:
                    <div
                      style={{
                        display: 'inline-block',
                        fontSize: '14px',
                        fontWeight: 800,
                        backgroundColor: '#ffffff',
                        border: '1px solid #10b981',
                        padding: '4px 12px',
                        borderRadius: '3px',
                        marginTop: '4px',
                        fontFamily: 'monospace'
                      }}
                    >
                      {latestSubmission.acknowledgementNumber}
                    </div>
                  </div>
                  <p style={{ fontSize: '11.5px', color: '#047857', lineHeight: 1.5 }}>
                    {language === 'mr'
                      ? 'आपला अर्ज आता विभागीय अधिकारी व DIC नोडल अधिकाऱ्यांच्या छाननी कक्षात पाठवला गेला आहे. अधिकारी स्थिती अपडेट करताच येथे दिसेल.'
                      : 'Your application is now routed to the District Industries Centre (DIC) Officer Scrutiny Console for verification. Real-time remarks will reflect on this dashboard.'}
                  </p>
                  <button
                    type="button"
                    className="btn-gov-primary"
                    onClick={onClose}
                    style={{ marginTop: '12px', padding: '7px 20px', fontSize: '12.5px' }}
                  >
                    Done / Close Window
                  </button>
                </div>
              ) : (
                /* Submission Form */
                <form onSubmit={handleSubmit}>
                  {/* Mode Selector */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                      {language === 'mr' ? 'अर्जाचा प्रकार निवडा:' : 'Select Application / Sync Mode:'}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 10px',
                          border: mode === 'single_window' ? '2px solid var(--gov-navy)' : '1px solid #cbd5e1',
                          backgroundColor: mode === 'single_window' ? '#eff6ff' : '#ffffff',
                          borderRadius: '3px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="radio"
                          name="apply_mode"
                          checked={mode === 'single_window'}
                          onChange={() => setMode('single_window')}
                        />
                        <span>Parvangi Single Window</span>
                      </label>

                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 10px',
                          border: mode === 'sync_ack' ? '2px solid var(--gov-navy)' : '1px solid #cbd5e1',
                          backgroundColor: mode === 'sync_ack' ? '#eff6ff' : '#ffffff',
                          borderRadius: '3px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="radio"
                          name="apply_mode"
                          checked={mode === 'sync_ack'}
                          onChange={() => setMode('sync_ack')}
                        />
                        <span>Link Gov Portal Ack #</span>
                      </label>
                    </div>
                  </div>

                  {/* If Sync Ack Mode */}
                  {mode === 'sync_ack' && (
                    <div style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label
                          htmlFor="ack-input"
                          style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}
                        >
                          Official Gov Acknowledgement / ARN #
                        </label>
                        <button
                          type="button"
                          onClick={handleAutoGenerateAck}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--gov-navy)',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          ⚡ Auto-Fill Mock Ack #
                        </button>
                      </div>
                      <input
                        id="ack-input"
                        type="text"
                        placeholder="e.g. MPCB/CTE/PN/2026/0812"
                        value={ackNumber}
                        onChange={(e) => setAckNumber(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          fontSize: '13px',
                          border: '1px solid #94a3b8',
                          borderRadius: '3px',
                          fontFamily: 'monospace'
                        }}
                      />
                    </div>
                  )}

                  {/* Source Portal Selector */}
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      htmlFor="source-portal-input"
                      style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                    >
                      Issuing Department / Filing Portal
                    </label>
                    <input
                      id="source-portal-input"
                      type="text"
                      value={
                        sourcePortal ||
                        (approval.portal_url.includes('mahaonline')
                          ? 'Aaple Sarkar / MahaOnline'
                          : approval.portal_url.includes('mpcb')
                          ? 'e-MPCB Online Portal'
                          : approval.portal_url.includes('midc')
                          ? 'MIDC EODB Single Window'
                          : approval.portal_url.includes('udyam')
                          ? 'Ministry of MSME (Udyam)'
                          : 'Official Department Single Window')
                      }
                      onChange={(e) => setSourcePortal(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '12.5px',
                        border: '1px solid #94a3b8',
                        borderRadius: '3px',
                        backgroundColor: '#f8fafc'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="submit"
                      className="btn-gov-primary"
                      style={{ flex: 1, padding: '9px', fontSize: '13px', fontWeight: 700 }}
                    >
                      {existingApp ? 'Update / Re-Sync Application →' : 'Submit & Track in Officer Console →'}
                    </button>
                    <button
                      type="button"
                      className="btn-gov-outline"
                      onClick={onClose}
                      style={{ padding: '9px 14px', fontSize: '12.5px' }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

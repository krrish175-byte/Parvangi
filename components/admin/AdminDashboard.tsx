'use client';

import React, { useState, useEffect } from 'react';
import { ApplicationStatus, ApplicationSubmission } from '@/lib/types';
import {
  getAllApplications,
  updateApplicationByAdmin,
  verifyPrerequisitesStatus
} from '@/lib/application-store';
import { logout, ADMIN_CREDENTIALS } from '@/lib/auth-store';

interface AdminDashboardProps {
  onBackToCitizenView: () => void;
}

function generateSanctionId(): string {
  return `SANCTION-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
}

export default function AdminDashboard({ onBackToCitizenView }: AdminDashboardProps) {
  const [applications, setApplications] = useState<ApplicationSubmission[]>(() => getAllApplications());

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDept, setFilterDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected app for scrutiny modal
  const [selectedApp, setSelectedApp] = useState<ApplicationSubmission | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('In Process');
  const [officerRemarks, setOfficerRemarks] = useState<string>('');
  const [sanctionCertId, setSanctionCertId] = useState<string>('');
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState<string>('');

  const refreshApplications = () => {
    setApplications(getAllApplications());
  };

  useEffect(() => {
    const handler = () => {
      refreshApplications();
    };
    window.addEventListener('parvangi_applications_change', handler);
    return () => window.removeEventListener('parvangi_applications_change', handler);
  }, []);

  const handleOpenScrutiny = (app: ApplicationSubmission) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setOfficerRemarks(app.officerRemarks || '');
    setSanctionCertId(
      app.sanctionCertificateId ||
        (app.status === 'Approved' ? app.acknowledgementNumber : generateSanctionId())
    );
    setUpdateSuccessMsg('');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    const certId = newStatus === 'Approved' ? (sanctionCertId.trim() || selectedApp.acknowledgementNumber) : undefined;

    const success = updateApplicationByAdmin(selectedApp.id, {
      status: newStatus,
      officerRemarks: officerRemarks.trim(),
      sanctionCertificateId: certId
    });

    if (success) {
      setUpdateSuccessMsg('Status updated successfully and synced with citizen portal.');
      refreshApplications();
      setTimeout(() => {
        setSelectedApp(null);
        setUpdateSuccessMsg('');
      }, 1000);
    }
  };

  const handleLogout = () => {
    logout();
    onBackToCitizenView();
  };

  // Quick Remark Templates
  const cannedRemarks = [
    'Application scrutinized. Documents found in order as per Maharashtra Single Window guidelines.',
    'Site inspection scheduled at proposed industrial premises with Regional Field Officer.',
    'Statutory prerequisite verified and approved. Final Sanction Certificate issued.',
    'Clarification required regarding plot layout setback compliant with Maharashtra Fire Prevention Act.',
    'Precedence mismatch: Prerequisite statutory approval (MPCB Consent) must be cleared prior to sanction.'
  ];

  // Unique departments for filter
  const departments = Array.from(new Set(applications.map((a) => a.department)));

  // Calculate Metrics
  const totalCount = applications.length;
  const submittedCount = applications.filter((a) => a.status === 'Submitted').length;
  const inProcessCount = applications.filter((a) => a.status === 'In Process').length;
  const approvedCount = applications.filter((a) => a.status === 'Approved').length;
  const deniedCount = applications.filter((a) => a.status === 'Denied').length;

  // Filtered List
  const filteredApps = applications.filter((app) => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesDept = filterDept === 'all' || app.department === filterDept;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      app.acknowledgementNumber.toLowerCase().includes(q) ||
      app.userName.toLowerCase().includes(q) ||
      app.userPhone.includes(q) ||
      app.approvalName.toLowerCase().includes(q) ||
      app.issuingAuthority.toLowerCase().includes(q);

    return matchesStatus && matchesDept && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Officer Banner */}
      <div
        style={{
          backgroundColor: '#002244',
          color: '#ffffff',
          borderBottom: '4px solid #e65100',
          padding: '16px 0'
        }}
      >
        <div className="gov-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>🛡️</span>
              <div>
                <div style={{ fontSize: '11.5px', color: '#ffb74d', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Directorate of Industries · Government of Maharashtra
                </div>
                <h1 style={{ fontSize: '20px', fontWeight: 800, margin: '2px 0 0 0', color: '#ffffff' }}>
                  District Industries Centre (DIC) Single-Window Scrutiny Console
                </h1>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                  Designation: <strong style={{ color: '#ffffff' }}>{ADMIN_CREDENTIALS.designation}</strong> (Logged in as: <code>{ADMIN_CREDENTIALS.userId}</code>)
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                className="btn-gov-secondary"
                onClick={onBackToCitizenView}
                style={{ fontSize: '12.5px', padding: '7px 14px' }}
              >
                ← Switch to Citizen Portal
              </button>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '7px 14px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Sign Out Officer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="gov-container" style={{ marginTop: '24px' }}>
        {/* Top KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderLeft: '4px solid #002244',
              borderRadius: '4px',
              padding: '14px 18px'
            }}
          >
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748b' }}>TOTAL APPLICATIONS</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#002244', marginTop: '4px' }}>{totalCount}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Across Maharashtra MSME units</div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderLeft: '4px solid #0284c7',
              borderRadius: '4px',
              padding: '14px 18px'
            }}
          >
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0284c7' }}>SUBMITTED / NEW</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0369a1', marginTop: '4px' }}>{submittedCount}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Awaiting initial clerk scrutiny</div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderLeft: '4px solid #d97706',
              borderRadius: '4px',
              padding: '14px 18px'
            }}
          >
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#d97706' }}>UNDER SCRUTINY / IN PROCESS</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#b45309', marginTop: '4px' }}>{inProcessCount}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Field inspection / Document audit</div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderLeft: '4px solid #16a34a',
              borderRadius: '4px',
              padding: '14px 18px'
            }}
          >
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#16a34a' }}>APPROVED / SANCTIONED</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#15803d', marginTop: '4px' }}>{approvedCount}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Statutory NOC / License granted</div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderLeft: '4px solid #dc2626',
              borderRadius: '4px',
              padding: '14px 18px'
            }}
          >
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#dc2626' }}>DENIED / CLARIFICATION</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#b91c1c', marginTop: '4px' }}>{deniedCount}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Defect memo or non-compliance</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            padding: '14px 18px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Status filter buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#002244', marginRight: '4px' }}>
              Status:
            </span>
            {['all', 'Submitted', 'In Process', 'Approved', 'Denied'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '5px 10px',
                  fontSize: '11.5px',
                  fontWeight: filterStatus === st ? 700 : 500,
                  backgroundColor: filterStatus === st ? '#002244' : '#f1f5f9',
                  color: filterStatus === st ? '#ffffff' : '#334155',
                  border: '1px solid #cbd5e1',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                {st === 'all' ? 'All Applications' : st}
              </button>
            ))}
          </div>

          {/* Department dropdown & Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '12px',
                border: '1px solid #94a3b8',
                borderRadius: '3px',
                backgroundColor: '#ffffff',
                maxWidth: '220px'
              }}
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search citizen, Ack #, approval..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                border: '1px solid #94a3b8',
                borderRadius: '3px',
                width: '240px'
              }}
            />
          </div>
        </div>

        {/* Applications Worklist Table */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #cbd5e1', color: '#1e293b' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>Ack # & Date</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>Citizen Details</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>Clearance & Department</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>Precedence Audit</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>Officer Remarks</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                      No applications match the selected filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => {
                    // Check prerequisite precedence
                    const userAllApps = applications.filter((a) => a.userId === app.userId);
                    const prereq = verifyPrerequisitesStatus(app.approvalId, userAllApps);

                    return (
                      <tr
                        key={app.id}
                        style={{
                          borderBottom: '1px solid #e2e8f0',
                          backgroundColor: selectedApp?.id === app.id ? '#eff6ff' : 'transparent'
                        }}
                      >
                        {/* Ack # & Date */}
                        <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 700, color: '#002244', fontFamily: 'monospace' }}>
                            {app.acknowledgementNumber}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                            {new Date(app.submittedAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                          <div style={{ fontSize: '10px', color: '#059669', marginTop: '2px' }}>
                            Via: {app.sourcePortal}
                          </div>
                        </td>

                        {/* Citizen Details */}
                        <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 700, color: '#1e293b' }}>{app.userName}</div>
                          <div style={{ fontSize: '11px', color: '#475569' }}>
                            Age: {app.userAge} · 📞 {app.userPhone}
                          </div>
                          {app.userEmail && (
                            <div style={{ fontSize: '10.5px', color: '#64748b' }}>{app.userEmail}</div>
                          )}
                        </td>

                        {/* Clearance & Department */}
                        <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 700, color: '#002244' }}>{app.approvalName}</div>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                            🏛️ {app.issuingAuthority}
                          </div>
                          <span
                            style={{
                              display: 'inline-block',
                              marginTop: '4px',
                              fontSize: '10px',
                              fontWeight: 700,
                              backgroundColor: '#e2e8f0',
                              color: '#334155',
                              padding: '1px 6px',
                              borderRadius: '2px'
                            }}
                          >
                            Phase {app.phase}
                          </span>
                        </td>

                        {/* Precedence Audit */}
                        <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>
                          {prereq.satisfied ? (
                            <span
                              style={{
                                fontSize: '11px',
                                color: '#15803d',
                                fontWeight: 700,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              ✓ Precedence Met
                            </span>
                          ) : (
                            <div
                              style={{
                                backgroundColor: '#fff1f2',
                                border: '1px solid #fecdd3',
                                borderRadius: '2px',
                                padding: '4px 8px',
                                fontSize: '11px',
                                color: '#be123c',
                                fontWeight: 600
                              }}
                            >
                              ⚠️ Pending Prereq:
                              <div style={{ fontWeight: 700, fontSize: '10.5px', marginTop: '2px' }}>
                                {prereq.missing.join(', ')}
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '3px 8px',
                              borderRadius: '2px',
                              fontSize: '11px',
                              fontWeight: 800,
                              color: '#ffffff',
                              backgroundColor:
                                app.status === 'Approved'
                                  ? '#15803d'
                                  : app.status === 'In Process'
                                  ? '#d97706'
                                  : app.status === 'Denied'
                                  ? '#dc2626'
                                  : '#0284c7'
                            }}
                          >
                            {app.status}
                          </span>
                        </td>

                        {/* Officer Remarks */}
                        <td style={{ padding: '12px 14px', verticalAlign: 'top', maxWidth: '240px' }}>
                          <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.4 }}>
                            {app.officerRemarks || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No remarks yet</span>}
                          </div>
                          {app.sanctionCertificateId && (
                            <div style={{ marginTop: '4px', fontSize: '10.5px', color: '#15803d', fontWeight: 700 }}>
                              Cert: {app.sanctionCertificateId}
                            </div>
                          )}
                        </td>

                        {/* Action */}
                        <td style={{ padding: '12px 14px', verticalAlign: 'top', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenScrutiny(app)}
                            style={{
                              backgroundColor: '#002244',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '3px',
                              padding: '6px 12px',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Scrutinize & Update ⚙️
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Scrutiny and Status Update Modal */}
      {selectedApp && (
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
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '620px',
              borderRadius: '4px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              border: '2px solid #002244'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: '#002244',
                color: '#ffffff',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '3px solid #e65100'
              }}
            >
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800 }}>
                  Official Scrutiny & Status Determination
                </div>
                <div style={{ fontSize: '11.5px', color: '#ffb74d' }}>
                  Ack #: <code>{selectedApp.acknowledgementNumber}</code> · Applicant: {selectedApp.userName}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
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
              {updateSuccessMsg && (
                <div
                  style={{
                    backgroundColor: '#dcfce7',
                    border: '1px solid #86efac',
                    color: '#166534',
                    padding: '10px 14px',
                    borderRadius: '3px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    marginBottom: '16px'
                  }}
                >
                  ✓ {updateSuccessMsg}
                </div>
              )}

              {/* Summary Card */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '3px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  fontSize: '12px'
                }}
              >
                <div>
                  <strong>Clearance:</strong> {selectedApp.approvalName}
                </div>
                <div style={{ color: '#64748b', marginTop: '2px' }}>
                  <strong>Authority:</strong> {selectedApp.issuingAuthority}
                </div>
                <div style={{ color: '#64748b', marginTop: '2px' }}>
                  <strong>Citizen:</strong> {selectedApp.userName} (Age: {selectedApp.userAge}, Mobile: {selectedApp.userPhone})
                </div>
              </div>

              <form onSubmit={handleSaveStatus}>
                {/* Status Selection */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    htmlFor="status-select"
                    style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#002244', marginBottom: '6px' }}
                  >
                    Change Application Status:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {(['Submitted', 'In Process', 'Approved', 'Denied'] as ApplicationStatus[]).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setNewStatus(st)}
                        style={{
                          padding: '8px',
                          borderRadius: '3px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: newStatus === st ? '2px solid #002244' : '1px solid #cbd5e1',
                          backgroundColor:
                            newStatus === st
                              ? st === 'Approved'
                                ? '#dcfce7'
                                : st === 'In Process'
                                ? '#fef3c7'
                                : st === 'Denied'
                                ? '#fee2e2'
                                : '#e0f2fe'
                              : '#ffffff',
                          color:
                            st === 'Approved'
                              ? '#15803d'
                              : st === 'In Process'
                              ? '#b45309'
                              : st === 'Denied'
                              ? '#b91c1c'
                              : '#0369a1'
                        }}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* If Approved, Certificate ID */}
                {newStatus === 'Approved' && (
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      htmlFor="sanction-cert-input"
                      style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#15803d', marginBottom: '4px' }}
                    >
                      Sanction Certificate Reference / License Number:
                    </label>
                    <input
                      id="sanction-cert-input"
                      type="text"
                      value={sanctionCertId}
                      onChange={(e) => setSanctionCertId(e.target.value)}
                      placeholder="e.g. DIC/SANCTION/2026/0194"
                      required
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '13px',
                        border: '1.5px solid #15803d',
                        borderRadius: '3px',
                        fontFamily: 'monospace'
                      }}
                    />
                  </div>
                )}

                {/* Officer Remarks & Quick Templates */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label
                      htmlFor="officer-remarks-area"
                      style={{ fontSize: '12px', fontWeight: 700, color: '#002244' }}
                    >
                      Official Scrutiny Remarks & Verification Notes:
                    </label>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Visible to Citizen</span>
                  </div>

                  <textarea
                    id="officer-remarks-area"
                    rows={3}
                    value={officerRemarks}
                    onChange={(e) => setOfficerRemarks(e.target.value)}
                    placeholder="Enter official departmental scrutiny findings, site inspection date, or compliance queries..."
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '12.5px',
                      border: '1px solid #94a3b8',
                      borderRadius: '3px'
                    }}
                  />

                  {/* Canned Templates */}
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
                      Quick Fill Canned Departmental Notes:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {cannedRemarks.map((remark, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setOfficerRemarks(remark)}
                          style={{
                            textAlign: 'left',
                            fontSize: '11px',
                            color: '#334155',
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '2px',
                            padding: '4px 8px',
                            cursor: 'pointer'
                          }}
                        >
                          + {remark}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      backgroundColor: '#002244',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Commit Determination & Notify Citizen →
                  </button>

                  <button
                    type="button"
                    className="btn-gov-outline"
                    onClick={() => setSelectedApp(null)}
                    style={{ padding: '10px 16px', fontSize: '12.5px' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

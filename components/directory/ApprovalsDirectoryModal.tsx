'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { ALL_APPROVALS } from '@/lib/rules-engine';

interface ApprovalsDirectoryModalProps {
  onClose: () => void;
}

export default function ApprovalsDirectoryModal({ onClose }: ApprovalsDirectoryModalProps) {
  const { language } = useApp();
  const [search, setSearch] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const departments = ['all', ...Array.from(new Set(ALL_APPROVALS.map((a) => a.department)))];

  const filteredApprovals = ALL_APPROVALS.filter((app) => {
    const matchesDept = selectedDept === 'all' || app.department === selectedDept;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      app.name.toLowerCase().includes(q) ||
      app.marathi_name.toLowerCase().includes(q) ||
      app.issuing_authority.toLowerCase().includes(q) ||
      app.act_and_rule.toLowerCase().includes(q);

    return matchesDept && matchesSearch;
  });

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
        className="gov-modal-shell"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--gov-radius)',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          borderTop: '4px solid var(--gov-saffron)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="gov-modal-header"
          style={{
            padding: '16px 20px',
            borderBottom: '1.5px solid var(--gov-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff'
          }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gov-navy)' }}>
              📚 {language === 'mr' ? 'सर्व १६ वैधानिक परवानग्यांची संकलित सूची' : 'Statutory Approvals Master Directory'}
            </h2>
            <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)' }}>
              Verified repository of Maharashtra state & central industrial clearances
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '3px',
              padding: '4px 10px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Filters */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid var(--gov-border-subtle)',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <input
            type="text"
            placeholder="Search approval name, authority, or Act..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: '220px',
              padding: '7px 12px',
              fontSize: '13px',
              border: '1px solid #94a3b8',
              borderRadius: '3px'
            }}
          />

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{
              padding: '7px 12px',
              fontSize: '12.5px',
              border: '1px solid #94a3b8',
              borderRadius: '3px',
              backgroundColor: '#ffffff'
            }}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>

        {/* Approvals Table / List */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'grid', gap: '10px' }}>
            {filteredApprovals.map((app, i) => (
              <div
                key={app.id}
                style={{
                  border: '1px solid var(--gov-border)',
                  borderRadius: '3px',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gov-navy)' }}>
                      #{i + 1}
                    </span>
                    <strong style={{ fontSize: '14.5px', color: 'var(--gov-navy-dark)' }}>
                      {app.name}
                    </strong>
                  </div>

                  <span
                    style={{
                      backgroundColor: 'var(--gov-navy-subtle)',
                      color: 'var(--gov-navy)',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '2px'
                    }}
                  >
                    {app.typical_timeline}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--gov-saffron)', fontWeight: 600, marginBottom: '6px' }}>
                  {app.marathi_name}
                </div>

                <p style={{ fontSize: '12px', color: 'var(--gov-text-secondary)', marginBottom: '8px' }}>
                  {app.one_line_description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--gov-text-muted)', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    🏛️ <strong>{app.issuing_authority}</strong> | {app.act_and_rule}
                  </div>
                  <a
                    href={app.portal_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 700, color: 'var(--gov-navy)' }}
                  >
                    Open Portal ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--gov-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8fafc'
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--gov-text-muted)' }}>
            Showing {filteredApprovals.length} of {ALL_APPROVALS.length} verified clearances
          </span>
          <button type="button" className="btn-gov-secondary" onClick={onClose} style={{ padding: '6px 16px' }}>
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}

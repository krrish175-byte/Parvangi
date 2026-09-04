'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { ApprovalStatus, ChecklistResult, PhaseGroup as PhaseGroupType } from '@/lib/types';
import ProfileSummaryBar from './ProfileSummaryBar';
import TrustBanner from './TrustBanner';
import MetricsOverview from './MetricsOverview';
import PhaseGroup from './PhaseGroup';
import PrintLetterhead from './PrintLetterhead';

interface ChecklistDashboardProps {
  result: ChecklistResult;
  onModifyProfile: () => void;
  onRestartWizard: () => void;
}

export default function ChecklistDashboard({
  result,
  onModifyProfile,
  onRestartWizard
}: ChecklistDashboardProps) {
  const { language } = useApp();

  // Filter state: 'all' | 'mandatory' | 'conditional'
  const [filterType, setFilterType] = useState<'all' | 'mandatory' | 'conditional'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [statuses, setStatuses] = useState<Record<string, ApprovalStatus>>(() => {
    try {
      const saved = window.localStorage.getItem(`parvangi-status-${result.referenceId}`);
      return saved ? (JSON.parse(saved) as Record<string, ApprovalStatus>) : {};
    } catch {
      return {};
    }
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(result.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filter phase groups and items based on search and type
  const filteredPhaseGroups: PhaseGroupType[] = result.phaseGroups
    .map((group) => {
      const items = group.items.filter((item) => {
        const matchesType =
          filterType === 'all' ||
          (filterType === 'mandatory' && item.mandatory_or_conditional === 'Mandatory') ||
          (filterType === 'conditional' && item.mandatory_or_conditional === 'Conditional');

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === '' ||
          item.name.toLowerCase().includes(q) ||
          item.marathi_name.toLowerCase().includes(q) ||
          item.issuing_authority.toLowerCase().includes(q) ||
          item.act_and_rule.toLowerCase().includes(q);

        return matchesType && matchesSearch;
      });

      return {
        ...group,
        items
      };
    })
    .filter((group) => group.items.length > 0);

  // Compute total visible items
  const visibleCount = filteredPhaseGroups.reduce((acc, g) => acc + g.items.length, 0);
  const completedCount = Object.values(statuses).filter((status) => status === 'completed').length;

  const handleStatusChange = (approvalId: string, status: ApprovalStatus) => {
    const nextStatuses = { ...statuses, [approvalId]: status };
    setStatuses(nextStatuses);
    window.localStorage.setItem(`parvangi-status-${result.referenceId}`, JSON.stringify(nextStatuses));
  };

  return (
    <section style={{ padding: '24px 0 48px 0' }}>
      <div className="gov-container">
        {/* Printable Official Government Letterhead */}
        <PrintLetterhead result={result} />

        {/* Top Breadcrumb & Action Row */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ fontSize: '13px', color: 'var(--gov-text-muted)' }}>
            <span>Home / </span>
            <strong style={{ color: 'var(--gov-navy)' }}>
              {language === 'mr' ? 'वैधानिक परवानगी अनुक्रम पत्र' : 'Approval Compliance Schedule'}
            </strong>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              className="btn-gov-outline"
              onClick={handleCopyReference}
              style={{ fontSize: '12px', padding: '6px 12px' }}
              title="Copy Reference ID for tracking"
            >
              <span>📋</span>
              <span>{copied ? 'Copied!' : result.referenceId}</span>
            </button>

            <button
              type="button"
              className="btn-gov-secondary"
              onClick={handlePrint}
              style={{ fontSize: '12.5px', padding: '7px 16px' }}
              title="Print official letterhead schedule"
            >
              <span>🖨️</span>
              <span>{language === 'mr' ? 'प्रिंट / पीडीएफ जतन करा' : 'Print / Save as PDF'}</span>
            </button>

            <button
              type="button"
              className="btn-gov-primary"
              onClick={onRestartWizard}
              style={{ fontSize: '12.5px', padding: '7px 16px' }}
            >
              <span>🔄</span>
              <span>{language === 'mr' ? 'नवीन तपासणी' : 'New Evaluation'}</span>
            </button>
          </div>
        </div>

        {/* Profile Pill Bar */}
        <div className="no-print">
          <ProfileSummaryBar profile={result.profile} onEdit={onModifyProfile} />
        </div>

        {/* Trust Banner (Differentiator from AI guesses) */}
        <div className="no-print">
          <TrustBanner referenceId={result.referenceId} generatedAt={result.generatedAt} />
        </div>

        {/* Operational Stat Cards */}
        <div className="no-print">
          <MetricsOverview metrics={result.metrics} />
        </div>

        {/* Filter Controls Bar */}
        <div
          className="filter-controls-bar no-print"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--gov-border)',
            borderRadius: 'var(--gov-radius)',
            padding: '12px 18px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', marginRight: '6px' }}>
              {language === 'mr' ? 'फिल्टर:' : 'Filter Approvals:'}
            </span>

            <button
              type="button"
              onClick={() => setFilterType('all')}
              style={{
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: filterType === 'all' ? 700 : 500,
                backgroundColor: filterType === 'all' ? 'var(--gov-navy)' : '#f1f5f9',
                color: filterType === 'all' ? '#ffffff' : 'var(--gov-text-primary)',
                border: '1px solid #cbd5e1',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              {language === 'mr' ? 'सर्व परवानग्या' : 'All Clearances'} ({result.metrics.total})
            </button>

            <button
              type="button"
              onClick={() => setFilterType('mandatory')}
              style={{
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: filterType === 'mandatory' ? 700 : 500,
                backgroundColor: filterType === 'mandatory' ? 'var(--gov-status-mandatory)' : 'var(--gov-status-mandatory-bg)',
                color: filterType === 'mandatory' ? '#ffffff' : 'var(--gov-status-mandatory)',
                border: '1px solid #fca5a5',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              {language === 'mr' ? 'फक्त अनिवार्य' : 'Mandatory Only'} ({result.metrics.mandatoryCount})
            </button>

            {result.metrics.conditionalCount > 0 && (
              <button
                type="button"
                onClick={() => setFilterType('conditional')}
                style={{
                  padding: '4px 10px',
                  fontSize: '12px',
                  fontWeight: filterType === 'conditional' ? 700 : 500,
                  backgroundColor: filterType === 'conditional' ? 'var(--gov-status-conditional)' : 'var(--gov-status-conditional-bg)',
                  color: filterType === 'conditional' ? '#ffffff' : 'var(--gov-status-conditional)',
                  border: '1px solid #fde68a',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                {language === 'mr' ? 'फक्त सशर्त' : 'Conditional Only'} ({result.metrics.conditionalCount})
              </button>
            )}
          </div>

          <span className="approval-progress-summary">
            {language === 'mr'
              ? `दृश्यमान: ${visibleCount} | पूर्ण: ${completedCount}/${result.metrics.total}`
              : `Showing: ${visibleCount} | Completed: ${completedCount}/${result.metrics.total}`}
          </span>

          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="text"
              placeholder={language === 'mr' ? 'परवाना किंवा कायदा शोधा...' : 'Search clearance or act...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '12.5px',
                border: '1px solid #94a3b8',
                borderRadius: '3px',
                width: '220px'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Phase Groups (The Topologically Sequenced Output) */}
        {filteredPhaseGroups.length > 0 ? (
          <div>
            {filteredPhaseGroups.map((group, groupIdx) => {
              // Calculate global index offset for correct sequential numbering
              let offset = 0;
              for (let i = 0; i < groupIdx; i++) {
                offset += filteredPhaseGroups[i].items.length;
              }

              return (
                <PhaseGroup
                  key={group.phase}
                  group={group}
                  globalStartIndex={offset}
                  statuses={statuses}
                  onStatusChange={handleStatusChange}
                />
              );
            })}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--gov-border)',
              borderRadius: 'var(--gov-radius)',
              padding: '32px',
              textAlign: 'center',
              color: 'var(--gov-text-muted)'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
            <p style={{ fontSize: '14px', fontWeight: 600 }}>
              No approvals match the current filter or search query.
            </p>
            <button
              type="button"
              className="btn-gov-outline"
              onClick={() => {
                setFilterType('all');
                setSearchQuery('');
              }}
              style={{ marginTop: '12px' }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Official Statutory Disclaimer & Citizen Helpdesk Strip */}
        <div
          className="no-print"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--gov-border)',
            borderRadius: 'var(--gov-radius)',
            padding: '16px 20px',
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '2px' }}>
              🏛️ {language === 'mr' ? 'जिल्हा उद्योग केंद्र (DIC) मार्गदर्शन कक्ष' : 'District Industries Centre (DIC) Assistance'}
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)', lineHeight: 1.45 }}>
              Under the Maharashtra Industrial Policy, General Managers of DICs function as single-point nodal officers for micro and small enterprises. For fee waivers or physical verification assistance, contact the DIC at {result.profile.district || 'your local district headquarter'}.
            </p>
          </div>

          <button
            type="button"
            className="btn-gov-secondary"
            onClick={handlePrint}
            style={{ fontSize: '12.5px', padding: '7px 16px' }}
          >
            🖨️ {language === 'mr' ? 'अधिकृत पत्र डाऊनलोड करा' : 'Download Letterhead PDF'}
          </button>
        </div>
      </div>
    </section>
  );
}

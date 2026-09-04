'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { ChecklistResult, PhaseGroup as PhaseGroupType } from '@/lib/types';
import PhaseGroup from './PhaseGroup';
import PrintLetterhead from './PrintLetterhead';
import ComplianceCharts from './ComplianceCharts';
import { ItemStatus } from './ApprovalItemCard';
import { Printer, Copy, RotateCcw, Search, ListCheck, BarChart2, ShieldCheck, MapPin, Building, Edit3, Zap } from 'lucide-react';

interface ChecklistDashboardProps {
  result: ChecklistResult;
  onModifyProfile: () => void;
  onRestartWizard: () => void;
  onOpenWhatIf?: () => void;
}

export default function ChecklistDashboard({
  result,
  onModifyProfile,
  onRestartWizard,
  onOpenWhatIf
}: ChecklistDashboardProps) {
  const { language } = useApp();

  // Filter state: 'all' | 'mandatory' | 'conditional'
  const [filterType, setFilterType] = useState<'all' | 'mandatory' | 'conditional'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showCharts, setShowCharts] = useState<boolean>(true);

  // Status tracker state: map of approvalId -> 'pending' | 'in_progress' | 'completed'
  const [statusMap, setStatusMap] = useState<Record<string, ItemStatus>>({});

  // Auto-save checklist and load saved statuses from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const existingStr = localStorage.getItem('PARVANGI_SAVED_CHECKLISTS');
      const existingMap: Record<string, ChecklistResult> = existingStr ? JSON.parse(existingStr) : {};
      existingMap[result.referenceId] = result;
      localStorage.setItem('PARVANGI_SAVED_CHECKLISTS', JSON.stringify(existingMap));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    try {
      const savedStatusesStr = localStorage.getItem(`PARVANGI_STATUS_${result.referenceId}`);
      if (savedStatusesStr) {
        setStatusMap(JSON.parse(savedStatusesStr));
      }
    } catch (e) {
      console.error('Failed to load item status', e);
    }
  }, [result]);

  const handleStatusChange = (id: string, newStatus: ItemStatus) => {
    const updated = { ...statusMap, [id]: newStatus };
    setStatusMap(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`PARVANGI_STATUS_${result.referenceId}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save item status', e);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(result.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Progress metrics calculation
  const totalCount = result.approvals.length;
  const completedCount = result.approvals.filter((a) => statusMap[a.id] === 'completed').length;
  const inProgressCount = result.approvals.filter((a) => statusMap[a.id] === 'in_progress').length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

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

  return (
    <section style={{ padding: '24px 0 48px 0' }}>
      <div className="gov-container">
        {/* Printable Official Government Letterhead */}
        <PrintLetterhead result={result} />

        {/* Action Header Strip */}
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {onOpenWhatIf && (
              <button
                type="button"
                className="btn-gov-primary"
                onClick={onOpenWhatIf}
                style={{
                  fontSize: '12.5px',
                  padding: '7px 16px',
                  gap: '6px',
                  backgroundColor: '#002244',
                  borderColor: '#ff9933',
                  color: '#ffffff'
                }}
                title="Simulate Business Changes"
              >
                <Zap size={14} color="#ff9933" />
                <span>{language === 'mr' ? '⚡ What-If सिम्युलेटर' : '⚡ What-If Impact Engine'}</span>
              </button>
            )}

            <button
              type="button"
              className="btn-gov-outline"
              onClick={handleCopyReference}
              style={{ fontSize: '12px', padding: '6px 12px', gap: '5px' }}
              title="Copy Reference ID for tracking"
            >
              <Copy size={13} />
              <span>{copied ? 'Copied!' : result.referenceId}</span>
            </button>

            <button
              type="button"
              className="btn-gov-secondary"
              onClick={handlePrint}
              style={{ fontSize: '12.5px', padding: '7px 16px', gap: '6px' }}
              title="Print official letterhead schedule"
            >
              <Printer size={14} />
              <span>{language === 'mr' ? 'प्रिंट / पीडीएफ जतन करा' : 'Print / Save PDF'}</span>
            </button>

            <button
              type="button"
              className="btn-gov-primary"
              onClick={onRestartWizard}
              style={{ fontSize: '12.5px', padding: '7px 16px', gap: '6px' }}
            >
              <RotateCcw size={14} />
              <span>{language === 'mr' ? 'नवीन तपासणी' : 'New Evaluation'}</span>
            </button>
          </div>
        </div>

        {/* UNIFIED CLEAN SUMMARY HEADER CARD (Replaces 4 redundant clutter banners) */}
        <div
          className="gov-card no-print"
          style={{
            backgroundColor: '#ffffff',
            borderTop: '4px solid var(--gov-navy)',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0, 34, 68, 0.06)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <ShieldCheck size={18} color="#16a34a" />
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
                  {language === 'mr' ? 'आपला वैधानिक परवानगी रोडमॅप' : 'Your Customized Approval Roadmap'}
                </h2>
                <span style={{ backgroundColor: '#dcfce7', color: '#15803d', fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px' }}>
                  VERIFIED LAWS
                </span>
              </div>

              {/* Profile Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', fontSize: '12px' }}>
                <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '3px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontWeight: 600 }}>
                  🏭 {result.profile.category.replace('_', ' ').toUpperCase()}
                </span>
                <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '3px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontWeight: 600 }}>
                  📍 {result.profile.location.toUpperCase()} ({result.profile.district || 'Pune'})
                </span>
                <span style={{ backgroundColor: 'var(--gov-saffron-light)', color: 'var(--gov-saffron)', padding: '3px 10px', borderRadius: '4px', border: '1px solid var(--gov-saffron-border)', fontWeight: 700 }}>
                  💰 ₹{result.profile.investmentInLakhs} Lakhs ({result.profile.scale.toUpperCase()})
                </span>

                <button
                  type="button"
                  onClick={onModifyProfile}
                  style={{ background: 'none', border: 'none', color: 'var(--gov-navy)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: '4px' }}
                >
                  <Edit3 size={13} />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Overall Progress Tracker Badge */}
            <div style={{ textAlign: 'right', minWidth: '180px' }}>
              <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'mr' ? 'पूर्तता प्रगती (Progress)' : 'Overall Compliance'}
              </div>
              <strong style={{ fontSize: '22px', color: 'var(--gov-navy)' }}>
                {completedCount} / {totalCount} ({completionPercentage}%)
              </strong>
              <div className="gov-progress-track" style={{ marginTop: '6px', height: '8px' }}>
                <div className="gov-progress-fill" style={{ width: `${completionPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Simplified Visual Roadmap Cards for Non-Tech Users */}
        <div className="no-print">
          <ComplianceCharts approvals={result.approvals} />
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
                padding: '4px 12px',
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
                padding: '4px 12px',
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
          </div>

          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={language === 'mr' ? 'परवाना किंवा कायदा शोधा...' : 'Search clearance or act...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '6px 12px 6px 30px',
                  fontSize: '12.5px',
                  border: '1px solid #94a3b8',
                  borderRadius: '3px',
                  width: '220px'
                }}
              />
              <Search size={14} color="#64748b" style={{ position: 'absolute', left: '9px', top: '8px' }} />
            </div>
          </div>
        </div>

        {/* Phase Groups (The Topologically Sequenced Output) */}
        {filteredPhaseGroups.length > 0 ? (
          <div>
            {filteredPhaseGroups.map((group, groupIdx) => {
              let offset = 0;
              for (let i = 0; i < groupIdx; i++) {
                offset += filteredPhaseGroups[i].items.length;
              }

              return (
                <PhaseGroup
                  key={group.phase}
                  group={group}
                  globalStartIndex={offset}
                  statusMap={statusMap}
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
            <Search size={28} color="#94a3b8" style={{ marginBottom: '8px' }} />
            <p style={{ fontSize: '14px', fontWeight: 600 }}>
              No approvals match the current filter or search query.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}



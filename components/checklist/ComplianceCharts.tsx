'use client';

import React, { useState } from 'react';
import { ApprovalRecord } from '@/lib/types';
import { useApp } from '@/lib/context';
import { Clock, Layers, DollarSign, BarChart3, Building2 } from 'lucide-react';

interface ComplianceChartsProps {
  approvals: ApprovalRecord[];
}

export default function ComplianceCharts({ approvals }: ComplianceChartsProps) {
  const { language } = useApp();
  const [chartView, setChartView] = useState<'department' | 'timeline'>('department');

  // 1. Department Breakdown Calculation
  const departmentCounts: Record<string, number> = {};
  approvals.forEach((a) => {
    const dept = a.issuing_authority || 'Other Govt Dept';
    departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
  });

  const totalCount = approvals.length || 1;

  const palette = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316', '#6366f1', '#14b8a6'];

  const getDeptColor = (deptName: string, index: number) => {
    const d = deptName.toLowerCase();
    if (d.includes('mpcb') || d.includes('pollution')) return '#10b981';
    if (d.includes('dish') || d.includes('safety')) return '#ef4444';
    if (d.includes('msme') || d.includes('micro')) return '#0284c7';
    if (d.includes('gst') || d.includes('tax')) return '#6366f1';
    if (d.includes('fire')) return '#f97316';
    if (d.includes('midc') || d.includes('planning')) return '#f59e0b';
    if (d.includes('water')) return '#06b6d4';
    if (d.includes('electricity') || d.includes('msedcl')) return '#8b5cf6';
    return palette[index % palette.length];
  };

  const departmentData = Object.entries(departmentCounts).map(([dept, count], index) => ({
    name: dept,
    count,
    percentage: Math.round((count / totalCount) * 100),
    color: getDeptColor(dept, index)
  })).sort((a, b) => b.count - a.count);

  // 2. Timeline Breakdown Calculation (Fast vs Medium vs Long)
  const fastCount = approvals.filter((a) => a.timeline_days_max <= 15).length;
  const mediumCount = approvals.filter((a) => a.timeline_days_max > 15 && a.timeline_days_max <= 45).length;
  const longCount = approvals.filter((a) => a.timeline_days_max > 45).length;

  const timelineData = [
    { label: language === 'mr' ? 'जलद (१–१५ दिवस)' : 'Fast Track (1–15 Days)', count: fastCount, percentage: Math.round((fastCount / totalCount) * 100), color: '#10b981', icon: '⚡' },
    { label: language === 'mr' ? 'मध्यम (१५–४५ दिवस)' : 'Medium Duration (15–45 Days)', count: mediumCount, percentage: Math.round((mediumCount / totalCount) * 100), color: '#f59e0b', icon: '⏱️' },
    { label: language === 'mr' ? 'दीर्घ (४५+ दिवस)' : 'Detailed Processing (45+ Days)', count: longCount, percentage: Math.round((longCount / totalCount) * 100), color: '#6366f1', icon: '🏛️' }
  ];

  // 3. Zero Cost vs Paid Calculation
  const zeroCostCount = approvals.filter(
    (a) => a.fee_structure.includes('₹0') || a.fee_structure.toLowerCase().includes('free')
  ).length;

  return (
    <div style={{ marginTop: '20px', marginBottom: '24px' }}>
      
      {/* 📊 SUMMARY CARDS HEADER */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        
        {/* Total Approvals Card */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '3.5px solid var(--gov-navy)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'var(--gov-navy-subtle)', borderRadius: '8px' }}>
              <Layers size={22} color="var(--gov-navy)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'mr' ? 'एकूण वैधानिक परवानग्या' : 'Total Required Clearances'}
              </div>
              <strong style={{ fontSize: '22px', color: 'var(--gov-navy)', lineHeight: 1.1 }}>
                {approvals.length} <span style={{ fontSize: '13px', fontWeight: 600 }}>{language === 'mr' ? 'परवानग्या' : 'Clearances'}</span>
              </strong>
            </div>
          </div>
        </div>

        {/* Department Count Card */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '3.5px solid #3b82f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
              <Building2 size={22} color="#3b82f6" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'mr' ? 'सरकारी विभाग' : 'Govt Departments'}
              </div>
              <strong style={{ fontSize: '22px', color: '#1e40af', lineHeight: 1.1 }}>
                {departmentData.length} <span style={{ fontSize: '13px', fontWeight: 600 }}>{language === 'mr' ? 'विभाग' : 'Departments'}</span>
              </strong>
            </div>
          </div>
        </div>

        {/* Free Approvals Card */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '3.5px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: '#ecfdf5', borderRadius: '8px' }}>
              <DollarSign size={22} color="#10b981" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'mr' ? 'मोफत परवानग्या (Zero Fee)' : 'Zero-Cost Approvals'}
              </div>
              <strong style={{ fontSize: '22px', color: '#047857', lineHeight: 1.1 }}>
                {zeroCostCount} <span style={{ fontSize: '13px', fontWeight: 600 }}>{language === 'mr' ? 'मोफत' : 'Free Clearances'}</span>
              </strong>
            </div>
          </div>
        </div>

        {/* Time Card */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '3.5px solid var(--gov-saffron)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', backgroundColor: 'var(--gov-saffron-light)', borderRadius: '8px' }}>
              <Clock size={22} color="var(--gov-saffron)" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--gov-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'mr' ? 'अंदाजे कालावधी' : 'Est. Total Duration'}
              </div>
              <strong style={{ fontSize: '22px', color: 'var(--gov-navy)', lineHeight: 1.1 }}>
                30–120 <span style={{ fontSize: '13px', fontWeight: 600 }}>{language === 'mr' ? 'दिवस' : 'Days'}</span>
              </strong>
            </div>
          </div>
        </div>

      </div>

      {/* 📈 MAIN VISUAL GRAPH CONTAINER */}
      <div className="gov-card" style={{ padding: '22px', borderTop: '4px solid var(--gov-navy)' }}>
        
        {/* Graph Header & Tab Switcher */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '14px',
            borderBottom: '1px solid #e2e8f0'
          }}
        >
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--gov-navy-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={20} color="var(--gov-saffron)" />
              <span>{language === 'mr' ? 'परवानगी विश्लेषण व आलेख (Visual Analytics Graph)' : 'Clearances Analytics & Department Graphs'}</span>
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--gov-text-muted)', marginTop: '2px' }}>
              {language === 'mr'
                ? 'कोणत्या विभागाकडून किती परवानग्या आणि कालावधी आवश्यक आहे याचा आलेख.'
                : 'Clear visual distribution of required approvals by government body and processing timelines.'}
            </p>
          </div>

          {/* Graph View Selector Buttons */}
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <button
              type="button"
              onClick={() => setChartView('department')}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                borderRadius: '4px',
                border: 'none',
                backgroundColor: chartView === 'department' ? '#ffffff' : 'transparent',
                color: chartView === 'department' ? 'var(--gov-navy)' : '#64748b',
                boxShadow: chartView === 'department' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Building2 size={14} />
              <span>{language === 'mr' ? 'विभागानुसार आलेख' : 'By Department'}</span>
            </button>

            <button
              type="button"
              onClick={() => setChartView('timeline')}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                borderRadius: '4px',
                border: 'none',
                backgroundColor: chartView === 'timeline' ? '#ffffff' : 'transparent',
                color: chartView === 'timeline' ? 'var(--gov-navy)' : '#64748b',
                boxShadow: chartView === 'timeline' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Clock size={14} />
              <span>{language === 'mr' ? 'कालावधीनुसार आलेख' : 'By Timeline'}</span>
            </button>
          </div>
        </div>

        {/* 📊 GRAPH VIEW 1: DEPARTMENT BREAKDOWN BARS */}
        {chartView === 'department' && (
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '14px' }}>
              🏢 {language === 'mr' ? 'विभागानुसार परवानग्यांची संख्या (Department Breakdown):' : 'Approvals Distribution by Govt Department:'}
            </div>

            {/* Stacked Multi-Color Overview Bar */}
            <div
              style={{
                display: 'flex',
                height: '18px',
                width: '100%',
                borderRadius: '999px',
                overflow: 'hidden',
                marginBottom: '20px',
                backgroundColor: '#e2e8f0',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {departmentData.map((d) => (
                <div
                  key={d.name}
                  style={{
                    width: `${d.percentage}%`,
                    backgroundColor: d.color,
                    transition: 'width 0.4s ease-in-out'
                  }}
                  title={`${d.name}: ${d.count} (${d.percentage}%)`}
                />
              ))}
            </div>

            {/* Individual Department Detailed Horizontal Bar Graphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {departmentData.map((d) => (
                <div key={d.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
                      <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '3px', backgroundColor: d.color }} />
                      <span>{d.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: d.color, backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>
                        {d.count} {language === 'mr' ? 'परवानग्या' : 'Clearances'}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gov-text-muted)', width: '36px', textAlign: 'right' }}>
                        {d.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Animated Visual Fill Bar */}
                  <div style={{ height: '10px', backgroundColor: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${d.percentage}%`,
                        backgroundColor: d.color,
                        borderRadius: '5px',
                        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ⏱️ GRAPH VIEW 2: TIMELINE BREAKDOWN BARS */}
        {chartView === 'timeline' && (
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '14px' }}>
              ⏱️ {language === 'mr' ? 'लागणार्‍या वेळेनुसार वर्गीकरण (Processing Time Distribution):' : 'Clearances Grouped by Processing Speed:'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {timelineData.map((t) => (
                <div key={t.label} style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13.5px', color: 'var(--gov-navy)' }}>
                      <span>{t.icon}</span>
                      <span>{t.label}</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: t.color }}>
                      {t.count} {language === 'mr' ? 'परवानग्या' : 'Clearances'} ({t.percentage}%)
                    </div>
                  </div>

                  <div style={{ height: '12px', backgroundColor: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${t.percentage}%`,
                        backgroundColor: t.color,
                        borderRadius: '6px',
                        transition: 'width 0.6s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

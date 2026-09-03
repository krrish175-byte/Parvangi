'use client';

import React from 'react';
import { useApp } from '@/lib/context';

interface MaitriGapModalProps {
  onClose: () => void;
  onStartWizard: () => void;
}

export default function MaitriGapModal({ onClose, onStartWizard }: MaitriGapModalProps) {
  const { language } = useApp();

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
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--gov-radius)',
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          borderTop: '4px solid var(--gov-saffron)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
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
              ⚖️ {language === 'mr' ? 'MAITRI 2.0 आणि परवानगी — नेमका फरक व अंतर' : 'The Real Regulatory Gap: MAITRI 2.0 vs Parvangi'}
            </h2>
            <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)' }}>
              Why Maharashtra&apos;s small first-time entrepreneurs need a dedicated discovery engine
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '3px',
              padding: '4px 8px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, fontSize: '13px', lineHeight: 1.6 }}>
          {/* Pitch Quote Box */}
          <div
            style={{
              backgroundColor: '#fff7ed',
              borderLeft: '4px solid var(--gov-saffron)',
              padding: '12px 16px',
              borderRadius: '3px',
              marginBottom: '16px',
              fontSize: '13.5px',
              color: '#9a3412',
              fontWeight: 600
            }}
          >
            &ldquo;We don&apos;t claim to do what MAITRI does better. We serve the citizens they don&apos;t: the ₹10-lakh entrepreneur, not just the ₹10-crore one.&rdquo;
          </div>

          <p style={{ color: 'var(--gov-text-secondary)', marginBottom: '14px' }}>
            In February 2025, Maharashtra launched <strong>MAITRI 2.0</strong>, consolidating 119 industrial services across 15 government departments into a unified single-window portal with dedicated Relationship Managers. However, field reality reveals a citable structural gap:
          </p>

          {/* Comparison Table */}
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12.5px',
              marginBottom: '18px',
              border: '1px solid var(--gov-border)'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--gov-navy-dark)', color: '#ffffff' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', width: '25%' }}>Parameter</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', width: '38%' }}>MAITRI 2.0 (Official)</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', width: '37%', backgroundColor: '#003366' }}>
                  PARVANGI (परवानगी)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', fontWeight: 'bold' }}>
                  Primary Target Tier
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)' }}>
                  Large, Mega & Ultra-Mega Projects (<strong>₹10 Crore+ Investment</strong>)
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', backgroundColor: 'var(--gov-navy-subtle)', fontWeight: 700, color: 'var(--gov-navy)' }}>
                  Micro & Small Units (<strong>₹5 Lakhs to ₹10 Crores</strong>)
                </td>
              </tr>

              <tr style={{ backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', fontWeight: 'bold' }}>
                  Applicant Persona
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)' }}>
                  Corporates with dedicated legal/compliance teams
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', backgroundColor: 'var(--gov-navy-subtle)' }}>
                  Single first-time founder with savings & an idea
                </td>
              </tr>

              <tr>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', fontWeight: 'bold' }}>
                  Core Friction Solved
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)' }}>
                  Unified application submission & status tracking
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', backgroundColor: 'var(--gov-navy-subtle)' }}>
                  <strong>Pre-investment sequencing:</strong> &quot;What do I need, from whom, and in what order?&quot;
                </td>
              </tr>

              <tr style={{ backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', fontWeight: 'bold' }}>
                  Ordering Logic
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)' }}>
                  Department-wise directory
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', backgroundColor: 'var(--gov-navy-subtle)', fontWeight: 700, color: 'var(--gov-saffron)' }}>
                  Topological Legal Precedence (e.g. MPCB CTE → Factory License)
                </td>
              </tr>
            </tbody>
          </table>

          {/* AI Hallucination Distinction */}
          <div
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              padding: '12px 16px',
              fontSize: '12px'
            }}
          >
            <strong style={{ color: 'var(--gov-navy)', display: 'block', marginBottom: '4px' }}>
              Why not just use an LLM or ChatGPT?
            </strong>
            General-purpose AI chatbots frequently hallucinate statutory order, recommend outdated laws (e.g. repealed Bombay Shops Act instead of the 2017 Act), or fail to recognize that Maharashtra requires a Provisional Fire NOC before MPCB CTE and DISH Factory License application. Parvangi is deterministic, verifiable, and rule-governed.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 20px',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid var(--gov-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <button type="button" className="btn-gov-outline" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn-gov-primary"
            onClick={() => {
              onClose();
              onStartWizard();
            }}
          >
            Launch 4-Step Wizard →
          </button>
        </div>
      </div>
    </div>
  );
}

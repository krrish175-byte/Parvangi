'use client';

import React from 'react';
import { ChecklistResult } from '@/lib/types';
import { getCategoryById } from '@/lib/rules-engine';
import { formatINR } from '@/lib/msme-classifier';

interface PrintLetterheadProps {
  result: ChecklistResult;
}

export default function PrintLetterhead({ result }: PrintLetterheadProps) {
  const categoryDetails = getCategoryById(result.profile.category);

  return (
    <div className="print-only-header" style={{ display: 'none' }}>
      {/* Top Emblem & Department Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #000000', paddingBottom: '12px', marginBottom: '16px' }}>
        <img
          src="/logo.png"
          alt="PARVANGI Official Logo"
          style={{ width: '56px', height: '56px', objectFit: 'contain' }}
        />
        <div style={{ textAlign: 'center', flex: 1, padding: '0 12px' }}>
          <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Government of Maharashtra · महाराष्ट्र शासन
          </div>
          <div style={{ fontSize: '11pt', fontWeight: 600 }}>
            Maharashtra State Innovation Society (MSIS) · उद्योग, ऊर्जा व कामगार विभाग
          </div>
          <div style={{ fontSize: '14pt', fontWeight: 800, marginTop: '4px', textDecoration: 'underline' }}>
            PARVANGI (परवानगी) — STATUTORY APPROVAL CLEARANCE SCHEDULE
          </div>
          <div style={{ fontSize: '9pt', color: '#444444', marginTop: '2px' }}>
            Issued under State Industrial Facilitation Framework | Reference: SIH26130
          </div>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
          alt="State Emblem of India"
          style={{ width: '42px', height: '54px', objectFit: 'contain' }}
        />
      </div>

      {/* Reference & Generation Metadata */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '9.5pt',
          borderBottom: '1px solid #666666',
          paddingBottom: '6px',
          marginBottom: '12px'
        }}
      >
        <div>
          <strong>Document Reference No:</strong> {result.referenceId}
        </div>
        <div>
          <strong>Date & Time of Generation:</strong> {result.generatedAt}
        </div>
      </div>

      {/* Applicant Profile Summary Table */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '9.5pt',
          marginBottom: '16px',
          border: '1px solid #000000'
        }}
      >
        <tbody>
          <tr>
            <td style={{ padding: '4px 8px', border: '1px solid #000000', fontWeight: 'bold', width: '22%' }}>
              Business Category:
            </td>
            <td style={{ padding: '4px 8px', border: '1px solid #000000', width: '28%' }}>
              {categoryDetails?.name} ({categoryDetails?.marathi_name})
            </td>
            <td style={{ padding: '4px 8px', border: '1px solid #000000', fontWeight: 'bold', width: '22%' }}>
              Location Jurisdiction:
            </td>
            <td style={{ padding: '4px 8px', border: '1px solid #000000', width: '28%' }}>
              {result.profile.location.toUpperCase()} ({result.profile.district || 'Maharashtra'})
            </td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', border: '1px solid #000000', fontWeight: 'bold' }}>
              MSME Sizing Tier:
            </td>
            <td style={{ padding: '4px 8px', border: '1px solid #000000' }}>
              {result.profile.scale.toUpperCase()} Enterprise ({formatINR(result.profile.investmentInLakhs)})
            </td>
            <td style={{ padding: '4px 8px', border: '1px solid #000000', fontWeight: 'bold' }}>
              Project Stage:
            </td>
            <td style={{ padding: '4px 8px', border: '1px solid #000000' }}>
              {result.profile.stage.replace('_', ' ').toUpperCase()}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Official Legal Precedence Declaration */}
      <div
        style={{
          fontSize: '8.5pt',
          lineHeight: 1.4,
          padding: '6px 10px',
          backgroundColor: '#f5f5f5',
          border: '1px solid #cccccc',
          marginBottom: '14px'
        }}
      >
        <strong>LEGAL CERTIFICATION OF PRECEDENCE:</strong> The clearances listed below are topologically ordered based on statutory prerequisites mandated by the Factories Act 1948, Water/Air Prevention and Control of Pollution Acts, and the Maharashtra Fire Prevention Act 2006. <em>No civil construction or equipment installation may commence prior to Phase 2 and Phase 3 approvals.</em>
      </div>
    </div>
  );
}

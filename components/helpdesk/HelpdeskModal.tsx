'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';

interface HelpdeskModalProps {
  onClose: () => void;
}

export default function HelpdeskModal({ onClose }: HelpdeskModalProps) {
  const { language } = useApp();
  const [districtQuery, setDistrictQuery] = useState<string>('');

  const dicList = [
    { district: 'Pune', address: 'Agriculture College Compound, Shivajinagar, Pune - 411005', phone: '020-25537380', email: 'gmdic.pune@maharashtra.gov.in' },
    { district: 'Thane', address: 'Wagle Industrial Estate, Road No. 16, Thane West - 400604', phone: '022-25821034', email: 'gmdic.thane@maharashtra.gov.in' },
    { district: 'Mumbai Suburban', address: 'Old Custom House, Fort, Mumbai - 400001', phone: '022-22661556', email: 'gmdic.mumbai@maharashtra.gov.in' },
    { district: 'Nashik', address: 'Old Agra Road, Near ITI, Satpur, Nashik - 422007', phone: '0253-2350482', email: 'gmdic.nashik@maharashtra.gov.in' },
    { district: 'Chhatrapati Sambhaji Nagar', address: 'Railway Station Road, Aurangabad - 431005', phone: '0240-2331456', email: 'gmdic.aurangabad@maharashtra.gov.in' },
    { district: 'Nagpur', address: 'Civil Lines, Near GPO, Nagpur - 440001', phone: '0712-2561234', email: 'gmdic.nagpur@maharashtra.gov.in' },
    { district: 'Kolhapur', address: 'Udyam Nagar, Kolhapur - 416008', phone: '0231-2651478', email: 'gmdic.kolhapur@maharashtra.gov.in' },
    { district: 'Solapur', address: 'Old Employment Chowk, Solapur - 413001', phone: '0217-2724589', email: 'gmdic.solapur@maharashtra.gov.in' }
  ];

  const filteredDics = dicList.filter((d) =>
    d.district.toLowerCase().includes(districtQuery.toLowerCase().trim())
  );

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
          maxWidth: '740px',
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
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1.5px solid var(--gov-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gov-navy)' }}>
              🏛️ {language === 'mr' ? 'जिल्हा उद्योग केंद्र (DIC) संपर्क निर्देशिका' : 'District Industries Centres (DIC) Directory'}
            </h2>
            <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)' }}>
              Official contact coordinates for General Managers of DICs across Maharashtra
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

        <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid var(--gov-border-subtle)' }}>
          <input
            type="text"
            placeholder="Search district (e.g. Pune, Nashik, Thane)..."
            value={districtQuery}
            onChange={(e) => setDistrictQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '13px',
              border: '1px solid #94a3b8',
              borderRadius: '3px'
            }}
          />
        </div>

        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'grid', gap: '10px' }}>
            {filteredDics.map((dic) => (
              <div
                key={dic.district}
                style={{
                  border: '1px solid var(--gov-border)',
                  borderRadius: '3px',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '15px', color: 'var(--gov-navy)' }}>
                    District Industries Centre, {dic.district}
                  </strong>
                  <span
                    style={{
                      backgroundColor: 'var(--gov-green-light)',
                      color: 'var(--gov-green)',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '2px'
                    }}
                  >
                    NODAL DIC
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gov-text-secondary)', marginBottom: '6px' }}>
                  📍 {dic.address}
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '11.5px', color: 'var(--gov-text-muted)', flexWrap: 'wrap' }}>
                  <span>📞 Phone: <strong>{dic.phone}</strong></span>
                  <span>✉️ Email: <strong>{dic.email}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid var(--gov-border)', textAlign: 'right' }}>
          <button type="button" className="btn-gov-secondary" onClick={onClose} style={{ padding: '6px 16px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

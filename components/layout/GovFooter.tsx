'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/context';

export default function GovFooter() {
  const { language } = useApp();

  return (
    <footer className="gov-footer no-print">
      <div className="gov-container">
        <div className="gov-footer-grid">
          <div className="gov-footer-col">
            <h4>{language === 'mr' ? 'महत्त्वाचे दुवे' : language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portals'}</h4>
            <ul>
              <li>
                <a href="https://maitri.maharashtra.gov.in" target="_blank" rel="noopener noreferrer">
                  MAITRI 2.0 Single Window
                </a>
              </li>
              <li>
                <a href="https://eodb.midcindia.org" target="_blank" rel="noopener noreferrer">
                  MIDC Ease of Doing Business
                </a>
              </li>
              <li>
                <a href="https://ecmpcb.mpcb.gov.in" target="_blank" rel="noopener noreferrer">
                  MPCB Integrated Portal (e-MPCB)
                </a>
              </li>
              <li>
                <a href="https://lms.mahaonline.gov.in" target="_blank" rel="noopener noreferrer">
                  DISH Maharashtra Factory Portal
                </a>
              </li>
              <li>
                <a href="https://udyamregistration.gov.in" target="_blank" rel="noopener noreferrer">
                  Udyam Registration (MoMSME)
                </a>
              </li>
            </ul>
          </div>

          <div className="gov-footer-col">
            <h4>{language === 'mr' ? 'वैधानिक व कायदेशीर धोरणे' : language === 'hi' ? 'सरकारी नीतियां' : 'Government Policies'}</h4>
            <ul>
              <li>
                <a href="#rti" onClick={(e) => e.preventDefault()}>
                  {language === 'mr' ? 'माहितीचा अधिकार (RTI 2005)' : language === 'hi' ? 'सूचना का अधिकार (RTI)' : 'Right to Information (RTI)'}
                </a>
              </li>
              <li>
                <a href="#accessibility" onClick={(e) => e.preventDefault()}>
                  {language === 'mr' ? 'सुलभता विधान (Accessibility)' : language === 'hi' ? 'पहुंच विवरण' : 'Accessibility Statement'}
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()}>
                  {language === 'mr' ? 'वापराच्या अटी व शर्ती' : language === 'hi' ? 'उपयोग की शर्तें और अस्वीकरण' : 'Terms of Use & Disclaimer'}
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()}>
                  {language === 'mr' ? 'गोपनीयता धोरण' : language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                </a>
              </li>
              <li>
                <a href="#hyperlink" onClick={(e) => e.preventDefault()}>
                  {language === 'mr' ? 'हायपरलिंकिंग धोरण' : language === 'hi' ? 'हाइपरलिंकिंग नीति' : 'Hyperlinking Policy'}
                </a>
              </li>
            </ul>
          </div>

          <div className="gov-footer-col">
            <h4>{language === 'mr' ? 'उद्योजक सहाय्यता व मदत कक्ष' : language === 'hi' ? 'नागरिक हेल्पडेस्क' : 'Citizen Helpdesk'}</h4>
            <ul>
              <li>
                <strong style={{ color: '#ffffff' }}>Toll Free Helpline:</strong>
                <div style={{ color: '#ffb74d', fontWeight: 700, fontSize: '14px', marginTop: '2px' }}>
                  1800-120-8040
                </div>
              </li>
              <li style={{ marginTop: '6px' }}>
                <span style={{ display: 'block', color: '#94a3b8' }}>Operational Hours:</span>
                <span>Mon - Sat: 09:00 AM - 06:00 PM IST</span>
              </li>
              <li style={{ marginTop: '6px' }}>
                <span style={{ display: 'block', color: '#94a3b8' }}>Grievance Email:</span>
                <span>support.parvangi@msins.gov.in</span>
              </li>
            </ul>
          </div>

          <div className="gov-footer-col">
            <h4>{language === 'mr' ? 'प्रकल्प माहिती' : language === 'hi' ? 'पहल विवरण' : 'Initiative Details'}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Image
                src="/logo.png"
                alt="PARVANGI Official Project Logo"
                width={48}
                height={48}
                style={{
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))',
                  objectFit: 'contain',
                  flexShrink: 0
                }}
              />
              <div>
                <strong style={{ color: '#ffffff', fontSize: '15px', letterSpacing: '0.3px', display: 'block' }}>
                  PARVANGI (परवानगी)
                </strong>
                <span style={{ fontSize: '11px', color: '#ffb74d', fontWeight: 600 }}>
                  Statutory Approval Clearance Engine
                </span>
              </div>
            </div>
            <p style={{ lineHeight: 1.6, color: '#cbd5e1' }}>
              <strong>PARVANGI (परवानगी)</strong> is an official regulatory guidance framework of the{' '}
              <strong>Maharashtra State Innovation Society (MSIS)</strong> &amp; <strong>Directorate of Industries</strong>, Government of Maharashtra.
            </p>
            <p style={{ marginTop: '8px', fontSize: '11.5px', color: '#94a3b8' }}>
              Dedicated statutory approval discovery and workflow orchestration for Micro, Small, and Medium enterprises in Maharashtra.
            </p>
          </div>
        </div>

        <div className="gov-footer-bottom">
          <div>
            © {new Date().getFullYear()} Government of Maharashtra · Maharashtra State Innovation Society. All Rights Reserved.
          </div>
          <div>
            Website Content Managed by Maharashtra State Innovation Society & Directorate of Industries. Hosted on State Data Centre (SDC).
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>
            System Architecture: Single-page Deterministic Rules Engine v1.0 | Regulatory Dataset Version: FEB-2025-V1
          </div>
        </div>
      </div>
    </footer>
  );
}

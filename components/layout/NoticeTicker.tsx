'use client';

import React from 'react';
import { useApp } from '@/lib/context';

export default function NoticeTicker() {
  const { language } = useApp();

  return (
    <div className="gov-ticker-strip no-print">
      <div className="gov-container">
        <div className="gov-ticker-inner">
          <span className="gov-badge-urgent">
            {language === 'mr' ? 'अधिसूचना' : 'OFFICIAL NOTICE'}
          </span>
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {language === 'mr' ? (
              <span>
                <strong>परवानगी (Parvangi) v1.0 कार्यरत:</strong> महाराष्ट्र राज्यातील सूक्ष्म व लघु उद्योजकांसाठी (गुंतवणूक ₹१० लाखांपासून ₹१० कोटींपर्यंत) वैधानिक परवानगी तपासणी इंजिन. सर्व नियम आणि परवानग्या MIDC ईओडीबी व विभागीय मार्गदर्शक तत्त्वांनुसार सत्यापित आहेत.
              </span>
            ) : (
              <span>
                <strong>PARVANGI v1.0 LIVE:</strong> Dedicated Statutory Approval Checklist Engine for first-time Micro & Small entrepreneurs in Maharashtra. Verified against MIDC EODB, MPCB, and DISH regulatory guidelines (Feb 2025). Built for the ₹10-lakh entrepreneur.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

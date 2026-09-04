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
            {language === 'mr' ? 'अधिसूचना' : language === 'hi' ? 'आधिकारिक सूचना' : 'OFFICIAL NOTICE'}
          </span>
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {language === 'mr' ? (
              <span>
                <strong>परवानगी (Parvangi) एकल खिडकी पोर्टल:</strong> महाराष्ट्र राज्यातील सूक्ष्म, लघू व मध्यम औद्योगिक उपक्रमांसाठी वैधानिक नियामक अनुक्रम व परवानग्या पडताळणी प्रणाली. उद्योग संचालनालय व संबंधित विभागांच्या मार्गदर्शक तत्त्वांनुसार कार्यरत.
              </span>
            ) : language === 'hi' ? (
              <span>
                <strong>परवानगी (Parvangi) एकल खिड़की पोर्टल:</strong> महाराष्ट्र में सूक्ष्म, लघु एवं मध्यम औद्योगिक इकाइयों के लिए वैधानिक नियामक अनुक्रम और अनुमोदन अनुसूची। उद्योग निदेशालय के आधिकारिक दिशा-निर्देशों के तहत संचालित।
              </span>
            ) : (
              <span>
                <strong>PARVANGI Single Window Clearance Portal:</strong> Statutory Regulatory Sequencing and Approval Schedule for Micro, Small and Medium Enterprises across Maharashtra. Operational under Directorate of Industries guidelines.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

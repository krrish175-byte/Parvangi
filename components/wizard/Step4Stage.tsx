'use client';

import React from 'react';
import { useApp } from '@/lib/context';
import { BusinessStage } from '@/lib/types';

interface Step4StageProps {
  selectedStage: BusinessStage;
  onSelect: (stage: BusinessStage) => void;
}

export default function Step4Stage({ selectedStage, onSelect }: Step4StageProps) {
  const { language } = useApp();

  const stages: {
    id: BusinessStage;
    title: string;
    marathiTitle: string;
    badge: string;
    description: string;
    regulatoryScope: string;
    icon: string;
  }[] = [
    {
      id: 'new_unit',
      title: language === 'mr' ? 'नवीन उद्योग घटक उभारणी (Green-field)' : language === 'hi' ? 'नई ग्रीन-फील्ड औद्योगिक इकाई' : 'New Green-field Industrial Unit',
      marathiTitle: 'नवीन उद्योग घटक उभारणी (Green-field)',
      badge: language === 'mr' ? 'संपूर्ण ४-टप्पे रोडमॅप' : language === 'hi' ? 'पूर्ण 4-चरण रोडमैप' : 'Complete 4-Phase Roadmap',
      description: language === 'mr' ? 'कोणतीही मशिनरी खरेदी करण्यापूर्वी किंवा बांधकाम सुरू करण्यापूर्वी पूर्णपणे नवीन उत्पादन लाईन, वर्कशॉप किंवा प्रोसेसिंग प्लांट सुरू करत असल्यास.' : language === 'hi' ? 'मशीनरी खरीदने या निर्माण शुरू करने से पहले शून्य से बिल्कुल नई उत्पादन लाइन, कार्यशाला या प्रसंस्करण संयंत्र शुरू करना।' : 'Starting a brand-new production line, workshop, or processing plant from ground zero before purchasing machinery or breaking ground.',
      regulatoryScope: language === 'mr' ? 'संपूर्ण कायदेशीर प्रक्रिया: कायदेशीर ओळख → बांधकाम मंजुरी → Provisional Fire → MPCB CTE → फॅक्टरी मंजुरी → Final NOC → MPCB CTO → वीज/पाणी जोडणी.' : language === 'hi' ? 'पूर्ण एंड-टू-एंड वैधानिक अनुक्रम: कानूनी पहचान → भवन स्वीकृति → अनंतिम फायर → MPCB CTE → फैक्ट्री अनुमोदन → अंतिम NOC → MPCB CTO → विद्युत/जल कनेक्शन।' : 'Full end-to-end statutory sequence: Legal Identity → Building Sanction → Provisional Fire → MPCB CTE → Factory Approval → Final NOC → MPCB CTO → Power/Water energization.',
      icon: '🌱'
    },
    {
      id: 'expansion',
      title: language === 'mr' ? 'विद्यमान घटकाचा विस्तार / आधुनिकीकरण (Brown-field)' : language === 'hi' ? 'मौजूदा इकाई का विस्तार / आधुनिकीकरण' : 'Expansion / Modernization of Existing Unit',
      marathiTitle: 'विद्यमान घटकाचा विस्तार / आधुनिकीकरण (Brown-field)',
      badge: language === 'mr' ? 'क्षमता आणि लोड विस्तार' : language === 'hi' ? 'क्षमता और भार वृद्धि' : 'Capacity & Load Enhancement',
      description: language === 'mr' ? 'नवीन यंत्रसामग्री जोडणे, पॉवर लोड वाढवणे, नवीन बॉयलर बसवणे किंवा फॅक्टरी शेडच्या क्षेत्रफळात वाढ करत असल्यास.' : language === 'hi' ? 'अतिरिक्त मशीनरी जोड़ना, कनेक्टेड पावर लोड बढ़ाना, नया बॉयलर स्थापित करना, या फैक्ट्री शेड का निर्मित क्षेत्र बढ़ाना।' : 'Adding additional machinery, increasing connected power load, installing a new boiler, or extending factory shed built-up area.',
      regulatoryScope: language === 'mr' ? 'MPCB CTE (विस्तार), फॅक्टरी बांधकाम बदल मंजुरी, MSEDCL लोड वाढवणे आणि अतिरिक्त सुरक्षा NOC यांवर लक्ष केंद्रित करते.' : language === 'hi' ? 'MPCB CTE (विस्तार), फैक्ट्री भवन परिवर्तन स्वीकृति, उन्नत MSEDCL अनुबंध मांग, और अतिरिक्त सुरक्षा NOC पर ध्यान केंद्रित करता है।' : 'Focuses on MPCB CTE (Expansion/Amalgamation), Factory Building Alteration Sanction, enhanced MSEDCL contract demand, and additional safety NOCs.',
      icon: '📈'
    },
    {
      id: 'formalize',
      title: language === 'mr' ? 'सध्या कार्यरत घटकाचे कायदेशीर नियमितीकरण' : language === 'hi' ? 'पहले से चल रहे उद्यम को औपचारिक बनाना' : 'Formalizing an Already-Operating Enterprise',
      marathiTitle: 'सध्या कार्यरत घटकाचे कायदेशीर नियमितीकरण',
      badge: language === 'mr' ? 'नियमितीकरण आणि अनुपालन' : language === 'hi' ? 'नियमितीकरण और अनुपालन' : 'Regularization & Compliances',
      description: language === 'mr' ? 'सध्या अनौपचारिक किंवा अंशतः कार्यरत असलेला उद्योग बँक कर्ज, टेंडर पात्रता किंवा सरकारी योजनांसाठी पूर्ण कायदेशीर पूर्तता शोधत असल्यास.' : language === 'hi' ? 'व्यवसाय वर्तमान में अनौपचारिक या आंशिक रूप से कार्य कर रहा है और अब बैंक ऋण, निविदा पात्रता या सरकारी योजनाओं के लिए पूर्ण वैधानिक अनुपालन चाहता है।' : 'Business is currently functioning informally or partially and now seeks full statutory compliance for bank loans, tender eligibility, or government schemes.',
      regulatoryScope: language === 'mr' ? 'सुलभ नियमितीकरण: उद्यम MSME प्रमाणपत्र, GST नोंदणी, गुमास्ता / फॅक्टरी परवाना नियमितीकरण आणि थेट MPCB Consent to Operate (CTO).' : language === 'hi' ? 'सुव्यवस्थित नियमितीकरण: उद्यम MSME प्रमाण पत्र, GST पंजीकरण, गुमास्ता / फैक्ट्री लाइसेंस नियमितीकरण, और प्रत्यक्ष MPCB Consent to Operate (CTO)।' : 'Streamlined regularization: Udyam MSME certificate, GST registration, Shops & Establishment / Factory License regularization, and direct MPCB Consent to Operate (CTO).',
      icon: '⚖️'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gov-navy)' }}>
          {language === 'mr'
            ? 'टप्पा ४: उद्योगाचा सद्यस्थितीतील टप्पा निवडा'
            : language === 'hi' 
            ? 'चरण 4: अपने वर्तमान व्यवसाय चरण का चयन करें'
            : 'Step 4: Select Your Current Business Stage'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--gov-text-secondary)', marginTop: '4px' }}>
          {language === 'mr'
            ? 'प्रकल्प टप्प्यानुसार आवश्यक परवानग्यांचा क्रम बदलतो; नवीन प्रकल्पासाठी प्राथमिक स्थापनेची संमती (CTE) आवश्यक असते, तर कार्यरत घटकास थेट संचालन संमती (CTO) लागू होऊ शकते.'
            : language === 'hi'
            ? 'आपका चरण विनियामक जीवनचक्र निर्धारित करता है — चाहे आपको निर्माण-पूर्व सहमति (CTE और अनंतिम फायर) या परिचालन नियमितीकरण और भार वृद्धि की आवश्यकता हो।'
            : 'Your stage determines the regulatory lifecycle — whether you require pre-construction consents (CTE & Provisional Fire) or operational regularization and load enhancements.'}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}
      >
        {stages.map((stg) => {
          const isSelected = selectedStage === stg.id;

          return (
            <div
              key={stg.id}
              onClick={() => onSelect(stg.id)}
              style={{
                backgroundColor: isSelected ? 'var(--gov-navy-subtle)' : '#ffffff',
                border: isSelected ? '2px solid var(--gov-navy)' : '1px solid var(--gov-border)',
                borderRadius: 'var(--gov-radius)',
                padding: '18px',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 3px 8px rgba(11, 56, 102, 0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(stg.id)}
              aria-pressed={isSelected}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid var(--gov-navy)' : '2px solid #94a3b8',
                      backgroundColor: '#ffffff',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ fontSize: '24px' }}>{stg.icon}</span>
                </div>

                <span
                  style={{
                    backgroundColor: isSelected ? '#dbeafe' : '#f1f5f9',
                    color: isSelected ? 'var(--gov-navy)' : 'var(--gov-text-muted)',
                    border: '1px solid #cbd5e1',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '3px'
                  }}
                >
                  {stg.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '3px' }}>
                {stg.title}
              </h3>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gov-saffron)', marginBottom: '8px' }}>
                {stg.marathiTitle}
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--gov-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
                {stg.description}
              </p>

              <div
                style={{
                  backgroundColor: isSelected ? '#ffffff' : '#f8fafc',
                  border: '1px solid var(--gov-border-subtle)',
                  borderRadius: '3px',
                  padding: '9px 11px',
                  fontSize: '12px'
                }}
              >
                <div style={{ color: 'var(--gov-navy)', fontWeight: 700, marginBottom: '2px' }}>
                  📋 {language === 'mr' ? 'वैधानिक व्याप्ती:' : language === 'hi' ? 'अनुपालन कार्यप्रवाह प्रभाव:' : 'Compliance Workflow Impact:'}
                </div>
                <div style={{ color: 'var(--gov-text-muted)', lineHeight: 1.45 }}>
                  {stg.regulatoryScope}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

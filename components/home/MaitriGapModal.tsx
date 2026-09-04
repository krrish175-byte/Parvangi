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
        className="gov-modal-shell"
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
          className="gov-modal-header"
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
              ⚖️ {language === 'mr' ? 'MAITRI 2.0 आणि परवानगी — नेमका फरक व अंतर' : language === 'hi' ? 'The Real Regulatory Gap: MAITRI 2.0 vs Parvangi' : 'The Real Regulatory Gap: MAITRI 2.0 vs Parvangi'}
            </h2>
            <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)' }}>
              {language === 'mr' ? 'महाराष्ट्रातील छोट्या नवउद्योजकांना स्वतंत्र परवानगी शोध इंजिनची गरज का आहे?' : language === 'hi' ? 'महाराष्ट्र के छोटे पहली बार के उद्यमियों को एक समर्पित खोज इंजन की आवश्यकता क्यों है' : 'Why Maharashtra&apos;s small first-time entrepreneurs need a dedicated discovery engine'}
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
            {language === 'mr' ? '&ldquo;मैत्री जे काम करते ते आम्ही अधिक चांगले करतो असा आमचा दावा नाही. आम्ही अशा नागरिकांची सेवा करतो ज्यांची ते करत नाहीत: फक्त ₹१०-कोटीचेच नाही, तर ₹१०-लाखांचे उद्योजक.&rdquo;' : language === 'hi' ? '&ldquo;हम यह दावा नहीं करते कि हम वह काम बेहतर करते हैं जो MAITRI करता है। हम उन नागरिकों की सेवा करते हैं जिनकी वे नहीं करते: केवल ₹10-करोड़ वाले नहीं, बल्कि ₹10-लाख वाले उद्यमी।&rdquo;' : '&ldquo;We don&apos;t claim to do what MAITRI does better. We serve the citizens they don&apos;t: the ₹10-lakh entrepreneur, not just the ₹10-crore one.&rdquo;'}
          </div>

          <p style={{ color: 'var(--gov-text-secondary)', marginBottom: '14px' }}>
            {language === 'mr' ? 'फेब्रुवारी २०२५ मध्ये, महाराष्ट्राने <strong>MAITRI 2.0</strong> लाँच केले, ज्यामध्ये १५ सरकारी विभागांच्या ११९ औद्योगिक सेवांचे एकाच पोर्टलवर एकत्रीकरण केले आणि स्वतंत्र रिलेशनशिप मॅनेजर नियुक्त केले. मात्र, प्रत्यक्ष स्थितीत एक मोठी तफावत दिसून येते:' : language === 'hi' ? 'फरवरी 2025 में, महाराष्ट्र ने <strong>MAITRI 2.0</strong> लॉन्च किया, जिसमें 15 सरकारी विभागों की 119 औद्योगिक सेवाओं को एक ही पोर्टल पर समेकित किया गया। हालांकि, जमीनी हकीकत एक संरचनात्मक अंतर को उजागर करती है:' : 'In February 2025, Maharashtra launched <strong>MAITRI 2.0</strong>, consolidating 119 industrial services across 15 government departments into a unified single-window portal with dedicated Relationship Managers. However, field reality reveals a citable structural gap:'}
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
                <th style={{ padding: '8px 12px', textAlign: 'left', width: '25%' }}>{language === 'mr' ? 'पॅरामीटर' : language === 'hi' ? 'पैरामीटर' : 'Parameter'}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', width: '38%' }}>MAITRI 2.0 (Official)</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', width: '37%', backgroundColor: '#003366' }}>
                  PARVANGI (परवानगी)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', fontWeight: 'bold' }}>
                  {language === 'mr' ? 'मुख्य लक्ष्य गट' : language === 'hi' ? 'प्राथमिक लक्ष्य स्तर' : 'Primary Target Tier'}
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)' }}>
                  {language === 'mr' ? ( <> मोठे, मेगा आणि अल्ट्रा-मेगा प्रकल्प (<strong>₹१० कोटी+ गुंतवणूक</strong>) </> ) : language === 'hi' ? ( <> बड़े, मेगा और अल्ट्रा-मेगा प्रोजेक्ट (<strong>₹10 करोड़+ निवेश</strong>) </> ) : ( <> Large, Mega & Ultra-Mega Projects (<strong>₹10 Crore+ Investment</strong>) </> )}
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', backgroundColor: 'var(--gov-navy-subtle)', fontWeight: 700, color: 'var(--gov-navy)' }}>
                  {language === 'mr' ? ( <> सूक्ष्म व लघु उद्योग (<strong>₹५ लाख ते ₹१० कोटी</strong>) </> ) : language === 'hi' ? ( <> सूक्ष्म और लघु इकाइयाँ (<strong>₹5 लाख से ₹10 करोड़</strong>) </> ) : ( <> Micro & Small Units (<strong>₹5 Lakhs to ₹10 Crores</strong>) </> )}
                </td>
              </tr>

              <tr style={{ backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', fontWeight: 'bold' }}>
                  {language === 'mr' ? 'अर्जदाराचे स्वरूप' : language === 'hi' ? 'आवेदक व्यक्तित्व' : 'Applicant Persona'}
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)' }}>
                  {language === 'mr' ? 'स्वतंत्र कायदेशीर/अनुपालन टीम असलेल्या कॉर्पोरेट कंपन्या' : language === 'hi' ? 'समर्पित कानूनी/अनुपालन टीमों वाले कॉर्पोरेट्स' : 'Corporates with dedicated legal/compliance teams'}
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', backgroundColor: 'var(--gov-navy-subtle)' }}>
                  {language === 'mr' ? 'कल्पना आणि बचत असलेला नवीन एकटा संस्थापक' : language === 'hi' ? 'बचत और एक विचार के साथ अकेला पहली बार का संस्थापक' : 'Single first-time founder with savings & an idea'}
                </td>
              </tr>

              <tr>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', fontWeight: 'bold' }}>
                  {language === 'mr' ? 'मुख्य सोडवलेली समस्या' : language === 'hi' ? 'मुख्य समस्या का समाधान' : 'Core Friction Solved'}
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)' }}>
                  {language === 'mr' ? 'एकत्रित अर्ज सादर करणे आणि स्थिती ट्रॅकिंग' : language === 'hi' ? 'एकीकृत आवेदन प्रस्तुत करना और स्थिति ट्रैकिंग' : 'Unified application submission & status tracking'}
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', backgroundColor: 'var(--gov-navy-subtle)' }}>
                  {language === 'mr' ? ( <> <strong>गुंतवणुकीपूर्वीचा क्रम:</strong> &quot;मला काय हवे आहे, कोणाकडून आणि कोणत्या क्रमाने?&quot; </> ) : language === 'hi' ? ( <> <strong>निवेश पूर्व अनुक्रमण:</strong> &quot;मुझे क्या चाहिए, किससे, और किस क्रम में?&quot; </> ) : ( <> <strong>Pre-investment sequencing:</strong> &quot;What do I need, from whom, and in what order?&quot; </> )}
                </td>
              </tr>

              <tr style={{ backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', fontWeight: 'bold' }}>
                  {language === 'mr' ? 'क्रमवारीचे तर्क' : language === 'hi' ? 'तर्क आदेश' : 'Ordering Logic'}
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)' }}>
                  {language === 'mr' ? 'विभागनिहाय डिरेक्टरी' : language === 'hi' ? 'विभागवार निर्देशिका' : 'Department-wise directory'}
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid var(--gov-border)', backgroundColor: 'var(--gov-navy-subtle)', fontWeight: 700, color: 'var(--gov-saffron)' }}>
                  {language === 'mr' ? 'कायदेशीर अनुक्रम (उदा. MPCB CTE → फॅक्टरी लायसन्स)' : language === 'hi' ? 'वैधानिक प्राथमिकता (जैसे MPCB CTE → फैक्टरी लाइसेंस)' : 'Topological Legal Precedence (e.g. MPCB CTE → Factory License)'}
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
              {language === 'mr' ? 'एलएलएम (LLM) किंवा ChatGPT का वापरू नये?' : language === 'hi' ? 'LLM या ChatGPT का उपयोग क्यों न करें?' : 'Why not just use an LLM or ChatGPT?'}
            </strong>
            {language === 'mr' ? 'सामान्य एआय चॅटबॉट्स अनेकदा कायदेशीर क्रमाबद्दल चुकीची माहिती देतात, जुने कायदे सुचवतात (उदा. २०१७ च्या कायद्याऐवजी जुना बॉम्बे शॉप्स कायदा) किंवा महाराष्ट्रात MPCB CTE आणि DISH फॅक्टरी लायसन्सच्या अर्जापूर्वी प्रोव्हिजनल फायर एनओसी (NOC) लागते हे ओळखण्यात अपयशी ठरतात. परवानगी हे इंजिन अचूक, सत्यापित आणि नियमांवर आधारित आहे.' : language === 'hi' ? 'सामान्य-उद्देश्य एआई चैटबॉट अक्सर वैधानिक आदेश को मतिभ्रम करते हैं, पुराने कानूनों की सिफारिश करते हैं (जैसे 2017 अधिनियम के बजाय निरस्त बॉम्बे शॉप्स अधिनियम), या यह पहचानने में विफल रहते हैं कि महाराष्ट्र में MPCB CTE और DISH फैक्ट्री लाइसेंस आवेदन से पहले अनंतिम फायर एनओसी की आवश्यकता है। परवानगी नियतात्मक, सत्यापन योग्य और नियम-शासित है।' : 'General-purpose AI chatbots frequently hallucinate statutory order, recommend outdated laws (e.g. repealed Bombay Shops Act instead of the 2017 Act), or fail to recognize that Maharashtra requires a Provisional Fire NOC before MPCB CTE and DISH Factory License application. Parvangi is deterministic, verifiable, and rule-governed.'}
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
            {language === 'mr' ? '४-टप्पे विझार्ड सुरू करा →' : language === 'hi' ? '4-चरणीय विज़ार्ड लॉन्च करें →' : 'Launch 4-Step Wizard →'}
          </button>
        </div>
      </div>
    </div>
  );
}

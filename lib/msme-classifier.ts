import { ScaleTier } from './types';

export interface MSMEClassificationDetails {
  tier: ScaleTier;
  title: string;
  marathi_title: string;
  hindi_title: string;
  investmentRange: string;
  marathi_investmentRange: string;
  hindi_investmentRange: string;
  turnoverRange: string;
  description: string;
  marathi_description: string;
  hindi_description: string;
  subsidiesEligible: string[];
  marathi_subsidiesEligible: string[];
  hindi_subsidiesEligible: string[];
}

export function classifyMSME(investmentInLakhs: number, turnoverInLakhs?: number): MSMEClassificationDetails {
  const effectiveTurnover = turnoverInLakhs ?? investmentInLakhs * 3;

  if (investmentInLakhs <= 100 && effectiveTurnover <= 500) {
    return {
      tier: 'micro',
      title: 'Micro Enterprise (सूक्ष्म उद्योग)',
      marathi_title: 'सूक्ष्म उद्योग',
      hindi_title: 'सूक्ष्म उद्यम (Micro)',
      investmentRange: 'Investment up to ₹1 Crore',
      marathi_investmentRange: '₹१ कोटी पर्यंतची गुंतवणूक',
      hindi_investmentRange: '₹1 करोड़ तक का निवेश',
      turnoverRange: 'Turnover up to ₹5 Crore',
      description: 'Ideal for workshops, individual entrepreneurs, and small food processing centers with minimal regulatory burden.',
      marathi_description: 'कमी कायदेशीर प्रक्रियेसह वर्कशॉप्स, वैयक्तिक उद्योजक आणि छोट्या खाद्यप्रक्रिया केंद्रांसाठी आदर्श.',
      hindi_description: 'कार्यशालाओं, व्यक्तिगत उद्यमियों, और न्यूनतम नियामक बोझ के साथ छोटे खाद्य प्रसंस्करण केंद्रों के लिए आदर्श।',
      subsidiesEligible: [
        '100% Stamp Duty Exemption under Maharashtra PSI Scheme',
        'Electricity Duty Exemption for 7 years',
        'Interest subsidy up to 5% p.a.'
      ],
      marathi_subsidiesEligible: [
        'महाराष्ट्र PSI योजनेंतर्गत १००% मुद्रांक शुल्क (Stamp Duty) माफी',
        '७ वर्षांसाठी वीज शुल्कात (Electricity Duty) माफी',
        'वार्षिक ५% पर्यंत व्याज अनुदान (Interest Subsidy)'
      ],
      hindi_subsidiesEligible: [
        'महाराष्ट्र पीएसआई योजना के तहत 100% स्टांप ड्यूटी छूट',
        '7 वर्षों के लिए बिजली शुल्क छूट',
        '5% प्रति वर्ष तक ब्याज सब्सिडी'
      ]
    };
  }

  if (investmentInLakhs <= 1000 && effectiveTurnover <= 5000) {
    return {
      tier: 'small',
      title: 'Small Enterprise (लघु उद्योग)',
      marathi_title: 'लघु उद्योग',
      hindi_title: 'लघु उद्यम (Small)',
      investmentRange: 'Investment > ₹1 Cr up to ₹10 Crore',
      marathi_investmentRange: '₹१ कोटी ते ₹१० कोटी गुंतवणूक',
      hindi_investmentRange: '₹1 करोड़ से ₹10 करोड़ तक निवेश',
      turnoverRange: 'Turnover up to ₹50 Crore',
      description: 'Standard industrial units with multi-machine production, dedicated worker teams, and formal safety compliances.',
      marathi_description: 'स्थापित लघु उद्योग (SMEs), विशिष्ट सुटे भाग निर्मिती आणि मध्यम आकाराच्या फॅब्रिकेशन युनिट्ससाठी योग्य.',
      hindi_description: 'स्थापित एसएमई, विशेष घटक निर्माण, और मध्यम-स्तरीय निर्माण इकाइयों के लिए उपयुक्त।',
      subsidiesEligible: [
        'Capital Subsidy up to 25% of Fixed Capital Investment',
        'Power Tariff Subsidy of ₹1 to ₹2 per unit for 3–5 years',
        'Industrial cluster infrastructure incentives'
      ],
      marathi_subsidiesEligible: [
        'स्थिर भांडवली गुंतवणुकीच्या २५% पर्यंत भांडवली सबसिडी',
        '३-५ वर्षांसाठी ₹१ ते ₹२ प्रति युनिट वीज दर सवलत',
        'औद्योगिक क्लस्टर पायाभूत सुविधा प्रोत्साहन'
      ],
      hindi_subsidiesEligible: [
        'स्थिर पूंजी निवेश के 25% तक पूंजीगत सब्सिडी',
        '3-5 वर्षों के लिए ₹1 से ₹2 प्रति यूनिट बिजली शुल्क सब्सिडी',
        'औद्योगिक क्लस्टर बुनियादी ढांचा प्रोत्साहन'
      ]
    };
  }

  return {
    tier: 'medium',
    title: 'Medium Enterprise (मध्यम उद्योग)',
    marathi_title: 'मध्यम उद्योग',
    hindi_title: 'मध्यम उद्यम (Medium)',
    investmentRange: 'Investment > ₹10 Cr up to ₹50 Crore',
    marathi_investmentRange: '₹१० कोटी ते ₹५० कोटी गुंतवणूक',
    hindi_investmentRange: '₹10 करोड़ से ₹50 करोड़ तक निवेश',
    turnoverRange: 'Turnover up to ₹250 Crore',
    description: 'High-throughput manufacturing or processing plants with formal environmental treatment infrastructure.',
    marathi_description: 'विस्तृत फॅक्टरी परवाने, बॉयलर मंजुरी आणि प्रगत प्रदूषण नियंत्रण यंत्रणेची आवश्यकता असलेले मोठे उद्योग.',
    hindi_description: 'बड़े पैमाने के संचालन जिनके लिए व्यापक फैक्ट्री लाइसेंस, बॉयलर अनुमोदन और उन्नत प्रदूषण नियंत्रण बुनियादी ढांचे की आवश्यकता होती है।',
    subsidiesEligible: [
      'Mega project facilitation via MIDC single-window FastTrack',
      'ETP/STP Green Technology grant up to ₹50 Lakhs',
      'Anchor unit tax incentives'
    ],
    marathi_subsidiesEligible: [
      'MIDC सिंगल-विंडो फास्ट ट्रॅक द्वारे मेगा प्रोजेक्ट सुविधा',
      '₹५० लाखांपर्यंत ETP/STP ग्रीन टेक्नॉलॉजी अनुदान',
      'अँकर युनिट कर सवलती'
    ],
    hindi_subsidiesEligible: [
      'MIDC सिंगल-विंडो फास्टट्रैक के माध्यम से मेगा प्रोजेक्ट सुविधा',
      '₹50 लाख तक ETP/STP ग्रीन टेक्नोलॉजी अनुदान',
      'एंकर यूनिट कर प्रोत्साहन'
    ]
  };
}

export function formatINR(lakhs: number): string {
  if (lakhs < 100) {
    return `₹${lakhs} Lakhs`;
  }
  const crores = (lakhs / 100).toFixed(2).replace(/\.00$/, '');
  return `₹${crores} Crore${Number(crores) > 1 ? 's' : ''}`;
}

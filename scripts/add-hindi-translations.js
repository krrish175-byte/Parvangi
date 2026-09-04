const fs = require('fs');
const path = require('path');

// A mapping of known Marathi or English strings to Hindi strings
const hindiMap = {
  'Language:': 'भाषा:',
  'Official MSME Sizing Category': 'आधिकारिक एमएसएमई आकार श्रेणी',
  'Download Letterhead PDF': 'लेटरहेड पीडीएफ डाउनलोड करें',
  'OFFICIAL NOTICE': 'आधिकारिक सूचना',
  'Mandatory Clearances': 'अनिवार्य मंजूरी',
  'Mandatory Approval': 'अनिवार्य अनुमोदन',
  'Ready to verify your approval roadmap?': 'क्या आप अपना रोडमैप सत्यापित करने के लिए तैयार हैं?',
  'View Key Required Documents': 'आवश्यक दस्तावेज देखें',
  'Citizen Helpdesk': 'नागरिक हेल्पडेस्क',
  'Total Required Approvals': 'कुल आवश्यक मंजूरी',
  'MIDC Industrial Area': 'एमआईडीसी औद्योगिक क्षेत्र',
  'Hide Required Documents': 'दस्तावेज छुपाएं',
  'Sector / Trade': 'क्षेत्र / व्यापार',
  'Check What You Need': 'जांचें कि आपको क्या चाहिए',
  'Know what you need, before you need it.': 'जानें कि आपको क्या चाहिए, इससे पहले कि आपको इसकी आवश्यकता हो।',
  'Strict Legal Precedence': 'सख्त कानूनी प्राथमिकता',
  'Privacy Policy': 'गोपनीयता नीति',
  'Rural / Gram Panchayat': 'ग्रामीण / ग्राम पंचायत',
  'Excluding land & building cost': 'भूमि और भवन की लागत को छोड़कर',
  'District Industries Centre (DIC) Assistance': 'जिला उद्योग केंद्र सहायता',
  'District Industries Centres (DIC) Directory': 'जिला उद्योग केंद्र निर्देशिका',
  'District Helpdesk & DIC': 'जिला हेल्पडेस्क और डीआईसी',
  'New / Expansion': 'नया / विस्तार',
  'New Greenfield Unit': 'नई ग्रीनफील्ड इकाई',
  'New Evaluation': 'नया मूल्यांकन',
  'Citizen Quick Services & Portals': 'नागरिक त्वरित सेवाएं और पोर्टल',
  'Rules Database Live (Feb 2025)': 'नियम डेटाबेस लाइव (फरवरी 2025)',
  'Regulating Departments': 'विनियमन विभाग',
  'Formalization': 'औपचारिकीकरण',
  'Track Existing Approval Schedule': 'मौजूदा अनुसूची ट्रैक करें',
  'Approvals': 'मंजूरी',
  'Search clearance or act...': 'मंजूरी या अधिनियम खोजें...',
  'Official Portal Framework': 'आधिकारिक पोर्टल ढांचा',
  'Continue to Next Step': 'अगले चरण पर जारी रखें',
  'Initiative Details': 'पहल विवरण',
  'Start Wizard →': 'प्रारंभ करें →',
  'Print / Save as PDF': 'प्रिंट / पीडीएफ सहेजें',
  'Mandatory Only': 'केवल अनिवार्य',
  'Conditional Only': 'केवल सशर्त',
  'Capital & Sizing': 'पूंजी और आकार',
  'View Directory →': 'निर्देशिका देखें →',
  'Official Portals': 'आधिकारिक पोर्टल',
  'Municipal Corporation': 'नगर निगम',
  'STATE INNOVATION FACILITATION': 'राज्य नवाचार सुविधा',
  'Back': 'पीछे',
  'My Active Checklist': 'मेरी सक्रिय सूची',
  'Modify Inputs': 'विवरण बदलें',
  'Right to Information (RTI)': 'सूचना का अधिकार (RTI)',
  'Skip to main content': 'मुख्य सामग्री पर जाएं',
  'Home': 'होम',
  'Cancel': 'रद्द करें',
  'State Innovation Initiative': 'राज्य नवाचार पहल',
  'Terms of Use & Disclaimer': 'उपयोग की शर्तें और अस्वीकरण',
  'Expansion / Modernization': 'विस्तार / आधुनिकीकरण',
  'Approval Compliance Schedule': 'अनुमोदन अनुपालन अनुसूची',
  'Government Policies': 'सरकारी नीतियां',
  'Personalized Approval Engine': 'व्यक्तिगत अनुमोदन इंजन',
  'Access Government Portal': 'सरकारी पोर्टल तक पहुंचें',
  'Lookup': 'खोजें',
  'Track Code →': 'कोड ट्रैक करें →',
  'Deterministic Rules Engine': 'नियम आधारित इंजन',
  'All Clearances': 'सभी मंजूरी',
  'Know Your Approvals': 'अपनी मंजूरी जानें',
  'Statutory Approvals Master Directory': 'वैधानिक मंजूरी मास्टर निर्देशिका',
  'Conditional Clearances': 'सशर्त मंजूरी',
  'Conditional Approval': 'सशर्त अनुमोदन',
  'Accessibility Statement': 'पहुंच विवरण',
  'Built for the ₹10-Lakh Founder': '₹10-लाख संस्थापक के लिए निर्मित',
  'Browse All 16 →': 'सभी 16 ब्राउज़ करें →',
  'Track My Checklist': 'मेरी चेकलिस्ट ट्रैक करें',
  'Hyperlinking Policy': 'हाइपरलिंकिंग नीति',
  '1. Category': '१. श्रेणी',
  '2. Location': '२. स्थान',
  '3. Scale (MSME)': '३. आकार (MSME)',
  '4. Project Stage': '४. परियोजना चरण',
  'Government of Maharashtra | Maharashtra State Innovation Society': 'महाराष्ट्र सरकार | महाराष्ट्र राज्य नवाचार सोसायटी',
  'Citizen Toll-Free:': 'नागरिक टोल-फ्री:',
  'Text Size:': 'टेक्स्ट का आकार:',
  'Legal Precedence Prerequisite:': 'कानूनी प्राथमिकता पूर्वापेक्षा:',
  'Conditionality Trigger:': 'शर्त ट्रिगर:',
  'Statutory Act & Rules:': 'वैधानिक अधिनियम और नियम:',
  'Statutory Fee Schedule:': 'वैधानिक शुल्क अनुसूची:',
  'Mandatory Submission Documents Checklist:': 'अनिवार्य प्रस्तुत दस्तावेज सूची:',
  'Selected Profile:': 'चयनित प्रोफ़ाइल:',
  'Marathi (MR)': 'मराठी (MR)',
  'English (EN)': 'English (EN)'
};

function getHindi(engStr) {
  const cleanEng = engStr.replace(/^['"`](.*)['"`]$/, '$1');
  if (hindiMap[cleanEng]) {
    const quote = engStr[0];
    return `${quote}${hindiMap[cleanEng]}${quote}`;
  }
  // Default fallback if not found in map
  return engStr;
}

const dirList = [
  path.join(__dirname, '../app'),
  path.join(__dirname, '../components')
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (filePath.includes('AccessibilityBar.tsx')) return;
  
  const regex = /language === 'mr'\s*\?\s*(['"`].*?['"`])\s*:\s*(['"`].*?['"`])/g;
  
  let modified = false;
  content = content.replace(regex, (match, mrText, enText) => {
    modified = true;
    const hiText = getHindi(enText);
    return `language === 'mr' ? ${mrText} : language === 'hi' ? ${hiText} : ${enText}`;
  });

  content = content.replace(/language === 'mr'\s*\?\s*([a-zA-Z0-9_\.]+)\.marathi_name\s*:\s*\1\.name/g, (match, obj) => {
    modified = true;
    return `language === 'mr' ? ${obj}.marathi_name : language === 'hi' ? ${obj}.hindi_name : ${obj}.name`;
  });

  content = content.replace(/language === 'mr'\s*\?\s*([a-zA-Z0-9_\.]+)\.marathi_title\s*:\s*\1\.title/g, (match, obj) => {
    modified = true;
    return `language === 'mr' ? ${obj}.marathi_title : language === 'hi' ? ${obj}.hindi_title : ${obj}.title`;
  });

  content = content.replace(/language === 'mr'\s*\?\s*([a-zA-Z0-9_\.]+)\.marathiLabel\s*:\s*\1\.label/g, (match, obj) => {
    modified = true;
    return `language === 'mr' ? ${obj}.marathiLabel : language === 'hi' ? ${obj}.hindiLabel : ${obj}.label`; 
  });
  
  const regexTemplate = /language === 'mr'\s*\?\s*(`[^`]*`)\s*:\s*(`[^`]*`)/g;
  content = content.replace(regexTemplate, (match, mrText, enText) => {
     modified = true;
     return `language === 'mr' ? ${mrText} : language === 'hi' ? ${enText} : ${enText}`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

dirList.forEach(processDir);

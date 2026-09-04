const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/regulatory-approvals.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const translations = {
  'udyam-registration': 'उद्यम पंजीकरण (सूक्ष्म, लघु और मध्यम उद्यम)',
  'gst-registration': 'वस्तु एवं सेवा कर (जीएसटी) पंजीकरण',
  'professional-tax-registration': 'व्यावसायिक कर पंजीकरण (PTEC / PTRC)',
  'shops-and-establishment': 'महाराष्ट्र दुकान और स्थापना पंजीकरण (गुमास्ता)',
  'building-plan-approval': 'औद्योगिक भवन योजना स्वीकृति और निर्माण अनुमति',
  'fire-noc-provisional': 'अस्थायी अग्नि एनओसी (निर्माण पूर्व)',
  'mpcb-cte': 'महाराष्ट्र प्रदूषण नियंत्रण बोर्ड - स्थापना की सहमति (CTE)',
  'dish-factory-license': 'कारखाना योजना स्वीकृति और कारखाना लाइसेंस (DISH)',
  'boiler-registration': 'स्टीम बॉयलर पंजीकरण और योजना स्वीकृति',
  'peso-storage-license': 'पेट्रोलियम, गैस और विस्फोटक भंडारण लाइसेंस (PESO)',
  'fssai-license': 'खाद्य सुरक्षा और मानक प्राधिकरण लाइसेंस (FSSAI)',
  'fire-noc-final': 'अंतिम अग्नि एनओसी और अधिभोग मंजूरी',
  'mpcb-cto': 'महाराष्ट्र प्रदूषण नियंत्रण बोर्ड - संचालन की सहमति (CTO)',
  'msedcl-power-connection': 'महावितरण औद्योगिक बिजली कनेक्शन और भार स्वीकृति',
  'water-supply-connection': 'औद्योगिक पाइप जलापूर्ति कनेक्शन और आवंटन',
  'municipal-trade-license': 'स्थानीय नगर निगम / ग्राम पंचायत व्यापार लाइसेंस'
};

const updatedData = data.map(item => {
  // Insert hindi_name right after marathi_name
  const newItem = {};
  for (const key in item) {
    newItem[key] = item[key];
    if (key === 'marathi_name') {
      newItem.hindi_name = translations[item.id] || item.name;
    }
  }
  return newItem;
});

fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');
console.log('Successfully updated regulatory-approvals.json');

import { generateApprovalChecklist, ALL_CATEGORIES } from '../lib/rules-engine';
import { UserProfileInput } from '../lib/types';

console.log('----------------------------------------------------');
console.log('PARVANGI (परवानगी) — Rules Engine Verification Suite');
console.log('----------------------------------------------------\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    console.log(`✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`✗ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

// Test Case 1: Small Manufacturing in MIDC (Micro scale, New Unit)
console.log('TEST CASE 1: Small Manufacturing in MIDC');
const mfgProfile: UserProfileInput = {
  category: 'small_manufacturing',
  location: 'midc',
  scale: 'micro',
  investmentInLakhs: 45,
  stage: 'new_unit'
};

const mfgResult = generateApprovalChecklist(mfgProfile);
assert(mfgResult.approvals.length > 0, 'Generates approvals for Small Manufacturing');

const cteIndex = mfgResult.approvals.findIndex((a) => a.id === 'mpcb-cte');
const factoryIndex = mfgResult.approvals.findIndex((a) => a.id === 'dish-factory-license');
const provFireIndex = mfgResult.approvals.findIndex((a) => a.id === 'fire-noc-provisional');
const finalFireIndex = mfgResult.approvals.findIndex((a) => a.id === 'fire-noc-final');
const ctoIndex = mfgResult.approvals.findIndex((a) => a.id === 'mpcb-cto');

assert(cteIndex !== -1, 'Small Manufacturing has MPCB CTE');
assert(factoryIndex !== -1, 'Small Manufacturing has Factory License');
assert(cteIndex < factoryIndex, 'CRITICAL SEQUENCE: MPCB CTE precedes DISH Factory License');
assert(provFireIndex < finalFireIndex, 'SEQUENCE: Provisional Fire NOC precedes Final Fire NOC');
assert(cteIndex < ctoIndex, 'SEQUENCE: MPCB CTE precedes MPCB CTO');
assert(finalFireIndex < ctoIndex, 'SEQUENCE: Final Fire NOC precedes MPCB CTO');

// Test Case 2: Food Processing Unit in Municipal Area
console.log('\nTEST CASE 2: Food Processing in Municipal Corporation');
const foodProfile: UserProfileInput = {
  category: 'food_processing',
  location: 'municipal',
  scale: 'micro',
  investmentInLakhs: 25,
  stage: 'new_unit'
};
const foodResult = generateApprovalChecklist(foodProfile);
const fssaiIndex = foodResult.approvals.findIndex((a) => a.id === 'fssai-license');
const tradeLicenseIndex = foodResult.approvals.findIndex((a) => a.id === 'municipal-trade-license');
assert(fssaiIndex !== -1, 'Food Processing includes FSSAI License');
assert(tradeLicenseIndex !== -1, 'Municipal location includes Municipal Trade License');

// Test Case 3: IT / Services Business (Zero pollution clearances needed)
console.log('\nTEST CASE 3: IT / Services Business (Non-industrial)');
const itProfile: UserProfileInput = {
  category: 'it_services',
  location: 'municipal',
  scale: 'micro',
  investmentInLakhs: 15,
  stage: 'new_unit'
};
const itResult = generateApprovalChecklist(itProfile);
const itCte = itResult.approvals.find((a) => a.id === 'mpcb-cte');
const itFactory = itResult.approvals.find((a) => a.id === 'dish-factory-license');
const itGumasta = itResult.approvals.find((a) => a.id === 'shops-and-establishment');
assert(itCte === undefined, 'IT Services does NOT require MPCB CTE');
assert(itFactory === undefined, 'IT Services does NOT require Factory License');
assert(itGumasta !== undefined, 'IT Services DOES require Shops & Establishment (Gumasta)');

// Test Case 4: Chemical Unit in MIDC (PESO storage approval required)
console.log('\nTEST CASE 4: Chemical Unit (PESO approval check)');
const chemProfile: UserProfileInput = {
  category: 'chemical',
  location: 'midc',
  scale: 'small',
  investmentInLakhs: 250,
  stage: 'new_unit'
};
const chemResult = generateApprovalChecklist(chemProfile);
const chemPeso = chemResult.approvals.find((a) => a.id === 'peso-storage-license');
const chemCte = chemResult.approvals.find((a) => a.id === 'mpcb-cte');
assert(chemPeso !== undefined, 'Chemical category requires PESO Storage License');
assert(chemCte !== undefined, 'Chemical category requires MPCB CTE');

// Test Case 5: Textile Unit with Steam Boilers
console.log('\nTEST CASE 5: Textile Unit');
const textileProfile: UserProfileInput = {
  category: 'textile',
  location: 'midc',
  scale: 'small',
  investmentInLakhs: 180,
  stage: 'new_unit'
};
const textileResult = generateApprovalChecklist(textileProfile);
const boilerApproval = textileResult.approvals.find((a) => a.id === 'boiler-registration');
assert(boilerApproval !== undefined, 'Textile Unit includes Boiler Registration approval option');
assert(boilerApproval?.mandatory_or_conditional === 'Conditional', 'Boiler Registration is correctly marked Conditional');

console.log(`\n====================================================`);
console.log(`Verification Complete: ${passedTests}/${totalTests} tests passed.`);
console.log(`====================================================\n`);

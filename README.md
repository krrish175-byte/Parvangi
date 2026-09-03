# PARVANGI (परवानगी)
### SIH26130 · Government of Maharashtra / Maharashtra State Innovation Society
**"Know what you need, before you need it."**

---

## The Real Regulatory Gap

Maharashtra's flagship system, **MAITRI 2.0** (maitri.maharashtra.gov.in, relaunched in February 2025 consolidating 119 services across 15 departments), primarily serves **Large, Mega, and Ultra-Mega projects (₹10 crore investment and above)** with dedicated Relationship Managers.

A small, first-time entrepreneur opening a food-processing unit, fabrication workshop, or textile unit with savings of ₹10–₹50 Lakhs is not the user MAITRI was built for. 

> *"Anyone can ask ChatGPT what license they need and get a plausible-sounding, unverified answer. Parvangi's checklist comes from a structured regulatory database — verifiable, not guessed. And unlike MAITRI, it's built for the ₹10-lakh entrepreneur, not just the ₹10-crore one."*

---

## Key Features

1. **Official Maharashtra Government Design Language**:
   - Modeled strictly after **IRCTC (irctc.co.in)** and **Passport Seva (passportseva.gov.in)**.
   - Accessibility bar with `A-` / `A` / `A+` text resizing and English / मराठी toggle.
   - Institutional Navy Blue (`#002244` / `#0b3866`) with Saffron/Orange (`#e65100`) CTAs and badges.
   - Zero playful SaaS/startup tropes: dense, formal, official information hierarchy.

2. **4-Step Intuitive Input Wizard**:
   - **Step 1: Business Category** (Food Processing, Small Manufacturing, Textile, Chemical, IT/Services).
   - **Step 2: Location Jurisdiction** (MIDC Industrial Estate, Municipal Corporation, Rural/Gram Panchayat).
   - **Step 3: Enterprise Scale & MSME Sizing** (Interactive investment calculator & presets with eligible Maharashtra PSI subsidies).
   - **Step 4: Business Stage** (New Greenfield Unit, Expansion/Modernization, Formalization).

3. **Topological Rules Engine (Kahn's Algorithm)**:
   - Evaluates a flat, version-controllable dataset (`data/regulatory-approvals.json`).
   - Dynamically resolves prerequisite dependencies (e.g. MPCB CTE precedes DISH Factory License; Provisional Fire NOC precedes Building Plan & Final NOC).
   - Groups clearances into 4 structured phases from legal identity to operational utility energization.

4. **Official Print & PDF Export**:
   - Custom `@media print` stylesheet formatted as an official **Government of Maharashtra Clearance Schedule Letterhead** with reference number and legal verification statement.

---

## Getting Started

### Prerequisites
- Node.js 18+ or 20+ (tested on Node v22)
- npm 9+

### Installation
```bash
# Install dependencies
npm install
```

### Run Verification Test Suite
```bash
# Run rules engine unit tests
npx tsx scripts/verify-rules-engine.ts
```

### Run Locally
```bash
# Start local development server
npm run dev
# App will be accessible at http://localhost:3000
```

### Production Build
```bash
# Build with Turbopack
npm run build
# Start production server
npm run start
```

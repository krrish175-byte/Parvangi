# PARVANGI (परवानगी)
### Statutory Approval Clearance & Compliance Framework · Government of Maharashtra
**Directorate of Industries & Maharashtra State Innovation Society (MSIS)**

---

## Overview

Entrepreneurs setting up industrial units in Maharashtra require multiple registrations, licenses, NOCs, and inspections from various authorities. **PARVANGI (परवानगी)** provides a unified, deterministic statutory clearance engine and compliance tracking workflow for Micro, Small, and Medium Enterprises (MSMEs).

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

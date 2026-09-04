'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import {
  Zap,
  X,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ShieldCheck,
  Building,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';

interface WhatIfSimulatorModalProps {
  onClose: () => void;
}

export default function WhatIfSimulatorModal({ onClose }: WhatIfSimulatorModalProps) {
  const { language } = useApp();

  // Baseline values
  const [baselineWorkers] = useState<number>(5);
  const [baselineInvestment] = useState<number>(15); // ₹15 Lakhs
  const [baselinePower] = useState<number>(0); // 0 HP

  // Simulated (Dynamic) values
  const [simWorkers, setSimWorkers] = useState<number>(25);
  const [simInvestment, setSimInvestment] = useState<number>(60); // ₹60 Lakhs
  const [simPower, setSimPower] = useState<number>(25); // 25 HP
  const [location, setLocation] = useState<string>('midc');
  const [sector, setSector] = useState<string>('manufacturing');

  // Logic Engine to calculate compliance requirements for a given configuration
  const calculateRequirements = (workers: number, investmentLakhs: number, powerHp: number) => {
    const list: { id: string; name: string; dept: string; desc: string; category: 'ESI' | 'EPF' | 'DISH' | 'MPCB' | 'TAX' | 'UTIL' }[] = [];

    // 1. Basic MSME & GST (Always applies)
    list.push({
      id: 'udyam',
      name: language === 'mr' ? 'उद्यम नोंदणी प्रमाणपत्रा (Udyam Registration)' : 'Udyam MSME Registration',
      dept: 'Ministry of MSME, Govt of India',
      desc: 'Mandatory MSME legal identity for all businesses',
      category: 'TAX'
    });

    list.push({
      id: 'gst',
      name: language === 'mr' ? 'जीएसटी नोंदणी (GST Registration)' : 'GST Registration Certificate',
      dept: 'Goods & Services Tax Department',
      desc: 'Statutory tax registration for turnover / intra-state supply',
      category: 'TAX'
    });

    // 2. ESI Act (10+ workers)
    if (workers >= 10) {
      list.push({
        id: 'esi',
        name: language === 'mr' ? 'ईएसआय नोंदणी (ESI Employee Insurance)' : 'ESI Registration Certificate (Employees State Insurance)',
        dept: 'ESIC Corporation, Govt of India',
        desc: 'Mandatory statutory health insurance triggered at 10+ employees',
        category: 'ESI'
      });
    }

    // 3. EPF Act (20+ workers)
    if (workers >= 20) {
      list.push({
        id: 'epf',
        name: language === 'mr' ? 'ईपीएफ नोंदणी (EPF Provident Fund)' : 'EPF Registration (Employees Provident Fund)',
        dept: 'EPFO, Ministry of Labour & Employment',
        desc: 'Mandatory retirement provident fund triggered at 20+ employees',
        category: 'EPF'
      });
    }

    // 4. DISH Factory License (10+ with power OR 20+ without power)
    const needsFactoryLic = (workers >= 10 && powerHp > 0) || workers >= 20;
    if (needsFactoryLic) {
      list.push({
        id: 'factory_lic',
        name: language === 'mr' ? 'कारखाना परवाना (DISH Factory License)' : 'DISH Factory Registration & License',
        dept: 'Directorate of Industrial Safety & Health (DISH)',
        desc: 'Triggered by Section 2m(m)(i) of Factories Act 1948 based on worker count & power load',
        category: 'DISH'
      });
    }

    // 5. MPCB Pollution Category (Green vs Orange vs White)
    if (sector === 'chemical' || powerHp > 50 || investmentLakhs > 200) {
      list.push({
        id: 'mpcb_orange',
        name: language === 'mr' ? 'MPCB ऑरेंज श्रेणी संमती (Orange Consent)' : 'MPCB Orange Category Consent to Establish',
        dept: 'Maharashtra Pollution Control Board',
        desc: 'Higher pollution risk category requiring detailed effluent plan',
        category: 'MPCB'
      });
    } else if (powerHp > 0 || investmentLakhs > 25) {
      list.push({
        id: 'mpcb_green',
        name: language === 'mr' ? 'MPCB ग्रीन श्रेणी संमती (Green Consent)' : 'MPCB Green Category Consent to Establish',
        dept: 'Maharashtra Pollution Control Board',
        desc: 'Standard green category pollution clearance for light manufacturing',
        category: 'MPCB'
      });
    }

    // 6. MSEDCL HT Connection (if power > 50 HP)
    if (powerHp >= 50) {
      list.push({
        id: 'msedcl_ht',
        name: language === 'mr' ? 'MSEDCL उच्च दाब वीज जोडणी (HT Connection)' : 'MSEDCL High Tension (HT) Power Connection',
        dept: 'MSEDCL (महावितरण)',
        desc: 'Industrial high-tension transformer clearance for heavy power load',
        category: 'UTIL'
      });
    }

    return list;
  };

  const baselineReqs = calculateRequirements(baselineWorkers, baselineInvestment, baselinePower);
  const simulatedReqs = calculateRequirements(simWorkers, simInvestment, simPower);

  const baselineIds = new Set(baselineReqs.map((r) => r.id));
  const simulatedIds = new Set(simulatedReqs.map((r) => r.id));

  // Diff Calculations
  const addedReqs = simulatedReqs.filter((r) => !baselineIds.has(r.id));
  const removedReqs = baselineReqs.filter((r) => !simulatedIds.has(r.id));
  const retainedReqs = simulatedReqs.filter((r) => baselineIds.has(r.id));

  const hasImpact = addedReqs.length > 0 || removedReqs.length > 0;

  return (
    <div
      className="no-print"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 15, 30, 0.82)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        className="gov-card"
        style={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          borderTop: '5px solid var(--gov-saffron)',
          padding: '0'
        }}
      >
        {/* MODAL HEADER */}
        <div
          style={{
            backgroundColor: '#002244',
            color: '#ffffff',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #1e3a5f'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px 12px', backgroundColor: 'var(--gov-saffron)', borderRadius: '6px', color: '#000', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={18} fill="#000" />
              <span>WHAT-IF ENGINE</span>
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                {language === 'mr' ? 'कायदेशीर प्रभाव आणि सिम्युलेटर इंजिन' : 'What-If & Compliance Impact Engine'}
              </h2>
              <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0, marginTop: '2px' }}>
                Simulate parameter changes (workers, investment, power) and predict instant statutory compliance diffs & growth scale milestones.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div style={{ padding: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            
            {/* LEFT COLUMN: INTERACTIVE CONTROLS */}
            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={18} color="var(--gov-saffron)" />
                <span>{language === 'mr' ? 'उद्योगाचे गुणधर्म बदला (Simulate Business Parameters)' : 'Simulate Business Parameter Changes'}</span>
              </h3>

              {/* CONTROL 1: WORKERS COUNT */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                    👥 {language === 'mr' ? 'कामगारांची संख्या (Employees):' : '1. Number of Employees / Workers:'}
                  </label>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gov-saffron)', backgroundColor: '#fff', padding: '2px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    {simWorkers} Workers
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={simWorkers}
                  onChange={(e) => setSimWorkers(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gov-saffron)', cursor: 'pointer' }}
                />
                
                {/* Preset Worker Buttons */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  {[5, 12, 22, 55, 95].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSimWorkers(w)}
                      style={{
                        flex: 1,
                        padding: '4px 6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: simWorkers === w ? 'var(--gov-navy)' : '#ffffff',
                        color: simWorkers === w ? '#ffffff' : 'var(--gov-navy)',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {w} Workers
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTROL 2: INVESTMENT / TURNOVER */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                    💰 {language === 'mr' ? 'भांडवली गुंतवणूक (Investment):' : '2. Capital Investment (Plant & Machinery):'}
                  </label>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a', backgroundColor: '#fff', padding: '2px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    ₹{simInvestment} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={simInvestment}
                  onChange={(e) => setSimInvestment(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#16a34a', cursor: 'pointer' }}
                />
              </div>

              {/* CONTROL 3: POWER LOAD (HP) */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                    ⚡ {language === 'mr' ? 'वीज भार (Power Load):' : '3. Electric Power Load (HP):'}
                  </label>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#3b82f6', backgroundColor: '#fff', padding: '2px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    {simPower} HP
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="5"
                  value={simPower}
                  onChange={(e) => setSimPower(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer' }}
                />
              </div>

              {/* CONTROL 4: SECTOR */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  🏭 {language === 'mr' ? 'उद्योग क्षेत्र (Sector):' : '4. Business Sector Type:'}
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '4px', border: '1px solid #cbd5e1', fontWeight: 600 }}
                >
                  <option value="manufacturing">General Manufacturing & Workshop</option>
                  <option value="food">Food Processing & Agro Unit</option>
                  <option value="chemical">Chemical / Plastic / Dye Processing</option>
                  <option value="textile">Textile & Garment Industry</option>
                </select>
              </div>

            </div>

            {/* RIGHT COLUMN: DYNAMIC COMPLIANCE IMPACT RESULTS */}
            <div>
              
              {/* IMPACT NOTIFICATION BANNER */}
              <div
                style={{
                  backgroundColor: hasImpact ? '#fff7ed' : '#f0fdf4',
                  border: `1.5px solid ${hasImpact ? '#f97316' : '#22c55e'}`,
                  borderRadius: '8px',
                  padding: '14px 18px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                {hasImpact ? (
                  <AlertTriangle size={26} color="#f97316" style={{ flexShrink: 0 }} />
                ) : (
                  <CheckCircle2 size={26} color="#22c55e" style={{ flexShrink: 0 }} />
                )}
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: hasImpact ? '#c2410c' : '#15803d', margin: 0 }}>
                    {hasImpact ? '⚠️ COMPLIANCE IMPACT DETECTED' : '✅ NO THRESHOLD IMPACT DETECTED'}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#475569', margin: 0, marginTop: '2px' }}>
                    {hasImpact
                      ? `Changing parameter (Workers: ${baselineWorkers} → ${simWorkers}) triggered ${addedReqs.length} new statutory clearances and removed ${removedReqs.length}.`
                      : 'Current simulated configuration maintains baseline compliance requirement list.'}
                  </p>
                </div>
              </div>

              {/* 🟢 NEWLY REQUIRED CLEARANCES (ADDED) */}
              {addedReqs.length > 0 && (
                <div style={{ marginBottom: '18px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#15803d', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <CheckCircle2 size={16} color="#15803d" />
                    <span>NEW STATUTORY CLEARANCES TRIGGERED (+{addedReqs.length}):</span>
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {addedReqs.map((req) => (
                      <div
                        key={req.id}
                        style={{
                          backgroundColor: '#f0fdf4',
                          border: '1.5px solid #86efac',
                          borderRadius: '6px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '13px', color: '#14532d', display: 'block' }}>{req.name}</strong>
                          <span style={{ fontSize: '11px', color: '#166534' }}>🏢 {req.dept} • {req.desc}</span>
                        </div>
                        <span style={{ backgroundColor: '#22c55e', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>
                          + NEWLY TRIGGERED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 🔴 NO LONGER NEEDED CLEARANCES (REMOVED) */}
              {removedReqs.length > 0 && (
                <div style={{ marginBottom: '18px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <XCircle size={16} color="#b91c1c" />
                    <span>CLEARANCES NO LONGER REQUIRED (-{removedReqs.length}):</span>
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {removedReqs.map((req) => (
                      <div
                        key={req.id}
                        style={{
                          backgroundColor: '#fef2f2',
                          border: '1.5px solid #fca5a5',
                          borderRadius: '6px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '13px', color: '#7f1d1d', display: 'block', textDecoration: 'line-through' }}>{req.name}</strong>
                          <span style={{ fontSize: '11px', color: '#991b1b' }}>🏢 {req.dept}</span>
                        </div>
                        <span style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>
                          - EXEMPTED / REMOVED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 🔵 RETAINED UNCHANGED CLEARANCES */}
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--gov-navy)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <ShieldCheck size={16} color="var(--gov-navy)" />
                  <span>STILL APPLIES / RETAINED CLEARANCES ({retainedReqs.length}):</span>
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {retainedReqs.map((req) => (
                    <div
                      key={req.id}
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '12.5px',
                        color: 'var(--gov-navy-dark)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span>✔️ {req.name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--gov-text-muted)' }}>{req.dept}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* 📈 FUTURE SCALING MILESTONE ROADMAP (HACKATHON PRESENTATION HIGHLIGHT) */}
          <div style={{ marginTop: '28px', backgroundColor: '#001a35', borderRadius: '8px', padding: '20px', color: '#ffffff' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffb74d', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#ffb74d" />
              <span>📈 Future Scaling Regulatory Milestones (Employee Threshold Map)</span>
            </h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>
              Predictive roadmap of exact statutory triggers as your Maharashtra business hires more workforce.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              
              {/* STEP 1: <10 Workers */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '12px', borderLeft: '4px solid #10b981' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>1 – 9 Employees</div>
                <strong style={{ fontSize: '13px', display: 'block', color: '#fff', margin: '4px 0' }}>Micro Stage Setup</strong>
                <ul style={{ fontSize: '11px', color: '#cbd5e1', paddingLeft: '14px', margin: 0 }}>
                  <li>Udyam Registration</li>
                  <li>Shops & Establishment</li>
                  <li>MPCB Consent / White</li>
                </ul>
              </div>

              {/* STEP 2: 10 Workers (ESI & DISH) */}
              <div style={{ backgroundColor: simWorkers >= 10 ? 'rgba(255, 153, 51, 0.15)' : 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '12px', borderLeft: `4px solid ${simWorkers >= 10 ? 'var(--gov-saffron)' : '#64748b'}` }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: simWorkers >= 10 ? '#ffb74d' : '#94a3b8', textTransform: 'uppercase' }}>10 Employees (Trigger 1)</div>
                <strong style={{ fontSize: '13px', display: 'block', color: '#fff', margin: '4px 0' }}>ESI & Factory Safety</strong>
                <ul style={{ fontSize: '11px', color: '#cbd5e1', paddingLeft: '14px', margin: 0 }}>
                  <li><strong>ESI Act Registration</strong></li>
                  <li>DISH Factory Lic (with power)</li>
                  <li>Safety Officer (High Risk)</li>
                </ul>
              </div>

              {/* STEP 3: 20 Workers (EPF) */}
              <div style={{ backgroundColor: simWorkers >= 20 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '12px', borderLeft: `4px solid ${simWorkers >= 20 ? '#3b82f6' : '#64748b'}` }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: simWorkers >= 20 ? '#60a5fa' : '#94a3b8', textTransform: 'uppercase' }}>20 Employees (Trigger 2)</div>
                <strong style={{ fontSize: '13px', display: 'block', color: '#fff', margin: '4px 0' }}>EPF Provident Fund</strong>
                <ul style={{ fontSize: '11px', color: '#cbd5e1', paddingLeft: '14px', margin: 0 }}>
                  <li><strong>EPF Act Registration</strong></li>
                  <li>DISH Factory Lic (w/o power)</li>
                  <li>Contract Labour Registration</li>
                </ul>
              </div>

              {/* STEP 4: 50+ Workers */}
              <div style={{ backgroundColor: simWorkers >= 50 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '12px', borderLeft: `4px solid ${simWorkers >= 50 ? '#ec4899' : '#64748b'}` }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: simWorkers >= 50 ? '#f472b6' : '#94a3b8', textTransform: 'uppercase' }}>50+ Employees (Trigger 3)</div>
                <strong style={{ fontSize: '13px', display: 'block', color: '#fff', margin: '4px 0' }}>Full Labour Audits</strong>
                <ul style={{ fontSize: '11px', color: '#cbd5e1', paddingLeft: '14px', margin: 0 }}>
                  <li>Standing Orders Act</li>
                  <li>Full Safety Audit Report</li>
                  <li>Canteen & Crèche Mandate</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

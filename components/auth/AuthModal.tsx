'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { loginCitizen, signupCitizen, loginAdmin, DEMO_USERS, ADMIN_CREDENTIALS } from '@/lib/auth-store';

interface AuthModalProps {
  initialTab?: 'citizen_login' | 'citizen_signup' | 'admin_login';
  onClose: () => void;
  onSuccess: (type: 'citizen' | 'admin') => void;
}

export default function AuthModal({ initialTab = 'citizen_login', onClose, onSuccess }: AuthModalProps) {
  const { language } = useApp();
  const [tab, setTab] = useState<'citizen_login' | 'citizen_signup' | 'admin_login'>(initialTab);

  // Citizen Login State
  const [loginQuery, setLoginQuery] = useState('');
  const [loginError, setLoginError] = useState('');

  // Citizen Signup State - STRICTLY name, age, phone, email only!
  const [signupName, setSignupName] = useState('');
  const [signupAge, setSignupAge] = useState<number | ''>('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupError, setSignupError] = useState('');

  // Admin Login State
  const [adminUserId, setAdminUserId] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('admin');
  const [adminError, setAdminError] = useState('');

  // Handle Citizen Login
  const handleCitizenLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = loginCitizen(loginQuery);
    if (res.success) {
      onSuccess('citizen');
      onClose();
    } else {
      setLoginError(res.error || 'Login failed');
    }
  };

  // Quick Demo Citizen Login
  const handleQuickCitizenDemo = (phone: string) => {
    const res = loginCitizen(phone);
    if (res.success) {
      onSuccess('citizen');
      onClose();
    }
  };

  // Handle Citizen Signup
  const handleCitizenSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName.trim()) {
      setSignupError(language === 'mr' ? 'नाव प्रविष्ट करणे आवश्यक आहे.' : 'Full name is required.');
      return;
    }
    if (!signupAge || Number(signupAge) < 18 || Number(signupAge) > 100) {
      setSignupError(language === 'mr' ? 'वय १८ वर्षे किंवा त्याहून अधिक असावे.' : 'Age must be 18 or older.');
      return;
    }
    if (!signupPhone.trim() || signupPhone.trim().length < 10) {
      setSignupError(language === 'mr' ? '१० अंकी वैध मोबाईल क्रमांक आवश्यक आहे.' : 'Valid 10-digit mobile number is required.');
      return;
    }

    const res = signupCitizen({
      name: signupName,
      age: Number(signupAge),
      phone: signupPhone,
      email: signupEmail
    });

    if (res.success) {
      onSuccess('citizen');
      onClose();
    } else {
      setSignupError(res.error || 'Registration failed');
    }
  };

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    const res = loginAdmin(adminUserId, adminPassword);
    if (res.success) {
      onSuccess('admin');
      onClose();
    } else {
      setAdminError(res.error || 'Invalid officer credentials');
    }
  };

  // Quick Admin Demo Login
  const handleQuickAdminDemo = () => {
    const res = loginAdmin(ADMIN_CREDENTIALS.userId, ADMIN_CREDENTIALS.password);
    if (res.success) {
      onSuccess('admin');
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 34, 68, 0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '520px',
          borderRadius: '4px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          border: '1.5px solid var(--gov-navy)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip with Maharashtra Emblem and Tricolor Accent */}
        <div
          style={{
            backgroundColor: 'var(--gov-navy)',
            color: '#ffffff',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '3px solid var(--gov-saffron)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.3px' }}>
                PARVANGI · परवानगी
              </div>
              <div style={{ fontSize: '11px', color: '#ffb74d' }}>
                {language === 'mr'
                  ? 'महाराष्ट्र शासन · एकल खिडकी पडताळणी कक्ष'
                  : 'Single Window Verification & Scrutiny Portal'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 700
            }}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            borderBottom: '1px solid #cbd5e1'
          }}
        >
          <button
            type="button"
            onClick={() => setTab('citizen_login')}
            style={{
              flex: 1,
              padding: '11px 8px',
              fontSize: '12.5px',
              fontWeight: tab === 'citizen_login' ? 700 : 500,
              backgroundColor: tab === 'citizen_login' ? '#ffffff' : '#f1f5f9',
              color: tab === 'citizen_login' ? 'var(--gov-navy)' : 'var(--gov-text-secondary)',
              border: 'none',
              borderBottom: tab === 'citizen_login' ? '3px solid var(--gov-navy)' : 'none',
              cursor: 'pointer'
            }}
          >
            {language === 'mr' ? 'नागरिक प्रवेश' : 'Citizen Login'}
          </button>

          <button
            type="button"
            onClick={() => setTab('citizen_signup')}
            style={{
              flex: 1,
              padding: '11px 8px',
              fontSize: '12.5px',
              fontWeight: tab === 'citizen_signup' ? 700 : 500,
              backgroundColor: tab === 'citizen_signup' ? '#ffffff' : '#f1f5f9',
              color: tab === 'citizen_signup' ? 'var(--gov-navy)' : 'var(--gov-text-secondary)',
              border: 'none',
              borderBottom: tab === 'citizen_signup' ? '3px solid var(--gov-navy)' : 'none',
              cursor: 'pointer'
            }}
          >
            {language === 'mr' ? 'नवीन नोंदणी' : 'New Registration'}
          </button>

          <button
            type="button"
            onClick={() => setTab('admin_login')}
            style={{
              flex: 1,
              padding: '11px 8px',
              fontSize: '12.5px',
              fontWeight: tab === 'admin_login' ? 700 : 500,
              backgroundColor: tab === 'admin_login' ? '#ffffff' : '#f1f5f9',
              color: tab === 'admin_login' ? '#991b1b' : 'var(--gov-text-secondary)',
              border: 'none',
              borderBottom: tab === 'admin_login' ? '3px solid #991b1b' : 'none',
              cursor: 'pointer'
            }}
          >
            {language === 'mr' ? 'अधिकारी प्रवेश' : 'Officer Login'}
          </button>
        </div>

        {/* Tab 1: Citizen Login */}
        {tab === 'citizen_login' && (
          <div style={{ padding: '20px 24px' }}>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                {language === 'mr' ? 'आपला मोबाईल क्रमांक किंवा नाव प्रविष्ट करा' : 'Enter your Registered Mobile or Name'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)', marginTop: '2px' }}>
                {language === 'mr'
                  ? 'कोणत्याही पासवर्डची आवश्यकता नाही; सरळ व जलद प्रवेश.'
                  : 'No password required; direct, seamless citizen login.'}
              </div>
            </div>

            {loginError && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #f87171',
                  color: '#991b1b',
                  fontSize: '12px',
                  padding: '8px 12px',
                  borderRadius: '3px',
                  marginBottom: '14px'
                }}
              >
                {loginError}
              </div>
            )}

            <form onSubmit={handleCitizenLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="citizen-login-query"
                  style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}
                >
                  {language === 'mr' ? 'मोबाईल क्रमांक / नाव' : 'Mobile Number or Full Name'}
                </label>
                <input
                  id="citizen-login-query"
                  type="text"
                  value={loginQuery}
                  onChange={(e) => setLoginQuery(e.target.value)}
                  placeholder="e.g. 9822012345 or Ramesh Patil"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    fontSize: '13.5px',
                    border: '1px solid #94a3b8',
                    borderRadius: '3px'
                  }}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="btn-gov-primary"
                style={{ width: '100%', padding: '10px', fontSize: '13.5px', fontWeight: 700 }}
              >
                {language === 'mr' ? 'प्रवेश करा (Login)' : 'Sign In as Citizen →'}
              </button>
            </form>

            {/* Quick Demo Citizen Accounts */}
            <div
              style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#f8fafc',
                border: '1px dashed #cbd5e1',
                borderRadius: '4px'
              }}
            >
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
                {language === 'mr' ? 'चाचणी खाती (१-क्लिक डेमो):' : 'Evaluation Accounts (1-Click Demo):'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleQuickCitizenDemo(user.phone)}
                    style={{
                      textAlign: 'left',
                      padding: '6px 10px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '3px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>
                      <strong>{user.name}</strong> ({user.phone})
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--gov-navy)', fontWeight: 600 }}>Login →</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => setTab('citizen_signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gov-navy)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {language === 'mr' ? 'नवीन आहात? येथे नोंदणी करा' : "First time? Register here in 10 seconds"}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Citizen Signup - Strictly Name, Age, Phone, Email ONLY */}
        {tab === 'citizen_signup' && (
          <div style={{ padding: '20px 24px' }}>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                {language === 'mr' ? 'नागरिक नोंदणी (फक्त मूलभूत माहिती)' : 'Citizen Registration (Basic Details Only)'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--gov-text-muted)', marginTop: '2px' }}>
                {language === 'mr'
                  ? 'कोणताही पासवर्ड किंवा क्लिष्ट माहिती नाही; फक्त नाव, वय, फोन व ईमेल.'
                  : 'No passwords or company filings required; instant simple onboarding.'}
              </div>
            </div>

            {signupError && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #f87171',
                  color: '#991b1b',
                  fontSize: '12px',
                  padding: '8px 12px',
                  borderRadius: '3px',
                  marginBottom: '14px'
                }}
              >
                {signupError}
              </div>
            )}

            <form onSubmit={handleCitizenSignup}>
              {/* Full Name */}
              <div style={{ marginBottom: '12px' }}>
                <label
                  htmlFor="signup-name"
                  style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                >
                  {language === 'mr' ? 'पूर्ण नाव *' : 'Applicant Full Name *'}
                </label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  placeholder="e.g. Vikram Anil Sawant"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #94a3b8',
                    borderRadius: '3px'
                  }}
                />
              </div>

              {/* Age and Phone in 2 columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label
                    htmlFor="signup-age"
                    style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                  >
                    {language === 'mr' ? 'वय *' : 'Age *'}
                  </label>
                  <input
                    id="signup-age"
                    type="number"
                    min="18"
                    max="100"
                    required
                    placeholder="30"
                    value={signupAge}
                    onChange={(e) => setSignupAge(e.target.value === '' ? '' : Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '13px',
                      border: '1px solid #94a3b8',
                      borderRadius: '3px'
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="signup-phone"
                    style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                  >
                    {language === 'mr' ? 'मोबाईल क्रमांक *' : 'Mobile Number (10 digits) *'}
                  </label>
                  <div style={{ display: 'flex' }}>
                    <span
                      style={{
                        padding: '8px 10px',
                        backgroundColor: '#f1f5f9',
                        border: '1px solid #94a3b8',
                        borderRight: 'none',
                        borderRadius: '3px 0 0 3px',
                        fontSize: '13px',
                        color: '#64748b'
                      }}
                    >
                      +91
                    </span>
                    <input
                      id="signup-phone"
                      type="tel"
                      maxLength={10}
                      required
                      placeholder="98XXXXXXXX"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, ''))}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '13px',
                        border: '1px solid #94a3b8',
                        borderRadius: '0 3px 3px 0'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="signup-email"
                  style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                >
                  {language === 'mr' ? 'ईमेल पत्ता (ऐच्छिक)' : 'Email Address (Optional)'}
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="vikram.sawant@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #94a3b8',
                    borderRadius: '3px'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-gov-primary"
                style={{ width: '100%', padding: '10px', fontSize: '13.5px', fontWeight: 700 }}
              >
                {language === 'mr' ? 'नोंदणी करा व पुढे जा →' : 'Complete Registration & Sign In →'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '14px' }}>
              <button
                type="button"
                onClick={() => setTab('citizen_login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gov-navy)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {language === 'mr' ? 'आधीच नोंदणी केली आहे? लॉगिन करा' : 'Already registered? Sign in here'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Admin / Officer Login */}
        {tab === 'admin_login' && (
          <div style={{ padding: '20px 24px' }}>
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '3px',
                padding: '10px 14px',
                marginBottom: '16px'
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#991b1b' }}>
                {language === 'mr' ? 'विभागीय अधिकारी / जिल्हा उद्योग केंद्र (DIC) लॉगिन' : 'Department Officer / DIC Scrutiny Access'}
              </div>
              <div style={{ fontSize: '11px', color: '#7f1d1d', marginTop: '2px' }}>
                {language === 'mr'
                  ? 'केवळ अधिकृत उद्योग संचालनालय व शासकीय नोडल अधिकाऱ्यांसाठी.'
                  : 'Reserved for Directorate of Industries, DIC General Managers, and clearance scrutiny officers.'}
              </div>
            </div>

            {adminError && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #f87171',
                  color: '#991b1b',
                  fontSize: '12px',
                  padding: '8px 12px',
                  borderRadius: '3px',
                  marginBottom: '14px'
                }}
              >
                {adminError}
              </div>
            )}

            <form onSubmit={handleAdminLogin}>
              <div style={{ marginBottom: '12px' }}>
                <label
                  htmlFor="admin-user-id"
                  style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                >
                  {language === 'mr' ? 'अधिकारी वापरकर्ता आयडी (User ID)' : 'Officer User ID'}
                </label>
                <input
                  id="admin-user-id"
                  type="text"
                  required
                  value={adminUserId}
                  onChange={(e) => setAdminUserId(e.target.value)}
                  placeholder="e.g. admin"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #94a3b8',
                    borderRadius: '3px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="admin-password"
                  style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                >
                  {language === 'mr' ? 'पासवर्ड (Password)' : 'Officer Password'}
                </label>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="e.g. admin"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #94a3b8',
                    borderRadius: '3px'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  backgroundColor: '#991b1b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                {language === 'mr' ? 'अधिकारी कक्षात प्रवेश करा →' : 'Access Officer Scrutiny Console →'}
              </button>
            </form>

            {/* Quick Officer Demo Login */}
            <div
              style={{
                marginTop: '16px',
                padding: '10px 14px',
                backgroundColor: '#fffbeb',
                border: '1px dashed #fde68a',
                borderRadius: '3px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '11.5px', color: '#92400e', marginBottom: '6px' }}>
                Default Credentials: <code>admin</code> / <code>admin</code>
              </div>
              <button
                type="button"
                onClick={handleQuickAdminDemo}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#fef3c7',
                  border: '1px solid #d97706',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#b45309',
                  cursor: 'pointer'
                }}
              >
                1-Click Officer Demo Login
              </button>
            </div>
          </div>
        )}

        {/* Public Guest Option */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {language === 'mr'
              ? 'सार्वजनिक अतिथी म्हणून पोर्टलवर सुरू ठेवा →'
              : 'Continue as Public Visitor / Guest →'}
          </button>
        </div>
      </div>
    </div>
  );
}

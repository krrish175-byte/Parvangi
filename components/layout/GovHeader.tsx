'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/context';
import { ALL_APPROVALS } from '@/lib/rules-engine';
import categories from '@/data/categories.json';

interface GovHeaderProps {
  onHomeClick?: () => void;
  onSearchSelect?: () => void;
}

export default function GovHeader({ onHomeClick, onSearchSelect }: GovHeaderProps) {
  const { language } = useApp();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const normalizedQuery = debouncedQuery.toLowerCase();
  const approvalResults = normalizedQuery
    ? ALL_APPROVALS.filter((approval) =>
        [approval.name, approval.marathi_name, approval.department, approval.issuing_authority, approval.act_and_rule, approval.one_line_description]
          .some((value) => value.toLowerCase().includes(normalizedQuery))
      ).slice(0, 5)
    : [];
  const categoryResults = normalizedQuery
    ? categories.filter((category) =>
        [category.name, category.marathi_name, category.description, category.examples].some((value) => value.toLowerCase().includes(normalizedQuery))
      ).slice(0, 3)
    : [];
  const hasSearchResults = approvalResults.length > 0 || categoryResults.length > 0;

  return (
    <header className="gov-header">
      <div className="gov-container">
        <div className="gov-header-inner">
          <div
            className="gov-brand"
            style={{ cursor: 'pointer' }}
            onClick={onHomeClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onHomeClick?.()}
          >
            <div className="gov-emblem-container">
              {/* National Emblem of India */}
              <div className="gov-national-emblem" title="भारत सरकारचे राजचिन्ह / State Emblem of India">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                  alt="State Emblem of India"
                  width={34}
                  height={44}
                  priority
                />
              </div>

              <div className="gov-emblem-divider" aria-hidden="true" />

              {/* Official PARVANGI Project Logo */}
              <div className="gov-project-logo" title="PARVANGI (परवानगी) — अधिकृत बोधचिन्ह">
                <Image
                  src="/logo.png"
                  alt="PARVANGI Official Project Logo"
                  width={54}
                  height={54}
                  priority
                />
              </div>
            </div>

            <div className="gov-title-block">
              <span className="gov-title-marathi">
                महाराष्ट्र शासन · उद्योग, ऊर्जा, कामगार व कौशल्य विकास विभाग
              </span>
              <div className="gov-wordmark">
                <span>PARVANGI</span>
                <span className="gov-wordmark-devanagari">परवानगी</span>
              </div>
              <span className="gov-subtitle">
                {language === 'mr'
                  ? 'महाराष्ट्र राज्य नाविन्यता सोसायटी · सूक्ष्म व लघु उद्योगांसाठी वैधानिक परवानगी प्रणाली'
                  : 'Maharashtra State Innovation Society (MSIS) · Statutory Approval Checklist Engine'}
              </span>
            </div>
          </div>

          <div className="gov-header-actions no-print">
            <div className="header-search-wrap">
              <label htmlFor="global-search" className="sr-only">{language === 'mr' ? 'संपूर्ण पोर्टल शोधा' : 'Search the portal'}</label>
              <input
                id="global-search"
                className="header-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={language === 'mr' ? 'परवानगी, विभाग किंवा योजना शोधा...' : 'Search approvals, departments or schemes...'}
                autoComplete="off"
              />
              {debouncedQuery && (
                <div className="header-search-results" role="listbox">
                  {approvalResults.map((approval) => (
                    <button key={approval.id} type="button" onClick={() => { onSearchSelect?.(); setQuery(''); }}>
                      <strong>{approval.name}</strong><span>{approval.department}</span>
                    </button>
                  ))}
                  {categoryResults.map((category) => (
                    <button key={category.id} type="button" onClick={() => { onSearchSelect?.(); setQuery(''); }}>
                      <strong>{category.name}</strong><span>Business category</span>
                    </button>
                  ))}
                  {!hasSearchResults && <div className="header-search-empty">{language === 'mr' ? 'काही निकाल सापडले नाहीत.' : 'No matching results found.'}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

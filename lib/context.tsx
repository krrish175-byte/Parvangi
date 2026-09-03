'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'mr';
export type FontSize = 'small' | 'normal' | 'large';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  toggleLanguage: () => void;
}

const AppContext = createContext<AppContextType>({
  language: 'en',
  setLanguage: () => {},
  fontSize: 'normal',
  setFontSize: () => {},
  toggleLanguage: () => {}
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<FontSize>('normal');

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        fontSize,
        setFontSize,
        toggleLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

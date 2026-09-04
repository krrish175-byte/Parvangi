'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'mr' | 'hi';
export type FontSize = 'small' | 'normal' | 'large';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const AppContext = createContext<AppContextType>({
  language: 'en',
  setLanguage: () => {},
  fontSize: 'normal',
  setFontSize: () => {}
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<FontSize>('normal');

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        fontSize,
        setFontSize
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

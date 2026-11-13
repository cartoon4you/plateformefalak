'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { LangCode } from '@/types';
import { LANGUAGES, T } from '@/lib/i18n';

export type TranslationFunction = ((key: string) => string) & Record<string, string>;

interface LanguageContextType {
  lang: LangCode;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  setLanguage: (lang: LangCode) => void;
  t: TranslationFunction;
  strings: Record<string, string>;
  currentLang: (typeof LANGUAGES)[number];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'falak_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('ar');
  const [mounted, setMounted] = useState(false);

  // Synchronize document dir, lang attribute and persistence
  const applyLanguage = useCallback((newLang: LangCode) => {
    setLangState(newLang);
    const found = LANGUAGES.find((l) => l.code === newLang);
    const dir = found?.dir || (newLang === 'ar' ? 'rtl' : 'ltr');

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
        document.cookie = `${STORAGE_KEY}=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      } catch (e) {}

      document.documentElement.lang = newLang;
      document.documentElement.dir = dir;
      window.dispatchEvent(new CustomEvent('falak-lang-changed', { detail: { lang: newLang, dir } }));
    }
  }, []);

  // Initialize language on client mount
  useEffect(() => {
    setMounted(true);
    let initialLang: LangCode = 'ar';
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LangCode | null;
      if (stored && LANGUAGES.some((l) => l.code === stored)) {
        initialLang = stored;
      }
    } catch (e) {}

    applyLanguage(initialLang);

    const onExternalChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: LangCode }>;
      if (customEvent.detail?.lang) {
        setLangState((prev) => (customEvent.detail.lang !== prev ? customEvent.detail.lang : prev));
      }
    };

    window.addEventListener('falak-lang-changed', onExternalChange);
    return () => {
      window.removeEventListener('falak-lang-changed', onExternalChange);
    };
  }, [applyLanguage]);

  const setLanguage = (newLang: LangCode) => {
    if (newLang === lang) return;
    applyLanguage(newLang);
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const dir = currentLang.dir;
  const isRTL = dir === 'rtl';
  const strings = T[lang] || T.ar;

  const t = useMemo(() => {
    const fn = (key: string): string => {
      return T[lang]?.[key] || T.ar?.[key] || key;
    };
    return Object.assign(fn, strings) as TranslationFunction;
  }, [lang, strings]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir,
        isRTL,
        setLanguage,
        t,
        strings,
        currentLang,
      }}
    >
      <div dir={dir} className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback for components used outside provider or in tests
    const defaultLang = 'ar';
    const current = LANGUAGES[0];
    const fallbackFn = (key: string) => T.ar[key] || key;
    const fallbackT = Object.assign(fallbackFn, T.ar) as TranslationFunction;
    return {
      lang: defaultLang as LangCode,
      dir: 'rtl' as const,
      isRTL: true,
      setLanguage: () => {},
      t: fallbackT,
      strings: T.ar,
      currentLang: current,
    };
  }
  return context;
}

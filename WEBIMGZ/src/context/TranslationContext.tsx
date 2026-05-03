"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import translations from "@/translations/index";

type Language = "en" | "hi" | "kn";

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setLanguage] = useState<Language>("en");

  const t = (key: string): any => {
    const keys = key.split(".");
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}

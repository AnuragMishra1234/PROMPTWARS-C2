"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTab } from "@/context/TabContext";
import { useTranslation } from "@/context/TranslationContext";
import { Menu, X, Globe } from "lucide-react";

/* ✅ FIXED TYPE */
type TabItem = {
  id: string;
  label: string;
  englishOnly?: boolean;
};

/* ✅ FIXED ARRAY */
const TAB_ITEMS: TabItem[] = [
  { id: "overview", label: "nav.overview" },
  { id: "process", label: "nav.process" },
  { id: "voting", label: "nav.voting" },
  { id: "results", label: "nav.results" },
  { id: "chatbot", label: "nav.chat", englishOnly: true },
];

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
] as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const { activeTab, setActiveTab, showFlowchart, setShowFlowchart } = useTab();
  const { currentLanguage, setLanguage, t } = useTranslation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (code: string) => {
    setLanguage(code as "en" | "hi" | "kn");
    setIsLanguageMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          isScrolled
            ? "bg-[#050505]/70 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0050FF] to-[#00D6FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,80,255,0.5)]">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="text-white font-semibold tracking-tight text-lg">
              {t("nav.title")}
            </span>
          </div>

          {/* CENTER: NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1">
            {TAB_ITEMS.map((item) => {
              if (item.englishOnly && currentLanguage !== "en") return null;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all",
                    activeTab === item.id
                      ? "bg-[#0050FF] text-white shadow-[0_0_15px_rgba(0,80,255,0.4)]"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  {t(item.label)}
                </button>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* FLOWCHART BUTTON */}
            <button
              onClick={() => {
                setActiveTab("process");
                setShowFlowchart(!showFlowchart);
              }}
              className="hidden sm:block bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            >
              {t("nav.flowchart")}
            </button>

            {/* LANGUAGE SWITCH */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all"
              >
                <Globe className="w-5 h-5" />
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute top-full mt-2 right-0 bg-[#050505]/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden z-10">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        "w-full px-4 py-2 text-sm text-left flex items-center gap-2",
                        currentLanguage === lang.code
                          ? "bg-[#0050FF] text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#050505]/95 px-6 py-4">
            {TAB_ITEMS.map((item) => {
              if (item.englishOnly && currentLanguage !== "en") return null;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className="block w-full text-left px-4 py-2 text-white/70 hover:text-white"
                >
                  {t(item.label)}
                </button>
              );
            })}
          </div>
        )}
      </motion.header>

      {/* NOTICE */}
      {currentLanguage !== "en" && (
        <div className="bg-[#0050FF]/20 px-6 py-3 text-white text-sm text-center">
          {t("notice")}
        </div>
      )}
    </>
  );
}

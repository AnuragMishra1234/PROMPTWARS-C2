"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTab } from "@/context/TabContext";
import { useTranslation } from "@/context/TranslationContext";
import { Menu, X, Globe } from "lucide-react";

const TAB_ITEMS = [
  { id: "overview", label: "nav.overview" },
  { id: "process", label: "nav.process" },
  { id: "voting", label: "nav.voting" },
  { id: "results", label: "nav.results" },
  { id: "chatbot", label: "nav.chat", englishOnly: true },
] as const;

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

  const handleTabClick = (tabId: typeof TAB_ITEMS[number]["id"]) => {
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
          {/* Left: Logo/Title */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0050FF] to-[#00D6FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,80,255,0.5)]">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="text-white font-semibold tracking-tight text-lg">
              {t("nav.title")}
            </span>
          </div>

          {/* Center: Navigation Links - Desktop */}
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

          {/* Right: CTA, Language Switcher, and Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("process" as const);
                setShowFlowchart(!showFlowchart);
              }}
              className="hidden sm:block bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,214,255,0.2)]"
            >
              {t("nav.flowchart")}
            </button>

            {/* Language Switcher - Desktop */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105"
                title="Change Language"
              >
                <Globe className="w-5 h-5" />
              </button>

              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 right-0 bg-[#050505]/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden z-10"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        "w-full px-4 py-2.5 text-sm font-medium text-left transition-all flex items-center gap-2 whitespace-nowrap",
                        currentLanguage === lang.code
                          ? "bg-[#0050FF] text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-md border-b border-white/5 px-6 py-4"
          >
            <nav className="space-y-2 mb-4">
              {TAB_ITEMS.map((item) => {
                if (item.englishOnly && currentLanguage !== "en") return null;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all text-left",
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

            {/* Language Switcher - Mobile */}
            <div className="border-t border-white/10 pt-4">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Language
                </span>
                <span>
                  {LANGUAGES.find((l) => l.code === currentLanguage)?.flag}
                </span>
              </button>

              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-1"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        "w-full px-4 py-2 text-sm text-left rounded-lg flex items-center gap-2 transition-all",
                        currentLanguage === lang.code
                          ? "bg-[#0050FF] text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Chat Availability Notice - Show when not in English */}
      {currentLanguage !== "en" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-0 left-0 right-0 z-40 mt-[72px] bg-[#0050FF]/20 border-b border-[#0050FF]/50 backdrop-blur-md px-6 py-3"
        >
          <div className="container mx-auto flex items-center gap-3">
            <span className="text-[#00D6FF]">ℹ️</span>
            <p className="text-white/80 text-sm">{t("notice")}</p>
          </div>
        </motion.div>
      )}
    </>
  );
}

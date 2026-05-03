"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTab } from "@/context/TabContext";
import { useTranslation } from "@/context/TranslationContext";

const TIMELINE_STAGES = [
  {
    id: 1,
    titleKey: "overview.timeline.stage1",
    descKey: "overview.timeline.stage1Desc",
    icon: "📋",
  },
  {
    id: 2,
    titleKey: "overview.timeline.stage2",
    descKey: "overview.timeline.stage2Desc",
    icon: "🎤",
  },
  {
    id: 3,
    titleKey: "overview.timeline.stage4",
    descKey: "overview.timeline.stage4Desc",
    icon: "🗳️",
  },
  {
    id: 4,
    titleKey: "overview.timeline.stage5",
    descKey: "overview.timeline.stage5Desc",
    icon: "📊",
  },
  {
    id: 5,
    titleKey: "overview.timeline.stage6",
    descKey: "overview.timeline.stage6Desc",
    icon: "📢",
  },
  {
    id: 6,
    titleKey: "overview.timeline.stage3",
    descKey: "overview.timeline.stage3Desc",
    icon: "👔",
  },
];

export default function OverviewTab() {
  const [expandedStage, setExpandedStage] = useState<number | null>(1);
  const { selectedCountry, setSelectedCountry } = useTab();
  const { t } = useTranslation();

  const COUNTRIES = [
    { name: "USA", flag: "🇺🇸" },
    { name: "India", flag: "🇮🇳" },
    { name: "UK", flag: "🇬🇧" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t("overview.title")}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t("overview.subtitle")}
          </p>
        </div>

        {/* Country Selector */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {COUNTRIES.map((country) => (
            <button
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all text-lg",
                selectedCountry === country.name
                  ? "bg-[#0050FF] text-white shadow-[0_0_20px_rgba(0,80,255,0.5)]"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20"
              )}
            >
              {country.flag} {country.name}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t("overview.timeline.title")} - {selectedCountry}
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0050FF] via-[#00D6FF] to-transparent" />

            {/* Timeline items */}
            <div className="space-y-6">
              {TIMELINE_STAGES.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="ml-20"
                >
                  <button
                    onClick={() =>
                      setExpandedStage(expandedStage === stage.id ? null : stage.id)
                    }
                    className="w-full text-left"
                  >
                    <div className="group">
                      {/* Timeline circle and connector */}
                      <div className="absolute -left-20 top-2 w-8 h-8 rounded-full bg-[#0050FF] border-4 border-[#050505] flex items-center justify-center text-lg group-hover:scale-125 transition-transform">
                        {stage.icon}
                      </div>

                      <div
                        className={cn(
                          "p-6 rounded-2xl border transition-all backdrop-blur-xl",
                          expandedStage === stage.id
                            ? "bg-[#0050FF]/20 border-[#0050FF]/50 shadow-[0_0_20px_rgba(0,80,255,0.3)]"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                              {stage.id}: {t(stage.titleKey)}
                            </h3>
                            {expandedStage === stage.id && (
                              <p className="text-white/70 mt-2">{t(stage.descKey)}</p>
                            )}
                          </div>
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 text-white/60 transition-transform shrink-0",
                              expandedStage === stage.id ? "rotate-180" : ""
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-2xl bg-linear-to-br from-[#0050FF]/20 to-[#00D6FF]/10 border border-[#0050FF]/30 backdrop-blur-xl"
        >
          <p className="text-white text-lg">
            💡 {t("overview.subtitle")}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

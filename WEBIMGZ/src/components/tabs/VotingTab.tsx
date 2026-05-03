"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/TranslationContext";

export default function VotingTab() {
  const { t } = useTranslation();

  const HOW_TO_VOTE_SECTIONS = [
    {
      id: 1,
      titleKey: "voting.registration",
      itemsKey: "voting.registrationItems",
    },
    {
      id: 2,
      titleKey: "voting.whatToBring",
      itemsKey: "voting.whatToBringItems",
    },
    {
      id: 3,
      titleKey: "voting.howToVote",
      itemsKey: "voting.howToVoteItems",
    },
  ];

  const FAQ = t("voting.faqItems") || [];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{t("voting.title")}</h1>
          <p className="text-xl text-white/70">
            {t("voting.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* How-to-Vote Guide */}
          {HOW_TO_VOTE_SECTIONS.map((section, sectionIndex) => {
            const items = t(section.itemsKey) || [];
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <h2 className="text-xl font-bold text-white mb-4">{t(section.titleKey)}</h2>
                <ul className="space-y-3">
                  {Array.isArray(items) && items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                      className="text-white/80 text-sm leading-relaxed"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">{t("voting.faq")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FAQ.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all"
              >
                <h3 className="text-white font-semibold mb-2 text-sm">{item.q}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

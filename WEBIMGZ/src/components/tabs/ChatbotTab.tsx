"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTab } from "@/context/TabContext";
import { useTranslation } from "@/context/TranslationContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Flowchart data for each country
const COUNTRY_FLOWCHARTS = {
  USA: {
    title: "USA Election Process Flow",
    description: "Step-by-step flow of USA presidential elections",
    ascii: `
    ┌─────────────────────┐
    │  Voter Registration │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────────────┐
    │ Party Primaries & Conventions│
    └──────────┬──────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │  Campaign Season     │
    │ (8-10 weeks before)  │
    └──────────┬───────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ Election Day                │
    │ (First Tuesday in November) │
    └──────────┬─────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │   Vote Counting      │
    │  (Election Night)    │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Electoral College    │
    │  Vote (December)     │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  Results Announced   │
    │   & Inauguration     │
    └──────────────────────┘
    `
  },
  India: {
    title: "India Election Process Flow",
    description: "Multi-phase election process in India",
    ascii: `
    ┌────────────────────────────┐
    │ Election Commission        │
    │ Announces Schedule         │
    └──────────┬─────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ Model Code of Conduct      │
    │ Comes into Effect          │
    └──────────┬─────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ Candidate Nominations      │
    │ & Scrutiny                 │
    └──────────┬─────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ Campaign Period            │
    │ (2-3 weeks)                │
    └──────────┬─────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ Multi-Phase Polling        │
    │ (4-6 weeks)                │
    └──────────┬─────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ Vote Counting Day          │
    │ (Using Electronic Voting   │
    │  Machines - EVMs)          │
    └──────────┬─────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ Results Declared           │
    │ & Government Formation     │
    └────────────────────────────┘
    `
  },
  UK: {
    title: "UK Election Process Flow",
    description: "UK General Election process",
    ascii: `
    ┌─────────────────────┐
    │ Voter Registration  │
    │ & Eligibility Check │
    └──────────┬──────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Campaign Period          │
    │ (Several weeks)          │
    │ Party Manifestos &       │
    │ Public Debates           │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ General Election Day     │
    │ (Typically Thursday)     │
    │ Citizens Vote at         │
    │ Polling Stations         │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Ballot Counting          │
    │ (Election Night)         │
    │ Constituency by          │
    │ Constituency             │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Results Announcement     │
    │ Party with Most Seats    │
    │ Forms Government         │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ New PM Takes Office      │
    │ Cabinet Appointed        │
    └──────────────────────────┘
    `
  }
};

export default function ChatbotTab() {
  const { selectedCountry } = useTab();
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t("chatbot.greeting"),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    const isImageRequest = /image|flow|chart|diagram|visual|picture|draw|svg|ascii/i.test(userMessage);

    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          systemPrompt: isImageRequest 
            ? "You are a friendly election education assistant. When asked for flowcharts, images, or visual diagrams, create detailed ASCII art representations or detailed text descriptions that could be visualized. Make them clear and educational. For any other questions, explain election and voting concepts in simple, clear language suitable for first-time voters. Keep answers under 100 words unless the user asks for more detail."
            : "You are a friendly election education assistant. Explain election and voting concepts in simple, clear language suitable for first-time voters. Keep answers under 100 words unless the user asks for more detail.",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: t("chatbot.failed"),
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chatbot.error"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const flowchart = COUNTRY_FLOWCHARTS[selectedCountry as keyof typeof COUNTRY_FLOWCHARTS] || COUNTRY_FLOWCHARTS.USA;

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
          <div className="inline-block px-4 py-2 rounded-full bg-[#0050FF]/20 border border-[#0050FF]/50 text-[#00D6FF] text-sm font-semibold tracking-wider uppercase mb-4">
            {selectedCountry} {t("chatbot.subtitle").split(" ")[0]}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{t("chatbot.title")}</h1>
          <p className="text-xl text-white/70">
            {t("chatbot.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Flowchart Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl h-fit"
          >
            <h2 className="text-2xl font-bold text-white mb-4">{flowchart.title}</h2>
            <p className="text-white/60 text-sm mb-6">{flowchart.description}</p>
            
            {/* ASCII Flowchart */}
            <div className="bg-[#0A0A0C] p-4 rounded-lg border border-[#0050FF]/30 overflow-x-auto">
              <pre className="text-[#00D6FF] font-mono text-xs leading-relaxed whitespace-pre-wrap wrap-break-word">
                {flowchart.ascii}
              </pre>
            </div>

            {/* Country Info */}
            <div className="mt-6 p-4 bg-[#0050FF]/10 border border-[#0050FF]/30 rounded-lg">
              <p className="text-white text-sm">
                <strong>{t("chatbot.currentlyViewing")}</strong> {selectedCountry}
              </p>
              <p className="text-white/70 text-xs mt-2">
                {t("chatbot.switchCountries")}
              </p>
            </div>
          </motion.div>

          {/* Right: Q&A Chatbot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col h-fit md:h-[600px]"
          >
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0A0A0C]/40 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-xs px-4 py-3 rounded-lg text-sm whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-[#0050FF] text-white"
                        : "bg-white/10 text-white/80 border border-white/20"
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 text-white/80 border border-white/20 px-4 py-3 rounded-lg flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    {t("chatbot.thinking")}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-4 bg-background/50 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={t("chatbot.askQuestion")}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[#0050FF] focus:ring-1 focus:ring-[#0050FF]"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-[#0050FF] hover:bg-[#0050FF]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 p-6 rounded-2xl bg-linear-to-br from-[#0050FF]/20 to-[#00D6FF]/10 border border-[#0050FF]/30 backdrop-blur-xl"
        >
          <h3 className="text-lg font-bold text-white mb-4">{t("chatbot.tips")}</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>{t("chatbot.tip1")}</li>
            <li>{t("chatbot.tip2")}</li>
            <li>{t("chatbot.tip3")}</li>
            <li>{t("chatbot.tip4")}</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

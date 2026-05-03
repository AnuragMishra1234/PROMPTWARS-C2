"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTab } from "@/context/TabContext";

// Country-specific election processes
const COUNTRY_STEPS: Record<string, any[]> = {
  USA: [
    {
      id: 1,
      title: "Party Conventions & Primaries",
      description: "Political parties hold primaries where voters select candidates. Major conventions follow to formally nominate presidential candidates.",
      duration: "January - August (even years)",
    },
    {
      id: 2,
      title: "Campaign Season",
      description: "Presidential and congressional candidates campaign across the nation. Debates are held between candidates to present their policies.",
      duration: "8-10 weeks before Election Day",
    },
    {
      id: 3,
      title: "Election Day",
      description: "Citizens vote on the first Tuesday after the first Monday in November. Voting happens through various methods including in-person and mail-in.",
      duration: "First Tuesday in November",
    },
    {
      id: 4,
      title: "Vote Counting",
      description: "Votes are counted in each state. The results are tabulated and certified by state election officials.",
      duration: "Election Night and following days",
    },
    {
      id: 5,
      title: "Electoral College Vote",
      description: "Electors from each state meet in December to cast their votes. The Electoral College determines the final winner, not just popular vote.",
      duration: "December (first Monday after second Wednesday)",
    },
    {
      id: 6,
      title: "Inauguration",
      description: "The elected president takes oath of office on January 20. This marks the official start of the new presidential term.",
      duration: "January 20",
    },
  ],
  India: [
    {
      id: 1,
      title: "Election Commission Announcement",
      description: "Election Commission announces the election schedule, including notification dates and polling dates. Model Code of Conduct comes into effect.",
      duration: "60-90 days before polling",
    },
    {
      id: 2,
      title: "Nomination of Candidates",
      description: "Candidates file their nomination papers with required documents, affidavits, and electoral bonds. Election officials scrutinize nominations.",
      duration: "2-3 weeks after announcement",
    },
    {
      id: 3,
      title: "Campaign Period",
      description: "Political parties and candidates campaign through rallies, door-to-door visits, and media. Campaign period ends 48 hours before polling.",
      duration: "2-3 weeks",
    },
    {
      id: 4,
      title: "Polling (Multi-phase)",
      description: "Voting happens in multiple phases across different states. Each phase covers different regions to ensure proper security and management.",
      duration: "Multiple phases over 4-6 weeks",
    },
    {
      id: 5,
      title: "Vote Counting",
      description: "Votes are counted on counting day with observers from all parties present. Electronic Voting Machines (EVMs) are used for accuracy.",
      duration: "Few days after last phase of polling",
    },
    {
      id: 6,
      title: "Results & Swearing In",
      description: "Results are declared and newly elected representatives take oath. The government formation process begins.",
      duration: "Days after counting",
    },
  ],
  UK: [
    {
      id: 1,
      title: "Dissolution of Parliament",
      description: "The Prime Minister advises the King/Queen to dissolve Parliament. This marks the official start of the election process.",
      duration: "5 weeks before election",
    },
    {
      id: 2,
      title: "Candidate Nomination",
      description: "Political parties select and nominate their candidates for each constituency. Candidates must be registered and meet eligibility criteria.",
      duration: "First 2 weeks after dissolution",
    },
    {
      id: 3,
      title: "Campaign Period",
      description: "Parties and candidates campaign across constituencies. They present their manifestos and debate key issues.",
      duration: "3-4 weeks",
    },
    {
      id: 4,
      title: "General Election Day",
      description: "UK citizens vote on the set election day (typically a Thursday). Voting is done through ballot boxes at polling stations.",
      duration: "One day (usually Thursday)",
    },
    {
      id: 5,
      title: "Vote Counting",
      description: "Ballots are counted in each constituency. The party with most seats wins the mandate to form government.",
      duration: "Overnight and following day",
    },
    {
      id: 6,
      title: "Government Formation",
      description: "The winning party leader is invited to form government. The new Prime Minister is appointed and cabinet is formed.",
      duration: "Few days after election",
    },
  ],
};

interface ExplanationState {
  stepId: number | null;
  loading: boolean;
  text: string;
}

interface ExplanationState {
  stepId: number | null;
  loading: boolean;
  text: string;
}

export default function ProcessTab() {
  const { selectedCountry, showFlowchart, setShowFlowchart } = useTab();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [explanation, setExplanation] = useState<ExplanationState>({
    stepId: null,
    loading: false,
    text: "",
  });

  // Get country-specific steps
  const STEPS = COUNTRY_STEPS[selectedCountry] || COUNTRY_STEPS.USA;

  const handleLearnMore = async (stepId: number) => {
    if (explanation.stepId === stepId) {
      setExplanation({ stepId: null, loading: false, text: "" });
      return;
    }

    setExplanation({ stepId, loading: true, text: "" });

    const step = STEPS.find((s) => s.id === stepId);
    if (!step) return;

    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Explain this ${selectedCountry} election process step in simple terms for first-time voters: "${step.title}". Keep it under 100 words and focus on why it's important.`,
          systemPrompt:
            "You are a friendly election education assistant. Explain election and voting concepts in simple, clear language suitable for first-time voters. Keep answers under 100 words unless the user asks for more detail.",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setExplanation({
          stepId,
          loading: false,
          text: data.message,
        });
      } else {
        setExplanation({
          stepId,
          loading: false,
          text: "Unable to fetch explanation. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error fetching explanation:", error);
      setExplanation({
        stepId,
        loading: false,
        text: "Error fetching explanation. Please check your API key.",
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-[#0050FF]/20 border border-[#0050FF]/50 text-[#00D6FF] text-sm font-semibold tracking-wider uppercase mb-4">
            {selectedCountry} Election Process
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Election Process Breakdown
          </h1>
          <p className="text-xl text-white/70">
            Understand how elections work in {selectedCountry}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70">Progress</span>
            <span className="text-white font-bold">{currentStep} / 6</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 6) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF]"
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <button
                onClick={() => setCurrentStep(step.id)}
                className="w-full text-left transition-all"
              >
                <div
                  className={cn(
                    "p-6 rounded-2xl border transition-all backdrop-blur-xl cursor-pointer",
                    currentStep === step.id
                      ? "bg-[#0050FF]/20 border-[#0050FF]/50 shadow-[0_0_20px_rgba(0,80,255,0.3)]"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#0050FF]/30 border border-[#0050FF] flex items-center justify-center text-white font-bold text-sm">
                          {step.id}
                        </div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-white/70 mb-2">{step.description}</p>
                      <div className="text-sm text-[#00D6FF]/70">⏱️ {step.duration}</div>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 text-white/60 transition-transform flex-shrink-0 mt-1",
                        currentStep === step.id ? "rotate-90" : ""
                      )}
                    />
                  </div>
                </div>
              </button>

              {/* Show only when step is at index 0 */}
              {step.id === 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-11"
                >
                  <button
                    onClick={() => handleLearnMore(step.id)}
                    className="px-4 py-2 bg-[#0050FF]/20 hover:bg-[#0050FF]/30 text-[#00D6FF] border border-[#0050FF]/50 rounded-lg text-sm font-semibold transition-all"
                  >
                    {explanation.stepId === step.id && explanation.loading ? (
                      <>
                        <Loader className="inline w-3 h-3 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : explanation.stepId === step.id ? (
                      "Hide Explanation"
                    ) : (
                      "Learn More with AI"
                    )}
                  </button>

                  {explanation.stepId === step.id && explanation.text && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-lg bg-[#0050FF]/10 border border-[#0050FF]/20 text-white/80 text-sm leading-relaxed"
                    >
                      {explanation.text}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Visual Flowchart */}
        {showFlowchart && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/10 border border-[#0050FF]/30 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {selectedCountry} Election Process Flowchart
            </h2>
            <div className="space-y-4">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  {/* Step Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="min-w-fit"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0050FF]/40 to-[#00D6FF]/20 border-2 border-[#0050FF] flex items-center justify-center flex-col gap-1">
                      <div className="text-2xl font-bold text-[#00D6FF]">Step {step.id}</div>
                      <div className="text-xs text-white/70 text-center px-2">{step.title.split(" ").slice(0, 2).join(" ")}</div>
                    </div>
                  </motion.div>

                  {/* Arrow */}
                  {index < STEPS.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="flex-1 mx-4 h-1 bg-gradient-to-r from-[#0050FF] to-[#00D6FF] rounded-full origin-left"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Flowchart Legend */}
            <div className="mt-8 pt-6 border-t border-[#0050FF]/30">
              <h3 className="text-lg font-bold text-white mb-4">Step Details:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STEPS.map((step) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-lg bg-white/5 border border-[#0050FF]/20 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#0050FF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                        {step.id}
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-sm text-white/70">{step.description}</p>
                        <p className="text-xs text-[#00D6FF]/70 mt-2">⏱️ {step.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/10 border border-[#0050FF]/30 backdrop-blur-xl text-center"
        >
          <p className="text-white text-lg">
            💡 Each step is essential for a fair and transparent election in {selectedCountry}. Click on each step to learn more, and use the "Learn More with AI" button for detailed explanations! Click "📊 Flowchart" in the navbar to see the complete process flow.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

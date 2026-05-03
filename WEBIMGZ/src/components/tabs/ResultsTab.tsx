"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTab } from "@/context/TabContext";

// Country-specific glossary
const COUNTRY_GLOSSARY: Record<string, any[]> = {
  USA: [
    { term: "Electoral College", definition: "A group of 538 electors who formally elect the US President and Vice President." },
    { term: "Ballot", definition: "A sheet or digital record on which voters mark their choices during voting." },
    { term: "Swing State", definition: "A state where neither major political party has a decisive advantage." },
    { term: "Incumbent", definition: "A candidate who is currently holding the political office for which they are running." },
    { term: "Primary Election", definition: "An election where voters select candidates to represent their party in the general election." },
    { term: "Campaign Trail", definition: "The route and schedule of campaign events undertaken by political candidates." },
    { term: "Voter Registration", definition: "The process of enrolling citizens as eligible voters before an election." },
    { term: "Polling Station", definition: "A designated location where citizens go to cast their votes during elections." },
  ],
  India: [
    { term: "Lok Sabha", definition: "The lower house of Indian Parliament, directly elected by voters." },
    { term: "Rajya Sabha", definition: "The upper house of Indian Parliament, indirectly elected by state assemblies." },
    { term: "EVM (Electronic Voting Machine)", definition: "Voting machines used in Indian elections to record and count votes electronically." },
    { term: "Constituency", definition: "A geographical area represented by a single elected representative." },
    { term: "FPTP (First Past The Post)", definition: "Voting system where the candidate with most votes wins, regardless of majority." },
    { term: "Voter Turnout", definition: "The percentage of eligible voters who actually cast their votes." },
    { term: "Model Code of Conduct", definition: "Rules that political parties and candidates must follow during elections." },
    { term: "Mandate", definition: "The authority given to an elected representative to act on behalf of voters." },
  ],
  UK: [
    { term: "Parliament", definition: "The legislative body of the UK consisting of House of Commons and House of Lords." },
    { term: "General Election", definition: "An election where all seats in the House of Commons are contested simultaneously." },
    { term: "Constituency", definition: "A geographical area represented by a single Member of Parliament (MP)." },
    { term: "FPTP (First Past The Post)", definition: "Voting system where the candidate with most votes in a constituency wins." },
    { term: "Prime Minister", definition: "The leader of the government who is the head of the majority party in Parliament." },
    { term: "Polling Station", definition: "A designated location where citizens go to cast their votes during elections." },
    { term: "Ballot Box", definition: "A sealed container where voters place their marked ballots." },
    { term: "Voter Turnout", definition: "The percentage of eligible voters who actually cast their votes in an election." },
  ],
};

// Country-specific quiz questions
const COUNTRY_QUIZ: Record<string, any[]> = {
  USA: [
    {
      id: 1,
      question: "How many electors are in the Electoral College?",
      options: ["435", "538", "750", "1000"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "What is the minimum number of electoral votes needed to win?",
      options: ["250", "270", "300", "350"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "In what month is the US presidential election held?",
      options: ["September", "October", "November", "December"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "Which is NOT a type of voting method in the USA?",
      options: ["Mail-in voting", "Early voting", "In-person voting", "Postal strike"],
      correctAnswer: 3,
    },
    {
      id: 5,
      question: "What is the term length for a US President?",
      options: ["2 years", "3 years", "4 years", "5 years"],
      correctAnswer: 2,
    },
  ],
  India: [
    {
      id: 1,
      question: "Which house of Parliament is directly elected by voters?",
      options: ["Rajya Sabha", "Lok Sabha", "State Assembly", "None of the above"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "What does EVM stand for?",
      options: ["Electronic Vote Machine", "Electronic Voting Machine", "Electric Vote Module", "Electronic Voice Module"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Which color ink mark is given to voters after voting?",
      options: ["Blue", "Red", "Purple", "Black"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "How many phases are typically used in Indian elections?",
      options: ["1-2 phases", "3-5 phases", "6-10 phases", "Over 10 phases"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "What is the voting age in India?",
      options: ["16 years", "17 years", "18 years", "21 years"],
      correctAnswer: 2,
    },
  ],
  UK: [
    {
      id: 1,
      question: "What voting system does the UK use?",
      options: ["Proportional Representation", "Two-round system", "First Past The Post", "Ranked Choice"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "How many seats are in the House of Commons?",
      options: ["400", "500", "600", "650"],
      correctAnswer: 3,
    },
    {
      id: 3,
      question: "What day of the week is UK election typically held?",
      options: ["Monday", "Tuesday", "Thursday", "Friday"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "What is the minimum age to vote in the UK?",
      options: ["16 years", "17 years", "18 years", "21 years"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "Who is the head of the UK government?",
      options: ["The Monarch", "Speaker of Parliament", "Prime Minister", "Chancellor"],
      correctAnswer: 2,
    },
  ],
};

type QuizState = "glossary" | "quiz" | "results";

export default function ResultsTab() {
  const { selectedCountry } = useTab();
  const [view, setView] = useState<QuizState>("glossary");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Get country-specific data
  const GLOSSARY_TERMS = COUNTRY_GLOSSARY[selectedCountry] || COUNTRY_GLOSSARY.USA;
  const QUIZ_QUESTIONS = COUNTRY_QUIZ[selectedCountry] || COUNTRY_QUIZ.USA;

  const handleQuizAnswer = (optionIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setQuizAnswers(newAnswers);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setView("results");
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === QUIZ_QUESTIONS[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleRestartQuiz = () => {
    setQuizAnswers([]);
    setCurrentQuestion(0);
    setQuizStarted(false);
    setView("quiz");
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
            {selectedCountry} Election Results
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            How Results Are Declared
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Learn about {selectedCountry} elections - glossary, quiz, and election facts
          </p>

          {/* View Selector */}
          <div className="flex justify-center gap-3 flex-wrap mb-8">
            <button
              onClick={() => setView("glossary")}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all",
                view === "glossary"
                  ? "bg-[#0050FF] text-white shadow-[0_0_20px_rgba(0,80,255,0.5)]"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              )}
            >
              📚 Glossary
            </button>
            <button
              onClick={() => {
                setView("quiz");
                setQuizStarted(false);
              }}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all",
                view === "quiz" || view === "results"
                  ? "bg-[#0050FF] text-white shadow-[0_0_20px_rgba(0,80,255,0.5)]"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              )}
            >
              🎯 Quiz
            </button>
          </div>
        </div>

        {/* Results Declaration Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/10 border border-[#0050FF]/30 backdrop-blur-xl mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {selectedCountry} Election Results Process
          </h2>
          <div className="space-y-4 text-white/80">
            {selectedCountry === "USA" && (
              <>
                <p>
                  <strong>Election Night:</strong> Voters head to polls on the first Tuesday after
                  the first Monday in November.
                </p>
                <p>
                  <strong>Vote Counting:</strong> Each state counts votes independently and reports
                  results throughout the evening.
                </p>
                <p>
                  <strong>State Results:</strong> Once a state's votes are counted, the winner takes
                  all of that state's electoral votes.
                </p>
                <p>
                  <strong>Electoral College:</strong> In December, 538 electors officially cast their
                  votes based on their state's results.
                </p>
                <p>
                  <strong>Final Result:</strong> The candidate with 270 or more electoral votes wins
                  the presidency.
                </p>
              </>
            )}
            {selectedCountry === "India" && (
              <>
                <p>
                  <strong>Multi-Phase Voting:</strong> Indian elections happen over multiple phases
                  to ensure proper security and management.
                </p>
                <p>
                  <strong>Election Phases:</strong> Different regions vote on different dates over
                  several weeks.
                </p>
                <p>
                  <strong>Vote Counting Day:</strong> All votes are counted on a single designated
                  counting day after all phases complete.
                </p>
                <p>
                  <strong>Electronic Voting Machines:</strong> EVMs are used for accurate counting
                  with election observers from all parties present.
                </p>
                <p>
                  <strong>Government Formation:</strong> The party with the most seats forms the
                  government.
                </p>
              </>
            )}
            {selectedCountry === "UK" && (
              <>
                <p>
                  <strong>Election Day:</strong> All UK voters head to polls on the same day (typically
                  a Thursday).
                </p>
                <p>
                  <strong>Polling Booths:</strong> Citizens vote in secret at designated polling
                  stations using paper ballots.
                </p>
                <p>
                  <strong>Ballot Counting:</strong> Ballots are counted in each constituency on
                  election night.
                </p>
                <p>
                  <strong>Constituency Results:</strong> The candidate with the most votes in each
                  constituency becomes the MP.
                </p>
                <p>
                  <strong>Government Formation:</strong> The party with the most seats forms
                  government, and their leader becomes Prime Minister.
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Glossary View */}
        {view === "glossary" && (
          <div className="space-y-4">
            {GLOSSARY_TERMS.map((item, index) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() =>
                    setExpandedTerm(expandedTerm === item.term ? null : item.term)
                  }
                  className="w-full text-left"
                >
                  <div
                    className={cn(
                      "p-6 rounded-2xl border transition-all backdrop-blur-xl",
                      expandedTerm === item.term
                        ? "bg-[#0050FF]/20 border-[#0050FF]/50 shadow-[0_0_20px_rgba(0,80,255,0.3)]"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{item.term}</h3>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-white/60 transition-transform flex-shrink-0",
                          expandedTerm === item.term ? "rotate-180" : ""
                        )}
                      />
                    </div>
                    {expandedTerm === item.term && (
                      <p className="text-white/70 mt-3 leading-relaxed">{item.definition}</p>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quiz View */}
        {view === "quiz" && !quizStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="p-12 rounded-2xl bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/10 border border-[#0050FF]/30 backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-white mb-4">Test Your Knowledge!</h2>
              <p className="text-white/70 mb-8 text-lg">
                Answer 5 multiple-choice questions to see how well you understand elections
              </p>
              <button
                onClick={() => {
                  setQuizStarted(true);
                  setCurrentQuestion(0);
                  setQuizAnswers([]);
                }}
                className="px-8 py-4 bg-[#0050FF] hover:bg-[#0050FF]/80 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,80,255,0.5)]"
              >
                Start Quiz
              </button>
            </div>
          </motion.div>
        )}

        {/* Active Quiz */}
        {view === "quiz" && quizStarted && currentQuestion < QUIZ_QUESTIONS.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Question {currentQuestion + 1} of 5</span>
                <span className="text-[#00D6FF] font-bold">
                  {Math.round(((currentQuestion + 1) / 5) * 100)}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / 5) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF]"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">
              {QUIZ_QUESTIONS[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleQuizAnswer(index)}
                  className="w-full p-4 rounded-xl border-2 border-white/20 hover:border-[#0050FF] text-left text-white transition-all hover:bg-[#0050FF]/20 text-lg"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results View */}
        {view === "results" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="p-12 rounded-2xl bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/10 border border-[#0050FF]/30 backdrop-blur-xl">
              <h2 className="text-4xl font-bold text-white mb-6">Quiz Complete!</h2>

              <div className="mb-8">
                <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0050FF] to-[#00D6FF] mb-2">
                  {calculateScore()} / 5
                </div>
                <p className="text-2xl text-white/80">
                  {calculateScore() === 5
                    ? "Perfect! You're an election expert! 🎉"
                    : calculateScore() >= 4
                    ? "Excellent! You really know elections! 👏"
                    : calculateScore() >= 3
                    ? "Good job! You understand most concepts. 👍"
                    : "Keep learning! Review the glossary and try again. 📚"}
                </p>
              </div>

              <div className="mb-8 space-y-2 text-left bg-white/5 p-6 rounded-xl border border-white/10">
                {QUIZ_QUESTIONS.map((q, index) => (
                  <div
                    key={q.id}
                    className={cn(
                      "p-3 rounded-lg",
                      quizAnswers[index] === q.correctAnswer
                        ? "bg-green-500/20 border border-green-500/30 text-green-300"
                        : "bg-red-500/20 border border-red-500/30 text-red-300"
                    )}
                  >
                    <p className="font-semibold">{q.question}</p>
                    <p className="text-sm mt-1">
                      Your answer: {q.options[quizAnswers[index]]}
                      {quizAnswers[index] !== q.correctAnswer && (
                        <span className="block text-green-300">
                          Correct: {q.options[q.correctAnswer]}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleRestartQuiz}
                className="px-8 py-4 bg-[#0050FF] hover:bg-[#0050FF]/80 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,80,255,0.5)] inline-flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

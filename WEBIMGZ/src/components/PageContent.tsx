"use client";

import { useTab } from "@/context/TabContext";
import OverviewTab from "./tabs/OverviewTab";
import ProcessTab from "./tabs/ProcessTab";
import VotingTab from "./tabs/VotingTab";
import ResultsTab from "./tabs/ResultsTab";
import ChatbotTab from "./tabs/ChatbotTab";

export default function PageContent() {
  const { activeTab } = useTab();

  return (
    <>
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "process" && <ProcessTab />}
      {activeTab === "voting" && <VotingTab />}
      {activeTab === "results" && <ResultsTab />}
      {activeTab === "chatbot" && <ChatbotTab />}
    </>
  );
}

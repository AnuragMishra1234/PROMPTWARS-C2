"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Tab = "overview" | "process" | "voting" | "results" | "chatbot";

interface TabContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  showFlowchart: boolean;
  setShowFlowchart: (show: boolean) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedCountry, setSelectedCountry] = useState<string>("USA");
  const [showFlowchart, setShowFlowchart] = useState<boolean>(false);

  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab, selectedCountry, setSelectedCountry, showFlowchart, setShowFlowchart }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within TabProvider");
  }
  return context;
}

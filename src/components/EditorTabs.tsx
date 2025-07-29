"use client";

import { TabOption } from "@/types/types";

interface EditorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabOptions: TabOption[];
}

export const EditorTabs = ({
  activeTab,
  setActiveTab,
  tabOptions,
}: EditorTabsProps) => (
  <div className="flex justify-center mb-10">
    <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-gray-200/50">
      {tabOptions.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
            activeTab === tab.id
              ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg transform scale-105`
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.snow.css";

// Load Quill component once and reuse
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-gray-500">Loading editor...</div>
    </div>
  ),
});

const snowModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ direction: "rtl" }, { align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const bubbleModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "blockquote",
  "code-block",
  "list",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "direction",
];

export default function Home() {
  const [bubble, setBubble] = useState("");
  const [snow, setSnow] = useState("");
  const [activeTab, setActiveTab] = useState("snow");
  const [wordCount, setWordCount] = useState({ snow: 0, bubble: 0 });

  // Calculate word count
  const getWordCount = (html:string) => {
    const text = html.replace(/<[^>]*>/g, "");
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  useEffect(() => {
    setWordCount({
      snow: getWordCount(snow),
      bubble: getWordCount(bubble),
    });
  }, [snow, bubble]);

  const tabOptions = [
    {
      id: "snow",
      label: "❄️ Snow Editor",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: "bubble",
      label: "💬 Bubble Editor",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">✍️</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              Advanced Text Editor
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional rich text editing with multiple themes, enhanced
            formatting options, and seamless user experience.
          </p>
        </div>

        {/* Enhanced Tab Navigation */}
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

        {/* Editor Container */}
        <div className="transition-all duration-500">
          {/* Snow Editor */}
          {activeTab === "snow" && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 hover:shadow-3xl transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Snow Theme Editor
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>
                      {snow.replace(/<[^>]*>/g, "").length} characters
                    </span>
                    <span>{wordCount.snow} words</span>
                  </div>
                </div>
                <div className="snow-editor-container">
                  <ReactQuill
                    value={snow}
                    onChange={setSnow}
                    theme="snow"
                    modules={snowModules}
                    formats={formats}
                    placeholder="Start writing your masterpiece..."
                    className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-inner"
                    style={{ height: "400px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bubble Editor */}
          {activeTab === "bubble" && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 hover:shadow-3xl transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Bubble Theme Editor
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>
                      {bubble.replace(/<[^>]*>/g, "").length} characters
                    </span>
                    <span>{wordCount.bubble} words</span>
                  </div>
                </div>
                <div className="bubble-editor-container">
                  <ReactQuill
                    value={bubble}
                    onChange={setBubble}
                    theme="bubble"
                    modules={bubbleModules}
                    formats={formats}
                    placeholder="Click here and start typing. Select text to see formatting options..."
                    className="border-2 border-gray-200 rounded-xl p-6 min-h-[400px] bg-gradient-to-br from-gray-50 to-blue-50/30 shadow-inner z-50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-gray-500 text-sm bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200/50">
            <span>Crafted with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>using Next.js & React Quill</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Prevent conflicts between snow and bubble themes */
        .snow-editor-container .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-bottom: 1px solid #e2e8f0;
        }

        .bubble-editor-container .ql-tooltip {
          z-index: 1000;
        }
              .ql-tooltip {
          left: -20px !important;
          z-index: 1000 !important;
        }
          
        .ql-tooltip-arrow{
          display: none !important;
      }

        .snow-editor-split .ql-toolbar,
        .bubble-editor-split .ql-tooltip {
          position: relative;
          z-index: 10;
        }

        /* Enhanced editor styling */
        .ql-editor {
          font-size: 16px;
          line-height: 1.6;
          color: #1f2937;
        }

        .ql-editor.ql-blank::before {
          font-style: italic;
          color: #9ca3af;
        }

        /* Smooth transitions */
        .ql-toolbar button:hover,
        .ql-picker-label:hover {
          background-color: rgba(59, 130, 246, 0.1);
          border-radius: 4px;
        }

        /* Custom scrollbar */
        .ql-editor::-webkit-scrollbar {
          width: 6px;
        }

        .ql-editor::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .ql-editor::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .ql-editor::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </main>
  );
}

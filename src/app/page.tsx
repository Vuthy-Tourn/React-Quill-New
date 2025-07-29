"use client";

import { useState, useEffect } from "react";
import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.snow.css";
import { EditorContainer } from "@/components/EditorContainer";
import { PreviewPanel } from "@/components/PreviewPanel";
import { QuillModules } from "react-quill-new";


const snowModules: QuillModules = {
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

const bubbleModules: QuillModules = {
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
  const getWordCount = (html: string) => {
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
          {activeTab === "snow" && (
            <div className="space-y-8">
              <EditorContainer
                value={snow}
                onChange={setSnow}
                theme="snow"
                modules={snowModules}
                formats={formats}
                placeholder="Start writing your masterpiece..."
                wordCount={wordCount.snow}
                charCount={snow.replace(/<[^>]*>/g, "").length}
                title="Snow Theme Editor"
                gradient="from-blue-500 to-cyan-500"
              />
              <PreviewPanel
                content={snow}
                title="Snow Editor Preview"
                gradient="from-blue-500 to-cyan-500"
                theme="snow"
                editorStyles={`
          .ql-snow .ql-editor {
            font-family: inherit;
            font-size: 16px;
            line-height: 1.6;
          }
          .ql-snow .ql-editor h1 { font-size: 2em; }
          .ql-snow .ql-editor h2 { font-size: 1.5em; }
          .ql-snow .ql-editor h3 { font-size: 1.17em; }
          .ql-snow .ql-editor blockquote {
            border-left: 4px solid #ccc;
            margin: 1em 0;
            padding-left: 1em;
          }
        `}
              />
            </div>
          )}

          {activeTab === "bubble" && (
            <div className="space-y-8">
              <EditorContainer
                value={bubble}
                onChange={setBubble}
                theme="bubble"
                modules={bubbleModules}
                formats={formats}
                placeholder="Click here and start typing. Select text to see formatting options..."
                wordCount={wordCount.bubble}
                charCount={bubble.replace(/<[^>]*>/g, "").length}
                title="Bubble Theme Editor"
                gradient="from-purple-500 to-pink-500"
              />
              <PreviewPanel
                content={bubble}
                title="Bubble Editor Preview"
                gradient="from-purple-500 to-pink-500"
                theme="bubble"
                editorStyles={`
          .ql-bubble .ql-editor {
            padding: 12px 15px;
            line-height: 1.8;
          }
          .ql-bubble .ql-editor a {
            text-decoration: underline;
            color: #06c;
          }
          .ql-bubble .ql-editor blockquote {
            border-left: 4px solid #ccc;
            margin: 1em 0;
            padding-left: 1em;
            color: #666;
          }
          .ql-bubble .ql-editor .ql-size-small { font-size: 0.75em; }
          .ql-bubble .ql-editor .ql-size-large { font-size: 1.5em; }
          .ql-bubble .ql-editor .ql-size-huge { font-size: 2.5em; }
        `}
              />
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

        .ql-tooltip-arrow {
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

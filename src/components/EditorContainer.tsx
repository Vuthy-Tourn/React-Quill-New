"use client";

import dynamic from "next/dynamic";
import { EditorContainerProps } from "@/types/types";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-gray-500">Loading editor...</div>
    </div>
  ),
});

export const EditorContainer = ({
  value,
  onChange,
  theme,
  modules,
  formats,
  placeholder,
  wordCount,
  charCount,
  title,
  gradient,
}: EditorContainerProps) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 hover:shadow-3xl transition-all duration-300">
    <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{charCount} characters</span>
          <span>{wordCount} words</span>
        </div>
      </div>
      <div className={`${theme}-editor-container`}>
        <ReactQuill
          value={value}
          onChange={onChange}
          theme={theme}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className={`border-2 border-gray-200 rounded-xl overflow-hidden shadow-inner ${
            theme === "bubble"
              ? "p-6 min-h-[400px] bg-gradient-to-br from-gray-50 to-blue-50/30"
              : ""
          }`}
          style={{ height: theme === "bubble" ? undefined : "400px" }}
        />
      </div>
    </div>
  </div>
);

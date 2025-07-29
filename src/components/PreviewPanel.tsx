"use client";

import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.snow.css";

interface PreviewPanelProps {
  content: string;
  title: string;
  gradient: string;
  theme: "snow" | "bubble";
  editorStyles?: string;
}

export const PreviewPanel = ({
  content,
  title,
  gradient,
  theme,
  editorStyles,
}: PreviewPanelProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300">
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className={`ql-${theme}`}>
          <div
            className="ql-editor p-6 border-2 border-gray-200 rounded-xl bg-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {editorStyles && (
          <style jsx global>{`
            .ql-${theme} .ql-editor {
              ${editorStyles}
            }
          `}</style>
        )}
      </div>
    </div>
  );
};

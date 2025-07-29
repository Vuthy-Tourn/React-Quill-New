import { QuillModules } from "react-quill-new";

export interface TabOption {
  id: string;
  label: string;
  gradient: string;
  bgGradient: string;
}

export interface EditorContainerProps {
  value: string;
  onChange: (value: string) => void;
  theme: "snow" | "bubble";
  modules: QuillModules;
  formats: string[];
  placeholder: string;
  wordCount: number;
  charCount: number;
  title: string;
  gradient: string;
}

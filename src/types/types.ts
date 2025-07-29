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
  modules: any;
  formats: string[];
  placeholder: string;
  wordCount: number;
  charCount: number;
  title: string;
  gradient: string;
}

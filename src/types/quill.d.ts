// types/quill.d.ts
import "react-quill-new";

declare module "react-quill-new" {
  interface ToolbarOptions {
    container: (string | { [key: string]: unknown })[];
    handlers?: { [key: string]: () => void };
  }

  interface QuillModules {
    toolbar?: ToolbarItem[][] | boolean;
    clipboard?: {
      matchVisual?: boolean;
    };
    [key: string]: unknown; // Add index signature
    // Add other modules as needed
  }
}

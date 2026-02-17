import Editor from "@monaco-editor/react";
import type { Language } from "@/lib/constants";

interface CodeEditorProps {
  language: Language;
  code: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ language, code, onChange }: CodeEditorProps) => {
  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={language.monacoLang}
        value={code}
        onChange={(value) => onChange(value ?? "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          lineNumbersMinChars: 3,
          renderLineHighlight: "line",
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          tabSize: 4,
          wordWrap: "on",
          automaticLayout: true,
        }}
        loading={
          <div className="flex items-center justify-center h-full text-muted-foreground font-mono text-sm">
            Loading editor…
          </div>
        }
      />
    </div>
  );
};

export default CodeEditor;

import { useState, useCallback } from "react";
import StdinInput from "@/components/StdinInput";
import EditorHeader from "@/components/EditorHeader";
import CodeEditor from "@/components/CodeEditor";
import Terminal from "@/components/Terminal";
import { LANGUAGES, type Language } from "@/lib/constants";
import { useCodeExecution } from "@/hooks/useCodeExecution";

const Index = () => {
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);
  const [codes, setCodes] = useState<Record<string, string>>(() =>
    Object.fromEntries(LANGUAGES.map((l) => [l.id, l.defaultCode]))
  );
  const [stdin, setStdin] = useState("");
  const { execute, isRunning, result } = useCodeExecution();

  const currentCode = codes[language.id] ?? language.defaultCode;

  const handleCodeChange = useCallback(
    (value: string) => {
      setCodes((prev) => ({ ...prev, [language.id]: value }));
    },
    [language.id]
  );

  const handleRun = useCallback(() => {
    execute(currentCode, language.judge0Id, stdin);
  }, [execute, currentCode, language.judge0Id, stdin]);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex items-center">
        <div className="flex-1">
          <EditorHeader
            language={language}
            onLanguageChange={handleLanguageChange}
            onRun={handleRun}
            isRunning={isRunning}
          />
        </div>
        <div className="bg-header border-b border-border px-3 py-2.5 flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground tracking-wide opacity-70">
            made by <span className="text-primary font-semibold">chirag</span>
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Editor pane */}
        <div className="flex-1 min-h-0 md:min-w-0 flex flex-col">
          <div className="flex-1 min-h-0">
            <CodeEditor
              language={language}
              code={currentCode}
              onChange={handleCodeChange}
            />
          </div>
          <StdinInput value={stdin} onChange={setStdin} />
        </div>

        {/* Resizer visual */}
        <div className="hidden md:block w-px bg-border" />

        {/* Terminal pane */}
        <div className="h-[40%] md:h-full md:w-[40%] min-h-0 border-t md:border-t-0 border-border">
          <Terminal result={result} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
};

export default Index;

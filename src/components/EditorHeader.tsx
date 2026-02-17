import { Play, Loader2, Code2 } from "lucide-react";
import { LANGUAGES, type Language } from "@/lib/constants";

interface EditorHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onRun: () => void;
  isRunning: boolean;
}

const EditorHeader = ({ language, onLanguageChange, onRun, isRunning }: EditorHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-2.5 bg-header border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-primary">
          <Code2 className="w-5 h-5" />
          <span className="font-semibold text-sm tracking-tight hidden sm:inline">CodeRun</span>
        </div>
        <div className="h-5 w-px bg-border" />
        <select
          value={language.id}
          onChange={(e) => {
            const lang = LANGUAGES.find((l) => l.id === e.target.value);
            if (lang) onLanguageChange(lang);
          }}
          className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1.5 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onRun}
        disabled={isRunning}
        className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-2 rounded-md hover:brightness-110 active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
      >
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Running…
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            Run Code
          </>
        )}
      </button>
    </header>
  );
};

export default EditorHeader;

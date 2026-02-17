import { Terminal as TerminalIcon, Clock, HardDrive } from "lucide-react";

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: { id: number; description: string };
  time: string | null;
  memory: number | null;
}

interface TerminalProps {
  result: ExecutionResult | null;
  isRunning: boolean;
}

const Terminal = ({ result, isRunning }: TerminalProps) => {
  const hasError = result && (result.status.id >= 5 || result.stderr || result.compile_output);
  const output = result
    ? result.compile_output || result.stderr || result.stdout || "No output."
    : null;

  return (
    <div className="h-full flex flex-col bg-terminal">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-header">
        <TerminalIcon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Output
        </span>
        {result && !isRunning && (
          <span
            className={`ml-auto text-xs font-mono px-2 py-0.5 rounded ${
              hasError
                ? "bg-destructive/15 text-terminal-error"
                : "bg-primary/15 text-terminal-foreground"
            }`}
          >
            {result.status.description}
          </span>
        )}
      </div>

      {/* Terminal body */}
      <div className="flex-1 p-4 overflow-auto font-mono text-sm">
        {isRunning ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span>Executing…</span>
          </div>
        ) : result ? (
          <pre
            className={`whitespace-pre-wrap break-words leading-relaxed ${
              hasError ? "text-terminal-error" : "text-terminal-foreground"
            }`}
          >
            {output}
          </pre>
        ) : (
          <div className="text-terminal-muted italic">
            Click "Run Code" to execute your program.
          </div>
        )}
      </div>

      {/* Stats bar */}
      {result && !isRunning && (result.time || result.memory) && (
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-xs text-muted-foreground font-mono">
          {result.time && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>{result.time}s</span>
            </div>
          )}
          {result.memory && (
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3 h-3" />
              <span>{(result.memory / 1024).toFixed(1)} MB</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Terminal;

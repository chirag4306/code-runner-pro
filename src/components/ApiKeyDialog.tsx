import { useState } from "react";
import { Settings, ExternalLink } from "lucide-react";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiKeyDialog = ({ open, onOpenChange }: ApiKeyDialogProps) => {
  const [key, setKey] = useState(() => localStorage.getItem("judge0_api_key") ?? "");

  const save = () => {
    if (key.trim()) {
      localStorage.setItem("judge0_api_key", key.trim());
    } else {
      localStorage.removeItem("judge0_api_key");
    }
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)}>
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-foreground mb-1">API Configuration</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your RapidAPI key for Judge0 code execution.
        </p>
        <a
          href="https://rapidapi.com/judge0-official/api/judge0-ce"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mb-3"
        >
          Get a free key on RapidAPI <ExternalLink className="w-3 h-3" />
        </a>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Your RapidAPI Key"
          className="w-full bg-secondary text-foreground text-sm px-3 py-2.5 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring font-mono"
        />
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm px-4 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};

export const ApiKeyButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
    title="API Settings"
  >
    <Settings className="w-4 h-4" />
  </button>
);

export default ApiKeyDialog;

import { useState } from "react";
import { ChevronDown, ChevronUp, KeyboardIcon } from "lucide-react";

interface StdinInputProps {
  value: string;
  onChange: (value: string) => void;
}

const StdinInput = ({ value, onChange }: StdinInputProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <KeyboardIcon className="w-3.5 h-3.5" />
        <span className="uppercase tracking-wider">Stdin / Input</span>
        {open ? <ChevronUp className="w-3 h-3 ml-auto" /> : <ChevronDown className="w-3 h-3 ml-auto" />}
      </button>
      {open && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter input for your program…"
          maxLength={10000}
          className="w-full bg-terminal text-terminal-foreground font-mono text-sm px-4 py-3 resize-none focus:outline-none border-t border-border placeholder:text-terminal-muted"
          rows={4}
        />
      )}
    </div>
  );
};

export default StdinInput;

import { useState, useCallback } from "react";
import type { ExecutionResult } from "@/components/Terminal";
import { supabase } from "@/integrations/supabase/client";

export const useCodeExecution = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const execute = useCallback(async (code: string, languageId: number, stdin?: string) => {
    setIsRunning(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("execute-code", {
        body: {
          source_code: code,
          language_id: languageId,
          stdin: stdin || "",
        },
      });

      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);

      setResult(data);
    } catch (err) {
      setResult({
        stdout: null,
        stderr: err instanceof Error ? err.message : "An unknown error occurred.",
        compile_output: null,
        status: { id: 13, description: "Error" },
        time: null,
        memory: null,
      });
    } finally {
      setIsRunning(false);
    }
  }, []);

  return { execute, isRunning, result };
};

import { useState, useCallback } from "react";
import type { ExecutionResult } from "@/components/Terminal";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";

// We'll read the key from a publishable location or prompt the user
// For now, we use an edge function proxy approach if Cloud is enabled

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const useCodeExecution = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const execute = useCallback(async (code: string, languageId: number) => {
    setIsRunning(true);
    setResult(null);

    try {
      // Submit code
      const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": getApiKey(),
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
        }),
      });

      if (!submitRes.ok) throw new Error("Failed to submit code");
      const { token } = await submitRes.json();

      // Poll for result
      let attempts = 0;
      while (attempts < 20) {
        await sleep(1000);
        const pollRes = await fetch(
          `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`,
          {
            headers: {
              "X-RapidAPI-Key": getApiKey(),
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        if (!pollRes.ok) throw new Error("Failed to check status");
        const data = await pollRes.json();

        // Status 1 = In Queue, 2 = Processing
        if (data.status.id > 2) {
          setResult(data);
          break;
        }
        attempts++;
      }

      if (attempts >= 20) {
        setResult({
          stdout: null,
          stderr: "Execution timed out. Please try again.",
          compile_output: null,
          status: { id: 15, description: "Timed Out" },
          time: null,
          memory: null,
        });
      }
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

function getApiKey(): string {
  const key = localStorage.getItem("judge0_api_key");
  if (!key) throw new Error("No API key configured. Click the ⚙️ icon to add your RapidAPI key.");
  return key;
}

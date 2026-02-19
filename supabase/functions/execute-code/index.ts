import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const JUDGE0_URL = "https://ce.judge0.com";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { source_code, language_id, stdin } = await req.json();

    // Submit
    const submitRes = await fetch(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_code, language_id, stdin: stdin || "" }),
      }
    );

    if (!submitRes.ok) {
      const text = await submitRes.text();
      return new Response(JSON.stringify({ error: "Failed to submit code", details: text }), {
        status: submitRes.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { token } = await submitRes.json();

    // Poll
    for (let i = 0; i < 20; i++) {
      await sleep(1000);
      const pollRes = await fetch(
        `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`,
        { headers: { "Content-Type": "application/json" } }
      );

      if (!pollRes.ok) {
        const text = await pollRes.text();
        return new Response(JSON.stringify({ error: "Failed to check status", details: text }), {
          status: pollRes.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const data = await pollRes.json();
      if (data.status.id > 2) {
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    return new Response(
      JSON.stringify({
        stdout: null,
        stderr: "Execution timed out. Please try again.",
        compile_output: null,
        status: { id: 15, description: "Timed Out" },
        time: null,
        memory: null,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

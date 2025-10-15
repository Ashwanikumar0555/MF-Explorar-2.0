"use client";

import { useState } from "react";

export default function useGemini() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const getAIResponse = async (prompt: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.result || "No response found.");
    } catch (err) {
      console.error(err);
      setResult("Error fetching AI response.");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, getAIResponse };
}

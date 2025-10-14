"use client";

import useGemini from "@/hooks/useGemini";

export default function AIAdvisor({ fundName }: { fundName: string }) {
  const { result, loading, getAIResponse } = useGemini();

  const handleClick = () => {
    getAIResponse(
      `Analyze the mutual fund "${fundName}" and provide a short summary of its performance, ideal investor type, and 1-year outlook.`
    );
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md bg-white/10 backdrop-blur-md">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "🧠 Ask AI Advisor"}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-gray-800 text-gray-100 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">AI Insight:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

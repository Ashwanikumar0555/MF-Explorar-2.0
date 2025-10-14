"use client";

import { useParams } from "next/navigation";
import useFetch from "../../../../hooks/useFetch";
import NAVChart from "../../../../components/charts/NAVChart";
import Loader from "../../../../components/atoms/Loader";
import AIAdvisor from "../../../../components/ai/AIAdvisor";

export default function FundDetailPage() {
  const { id } = useParams();
  const { data, loading } = useFetch(`https://api.mfapi.in/mf/${id}`);

  if (loading) return <Loader />;

  // Extract relevant meta info
  const fundName = data?.meta?.scheme_name || "Unknown Fund";
  const fundHouse = data?.meta?.fund_house || "N/A";
  const schemeType = data?.meta?.scheme_type || "N/A";
  const schemeCategory = data?.meta?.scheme_category || "N/A";
  const lastNAV = data?.data?.[0]?.nav || "N/A";
  const lastDate = data?.data?.[0]?.date || "N/A";

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header Section */}
      <h2 className="text-3xl font-bold mb-4">{fundName}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-800 shadow">
          <p className=" text-sm">Fund House</p>
          <p className="font-semibold ">{fundHouse}</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-800 shadow">
          <p className="text-purple-400 text-sm">Scheme Type</p>
          <p className="font-semibold">{schemeType}</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-800 shadow">
          <p className="text-purple-400 text-sm">Category</p>
          <p className="font-semibold">{schemeCategory}</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-800 shadow">
          <p className="text-purple-400 text-sm">Latest NAV</p>
          <p className="font-semibold">
            ₹{lastNAV} <span className="text-sm text-gray-400">({lastDate})</span>
          </p>
        </div>
      </div>

      {/* NAV Chart Section */}
      <div className="my-8 bg-slate-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">📈 NAV History</h3>
        <NAVChart history={data?.data || []} />
      </div>

      {/* AI Advisor Section */}
      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3">🧠 AI Fund Insights</h3>
        <p className="text-gray-300 mb-3 text-sm">
          Click below to get an AI-powered summary, including risk level,
          performance insights, and ideal investor profile.
        </p>
        <AIAdvisor fundName={fundName} />
      </div>
    </div>
  );
}

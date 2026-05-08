'use client';

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


function ScoreRing({ score }) {


  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label =
    score >= 75 ? "Great" : score >= 50 ? "Average" : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="12"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-gray-900" style={{ fontSize: "2.4rem", fontWeight: 700, lineHeight: 1 }}>
            {score}
          </span>
          <span className="text-gray-400 text-sm mt-1">/ 100</span>
        </div>
      </div>
      <div
        className="px-4 py-1.5 rounded-xl text-white text-sm"
        style={{ backgroundColor: color, fontWeight: 600 }}
      >
        {label}
      </div>
    </div>
  );
}

function FeedbackCard({
  title,
  emoji,
  items,
  accentColor,
  bgColor,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4 flex-1">
      {/* Card header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: bgColor }}
        >
          {emoji}
        </div>
        <h3 className="text-gray-900" style={{ fontWeight: 700 }}>{title}</h3>
        <span
          className="ml-auto text-xs px-2.5 py-1 rounded-lg"
          style={{ backgroundColor: bgColor, color: accentColor, fontWeight: 600 }}
        >
          {items.length} items
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Items list */}
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: accentColor, marginTop: "6px" }}
            />
            <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResultPage() {

  const data = useSelector((state) => state.report.report)
  console.log(data);
  const router = useRouter();
  useEffect(() => {

    if (!data) {
      router.push("/");

    }
  }, [data])
  if (!data) return null;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top bar */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-center">
       
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow">
          <span className="text-lg">📄</span>
          <span className="text-gray-600 text-sm tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>Resume Analyzer</span>
        </div>
        {/* <button
          onClick={() => router.push("/export")}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition-colors duration-150 shadow"
          style={{ fontWeight: 500 }}
        >
          Export PDF
        </button> */}
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Score Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Score ring */}
            <ScoreRing score={data.score} />

            {/* Score breakdown */}
            <div className="flex-1 flex flex-col gap-4 w-full">
              <div>
                <h2 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
                  Your Resume Score
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Based on structure, keywords, impact, and ATS compatibility
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "ATS Compatibility", value: data.atsCompatibility, color: "#22c55e" },
                  { label: "Impact & Clarity", value: data.impactClarity, color: "#f59e0b" },
                  { label: "Keywords Match", value: data.keywordsMatch, color: "#f59e0b" },
                  { label: "Formatting", value: data.formatting, color: "#22c55e" },
                ].map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-xs" style={{ fontWeight: 500 }}>{metric.label}</span>
                      <span className="text-gray-900 text-xs" style={{ fontWeight: 600 }}>{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${metric.value}%`, backgroundColor: metric.color, transition: "width 0.8s ease" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume meta */}
            {/* <div className="flex flex-col gap-3 bg-gray-50 rounded-xl p-5 min-w-48">
              <p className="text-gray-400 text-xs uppercase" style={{ letterSpacing: "0.08em", fontWeight: 600 }}>File Details</p>
              {[
                { key: "File", value: "resume_v3.pdf" },
                { key: "Pages", value: "2 pages" },
                { key: "Word Count", value: "648 words" },
                { key: "Analyzed", value: "Just now" },
              ].map((detail) => (
                <div key={detail.key} className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{detail.key}</span>
                  <span className="text-gray-700 text-xs" style={{ fontWeight: 500 }}>{detail.value}</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* 3 Feedback Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeedbackCard
            title="Strengths"
            emoji="✅"
            items={data.strengths}
            accentColor="#16a34a"
            bgColor="#f0fdf4"
          />
          <FeedbackCard
            title="Weaknesses"
            emoji="❌"
            items={data.weaknesses}
            accentColor="#dc2626"
            bgColor="#fef2f2"
          />
          <FeedbackCard
            title="Suggestions"
            emoji="💡"
            items={data.suggestions}
            accentColor="#d97706"
            bgColor="#fffbeb"
          />
        </div>

        {/* Bottom CTA */}
        <div className="bg-black rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
              Ready to improve your score?
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Apply the suggestions above and re-upload for a fresh analysis.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/")}
              className="bg-white text-black px-5 py-3 rounded-xl text-sm hover:bg-gray-100 transition-colors duration-150 shadow cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              Upload New Resume
            </button>
            {/* <button
              onClick={() => router.push("/export")}
              className="bg-gray-800 text-white px-5 py-3 rounded-xl text-sm hover:bg-gray-700 transition-colors duration-150 border border-gray-700"
              style={{ fontWeight: 600 }}
            >
              Export PDF
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

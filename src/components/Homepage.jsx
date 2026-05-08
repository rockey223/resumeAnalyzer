'use client';
import { removeReport, setReport } from "@/lib/actions/reportSlice";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function HomePage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(removeReport());
  }, [])
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };


  const handleUpload = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post("/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data;
      dispatch(setReport(data.data))
      router.push("/result");
    } catch (error) {
      console.log("error client", error.message);
      setError(error.message || "Failed to analyze resume. Please try again.");
    }
    finally {
      setIsLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow mb-6">
          <span className="text-lg">📄</span>
          <span className="text-gray-600 text-sm tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>Resume Analyzer</span>
        </div>
        <h1 className="text-gray-900" style={{ fontSize: "2.75rem", fontWeight: 700, lineHeight: 1.15 }}>
          Analyze Your Resume
          <br />
          <span className="text-gray-400">in Seconds</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-md mx-auto" style={{ fontSize: "1.05rem" }}>
          Upload your resume and get instant AI-powered feedback on strengths, weaknesses, and actionable suggestions.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed transition-all duration-200 p-10 cursor-pointer ${isDragging
            ? "border-black bg-gray-50 scale-[1.01]"
            : fileName
              ? "border-green-400 bg-green-50"
              : "border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
            }`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            // accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {fileName ? (
            <>
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div className="text-center">
                <p className="text-gray-800" style={{ fontWeight: 600 }}>File ready!</p>
                <p className="text-gray-500 text-sm mt-1 max-w-xs truncate">{fileName}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setFileName(null); }}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Remove file
              </button>
            </>
          ) : (
            <>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${isDragging ? "bg-black" : "bg-gray-100"}`}>
                <span className="text-2xl">{isDragging ? "📥" : "📤"}</span>
              </div>
              <div className="text-center">
                <p className="text-gray-800" style={{ fontWeight: 600 }}>
                  {isDragging ? "Drop it here!" : "Drag & drop your resume"}
                </p>
                <p className="text-gray-400 text-sm mt-1">or click to browse files</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {["PDF"].map((fmt) => (
                  <span key={fmt} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">
                    {fmt}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-gray-400 text-sm">ready to analyze</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
        {
          error && <p className="text-red-500 text-sm text-center">{error}</p>
        }

        {/* CTA Button */}
        <button
          onClick={handleUpload}
          disabled={!fileName || isLoading}
          className={`w-full bg-black text-white rounded-xl py-4 transition-all duration-200 hover:bg-gray-800 active:scale-95 ${!fileName ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer shadow"
            }`}

          style={{ fontWeight: 600, fontSize: "1rem" }}
        >
          {fileName ? isLoading ? "Analyzing..." : "Analyze My Resume →" : "Upload a file to continue"}
        </button>

        <p className="text-center text-gray-400 text-xs mt-4">
          Your data is never stored or shared.
        </p>
      </div>

      {/* Footer stats */}
      <div className="flex items-center gap-8 mt-10">
        {[
          { label: "Resumes Analyzed", value: "12,400+" },
          { label: "Avg. Score Improvement", value: "34%" },
          { label: "Success Rate", value: "91%" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.2rem" }}>{stat.value}</p>
            <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

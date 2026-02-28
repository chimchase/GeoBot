"use client";

import type { AuditResponse } from "@/lib/types";

interface ScoreOverviewProps {
  audit: AuditResponse;
}

function gradeConfig(grade: string): { accent: string; bg: string; text: string } {
  switch (grade) {
    case "A":
      return { accent: "text-emerald-600", bg: "bg-emerald-50", text: "text-emerald-700" };
    case "B":
      return { accent: "text-lime-600", bg: "bg-lime-50", text: "text-lime-700" };
    case "C":
      return { accent: "text-amber-600", bg: "bg-amber-50", text: "text-amber-700" };
    case "D":
      return { accent: "text-orange-600", bg: "bg-orange-50", text: "text-orange-700" };
    default:
      return { accent: "text-red-600", bg: "bg-red-50", text: "text-red-700" };
  }
}

export function ScoreOverview({ audit }: ScoreOverviewProps) {
  const config = gradeConfig(audit.overall_grade);
  const pct = Math.round((audit.overall_score / audit.overall_max_score) * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
      <div className="relative z-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            GEO Score
          </p>
          <div className="flex items-baseline gap-3">
            <span className={`text-6xl font-black ${config.accent}`}>
              {pct}%
            </span>
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${config.bg} ${config.text}`}
            >
              {audit.overall_grade}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-400">
            {audit.overall_score} / {audit.overall_max_score} points
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">{audit.metadata.url}</p>
          <p className="text-xs text-slate-400">
            {new Date(audit.metadata.audited_at).toLocaleString()} &middot; {audit.metadata.duration_ms}ms
          </p>
        </div>
      </div>
    </div>
  );
}

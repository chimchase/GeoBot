"use client";

import type { AuditResponse } from "@/lib/types";

interface ScoreOverviewProps {
  audit: AuditResponse;
}

function gradeConfig(grade: string): { bg: string; text: string; glow: string } {
  switch (grade) {
    case "A":
      return { bg: "from-emerald-500 to-green-400", text: "text-emerald-950", glow: "shadow-emerald-500/30" };
    case "B":
      return { bg: "from-lime-500 to-green-400", text: "text-lime-950", glow: "shadow-lime-500/30" };
    case "C":
      return { bg: "from-amber-500 to-yellow-400", text: "text-amber-950", glow: "shadow-amber-500/30" };
    case "D":
      return { bg: "from-orange-500 to-amber-400", text: "text-orange-950", glow: "shadow-orange-500/30" };
    default:
      return { bg: "from-red-600 to-red-400", text: "text-red-950", glow: "shadow-red-500/30" };
  }
}

export function ScoreOverview({ audit }: ScoreOverviewProps) {
  const config = gradeConfig(audit.overall_grade);
  const pct = Math.round((audit.overall_score / audit.overall_max_score) * 100);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.bg} p-8 shadow-lg ${config.glow}`}>
      <div className="relative z-10 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <div>
          <p className={`text-sm font-semibold uppercase tracking-widest ${config.text} opacity-70`}>
            GEO Score
          </p>
          <div className="flex items-baseline gap-3">
            <span className={`text-7xl font-black ${config.text}`}>
              {pct}%
            </span>
            <span className={`text-4xl font-bold ${config.text} opacity-60`}>
              {audit.overall_grade}
            </span>
          </div>
          <p className={`mt-1 text-sm font-medium ${config.text} opacity-60`}>
            {audit.overall_score} / {audit.overall_max_score} points
          </p>
        </div>
        <div className={`text-right ${config.text}`}>
          <p className="text-sm opacity-60">{audit.metadata.url}</p>
          <p className="text-xs opacity-40">
            {new Date(audit.metadata.audited_at).toLocaleString()} &middot; {audit.metadata.duration_ms}ms
          </p>
        </div>
      </div>
      <div className={`absolute -right-8 -top-8 h-40 w-40 rounded-full ${config.text} opacity-10 blur-2xl`} />
    </div>
  );
}

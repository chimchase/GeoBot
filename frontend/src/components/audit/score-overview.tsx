"use client";

import { Card } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/score-ring";
import type { AuditResponse } from "@/lib/types";

interface ScoreOverviewProps {
  audit: AuditResponse;
}

function gradeColor(grade: string): string {
  switch (grade) {
    case "A":
      return "text-green-500";
    case "B":
      return "text-lime-500";
    case "C":
      return "text-yellow-500";
    case "D":
      return "text-orange-500";
    default:
      return "text-red-500";
  }
}

export function ScoreOverview({ audit }: ScoreOverviewProps) {
  return (
    <Card className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
      <div className="relative">
        <ScoreRing
          score={audit.overall_score}
          maxScore={audit.overall_max_score}
          size={140}
          strokeWidth={12}
        />
      </div>
      <div className="flex flex-col items-center gap-1 sm:items-start">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            GEO Score
          </span>
          <span className={`text-3xl font-bold ${gradeColor(audit.overall_grade)}`}>
            {audit.overall_grade}
          </span>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {audit.metadata.url}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Audited {new Date(audit.metadata.audited_at).toLocaleString()} &middot;{" "}
          {audit.metadata.duration_ms}ms
        </p>
      </div>
    </Card>
  );
}

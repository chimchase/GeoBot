"use client";

import { useState } from "react";
import type { CheckResult, CheckStatus } from "@/lib/types";

interface CheckItemProps {
  check: CheckResult;
}

const statusConfig: Record<CheckStatus, { icon: string; bg: string; text: string; border: string }> = {
  pass: { icon: "\u2713", bg: "bg-emerald-100", text: "text-emerald-600", border: "" },
  warn: { icon: "!", bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200 hover:border-amber-300" },
  fail: { icon: "\u2717", bg: "bg-red-100", text: "text-red-600", border: "border-red-200 hover:border-red-300" },
  info: { icon: "i", bg: "bg-blue-100", text: "text-blue-600", border: "" },
};

export function CheckItem({ check }: CheckItemProps) {
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[check.status];
  const isActionable = (check.status === "fail" || check.status === "warn") && check.recommendation;
  const borderClass = isActionable ? config.border : "border-slate-100";

  return (
    <div
      className={`rounded-lg border transition-colors ${borderClass} ${isActionable ? "cursor-pointer" : ""}`}
      onClick={() => isActionable && setExpanded(!expanded)}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${config.bg} ${config.text}`}
        >
          {config.icon}
        </span>
        <span className="flex-1 text-sm font-medium text-slate-700">
          {check.name}
        </span>
        <span className="text-sm text-slate-400">
          {check.score}/{check.max_score}
        </span>
        {isActionable && (
          <span className={`text-xs ${config.text}`}>{expanded ? "\u25B2" : "\u25BC"}</span>
        )}
      </div>
      {expanded && isActionable && (
        <div className="border-t border-slate-100 px-4 py-3">
          <p className="mb-3 text-sm text-slate-500">
            {check.description}
          </p>
          <div className={`rounded-lg p-3 ${check.status === "fail" ? "bg-red-50" : "bg-amber-50"}`}>
            <p className={`mb-1 text-xs font-semibold uppercase tracking-wide ${config.text}`}>
              Recommended Action
            </p>
            <p className="text-sm text-slate-600">
              {check.recommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

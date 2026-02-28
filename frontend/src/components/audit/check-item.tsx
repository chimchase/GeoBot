"use client";

import { useState } from "react";
import type { CheckResult, CheckStatus } from "@/lib/types";

interface CheckItemProps {
  check: CheckResult;
}

const statusConfig: Record<CheckStatus, { icon: string; bg: string; text: string }> = {
  pass: { icon: "\u2713", bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400" },
  warn: { icon: "!", bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400" },
  fail: { icon: "\u2717", bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400" },
  info: { icon: "i", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
};

export function CheckItem({ check }: CheckItemProps) {
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[check.status];
  const hasDetail = check.recommendation || check.description;

  return (
    <div
      className={`rounded-lg border border-zinc-100 dark:border-zinc-800 ${hasDetail ? "cursor-pointer" : ""}`}
      onClick={() => hasDetail && setExpanded(!expanded)}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${config.bg} ${config.text}`}
        >
          {config.icon}
        </span>
        <span className="flex-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {check.name}
        </span>
        <span className="text-sm text-zinc-500">
          {check.score}/{check.max_score}
        </span>
        {hasDetail && (
          <span className="text-xs text-zinc-400">{expanded ? "\u25B2" : "\u25BC"}</span>
        )}
      </div>
      {expanded && (
        <div className="border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {check.description}
          </p>
          {check.recommendation && (
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">Recommendation:</span>{" "}
              {check.recommendation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

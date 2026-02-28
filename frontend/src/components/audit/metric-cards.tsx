"use client";

import type { AuditResponse } from "@/lib/types";

interface MetricCardsProps {
  audit: AuditResponse;
}

function computeMetrics(audit: AuditResponse) {
  const passed = audit.categories.reduce(
    (sum, cat) => sum + cat.checks.filter((c) => c.status === "pass").length,
    0
  );
  const failed = audit.categories.reduce(
    (sum, cat) => sum + cat.checks.filter((c) => c.status === "fail").length,
    0
  );
  const warnings = audit.categories.reduce(
    (sum, cat) => sum + cat.checks.filter((c) => c.status === "warn").length,
    0
  );
  const pct = Math.round((audit.overall_score / audit.overall_max_score) * 100);

  return { passed, failed, warnings, pct };
}

type Metrics = ReturnType<typeof computeMetrics>;

const metricConfigs = [
  {
    key: "score",
    label: "GEO Score",
    getValue: (m: Metrics) => `${m.pct}%`,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    key: "passed",
    label: "Checks Passed",
    getValue: (m: Metrics) => `${m.passed}`,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    key: "failed",
    label: "Issues Found",
    getValue: (m: Metrics) => `${m.failed}`,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    key: "warnings",
    label: "Warnings",
    getValue: (m: Metrics) => `${m.warnings}`,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
] as const;

export function MetricCards({ audit }: MetricCardsProps) {
  const metrics = computeMetrics(audit);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metricConfigs.map((cfg) => (
        <div
          key={cfg.key}
          className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${cfg.iconBg} ${cfg.iconColor}`}
            >
              {cfg.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {cfg.getValue(metrics)}
              </p>
              <p className="text-sm text-slate-400">{cfg.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

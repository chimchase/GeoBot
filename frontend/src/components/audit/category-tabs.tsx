"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckItem } from "./check-item";
import type { CategoryScore } from "@/lib/types";

interface CategoryTabsProps {
  categories: CategoryScore[];
}

function scoreColor(pct: number): string {
  if (pct >= 80) return "bg-emerald-500";
  if (pct >= 50) return "bg-amber-500";
  return "bg-red-500";
}

function barColor(pct: number): string {
  if (pct >= 80) return "bg-emerald-500";
  if (pct >= 60) return "bg-amber-500";
  if (pct >= 40) return "bg-orange-500";
  return "bg-red-500";
}

export function CategoryTabs({ categories }: CategoryTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const active = categories[activeTab];
  const activePct = Math.round((active.score / active.max_score) * 100);

  return (
    <Card className="p-0">
      {/* Tab grid */}
      <div className="grid grid-cols-2 border-b border-slate-100 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, i) => {
          const pct = Math.round((cat.score / cat.max_score) * 100);
          const isActive = i === activeTab;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(i)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50/50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${scoreColor(pct)}`}
              />
              <span className="truncate">{cat.name}</span>
              <span
                className={`shrink-0 text-xs ${
                  isActive ? "text-indigo-400" : "text-slate-400"
                }`}
              >
                {cat.score}/{cat.max_score}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div className="p-6">
        {/* Category header */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-900">
            {active.name}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {active.description}
          </p>

          {/* Progress bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${barColor(activePct)}`}
                style={{ width: `${activePct}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-slate-600">
              {activePct}%
            </span>
          </div>
        </div>

        {/* Checks list */}
        <div className="flex flex-col gap-2">
          {active.checks.map((check) => (
            <CheckItem key={check.id} check={check} />
          ))}
        </div>
      </div>
    </Card>
  );
}

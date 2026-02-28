"use client";

import { Card } from "@/components/ui/card";

interface BotPerspectiveProps {
  summary: string;
}

export function BotPerspective({ summary }: BotPerspectiveProps) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-lg">
          <span className="text-indigo-600">B</span>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            The Bot&apos;s Perspective
          </h2>
          <p className="text-sm leading-relaxed text-slate-500">
            {summary}
          </p>
        </div>
      </div>
    </Card>
  );
}

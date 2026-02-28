"use client";

import { Card } from "@/components/ui/card";

interface BotPerspectiveProps {
  summary: string;
}

export function BotPerspective({ summary }: BotPerspectiveProps) {
  return (
    <Card className="border-slate-700/50 bg-slate-800/50">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-lg">
          <span className="text-emerald-400">B</span>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-white">
            The Bot&apos;s Perspective
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            {summary}
          </p>
        </div>
      </div>
    </Card>
  );
}

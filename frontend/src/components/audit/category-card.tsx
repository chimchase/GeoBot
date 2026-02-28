"use client";

import { Card } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/score-ring";
import { CheckItem } from "./check-item";
import type { CategoryScore } from "@/lib/types";

interface CategoryCardProps {
  category: CategoryScore;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-4">
        <div className="relative">
          <ScoreRing
            score={category.score}
            maxScore={category.max_score}
            size={64}
            strokeWidth={6}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {category.name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {category.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {category.checks.map((check) => (
          <CheckItem key={check.id} check={check} />
        ))}
      </div>
    </Card>
  );
}

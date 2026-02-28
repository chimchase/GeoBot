"use client";

interface ScoreRingProps {
  score: number;
  maxScore: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

function getScoreColor(pct: number): string {
  if (pct >= 80) return "#22c55e";
  if (pct >= 60) return "#eab308";
  if (pct >= 40) return "#f97316";
  return "#ef4444";
}

export function ScoreRing({
  score,
  maxScore,
  size = 120,
  strokeWidth = 10,
  label,
}: ScoreRingProps) {
  const pct = Math.round((score / maxScore) * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const color = getScoreColor(pct);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-2xl font-bold text-white" style={{ color }}>
          {score}
        </span>
        <span className="text-xs text-slate-500">/ {maxScore}</span>
      </div>
      {label && (
        <span className="mt-1 text-sm font-medium text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
}

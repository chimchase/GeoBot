"use client";

import { useState } from "react";

interface AuditFormProps {
  onSubmit: (url: string) => void;
  loading?: boolean;
}

export function AuditForm({ onSubmit, loading }: AuditFormProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    const normalized = url.startsWith("http") ? url : `https://${url}`;
    onSubmit(normalized);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-3">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL (e.g. example.com)"
        className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-base text-white placeholder-slate-500 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Auditing..." : "Audit"}
      </button>
    </form>
  );
}

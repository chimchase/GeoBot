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
        className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-blue-400"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Auditing..." : "Audit"}
      </button>
    </form>
  );
}

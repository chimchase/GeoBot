"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAudit } from "@/hooks/use-audit";
import { AuditForm } from "@/components/audit/audit-form";
import { ScoreOverview } from "@/components/audit/score-overview";
import { CategoryCard } from "@/components/audit/category-card";

function AuditContent() {
  const searchParams = useSearchParams();
  const urlParam = searchParams.get("url");
  const { data, loading, error, audit } = useAudit();

  useEffect(() => {
    if (urlParam && !data && !loading) {
      audit(urlParam);
    }
  }, [urlParam]);

  const handleNewAudit = (url: string) => {
    window.history.pushState(null, "", `/audit?url=${encodeURIComponent(url)}`);
    audit(url);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          GeoBot
        </h1>
        <AuditForm onSubmit={handleNewAudit} loading={loading} />
      </div>

      {loading && (
        <div className="flex flex-col items-center gap-3 py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600" />
          <p className="text-sm text-zinc-500">Analyzing AI search visibility...</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {data && !loading && (
        <>
          <ScoreOverview audit={data} />
          <div className="grid gap-6 md:grid-cols-2">
            {data.categories.map((category) => (
              <CategoryCard key={category.key} category={category} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function AuditPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600" />
          </div>
        }
      >
        <AuditContent />
      </Suspense>
    </div>
  );
}

"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAudit } from "@/hooks/use-audit";
import { Sidebar } from "@/components/layout/sidebar";
import { AuditForm } from "@/components/audit/audit-form";
import { ScoreOverview } from "@/components/audit/score-overview";
import { BotPerspective } from "@/components/audit/bot-perspective";
import { CategoryCard } from "@/components/audit/category-card";
import { SpiderWeb } from "@/components/audit/spider-web";

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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <AuditForm onSubmit={handleNewAudit} loading={loading} />
      </div>

      {loading && (
        <div className="flex flex-col items-center gap-3 py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-500" />
          <p className="text-sm text-slate-500">Analyzing AI search visibility...</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">
          {error}
        </div>
      )}

      {data && !loading && (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-1">
              <ScoreOverview audit={data} />
            </div>
            <div className="xl:col-span-2">
              <BotPerspective summary={data.summary} />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.categories.map((category) => (
              <CategoryCard key={category.key} category={category} />
            ))}
          </div>
          <div id="sitemap">
            <SpiderWeb siteMap={data.site_map} />
          </div>
        </>
      )}
    </div>
  );
}

export default function AuditPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-16 flex-1 p-6 lg:ml-56">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-500" />
            </div>
          }
        >
          <AuditContent />
        </Suspense>
      </main>
    </div>
  );
}

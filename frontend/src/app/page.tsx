"use client";

import { useRouter } from "next/navigation";
import { AuditForm } from "@/components/audit/audit-form";

export default function Home() {
  const router = useRouter();

  const handleSubmit = (url: string) => {
    router.push(`/audit?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <main className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white">
            G
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            GeoBot
          </h1>
          <p className="max-w-md text-lg text-slate-500">
            Audit your website for AI search visibility. See how you appear in
            ChatGPT, Perplexity, and Google AI Overviews.
          </p>
        </div>
        <AuditForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}

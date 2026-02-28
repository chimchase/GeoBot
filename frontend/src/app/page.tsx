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
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            GeoBot
          </h1>
          <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            Audit your website for AI search visibility. See how you appear in
            ChatGPT, Perplexity, and Google AI Overviews.
          </p>
        </div>
        <AuditForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}

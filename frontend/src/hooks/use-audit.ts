"use client";

import { useState } from "react";
import { runAudit } from "@/lib/api";
import type { AuditResponse } from "@/lib/types";

export function useAudit() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audit = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await runAudit(url);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Audit failed");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, audit };
}

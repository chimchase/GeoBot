import type { AuditResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function runAudit(url: string): Promise<AuditResponse> {
  const response = await fetch(`${API_BASE}/api/v1/audit/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(`Audit failed: ${response.statusText}`);
  }

  return response.json();
}

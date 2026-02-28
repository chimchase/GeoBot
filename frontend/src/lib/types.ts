export type CheckStatus = "pass" | "warn" | "fail" | "info";

export interface CheckResult {
  id: string;
  name: string;
  category: string;
  status: CheckStatus;
  score: number;
  max_score: number;
  description: string;
  recommendation: string | null;
}

export interface CategoryScore {
  name: string;
  key: string;
  score: number;
  max_score: number;
  description: string;
  checks: CheckResult[];
}

export interface AuditMetadata {
  url: string;
  audited_at: string;
  duration_ms: number;
  engine: string;
}

export interface SiteMapNode {
  id: string;
  label: string;
  score: number;
  max_score: number;
}

export interface SiteMapLink {
  source: string;
  target: string;
}

export interface SiteMap {
  nodes: SiteMapNode[];
  links: SiteMapLink[];
}

export interface AuditResponse {
  metadata: AuditMetadata;
  overall_score: number;
  overall_max_score: number;
  overall_grade: string;
  summary: string;
  site_map: SiteMap;
  categories: CategoryScore[];
}

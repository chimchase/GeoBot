from pydantic import BaseModel, HttpUrl


class AuditRequest(BaseModel):
    url: HttpUrl


class CheckResult(BaseModel):
    id: str
    name: str
    category: str
    status: str  # "pass" | "warn" | "fail" | "info"
    score: int
    max_score: int
    description: str
    recommendation: str | None = None


class CategoryScore(BaseModel):
    name: str
    key: str
    score: int
    max_score: int
    description: str
    checks: list[CheckResult]


class AuditMetadata(BaseModel):
    url: str
    audited_at: str
    duration_ms: int
    engine: str


class SiteMapNode(BaseModel):
    id: str
    label: str
    score: int
    max_score: int


class SiteMapLink(BaseModel):
    source: str
    target: str


class SiteMap(BaseModel):
    nodes: list[SiteMapNode]
    links: list[SiteMapLink]


class AuditResponse(BaseModel):
    metadata: AuditMetadata
    overall_score: int
    overall_max_score: int
    overall_grade: str
    summary: str
    site_map: SiteMap
    categories: list[CategoryScore]

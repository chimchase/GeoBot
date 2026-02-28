from fastapi import APIRouter

from app.schemas.audit import AuditRequest, AuditResponse
from app.services.audit_service import run_audit

router = APIRouter(prefix="/audit", tags=["audit"])


@router.post("/", response_model=AuditResponse)
async def create_audit(request: AuditRequest) -> AuditResponse:
    """Run a GEO audit on the provided URL."""
    return await run_audit(request.url)

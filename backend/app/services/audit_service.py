from app.mock.audit_data import generate_mock_audit
from app.schemas.audit import AuditResponse


async def run_audit(url: str) -> AuditResponse:
    """Run a GEO audit. Currently returns mock data.
    Replace with real analysis when crawlers/analyzers are ready.
    """
    return generate_mock_audit(url)

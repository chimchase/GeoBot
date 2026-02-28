from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_audit_endpoint():
    response = client.post(
        "/api/v1/audit/",
        json={"url": "https://example.com"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "overall_score" in data
    assert "categories" in data
    assert len(data["categories"]) == 6
    assert data["metadata"]["url"] == "https://example.com/"
    assert data["overall_max_score"] == 100


def test_audit_invalid_url():
    response = client.post(
        "/api/v1/audit/",
        json={"url": "not-a-url"},
    )
    assert response.status_code == 422

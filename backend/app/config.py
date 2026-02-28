from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "GeoBot"
    debug: bool = True
    cors_origins: list[str] = ["http://localhost:3000"]

    model_config = {"env_file": ".env"}


settings = Settings()

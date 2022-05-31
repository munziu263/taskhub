import pytest
from api.app.app import init_app


@pytest.fixture
def client():
    app = init_app()

    yield app.test_client()

import os


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = True

    SQLALCHEMY_DATABASE_URI = "sqlite://"


class ProdConfig(Config):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = False

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "postgresql://munziu:secret@db:5432/taskhub", "sqlite://"
    )

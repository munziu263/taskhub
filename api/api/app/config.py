import os


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = True

    SQLALCHEMY_DATABASE_URI = "sqlite:///db.sqlite3"


class ProdConfig(Config):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = False

    SQLALCHEMY_DATABASE_URI = "postgresql://admin:admin@db:5432/taskhub"

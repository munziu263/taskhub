db_path = "./api/app/database.sqlite"

"""Flask configuration."""


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = True

    SQLALCHEMY_DATABASE_URI = "sqlite://"


class ProdConfig(Config):
    TESTING = False

    SQLALCHEMY_DATABASE_URI = "sqlite:///" + db_path

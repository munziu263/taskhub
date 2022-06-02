db_path = r"C:\Users\mziumbe\Documents\GitHub\taskhub\api\api\app\database.sqlite"

"""Flask configuration."""


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = True

    SQLALCHEMY_DATABASE_URI = "sqlite://"


class ProdConfig(Config):
    TESTING = False

    SQLALCHEMY_DATABASE_URI = "sqlite:///" + db_path

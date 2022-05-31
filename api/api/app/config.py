db_path = r"C:\Users\mziumbe\Documents\GitHub\taskhub\api\api\app\database.db"
db_test_path = r"C:\Users\mziumbe\Documents\GitHub\taskhub\api\api\test\database.db"

"""Flask configuration."""


class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = True

    SQLALCHEMY_DATABASE_URI = "sqlite:///" + db_test_path


class ProdConfig(Config):
    TESTING = False

    SQLALCHEMY_DATABASE_URI = "sqlite:///" + db_path

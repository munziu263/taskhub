from distutils.command.config import config
from typing import Type
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from .load_test_data import load_test_data
from .models import db, ma

cors = CORS()


def init_app(config_filename="app.config.Config"):
    # --- Initialize core application
    app = Flask(__name__)
    app.config.from_object(config_filename)

    # --- Initialize plugins
    db.init_app(app)
    ma.init_app(app)
    cors.init_app(app)

    with app.app_context():
        # Include routes
        from . import routes

        load_test_data(db)

        return app

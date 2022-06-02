from flask import Flask
from flask_cors import CORS

# from .load_test_data import load_test_data
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
        # Register blueprints
        from .main import main as main_bp

        app.register_blueprint(main_bp)

        # load_test_data(db)
        db.create_all()

        return app

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


# --- Initialize app
app = Flask(__name__)

# --- Add CORS functionality
CORS(app)

# --- Add Database
db_path = r"C:\Users\mziumbe\Documents\GitHub\taskhub\backend\taskhub\database.db"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
db = SQLAlchemy(app)

# --- Add all models Models
import models


# --- Add routes for the tasks and projects
import routes

if __name__ == "__main__":
    # --- Run the app 
    app.run(debug=True)
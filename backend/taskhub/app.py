from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass


# --- Initialize app
app = Flask(__name__)

# --- Add CORS functionality
CORS(app)

# --- Add Database
db_path = r"C:\Users\mziumbe\Documents\GitHub\taskhub\backend\taskhub\database.db"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
db = SQLAlchemy(app)

# --- Models

@dataclass
class Task(db.Model):
    id: int
    name: str
    project_id: int
    estimated_time: int
    elapsed_time: int
    complete: bool
    priority: int
    deadline: datetime
    
    __tablename__="task"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    estimated_time = db.Column(db.Integer, default=0)
    elapsed_time = db.Column(db.Integer, nullable=False, default=0)
    complete = db.Column(db.Boolean, nullable=False, default=False)
    priority = db.Column(db.Integer)
    deadline = db.Column(db.DateTime)    
    # --- Relationships
    project_id = db.Column(db.Integer, 
                           db.ForeignKey('project.id'), 
                           nullable=False,
                           default=1)
    
    def __repr__(self):
        return '<Task %r>' % self.name
    
@dataclass
class Project(db.Model):
    id: int
    name: str
    tasks: Task
    
    __tablename__="project"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    # --- Relationships
    tasks = db.relationship("Task", backref="project")
    
    def __repr__(self):
        return '<Task %r>' % self.name

# --- Add routes for the tasks and projects
@app.route("/", methods = ["GET", "POST"])
def index():
    if request.method == "POST":
        pass
    else:
        tasks = db.session.query(Project).join(Task, Project.id == Task.project_id).all()
        return jsonify(tasks)


if __name__ == "__main__":
    # --- Run the app 
    app.run(debug=True)
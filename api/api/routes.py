from api.app import app, db
from api.models import Project, Task
from flask import request, jsonify

# --- BASE ROUTE
@app.route("/", methods = ["GET"])
def index():
    result = db.session.query(Project).all()
    return jsonify(result)

# --- GET routes
@app.route('/projects/', methods = ["GET"])
def get_all_projects():
    result = db.session.query(Project).all()
    return jsonify(result)

@app.route('/projects/<int:project_id>', methods = ["GET"])
def get_project_by_id(project_id: int):
    result = Project.query.filter_by(id = project_id).first_or_404()           
    return jsonify(result)

@app.route('/tasks/', methods = ["GET"])
def get_all_tasks():
    result = Task.query.all()
    return jsonify(result)

@app.route('/tasks/<int:task_id>', methods = ["GET"])
def get_task_by_id(task_id: int = None):
    result = Task.query.filter_by(id = task_id).first_or_404()
    return jsonify(result)

# --- POST Routes
@app.route("/projects/", methods = ["POST"])
def create_project():
    pass

@app.route("/projects/", methods = ["POST"])
def add_task_to_project():
    pass

@app.route("/tasks/", methods = ["POST"])
def create_task():
    pass
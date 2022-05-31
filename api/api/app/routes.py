from .models import ProjectSchema, TaskSchema, db
from .models import Project, Task
from flask import request, jsonify
from flask import current_app as app

# --- BASE ROUTE
@app.route("/", methods=["GET"])
def index():
    result = Project.query.all()
    return jsonify(result)


# --- GET routes
@app.route("/projects/", methods=["GET"])
def get_all_projects():
    result = db.session.query(Project).all()
    return jsonify(result)


@app.route("/projects/<int:project_id>", methods=["GET"])
def get_project_by_id(project_id: int):
    result = Project.query.filter_by(id=project_id).first_or_404()
    return jsonify(result)


@app.route("/tasks/", methods=["GET"])
def get_all_tasks():
    result = Task.query.all()
    return jsonify(result)


@app.route("/tasks/<int:task_id>", methods=["GET"])
def get_task_by_id(task_id: int = None):
    result = Task.query.filter_by(id=task_id).first_or_404()
    return jsonify(result)


# --- POST Routes
@app.route("/projects/", methods=["POST"])
def create_project():
    data = request.json
    result = Project.query.filter_by(id=project_id).first_or_404()
    project_schema = ProjectSchema()

    project = project_schema.loads(data)

    db.session.add(data)

    return project_schema.jsonify(project)


@app.route("/projects/<int:project_id>", methods=["POST"])
def add_task_to_project(project_id: int):
    data = request.json
    task_schema = TaskSchema()

    task = task_schema.loads(data, project_id=project_id)

    db.session.add(data)

    return task_schema.jsonify(task)


@app.route("/tasks/", methods=["POST"])
def create_task():
    data = request.json
    task_schema = TaskSchema()

    task = task_schema.loads(data)

    db.session.add(data)

    return task_schema.jsonify(task)

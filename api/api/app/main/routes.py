import json
from ..models import ProjectSchema, TaskSchema, db
from ..models import Project, Task
from flask import request, jsonify, request_started
from . import main


# --- BASE ROUTE
@main.route("/", methods=["GET"])
def index():
    result = Project.query.all()
    return jsonify(result)


# --- GET routes
@main.route("/projects/", methods=["GET"])
def get_all_projects():
    result = db.session.query(Project).all()
    return jsonify(result)


@main.route("/projects/<int:project_id>", methods=["GET"])
def get_project_by_id(project_id: int):
    result = Project.query.filter_by(id=project_id).first_or_404()
    return jsonify(result)


@main.route("/tasks/", methods=["GET"])
def get_all_tasks():
    result = Task.query.all()
    return jsonify(result)


@main.route("/tasks/<int:task_id>", methods=["GET"])
def get_task_by_id(task_id: int):
    result = Task.query.filter_by(id=task_id).first_or_404()
    return jsonify(result)


# --- POST Routes
@main.route("/projects/", methods=["POST"])
def create_project():
    data = request.json
    project_schema = ProjectSchema()
    project = project_schema.loads(data)

    db.session.add(project)
    db.session.commit()

    return project_schema.jsonify(project), 201


@main.route("/projects/<int:project_id>", methods=["POST"])
def add_task_to_project(project_id: int):
    data = json.loads(request.json)

    # --- Add the project number to the request data
    data["project_id"] = project_id
    data = json.dumps(data)

    task_schema = TaskSchema()
    task = task_schema.loads(data)

    db.session.add(task)
    db.session.commit()

    return task_schema.jsonify(task), 201


@main.route("/tasks/", methods=["POST"])
def create_task():
    data = request.json
    task_schema = TaskSchema()
    task = task_schema.loads(data)

    db.session.add(task)
    db.session.commit()

    return task_schema.jsonify(task), 201


# --- PUT / UPDATE ROUTES
@main.route("/projects/<int:project_id>", methods=["PUT"])
def update_project_by_id(project_id: int):
    data = json.loads(request.json)

    project_schema = ProjectSchema()
    project = project_schema.loads(request.json)

    db.session.query(Project).filter_by(id=project_id).update(data)
    db.session.commit()

    return project_schema.jsonify(project)

from api.app.utils import load_data_using_schema
from ..models import ProjectSchema, TaskSchema, db
from ..models import Project, Task
from flask import request, jsonify, Blueprint
from flask import current_app as app
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
def get_task_by_id(task_id: int = None):
    result = Task.query.filter_by(id=task_id).first_or_404()
    return jsonify(result)


# --- POST Routes
@main.route("/projects/", methods=["POST"])
def create_project():
    data = request.json

    [schema, project] = load_data_using_schema(ProjectSchema, data)

    return schema.jsonify(project)


@main.route("/projects/<int:project_id>", methods=["POST"])
def add_task_to_project(project_id: int):
    data = request.json

    [schema, task] = load_data_using_schema(TaskSchema, data)

    return schema.jsonify(task)


@main.route("/tasks/", methods=["POST"])
def create_task():
    data = request.json
    [schema, task] = load_data_using_schema(TaskSchema, data)

    return schema.jsonify(task)

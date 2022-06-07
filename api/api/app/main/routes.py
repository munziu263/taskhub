import json

from flask_cors import cross_origin
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
@main.route("/projects", methods=["GET"])
def get_all_projects():
    result = Project.query.all()
    return jsonify(result)


@main.route("/projects/<int:project_id>", methods=["GET"])
def get_project_by_id(project_id: int):
    result = Project.get_by_id(project_id)
    return jsonify(result)


@main.route("/tasks", methods=["GET"])
def get_all_tasks():
    result = Task.query.all()
    return jsonify(result)


@main.route("/tasks/<int:task_id>", methods=["GET"])
def get_task_by_id(task_id: int):
    result = Task.get_by_id(task_id)
    return jsonify(result)


# --- POST Routes
@main.route("/projects", methods=["POST"])
@cross_origin()
def create_project():
    data = request.json
    created_project = Project.create(**data)
    return jsonify(created_project), 201


@main.route("/projects/<int:project_id>", methods=["POST"])
@cross_origin()
def add_task_to_project(project_id: int):
    data = request.json
    created_task = Task.create(**data)
    task_in_project = created_task.update(project_id=project_id)
    return jsonify(task_in_project), 201


@main.route("/tasks", methods=["POST"])
@cross_origin()
def create_task():
    data = request.json
    created_task = Task.create(**data)
    return jsonify(created_task), 201


# --- PUT / UPDATE ROUTES
@main.route("/projects/<int:project_id>", methods=["PUT"])
@cross_origin()
def update_project_by_id(project_id: int):
    data = request.json
    updated_project = Project.get_by_id(project_id).update(**data).save()
    return jsonify(updated_project)


@main.route("/tasks/<int:task_id>", methods=["PUT"])
@cross_origin()
def update_task_by_id(task_id: int):
    data = request.json
    updated_task = Task.get_by_id(task_id).update(**data).save()
    return jsonify(updated_task)


# --- DELETE ROUTES
@main.route("/projects/<int:project_id>", methods=["DELETE"])
@cross_origin()
def delete_project_by_id(project_id: int):
    Project.get_by_id(project_id).delete()
    updated_projects = Project.query.all()
    return jsonify(updated_projects)


@main.route("/tasks/<int:task_id>", methods=["DELETE"])
@cross_origin()
def delete_task_by_id(task_id: int):
    Task.get_by_id(task_id).delete()
    updated_tasks = Task.query.all()
    return jsonify(updated_tasks)

import requests
import json
from pprint import pprint

task1 = json.loads(
    """{
    "complete": false, 
    "deadline": null, 
    "elapsed_time": 0, 
    "estimated_time": 300, 
    "id": 1, 
    "name": "Build task list page", 
    "priority": null, 
    "project_id": 2
    }"""
)

project1 = json.loads(
    """{
        "id": 1, 
        "name": "global", 
        "tasks": [
            {
            "complete": false, 
            "deadline": null, 
            "elapsed_time": 0, 
            "estimated_time": 120, 
            "id": 5, 
            "name": "File tax return", 
            "priority": null, 
            "project_id": 1
            }, 
            {
            "complete": false, 
            "deadline": null, 
            "elapsed_time": 0, 
            "estimated_time": 120, 
            "id": 10, 
            "name": "Book visa appointment", 
            "priority": null, 
            "project_id": 1
            }
        ]
    }"""
)


def test_index(client):
    res = client.get("/projects/")

    assert res.status_code == 200
    assert project1 in res.json

    res = client.get("project/")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_get_all_projects(client):
    res = client.get("/projects/")

    assert res.status_code == 200
    assert project1 in res.json

    res = client.get("project/")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_get_project_by_id(client):
    res = client.get("/projects/1")

    assert res.status_code == 200
    assert res.json == project1

    res = client.get("project/1")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_get_all_tasks(client):
    res = client.get("/tasks/")

    assert res.status_code == 200
    assert task1 in res.json

    res = client.get("task/")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_get_task_by_id(client):
    res = client.get("/tasks/1")

    assert res.status_code == 200
    assert res.json == task1

    res = client.get("task/1")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_create_project(client):
    data = json.dumps({"name": "ERM Handbook"})

    res = client.post("/projects/", data=data)

    assert res.status_code == 201
    assert data in res.json


def test_add_task_to_project(client):
    pass


def test_create_task(client):
    pass

import json
from typing import Dict, List
import random

# --- Dummy data

dummy_projects = [
    {"name": "Taskhub"},
    {"name": "ERM_DBS"},
    {"name": "Visa"},
    {"name": "ERM Handbook"},
]

dummy_tasks = [
    {"name": "Build task list page", "estimated_time": 300},
    {"name": "Build sidebar", "estimated_time": 280},
    {"name": "Build functioning API", "estimated_time": 300},
    {"name": "Build API endpoints", "estimated_time": 180},
    {"name": "File tax return", "estimated_time": 120},
    {"name": "Build word document parser", "estimated_time": 300},
    {"name": "Build frontend views", "estimated_time": 180},
    {"name": "Collect Documents", "estimated_time": 300},
    {"name": "Check Requirements", "estimated_time": 180},
    {"name": "Book visa appointment", "estimated_time": 120},
]


def given_x_objects(x: int, object_type: str, client):
    success = [200, 201]
    responses_successful = []

    dummy_data = {"projects": dummy_projects, "tasks": dummy_tasks}

    if x > len(dummy_data[object_type]):
        raise IndexError(
            "The number of objects requested is greater than the number dummy objects provided"
        )

    if x > 1:
        objects = random.sample(dummy_data[object_type], x)
        created_objects = []
        for object in objects:
            data = json.dumps(object)
            response = client.post(f"/{object_type}", json=data)
            responses_successful.append(response.status_code in success)
            created_objects.append(response.json)

        if all(responses_successful):
            return created_objects
    elif x == 1:
        object = random.choice(dummy_data[object_type])
        data = json.dumps(object)
        response = client.post(f"/{object_type}", json=data)
        responses_successful.append(response.status_code in success)

        created_object = response.json
        if all(responses_successful):
            return created_object


def test_index(client):
    # GIVEN a test client AND 3 existing projects
    # WHEN a request (GET) is sent to '/'
    # THEN check that the 3 projects are returned

    # --- GIVEN
    existing_projects = given_x_objects(3, "projects", client)

    # --- WHEN
    response = client.get("/")
    collected_projects = response.json

    # --- THEN
    assert response.status_code == 200
    assert len(collected_projects) == len(existing_projects)
    for i, collected_project in enumerate(collected_projects):
        assert collected_project == existing_projects[i]


def test_get_all_projects(client):
    # GIVEN a test client AND 3 existing projects
    # WHEN a request (GET) is sent to '/projects'
    # THEN check that the 3 projects are returned

    # --- GIVEN
    existing_projects = given_x_objects(3, "projects", client)

    # --- WHEN
    response = client.get("/projects")
    collected_projects = response.json

    # --- THEN
    assert response.status_code == 200
    assert len(collected_projects) == len(existing_projects)
    for i, collected_project in enumerate(collected_projects):
        assert collected_project == existing_projects[i]


def test_get_project_by_id(client):
    # GIVEN a test client AND 3 existing projects
    # WHEN a project is requested (GET) by id
    #       at '/project/<int:project_id>'
    # THEN check that the correct project returned

    # --- GIVEN
    existing_projects = given_x_objects(3, "projects", client)

    # --- WHEN
    requested_project = random.choice(existing_projects)
    response = client.get(f"/projects/{requested_project['id']}")
    collected_project = response.json

    # --- THEN
    assert response.status_code == 200
    assert collected_project == requested_project


def test_get_all_tasks(client):
    # GIVEN a test client AND 5 existing tasks
    # WHEN a 'GET' request is made to '/tasks'
    # THEN check that all 5 tasks are returned

    # --- GIVEN
    existing_tasks = given_x_objects(5, "tasks", client)

    # --- WHEN
    response = client.get("/tasks")
    collected_tasks = response.json

    # --- THEN
    assert response.status_code == 200
    assert len(collected_tasks) == len(existing_tasks)
    for i, collected_task in enumerate(collected_tasks):
        assert collected_task == existing_tasks[i]


def test_get_task_by_id(client):
    # GIVEN a test client AND 5 existing tasks
    # WHEN a task is requested (GET) by id at '/tasks/<int:task_id>'
    # THEN check that the correct task is returned

    # --- GIVEN
    existing_tasks = given_x_objects(5, "tasks", client)

    # --- WHEN
    requested_task = random.choice(existing_tasks)
    response = client.get(f"/tasks/{requested_task['id']}")
    collected_task = response.json

    # --- THEN
    assert response.status_code == 200
    assert collected_task == requested_task


def test_create_project(client):
    # GIVEN a test client
    # WHEN a 'POST' request is made at '/projects' with a valid project attached
    # THEN check that a new project was created

    # --- GIVEN
    client = client

    # --- WHEN
    new_project = random.choice(dummy_projects)
    data = json.dumps(new_project)
    response = client.post("/projects", json=data)
    created_project = response.json

    # --- THEN
    assert response.status_code == 201
    assert created_project["name"] == new_project["name"]
    assert created_project["id"] > 0


def test_create_project_fails(client):
    # GIVEN a test client
    # WHEN a 'POST' request is made at '/projects' with an invalid project attached
    # THEN check that the request failed

    # --- GIVEN
    client = client

    # --- WHEN
    new_project = None
    response = client.post("/projects", json=new_project)

    # --- THEN
    assert response.status_code == 400
    assert not response.json


def test_add_task_to_project(client):
    # GIVEN a test client AND 1 existing project
    # WHEN a 'POST' request is made at '/projects/<int:project_id>' with a valid task attached
    # THEN check that a new task returned and exists in the project

    # --- GIVEN
    project = given_x_objects(1, "projects", client)

    # --- WHEN
    new_task = random.choice(dummy_tasks)
    data = json.dumps(new_task)
    response = client.post(f"projects/{project['id']}", json=data)
    added_task = response.json

    # --- THEN
    # --- it was created successfully
    assert response.status_code == 201
    assert new_task["name"] == added_task["name"]

    # --- and it is the right project
    response = client.get(f"projects/{project['id']}")
    updated_project = response.json
    assert response.status_code == 200
    assert added_task in updated_project["tasks"]


def test_create_task(client):
    # GIVEN a test client
    # WHEN a 'POST' request is made at '/tasks' with a valid task attached
    # THEN check that a new task was created

    # --- GIVEN
    client = client

    # --- WHEN
    new_task = random.choice(dummy_tasks)
    data = json.dumps(new_task)
    response = client.post("/tasks", json=data)
    created_task = response.json

    # --- THEN
    assert response.status_code == 201
    assert new_task["name"] == created_task["name"]
    assert created_task["id"] > 0


def test_update_project_by_id(client):
    # GIVEN a test client AND 1 existing project
    # WHEN a valid update request (PUT) is made to '/projects/<int:project_id>'
    # THEN check that the project was correctly updated

    # --- GIVEN
    original_project = given_x_objects(1, "projects", client)

    # --- WHEN
    update_request = {"name": "New Name"}
    data = json.dumps(update_request)
    response = client.put(f"/projects/{original_project['id']}", json=data)
    updated_project = response.json

    # --- THEN
    # --- Check that the response was successful
    assert response.status_code == 200
    assert update_request["name"] == updated_project["name"]
    assert original_project != updated_project

    # --- Check that when I request the project, I get the right one.
    response = client.get(f"/projects/{original_project['id']}")
    collected_project = response.json
    assert updated_project == collected_project
    assert original_project != collected_project


def test_update_task(client):
    # GIVEN a test client AND 1 existing task
    # WHEN a valid update request (PUT) is made to '/tasks/<int:project_id>'
    # THEN check that the task was correctly updated

    # --- GIVEN
    original_task = given_x_objects(1, "tasks", client)

    # --- WHEN
    update_request = {"name": "New Name"}
    data = json.dumps(update_request)
    response = client.put(f"/tasks/{original_task['id']}", json=data)
    updated_task = response.json

    # --- THEN
    # --- check that the response was successful
    assert response.status_code == 200
    assert update_request["name"] == updated_task["name"]
    assert original_task != updated_task

    # --- check that when I request the task, I get the right one.
    response = client.get(f"/tasks/{original_task['id']}")
    collected_tasks = response.json
    assert updated_task == collected_tasks
    assert original_task != collected_tasks


def test_delete_project_by_id(client):
    # GIVEN a test client AND 3 existing projects
    # WHEN a valid 'DELETE' request is made to '/projects/<int:project_id>'
    # THEN check that the project has been successfully deleted.

    # --- GIVEN
    existing_projects = given_x_objects(3, "projects", client)

    # --- WHEN
    requested_project = random.choice(existing_projects)
    response = client.delete(f"/projects/{requested_project['id']}")

    # --- THEN
    # --- check the request was successful
    assert response.status_code == 200

    # --- check the project is no longer in projects
    response = client.get("/projects")
    collected_projects = response.json
    assert len(collected_projects) < len(existing_projects)
    assert requested_project not in collected_projects


def test_delete_task_by_id(client):
    # GIVEN a test client AND 5 existing tasks
    # WHEN a valid 'DELETE' request is made to '/tasks/<int:task_id>'
    # THEN check that the task has been successfully deleted.

    # --- GIVEN
    existing_tasks = given_x_objects(5, "tasks", client)

    # --- WHEN
    requested_task = random.choice(existing_tasks)
    response = client.delete(f"/tasks/{requested_task['id']}")

    # --- THEN
    # --- check the request was successful
    assert response.status_code == 200

    # --- check that the project is no longer in projects
    response = client.get("/tasks")
    collected_tasks = response.json
    assert len(collected_tasks) < len(existing_tasks)
    assert requested_task not in collected_tasks

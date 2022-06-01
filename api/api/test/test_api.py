import json

task1 = {
    "complete": False,
    "deadline": None,
    "elapsed_time": 0,
    "estimated_time": 300,
    "id": 1,
    "name": "Build task list page",
    "priority": None,
    "project_id": 2,
}

project1 = {
    "id": 1,
    "name": "global",
    "tasks": [
        {
            "complete": False,
            "deadline": None,
            "elapsed_time": 0,
            "estimated_time": 120,
            "id": 5,
            "name": "File tax return",
            "priority": None,
            "project_id": 1,
        },
        {
            "complete": False,
            "deadline": None,
            "elapsed_time": 0,
            "estimated_time": 120,
            "id": 10,
            "name": "Book visa appointment",
            "priority": None,
            "project_id": 1,
        },
    ],
}


def test_index(client):
    res = client.get("/projects/")
    projects = res.json
    project_names = [project["name"] for project in projects]

    assert res.status_code == 200
    assert project1["name"] in project_names

    res = client.get("project/")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_get_all_projects(client):
    res = client.get("/projects/")
    projects = res.json
    project_names = [project["name"] for project in projects]

    assert res.status_code == 200
    assert project1["name"] in project_names

    res = client.get("project/")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_get_project_by_id(client):
    res = client.get("projects/1")

    assert res.status_code == 200
    assert res.json["name"] == project1["name"]
    assert res.json["id"] == project1["id"]

    res = client.get("project/1")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_get_all_tasks(client):
    res = client.get("tasks/")
    tasks = res.json
    task_names = [task["name"] for task in tasks]

    assert res.status_code == 200
    assert task1["name"] in task_names

    res = client.get("task/")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_get_task_by_id(client):
    res = client.get("tasks/1")

    assert res.status_code == 200
    assert res.json["id"] == task1["id"]
    assert res.json["name"] == task1["name"]

    res = client.get("task/1")

    assert not res.status_code == 200
    assert res.status_code == 404


def test_create_project(client):
    new_project = {"name": "ERM Handbook"}
    data = json.dumps(new_project)

    res = client.post("projects/", json=data)

    assert res.status_code == 201
    assert new_project["name"] == res.json["name"]


def test_add_task_to_project(client):

    new_task = {
        "complete": False,
        "deadline": None,
        "elapsed_time": 0,
        "estimated_time": 300,
        "name": "Testing add task",
        "priority": None,
        "project_id": 1,
    }

    data = json.dumps(new_task)

    res = client.post("projects/1", json=data)
    assert res.status_code == 201
    assert new_task["name"] == res.json["name"]

    res = client.get("projects/1")
    assert res.status_code == 200

    task_names = [task["name"] for task in res.json["tasks"]]
    assert new_task["name"] in task_names


def test_create_task(client):
    new_task = {
        "complete": False,
        "deadline": None,
        "elapsed_time": 0,
        "estimated_time": 180,
        "name": "Testing add task 2",
        "priority": None,
    }

    data = json.dumps(new_task)

    res = client.post("tasks/", json=data)
    assert res.status_code == 201
    assert new_task["name"] == res.json["name"]

    res = client.get("tasks/")
    assert res.status_code == 200

    task_names = [task["name"] for task in res.json]
    assert new_task["name"] in task_names


def test_update_project_by_id(client):
    new_project_name = {"name": "default"}
    old_project_name = {"name": "global"}

    # --- Update project name
    data = json.dumps(new_project_name)
    res = client.put("projects/1", json=data)

    # --- Confirm it successfully updated
    assert res.status_code == 200
    assert new_project_name["name"] == res.json["name"]
    assert not old_project_name["name"] == res.json["name"]

    res = client.get("projects/1")
    assert new_project_name["name"] == res.json["name"]

    # --- return project to original name
    data = json.dumps(old_project_name)
    res = client.put("projects/1", json=data)

    # --- Confirm it was successfully updated.
    assert res.status_code == 200
    assert old_project_name["name"] == res.json["name"]

    res = client.get("projects/1")
    assert res.status_code == 200
    assert old_project_name["name"] == res.json["name"]


def test_update_task(client):
    pass


def test_delete_project(client):
    pass


def test_delete_test(client):
    pass

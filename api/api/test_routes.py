import requests
from api.models import Project, Task

res = requests.get("http://127.0.0.1:5000/tasks/")
print(
    res.status_code,
    res.json(),
    res.text,
      )

projects2 = [
    Project(name = "ERM_DBS"),
    Project(name = "Visa")
]

tasks2 = [
    Task(
        name =  "Build word document parser",
        project_id = 3,
        estimated_time = 60 * 5,
    ),
    Task(
        name = "Build frontend views",
        project_id = 3,
        estimated_time = 60 * 3,
    ),
    Task(
        name = "Collect Documents",
        project_id = 4,
        estimated_time = 60 * 5,
    ),
    Task(
        name = "Check Requirements",
        project_id = 4,
        estimated_time = 60 * 3,
    ),
    Task(
        name="Book visa appointment",
        estimated_time = 60 * 2
    ),
]
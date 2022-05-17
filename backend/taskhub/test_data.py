from app import Project, Task


projects = [
    Project(name = "global"),
    Project(name = "Taskhub")
]

tasks = [
    Task(
        name =  "Build task list page",
        project_id = 2,
        estimated_time = 60 * 5,
    ),
    Task(
        name = "Build sidebar",
        project_id = 2,
        estimated_time = 60 * 3,
    ),
    Task(
        name = "Build functioning API",
        project_id = 2,
        estimated_time = 60 * 5,
    ),
    Task(
        name = "Build API endpoints",
        project_id = 2,
        estimated_time = 60 * 3,
    ),
    Task(
        name="File tax return",
        estimated_time = 60 * 2
    ),
]
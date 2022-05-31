from api.app.models import ProjectSchema, TaskSchema
from .test_data import projects, tasks


def load_test_data(db):
    db.drop_all()
    db.create_all()
    for project in projects:
        project_schema = ProjectSchema()
        project = project_schema.loads(project)
        db.session.add(project)
    for task in tasks:
        task_schema = TaskSchema()
        task = task_schema.loads(task)
        db.session.add(task)
    db.session.commit()
    db.session.close()

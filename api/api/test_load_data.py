from api.app import db
from api.test_data import projects, tasks

db.drop_all()
db.create_all()
for project in projects:
    db.session.add(project)
for task in tasks:
    db.session.add(task)
db.session.commit()

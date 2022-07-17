from dataclasses import dataclass
from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
ma = Marshmallow()


class CRUDMixin(object):
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_by_id(cls, id):
        if any(
            (isinstance(id, str) and id.isdigit(), isinstance(id, (int, float))),
        ):
            return cls.query.get(int(id))
        return None

    @classmethod
    def create(cls, **kwargs):
        instance = cls(**kwargs)
        return instance.save()

    def update(self, commit=True, **kwargs):
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return commit and self.save() or self

    def save(self, commit=True):
        db.session.add(self)
        if commit:
            db.session.commit()
        return self

    def delete(self, commit=True):
        db.session.delete(self)
        return commit and db.session.commit()


@dataclass
class Task(CRUDMixin, db.Model):
    id: int
    name: str
    project_id: int
    estimated_time: int
    elapsed_time: int
    complete: bool
    priority: int
    deadline: datetime

    __tablename__ = "task"
    __table_args__ = {"keep_existing": True}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    estimated_time = db.Column(db.Integer, default=0)
    elapsed_time = db.Column(db.Integer, nullable=False, default=0)
    complete = db.Column(db.Boolean, nullable=False, default=False)
    priority = db.Column(db.Integer, default=0)
    deadline = db.Column(db.DateTime)
    # --- Relationships
    project_id = db.Column(db.Integer, db.ForeignKey("project.id"))

    def __repr__(self):
        return "<Task %r>" % self.name


@dataclass
class Project(CRUDMixin, db.Model):
    id: int
    name: str
    tasks: Task

    __tablename__ = "project"
    __table_args__ = {"keep_existing": True}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    # --- Relationships
    tasks = db.relationship("Task", backref="project")

    def __repr__(self):
        return "<Project %r>" % self.name


class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        load_instance = True
        include_fk = True


class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Project
        load_instance = True
        include_relationships = True

from app import db
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Task(db.Model):
    id: int
    name: str
    project_id: int
    estimated_time: int
    elapsed_time: int
    complete: bool
    priority: int
    deadline: datetime
    
    __tablename__="task"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    estimated_time = db.Column(db.Integer, default=0)
    elapsed_time = db.Column(db.Integer, nullable=False, default=0)
    complete = db.Column(db.Boolean, nullable=False, default=False)
    priority = db.Column(db.Integer)
    deadline = db.Column(db.DateTime)    
    # --- Relationships
    project_id = db.Column(db.Integer, 
                           db.ForeignKey('project.id'), 
                           nullable=False,
                           default=1)
    
    def __repr__(self):
        return '<Task %r>' % self.name
    
@dataclass
class Project(db.Model):
    id: int
    name: str
    tasks: Task
    
    __tablename__="project"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    # --- Relationships
    tasks = db.relationship("Task", backref="project")
    
    def __repr__(self):
        return '<Task %r>' % self.name
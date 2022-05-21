from app import app, db
from models import Project, Task
from flask import request, jsonify

# --- default route
@app.route("/", methods = ["GET", "POST"])
def index():
    if request.method == "POST":
        pass
    elif request.method == "GET":
        projects = db.session.query(Project).all()
        return jsonify(projects)

@app.route('/projects/', methods = ["GET", "POST"])
@app.route('/projects/<int:id>', methods = ["GET", "POST"])
def project_view(id: int = None):
    if request.method == "POST":
        pass
    
    elif request.method == "GET":
        if id:
            result = db.session.query(Project).filter_by(id = id).all()
        else:
            result = db.session.query(Project).all()
    
    return jsonify(result)S
    
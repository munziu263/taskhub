import requests
import json
from pprint import pprint

task1 = """{
  "complete": false, 
  "deadline": null, 
  "elapsed_time": 0, 
  "estimated_time": 300, 
  "id": 1, 
  "name": "Build task list page", 
  "priority": null, 
  "project_id": 2
}"""

project1 = """{
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

def test_get_task_by_id():
    res = requests.get("http://127.0.0.1:5000/tasks/1")
    
    assert res.json == task1
    assert res.status_code == 200

def test_get_project_by_id()
    res = requests.get("http://127.0.0.1:5000/projects/1")
    
    assert res.json == project1
    assert res.status_code == 200


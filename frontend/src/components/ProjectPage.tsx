import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useProjectsApi from "../services/useProjectsApi";
import useTasksApi from "../services/useTasksApi";
import { CreateField } from "./CreateField";
import { TaskTable } from "./TaskTable";

interface ProjectPage {
  currentProject: Project | null;
}

export const ProjectPage = (props: ProjectPage) => {
  const { tasksApi } = useTasksApi();
  const { projectsApi } = useProjectsApi();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!props.currentProject) {
      setTasksWithoutProject();
    } else {
      setTasks(props.currentProject.tasks);
    }
  }, [props.currentProject]);

  const setTasksWithoutProject = async () => {
    tasksApi
      .get_all()
      .then((latestTasks: Task[]) => {
        const filteredTasks: Task[] = latestTasks.filter(
          (task: Task) => task.project_id === null
        );
        setTasks(filteredTasks);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const handleCreateTask = (newTask: string) => {
    // add task without project
    if (props.currentProject === null) {
      tasksApi.create(newTask).then((createdTask: Task) => {
        setTasks((prevState: Task[]) => [...prevState, createdTask]);
      });
    } else {
      // add task to project (ADD FUNCTIONALITY TO API)
      projectsApi
        .create_task_in_project(newTask, props.currentProject.id)
        .then((createdTask: Task) => {
          setTasks((prevState: Task[]) => [...prevState, createdTask]);
        });
    }
  };

  const handleUpdateTasks = (updatedTask: Task) => {
    tasksApi
      .update(updatedTask.id, updatedTask)
      .then((updatedTask: Task) => {
        const updatedTasks: Task[] = tasks.map((oldTask: Task) =>
          oldTask.id === updatedTask.id ? updatedTask : oldTask
        );
        setTasks(updatedTasks);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return (
    <Container id="current-project">
      <Typography>
        {props.currentProject ? props.currentProject.name : "Home"}
      </Typography>
      <CreateField handleCreate={handleCreateTask} obj_type={"task"} />
      <TaskTable
        tasks={tasks ? tasks : []}
        handleUpdateTasks={handleUpdateTasks}
      />
    </Container>
  );
};

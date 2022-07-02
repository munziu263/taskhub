import { Container, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import useProjectsApi from "../services/useProjectsApi";
import useTasksApi from "../services/useTasksApi";
import { CreateField } from "./CreateField";
import { EditTaskForm } from "./EditTaskForm";
import { TaskTable } from "./TaskTable";
import { Timer } from "./Timer";

interface ProjectPage {
  currentProject?: Project;
}

const DEFAULT_ACTIVE_TIME: Seconds = 25 * 60;
const DEFAULT_REST_TIME: Seconds = 5 * 60;
const TEST_ACTIVE_TIME = 5;
const TEST_REST_TIME = 3;

export const ProjectPage = (props: ProjectPage) => {
  const { tasksApi } = useTasksApi();
  const { projectsApi } = useProjectsApi();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [timedTask, setTimedTask] = useState<Task>();
  const [editedTask, setEditedTask] = useState<Task>();

  const endPeriodHandler = () => alert("Period Ended");

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
    if (props.currentProject === undefined) {
      tasksApi.create(newTask).then((createdTask: Task) => {
        setTasks((prevState: Task[]) => [...prevState, createdTask]);
      });
    } else {
      // add task to project
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

  const handleTimedTaskSelect = (
    event: MouseEvent<HTMLButtonElement>,
    task: Task
  ) => {
    event.preventDefault();
    setTimedTask(task);
  };

  const handleTimedTaskDeselect = () => {
    setTimedTask(undefined);
  };

  const handleEditedTaskSelect = (
    event: MouseEvent<HTMLButtonElement>,
    task: Task
  ) => {
    event.preventDefault();
    setEditedTask(task);
  };

  const sx = { mx: 1, my: 2, px: 1, py: 2 };

  return (
    <Container id="current-project" sx={sx}>
      <Timer
        activePeriod={DEFAULT_ACTIVE_TIME}
        restPeriod={DEFAULT_REST_TIME}
        task={timedTask}
        endPeriodHandler={endPeriodHandler}
        handleTimedTaskDeselect={handleTimedTaskDeselect}
        handleUpdateTasks={handleUpdateTasks}
      />
      <Typography variant="h1">
        {props.currentProject ? props.currentProject.name : "Home"}
      </Typography>
      <CreateField handleCreate={handleCreateTask} obj_type={"task"} />
      <TaskTable
        tasks={tasks ? tasks : []}
        handleUpdateTasks={handleUpdateTasks}
        handleTimedTaskSelect={handleTimedTaskSelect}
        handleEditedTaskSelect={handleEditedTaskSelect}
      />
      {editedTask && editedTask.project_id == props.currentProject?.id && (
        <Container id="edit-current-task" sx={sx}>
          <EditTaskForm
            task={editedTask}
            key={`${editedTask.id}_${editedTask.name}`}
            handleUpdateTasks={handleUpdateTasks}
          ></EditTaskForm>
        </Container>
      )}
    </Container>
  );
};

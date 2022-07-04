import { CurrencyYenTwoTone } from "@mui/icons-material";
import { Container, Grid, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import useProjectsApi from "../services/useProjectsApi";
import useTasksApi from "../services/useTasksApi";
import { CreateField } from "./CreateField";
import { EditTaskForm } from "./EditTaskForm";
import { TaskTable } from "./TaskTable";
import { Timer } from "./Timer";

interface ProjectPage {
  currentProject?: Project;
  handleProjectSelect: any;
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

  const handleEditedTaskDeselect = () => {
    setEditedTask(undefined);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Timer
          activePeriod={DEFAULT_ACTIVE_TIME}
          restPeriod={DEFAULT_REST_TIME}
          task={timedTask}
          endPeriodHandler={endPeriodHandler}
          handleTimedTaskDeselect={handleTimedTaskDeselect}
          handleUpdateTasks={handleUpdateTasks}
        />
      </Grid>
      <Grid item>
        <Typography>
          {props.currentProject ? props.currentProject.name : "Home"}
        </Typography>
      </Grid>
      <Grid item>
        <CreateField handleCreate={handleCreateTask} obj_type={"task"} />
      </Grid>
      <Grid item>
        <TaskTable
          tasks={tasks ? tasks : []}
          handleUpdateTasks={handleUpdateTasks}
          handleTimedTaskSelect={handleTimedTaskSelect}
          handleEditedTaskSelect={handleEditedTaskSelect}
        />
      </Grid>
      {editedTask && editedTask.project_id == props.currentProject?.id && (
        <Grid item id="edit-current-task">
          <EditTaskForm
            task={editedTask}
            key={`${editedTask.id}_${editedTask.name}`}
            handleUpdateTasks={handleUpdateTasks}
            handleEditedTaskDeselect={handleEditedTaskDeselect}
            handleProjectSelect={props.handleProjectSelect}
          ></EditTaskForm>
        </Grid>
      )}
    </Grid>
  );
};

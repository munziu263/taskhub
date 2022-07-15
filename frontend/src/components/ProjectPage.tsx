import { Collapse, Grid, Typography } from "@mui/material";
import { MouseEvent, ChangeEvent, useEffect, useState } from "react";
import useProjectsApi from "../services/useProjectsApi";
import useTasksApi from "../services/useTasksApi";
import { CreateField } from "./CreateField";
import { EditTaskForm } from "./EditTaskForm";
import { TaskTable } from "./TaskTable";
import { Timer } from "./Timer";

interface ProjectPageProps {
  currentProject?: Project;
  handleProjectSelect: any;
}

const DEFAULT_ACTIVE_TIME: Seconds = 25 * 60;
const DEFAULT_REST_TIME: Seconds = 5 * 60;
// const TEST_ACTIVE_TIME = 5;
// const TEST_REST_TIME = 3;

export const ProjectPage = (props: ProjectPageProps) => {
  const { tasksApi } = useTasksApi();
  const { projectsApi } = useProjectsApi();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [timedTask, setTimedTask] = useState<Task>();
  const [editedTask, setEditedTask] = useState<Task>();
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const endPeriodHandler = () => alert("Period Ended");

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

  const handleDeleteTask = (
    event: MouseEvent<HTMLButtonElement>,
    deletedTask: Task
  ) => {
    event.preventDefault();
    tasksApi
      .remove(deletedTask.id)
      .then((updatedTasks: Task[]) => {
        const updatedTasksInCurrentProject: Task[] = updatedTasks.filter(
          (task: Task) => task.project_id === deletedTask.project_id
        );
        setTasks(updatedTasksInCurrentProject);
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

  const handleShowCompleted = (event: ChangeEvent<HTMLInputElement>) => {
    setShowCompleted((prevState: boolean) => !prevState);
  };

  const completed = (tasks: Task[]) =>
    tasks.filter((task: Task) => task.complete);

  const uncomplete = (tasks: Task[]) =>
    tasks.filter((task: Task) => !task.complete);

  useEffect(() => {
    if (!props.currentProject) {
      setTasksWithoutProject();
    } else {
      setTasks(props.currentProject.tasks);
    }
  }, [props.currentProject]);

  return (
    <Grid container direction="row" padding={2} spacing={1} alignItems="center">
      <Grid item xs={12} md={6} lg={8}>
        <Grid container direction="column" spacing={2} padding={1}>
          <Grid item>
            <Typography variant="h2">
              {props.currentProject ? props.currentProject.name : "Home"}
            </Typography>
          </Grid>
          <Grid item>
            <CreateField handleCreate={handleCreateTask} obj_type={"task"} />
          </Grid>
          <Grid item>
            {uncomplete(tasks) && (
              <TaskTable
                tasks={uncomplete(tasks) ? uncomplete(tasks) : []}
                header={true}
                label={undefined}
                handleUpdateTasks={handleUpdateTasks}
                handleTimedTaskSelect={handleTimedTaskSelect}
                handleEditedTaskSelect={handleEditedTaskSelect}
                handleDeleteTask={handleDeleteTask}
                handleShowCompleted={handleShowCompleted}
                showCompleted={showCompleted}
                editedTask={editedTask}
              />
            )}
            {showCompleted && completed(tasks) && (
              <Collapse in={showCompleted} orientation="vertical">
                <TaskTable
                  tasks={completed(tasks) ? completed(tasks) : []}
                  header={false}
                  label={"Completed"}
                  handleUpdateTasks={handleUpdateTasks}
                  handleTimedTaskSelect={handleTimedTaskSelect}
                  handleEditedTaskSelect={handleEditedTaskSelect}
                  handleDeleteTask={handleDeleteTask}
                  editedTask={editedTask}
                  showCompleted={showCompleted}
                />
              </Collapse>
            )}
          </Grid>
          <Grid item id="edit-current-task">
            <Collapse
              in={
                editedTask && editedTask.project_id == props.currentProject?.id
              }
              orientation="vertical"
            >
              {editedTask &&
                editedTask.project_id == props.currentProject?.id && (
                  <EditTaskForm
                    task={editedTask}
                    key={`${editedTask.id}_${editedTask.name}`}
                    handleUpdateTasks={handleUpdateTasks}
                    handleEditedTaskDeselect={handleEditedTaskDeselect}
                    handleProjectSelect={props.handleProjectSelect}
                  ></EditTaskForm>
                )}
            </Collapse>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6} lg={4} sx={{ height: "100%" }}>
        <Timer
          activePeriod={DEFAULT_ACTIVE_TIME}
          restPeriod={DEFAULT_REST_TIME}
          task={timedTask}
          endPeriodHandler={endPeriodHandler}
          handleTimedTaskDeselect={handleTimedTaskDeselect}
          handleUpdateTasks={handleUpdateTasks}
        />
      </Grid>
    </Grid>
  );
};

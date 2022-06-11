import { Button, Container, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import "./App.css";
import { CreateField } from "./components/CreateField";
import { ProjectNavBar } from "./components/ProjectNavBar";
import { TaskTable } from "./components/TaskTable";
import { Timer } from "./components/Timer";
import useProjectsApi from "./services/useProjectsApi";
import useTasksApi from "./services/useTasksApi";

const DEFAULT_ACTIVE_TIME: Seconds = 25 * 60;
const DEFAULT_REST_TIME: Seconds = 5 * 60;
// const ACTIVE_TIME = 5
// const REST_TIME = 3

function App() {
  const { projectsApi } = useProjectsApi();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { tasksApi } = useTasksApi();

  useEffect(() => {
    tasksApi
      .get_all()
      .then((latestTasks: Task[]) => {
        setTasks(latestTasks);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  const endPeriodHandler = () => alert("Period Ended");

  const handleCreateTask = (newTask: string) => {
    tasksApi.create(newTask).then((createdTask: Task) => {
      setTasks((prevState: Task[]) => [...prevState, createdTask]);
    });
  };

  const handleProjectSelect = async (
    event: MouseEvent<HTMLButtonElement>,
    projectID?: number
  ) => {
    event.preventDefault();
    const selectedProject = await projectsApi.get_by_id(projectID);
    projectID ? setCurrentProject(selectedProject) : setCurrentProject(null);
  };

  const sx = { mx: 1, my: 2, px: 1, py: 2 };

  return (
    <div>
      <Container id="timer" sx={sx}>
        <Timer
          activePeriod={DEFAULT_ACTIVE_TIME}
          restPeriod={DEFAULT_REST_TIME}
          endPeriodHandler={endPeriodHandler}
        />
      </Container>
      <Container id="project-selector" sx={sx}>
        <ProjectNavBar handleProjectSelect={handleProjectSelect} />
      </Container>
      <Container id="current-project" sx={sx}>
        <Typography>{currentProject ? currentProject.name : "Home"}</Typography>
        <CreateField handleCreate={handleCreateTask} obj_type={"task"} />
        <TaskTable tasks={tasks ? tasks : []} />
      </Container>
    </div>
  );
}

export default App;

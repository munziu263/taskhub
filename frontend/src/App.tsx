import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { CreateField } from "./components/CreateField";
import { CreateTaskField } from "./components/CreateTaskField";
import { TaskTable } from "./components/TaskTable";
import { Timer } from "./components/Timer";
import useProjectsApi from "./services/useProjectsApi";
import useTasksApi from "./services/useTasksApi";

const DEFAULT_ACTIVE_TIME: Seconds = 25 * 60;
const DEFAULT_REST_TIME: Seconds = 5 * 60;
// const ACTIVE_TIME = 5
// const REST_TIME = 3

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { projectsApi } = useProjectsApi();
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

  const handleCreateProject = (newProject: string) => {
    projectsApi.create(newProject).then((createdProject: Project) => {
      setProjects((prevState: Project[]) => [...prevState, createdProject]);
    });
  };

  return (
    <div>
      <Container id="App" sx={{ mx: 1, my: 2, px: 1, py: 2 }}>
        <Timer
          activePeriod={DEFAULT_ACTIVE_TIME}
          restPeriod={DEFAULT_REST_TIME}
          endPeriodHandler={endPeriodHandler}
        />
      </Container>
      <Container>
        <CreateField handleCreate={handleCreateProject} obj_type={"project"} />
        <CreateField handleCreate={handleCreateTask} obj_type={"task"} />
        <TaskTable tasks={tasks ? tasks : []} />
      </Container>
    </div>
  );
}

export default App;

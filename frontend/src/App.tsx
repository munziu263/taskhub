import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { CreateProjectField } from "./components/CreateProjectField";
import { CreateTaskField } from "./components/CreateTaskField";
import { TaskTable } from "./components/TaskTable";
import { Timer } from "./components/Timer";
import useTasksApi from "./services/useTasksApi";

const DEFAULT_ACTIVE_TIME: Seconds = 25 * 60;
const DEFAULT_REST_TIME: Seconds = 5 * 60;
// const ACTIVE_TIME = 5
// const REST_TIME = 3

function App() {
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

  const handleCreate = (newTask: string) => {
    tasksApi.create(newTask).then((createdTask: Task) => {
      setTasks((prevState: Task[]) => [...prevState, createdTask]);
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
        <CreateProjectField />
        <CreateTaskField handleCreate={handleCreate} />
        <TaskTable tasks={tasks ? tasks : []} />
      </Container>
    </div>
  );
}

export default App;

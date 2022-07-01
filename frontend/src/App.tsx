import { Container } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import "./App.css";
import { EditTaskForm } from "./components/EditTaskForm";
import { ProjectNavBar } from "./components/ProjectNavBar";
import { ProjectPage } from "./components/ProjectPage";
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
  const { tasksApi } = useTasksApi();
  const [currentTaskID, setCurrentTaskID] = useState<number | null>(null);

  const endPeriodHandler = () => alert("Period Ended");

  const handleProjectSelect = async (
    event: MouseEvent<HTMLButtonElement>,
    project_id?: number
  ) => {
    event.preventDefault();
    const selectedProject: Project = await projectsApi.get_by_id(project_id);
    project_id ? setCurrentProject(selectedProject) : setCurrentProject(null);
    // Deselect the current task that was being edited
    // as you are changing projects
    setCurrentTaskID(null);
  };

  const handleTaskSelect = async (
    event: MouseEvent<HTMLButtonElement>,
    task_id?: number
  ) => {
    event.preventDefault();
    task_id ? setCurrentTaskID(task_id) : setCurrentTaskID(null);
  };

  const sx = { mx: 1, my: 2, px: 1, py: 2 };

  return (
    <div>
      <Container id="timer" sx={sx}>
        <Timer
          activePeriod={DEFAULT_ACTIVE_TIME}
          restPeriod={DEFAULT_REST_TIME}
          currentTaskID={currentTaskID}
          endPeriodHandler={endPeriodHandler}
        />
      </Container>
      <Container id="project-selector" sx={sx}>
        <ProjectNavBar handleProjectSelect={handleProjectSelect} />
      </Container>
      <Container id="current-project" sx={sx}>
        <ProjectPage
          currentProject={currentProject}
          handleTaskSelect={handleTaskSelect}
        />
      </Container>
      {currentTaskID && (
        <Container id="edit-current-task" sx={sx}>
          <EditTaskForm taskID={currentTaskID}></EditTaskForm>
        </Container>
      )}
    </div>
  );
}

export default App;

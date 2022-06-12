import { Container } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import "./App.css";
import { ProjectNavBar } from "./components/ProjectNavBar";
import { ProjectPage } from "./components/ProjectPage";
import { Timer } from "./components/Timer";
import useProjectsApi from "./services/useProjectsApi";

const DEFAULT_ACTIVE_TIME: Seconds = 25 * 60;
const DEFAULT_REST_TIME: Seconds = 5 * 60;
// const ACTIVE_TIME = 5
// const REST_TIME = 3

function App() {
  const { projectsApi } = useProjectsApi();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const endPeriodHandler = () => alert("Period Ended");

  const handleProjectSelect = async (
    event: MouseEvent<HTMLButtonElement>,
    project_id?: number
  ) => {
    event.preventDefault();
    const selectedProject = await projectsApi.get_by_id(project_id);
    project_id ? setCurrentProject(selectedProject) : setCurrentProject(null);
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
        <ProjectPage currentProject={currentProject} />
      </Container>
    </div>
  );
}

export default App;

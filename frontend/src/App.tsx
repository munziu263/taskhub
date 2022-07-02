import { Container } from "@mui/material";
import { MouseEvent, useState } from "react";
import "./App.css";
import { ProjectNavBar } from "./components/ProjectNavBar";
import { ProjectPage } from "./components/ProjectPage";
import useProjectsApi from "./services/useProjectsApi";

function App() {
  const { projectsApi } = useProjectsApi();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const handleProjectSelect = async (
    event: MouseEvent<HTMLButtonElement>,
    project_id?: number
  ) => {
    event.preventDefault();
    const selectedProject: Project = await projectsApi.get_by_id(project_id);
    project_id ? setCurrentProject(selectedProject) : setCurrentProject(null);
  };

  const sx = { mx: 1, my: 2, px: 1, py: 2 };

  return (
    <div>
      <Container id="timer" sx={sx}></Container>
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

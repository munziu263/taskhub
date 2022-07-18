import {
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Grid,
  Paper,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import "./App.css";
import { ProjectNavBar } from "./components/ProjectNavBar";
import { ProjectPage } from "./components/ProjectPage";
import useProjectsApi from "./services/useProjectsApi";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgba(2, 24, 43, 1)",
    },
    secondary: {
      main: "#6C6F7F",
    },
    error: {
      main: "rgba(215, 38, 61, 1)",
    },
    warning: {
      main: "#FFC857",
    },
    info: {
      main: "#ECE2D0",
    },
    background: {
      default: "#02182B",
      paper: "#02182B",
    },
  },
});

function App() {
  const { projectsApi } = useProjectsApi();
  const [currentProject, setCurrentProject] = useState<Project>();

  const handleProjectSelect = async (
    event: MouseEvent<HTMLButtonElement>,
    project_id?: number
  ) => {
    event.preventDefault();
    const selectedProject: Project = await projectsApi.get_by_id(project_id);
    project_id
      ? setCurrentProject(selectedProject)
      : setCurrentProject(undefined);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ m: 0.5, p: 1, height: "100vh" }}>
        <Grid container sx={{ height: { md: "100%" } }}>
          <Grid item xs={12} md={2}>
            <Paper elevation={1} sx={{ height: { md: "100%" } }}>
              <ProjectNavBar
                currentProject={currentProject}
                handleProjectSelect={handleProjectSelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={10}>
            <ProjectPage
              currentProject={currentProject}
              handleProjectSelect={handleProjectSelect}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;

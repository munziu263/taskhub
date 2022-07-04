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
      main: "#D4CBB3",
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
      <Box sx={{ width: "100%", padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Paper elevation={1}>
              <ProjectNavBar handleProjectSelect={handleProjectSelect} />
            </Paper>
          </Grid>
          <Grid item xs={10}>
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

import {
  Button,
  Grid,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import useProjectsApi from "../services/useProjectsApi";
import { CreateField } from "./CreateField";
import HomeIcon from "@mui/icons-material/Home";
import { Theme } from "@mui/system";

interface ProjectNavBarProps {
  currentProject?: Project;
  handleProjectSelect: any;
}

export const ProjectNavBar = (props: ProjectNavBarProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { projectsApi } = useProjectsApi();

  const [value, setValue] = useState<string>("");

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  useEffect(() => {
    projectsApi
      .get_all()
      .then((latestProjects: Project[]) => {
        setProjects(latestProjects);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  const handleCreateProject = (newProject: string) => {
    projectsApi.create(newProject).then((createdProject: Project) => {
      setProjects((prevState: Project[]) => [...prevState, createdProject]);
    });
  };

  return (
    <Grid
      container
      id="project-selector"
      direction="column"
      padding={1}
      spacing={1}
    >
      <Grid item>
        <CreateField handleCreate={handleCreateProject} obj_type={"project"} />
      </Grid>
      {!isSmallScreen && (
        <Grid item>
          <Button
            onClick={(event) => props.handleProjectSelect(event)}
            color={props.currentProject ? "secondary" : "info"}
            fullWidth
            style={{ justifyContent: "flex-start" }}
          >
            <HomeIcon />
          </Button>
        </Grid>
      )}
      {!isSmallScreen &&
        projects
          .slice(0)
          .reverse()
          .map((project: Project) => {
            return (
              <Grid item key={project.id}>
                <Button
                  onClick={(event) =>
                    props.handleProjectSelect(event, project.id)
                  }
                  color={
                    props.currentProject &&
                    props.currentProject.id === project.id
                      ? "info"
                      : "secondary"
                  }
                  fullWidth
                  style={{ justifyContent: "flex-start" }}
                >
                  {project.name}
                </Button>
              </Grid>
            );
          })}
      {isSmallScreen && (
        <Grid item>
          <TextField
            id="select"
            select
            fullWidth
            label="Select Project"
            onChange={(event) => {
              props.handleProjectSelect(event, event.target.value);
              handleChange(event);
            }}
          >
            <MenuItem value={0}>
              <HomeIcon />
            </MenuItem>
            {projects
              .slice(0)
              .reverse()
              .map((project: Project) => {
                return (
                  <MenuItem value={project.id} key={project.id}>
                    {project.name.toUpperCase()}
                  </MenuItem>
                );
              })}
          </TextField>
        </Grid>
      )}
    </Grid>
  );
};

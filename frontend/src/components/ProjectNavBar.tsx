import {
  Button,
  Grid,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import useProjectsApi from "../services/useProjectsApi";
import { CreateField } from "./CreateField";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import { Theme } from "@mui/system";
import useTasksApi from "../services/useTasksApi";

interface ProjectNavBarProps {
  currentProject?: Project;
  handleProjectSelect: any;
}

export const ProjectNavBar = (props: ProjectNavBarProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { projectsApi } = useProjectsApi();
  const { tasksApi } = useTasksApi();

  const [value, setValue] = useState<string>("");

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

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

  const handleCreateProject = (
    event: FormEvent<HTMLFormElement>,
    newProject: string
  ) => {
    event.preventDefault();
    projectsApi
      .create(newProject)
      .then((createdProject: Project) => {
        setProjects((prevState: Project[]) => [...prevState, createdProject]);
        props.handleProjectSelect(event, createdProject.id);
        setValue(createdProject.name);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const handleDeleteProject = (
    event: MouseEvent<HTMLButtonElement>,
    deletedProject: Project
  ) => {
    event.preventDefault();
    deletedProject.tasks.map((task: Task) => {
      tasksApi
        .remove(task.id)
        .then((updatedTasks: Task[]) => {
          console.log(updatedTasks);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    });
    projectsApi
      .remove(deletedProject.id)
      .then((updatedProjects: Project[]) => {
        setProjects(updatedProjects);
      })
      .catch((err: Error) => {
        console.log(err);
      });
    props.handleProjectSelect(event, undefined);
    setValue("");
  };

  return (
    <Grid
      container
      id="project-selector"
      direction={isSmallScreen ? "row" : "column"}
      justifyContent="space-between"
      padding={1}
      spacing={2}
    >
      <Grid item xs={12}>
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
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Grid item xs={6} sm={9}>
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
                      style={{ justifyContent: "flex-start" }}
                      fullWidth
                    >
                      {project.name}
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Button
                      onClick={(event) => handleDeleteProject(event, project)}
                    >
                      <DeleteIcon
                        key={project.id + "-delete"}
                        color="secondary"
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      {isSmallScreen && (
        <Grid item width={"100%"}>
          <Grid container alignItems={"center"}>
            <Grid item xs={props.currentProject ? 11 : 12}>
              <TextField
                id="select"
                select
                fullWidth
                label="Select Project"
                onChange={(event) => {
                  props.handleProjectSelect(event, event.target.value);
                }}
                value={props.currentProject ? props.currentProject.id : 0}
                defaultValue={0}
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
            <Grid item xs={1}>
              {props.currentProject && (
                <Button
                  onClick={(event) =>
                    props.currentProject &&
                    handleDeleteProject(event, props.currentProject)
                  }
                >
                  <DeleteIcon color="secondary" />
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

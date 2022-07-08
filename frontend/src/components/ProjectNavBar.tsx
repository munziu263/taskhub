import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import useProjectsApi from "../services/useProjectsApi";
import { CreateField } from "./CreateField";

interface ProjectNavBar {
  handleProjectSelect: any;
}

export const ProjectNavBar = (props: ProjectNavBar) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { projectsApi } = useProjectsApi();

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
      <Grid item>
        <Button
          onClick={(event) => props.handleProjectSelect(event)}
          color="info"
          fullWidth
          style={{ justifyContent: "flex-start" }}
        >
          Home
        </Button>
      </Grid>
      {projects
        .slice(0)
        .reverse()
        .map((project: Project) => {
          return (
            <Grid item key={project.id}>
              <Button
                onClick={(event) =>
                  props.handleProjectSelect(event, project.id)
                }
                color="secondary"
                fullWidth
                style={{ justifyContent: "flex-start" }}
              >
                {project.name}
              </Button>
            </Grid>
          );
        })}
    </Grid>
  );
};

import { Button, Container } from "@mui/material";
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
    <Container id="project-selector">
      <CreateField handleCreate={handleCreateProject} obj_type={"project"} />
      <Button onClick={(event) => props.handleProjectSelect(event)}>
        Home
      </Button>
      {projects
        .slice(0)
        .reverse()
        .map((project: Project) => {
          return (
            <Button
              onClick={(event) => props.handleProjectSelect(event, project.id)}
            >
              {project.name}
            </Button>
          );
        })}
    </Container>
  );
};

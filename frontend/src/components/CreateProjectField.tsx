import useProjectsApi from "../services/useProjectsApi";
import { Container, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

const CreateProjectField = () => {
  const [projectName, setProjectName] = useState<string>("");
  const { projectsApi } = useProjectsApi();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setProjectName(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = projectsApi.create(projectName);
    console.log(response);
    setProjectName("");
  };

  return (
    <Container id="new-projects-input">
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          value={projectName}
          label="New Project"
        />
      </form>
    </Container>
  );
};

export { CreateProjectField };

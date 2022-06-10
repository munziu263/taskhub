import { Container, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import useTasksApi from "../services/useTasksApi";

interface CreateTaskField {
  handleCreate: any;
}

const CreateTaskField = (props: CreateTaskField) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleCreate(value);
    setValue("");
  };

  return (
    <Container id={"new-task-input"}>
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="off"
          onChange={handleChange}
          value={value}
          label={"New task"}
        />
      </form>
    </Container>
  );
};

export { CreateTaskField };

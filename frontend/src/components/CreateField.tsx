import { Container, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface CreateField {
  handleCreate: any;
  obj_type: string;
}

const CreateField = (props: CreateField) => {
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
    <Container id={`new-${props.obj_type}-input`}>
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="off"
          onChange={handleChange}
          value={value}
          label={`New ${props.obj_type.charAt(0) + props.obj_type.slice(1)}`}
        />
      </form>
    </Container>
  );
};

export { CreateField };

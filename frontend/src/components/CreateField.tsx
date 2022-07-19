import { TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface CreateFieldProps {
  handleCreate: any;
  obj_type: string;
}

const CreateField = (props: CreateFieldProps) => {
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
    <form onSubmit={handleSubmit}>
      <TextField
        autoComplete="off"
        onChange={handleChange}
        value={value}
        label={`New ${props.obj_type.charAt(0) + props.obj_type.slice(1)}`}
        variant="filled"
        fullWidth
        color="secondary"
      />
    </form>
  );
};

export { CreateField };

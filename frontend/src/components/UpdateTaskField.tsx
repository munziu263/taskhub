import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DoneIcon from "@mui/icons-material/Done";

const UpdateTaskField = (
  handleSubmit: any,
  handleChange: any,
  value: string
) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const toggleIsEditable = () => {
    setIsEditable(!isEditable);
  };

  if (isEditable) {
    return (
      <form onSubmit={() => handleSubmit}>
        <TextField value={value} onChange={() => handleChange} />
        <Typography />
        <Button onClick={toggleIsEditable}>
          <DoneIcon />
        </Button>
      </form>
    );
  }

  return (
    <div>
      <Typography>{value}</Typography>
      <Button onClick={toggleIsEditable}>
        <ModeEditIcon />
      </Button>
    </div>
  );
};

export { UpdateTaskField };

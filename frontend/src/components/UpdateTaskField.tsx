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
      <form
        onSubmit={() => handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <TextField value={value} onChange={() => handleChange} />
        <Typography style={{ display: "none" }} />
        <Button size="small" onClick={toggleIsEditable}>
          <DoneIcon />
        </Button>
      </form>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h4" display="inline">
        {value}
      </Typography>
      <Button size="small" onClick={toggleIsEditable}>
        <ModeEditIcon />
      </Button>
    </div>
  );
};

export { UpdateTaskField };

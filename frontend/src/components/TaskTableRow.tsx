import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useTasksApi from "../services/useTasksApi";
import { UpdateTaskField } from "./UpdateTaskField";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

interface TaskTableRow {
  task: Task;
}

export const TaskTableRow: React.FC<TaskTableRow> = (props: TaskTableRow) => {
  const { tasksApi } = useTasksApi();

  const handleComplete = (
    event: ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    event.preventDefault();
    const response = tasksApi.update(taskId, {
      complete: event.target.checked,
    });
    console.log(response);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          onChange={(event) => handleComplete(event, props.task.id)}
          checked={props.task.complete}
        />
      </TableCell>
      <TableCell>{props.task.name}</TableCell>
      <TableCell>{props.task.elapsed_time}</TableCell>
      <TableCell>{props.task.estimated_time}</TableCell>
      <TableCell>
        <Button size="small">
          <ModeEditIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

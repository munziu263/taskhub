import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { ChangeEvent } from "react";
import useTasksApi from "../services/useTasksApi";
import { TaskTableRow } from "./TaskTableRow";

interface TaskTable {
  tasks: Task[];
}

export const TaskTable = (props: TaskTable) => {
  const { tasksApi } = useTasksApi();

  const handleComplete = (
    event: ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    const response = tasksApi.update(taskId, {
      complete: event.target.checked,
    });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Complete</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Time Elapsed</TableCell>
          <TableCell>Estimated Time</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.tasks
          .slice(0)
          .reverse()
          .map((task: Task) => {
            return (
              <TaskTableRow
                task={task}
                key={task.id}
                handleComplete={(event: ChangeEvent<HTMLInputElement>) =>
                  handleComplete(event, task.id)
                }
              />
            );
          })}
      </TableBody>
    </Table>
  );
};

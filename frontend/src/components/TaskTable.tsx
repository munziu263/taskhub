import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { ChangeEvent } from "react";
import { TaskTableRow } from "./TaskTableRow";

interface TaskTable {
  tasks: Task[];
  handleUpdateTasks: any;
  handleTimedTaskSelect: any;
  handleEditedTaskSelect: any;
  editedTaskID?: number;
}

export const TaskTable = (props: TaskTable) => {
  const handleComplete = (
    event: ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    const oldTask: Task | undefined = props.tasks.find(
      (task: Task) => task.id == taskId
    );
    if (!oldTask) {
      console.log("Task not found");
      return;
    }
    const updatedTask: Task = { ...oldTask, complete: event.target.checked };
    props.handleUpdateTasks(updatedTask);
  };

  return (
    <Paper sx={{ p: 1 }}>
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
                  editedTaskID={props.editedTaskID}
                  task={task}
                  key={`${task.id}_${task.name}`}
                  handleComplete={(event: ChangeEvent<HTMLInputElement>) =>
                    handleComplete(event, task.id)
                  }
                  handleTimedTaskSelect={(
                    event: ChangeEvent<HTMLInputElement>
                  ) => props.handleTimedTaskSelect(event, task)}
                  handleEditedTaskSelect={(
                    event: ChangeEvent<HTMLInputElement>
                  ) => props.handleEditedTaskSelect(event, task)}
                />
              );
            })}
        </TableBody>
      </Table>
    </Paper>
  );
};

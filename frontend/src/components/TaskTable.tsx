import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Box,
  tableCellClasses,
} from "@mui/material";
import { ChangeEvent, Fragment, MouseEvent } from "react";
import { TaskTableRow } from "./TaskTableRow";

interface TaskTableProps {
  tasks: Task[];
  header: boolean;
  label?: string;
  handleUpdateTasks: any;
  handleTimedTaskSelect: any;
  handleProjectSelect: any;
  handleDeleteTask: any;
  handleShowCompleted?: any;
  showCompleted: boolean;
}

export const TaskTable = (props: TaskTableProps) => {
  const handleComplete = (
    event: ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    const oldTask: Task | undefined = props.tasks.find(
      (task: Task) => task.id === taskId
    );
    if (!oldTask) {
      console.log("Task not found");
      return;
    }
    const updatedTask: Task = { ...oldTask, complete: event.target.checked };
    props.handleUpdateTasks(updatedTask);
  };

  const sortByPriorityThenByDeadline = (a: Task, b: Task) => {
    const [A_PRIORITY, B_PRIORITY] = [
      a.priority ? a.priority : 0,
      b.priority ? b.priority : 0,
    ];
    const [A_DEADLINE, B_DEADLINE] = [
      a.deadline ? a.deadline.getTime() : 0,
      b.deadline ? b.deadline.getTime() : 0,
    ];

    return B_PRIORITY - A_PRIORITY || B_DEADLINE - A_DEADLINE;
  };

  return (
    <Fragment>
      {props.header && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0.3rem",
            paddingRight: "1rem",
            width: "100%",
            fontSize: "small",
          }}
        >
          <Switch
            checked={props.showCompleted}
            onChange={props.handleShowCompleted}
            color="secondary"
            size="small"
          />
          Show Completed
        </Box>
      )}

      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
          [`& td:first-of-type`]: {
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          },
          [`& td:last-of-type`]: {
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          },
        }}
      >
        {props.label && (
          <TableRow sx={{ boxShadow: 1 }}>
            <TableCell colSpan={7} padding="none" width="100%" align="center">
              <Box sx={{ p: "0.5rem" }}>{props.label}</Box>
            </TableCell>
          </TableRow>
        )}
        <TableBody>
          {props.tasks
            .slice(0)
            .reverse()
            .sort(sortByPriorityThenByDeadline)
            .map((task: Task) => {
              return (
                <TaskTableRow
                  task={task}
                  key={`${task.id}_${task.name}`}
                  handleComplete={(event: ChangeEvent<HTMLInputElement>) =>
                    handleComplete(event, task.id)
                  }
                  handleTimedTaskSelect={(
                    event: MouseEvent<HTMLButtonElement>
                  ) => props.handleTimedTaskSelect(event, task)}
                  handleUpdateTasks={props.handleUpdateTasks}
                  handleProjectSelect={props.handleProjectSelect}
                  handleDeleteTask={(event: MouseEvent<HTMLButtonElement>) =>
                    props.handleDeleteTask(event, task)
                  }
                />
              );
            })}
        </TableBody>
      </Table>
    </Fragment>
  );
};

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Switch,
  Box,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import { ChangeEvent, Fragment, MouseEvent } from "react";
import { TaskTableRow } from "./TaskTableRow";
import FlagIcon from "@mui/icons-material/Flag";

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
  const theme = useTheme();
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
        }}
      >
        {props.header && (
          <TableHead>
            <TableRow
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 1,
                },
              }}
            >
              <TableCell style={{ width: "5%" }}>Complete</TableCell>
              <TableCell style={{ width: "25%" }}>Name</TableCell>
              <TableCell
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "table-cell",
                    xl: "table-cell",
                  },
                }}
                style={{ width: "30%" }}
              >
                Time Elapsed
              </TableCell>
              <TableCell style={{ width: "5%" }}>
                <FlagIcon />
              </TableCell>
              <TableCell style={{ width: "5%" }}></TableCell>
              <TableCell style={{ width: "5%" }}></TableCell>
              <TableCell style={{ width: "5%" }}></TableCell>
            </TableRow>
          </TableHead>
        )}
        {props.label && (
          <TableRow style={{ backgroundColor: theme.palette.primary.dark }}>
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

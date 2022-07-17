import { ThemeContext } from "@emotion/react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Switch,
  Box,
  Collapse,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import { EditTaskForm } from "./EditTaskForm";
import { TaskTableRow } from "./TaskTableRow";

interface TaskTableProps {
  tasks: Task[];
  header: boolean;
  label?: string;
  handleUpdateTasks: any;
  handleTimedTaskSelect: any;
  handleEditedTaskSelect: any;
  handleEditedTaskDeselect: any;
  handleProjectSelect: any;
  handleDeleteTask: any;
  handleShowCompleted?: any;
  showCompleted: boolean;
  editedTask?: Task;
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
  const getEditedTaskIndex = (tasks: Task[], editedTask?: Task) => {
    if (editedTask) {
      return tasks
        .slice(0)
        .reverse()
        .sort(sortByPriorityThenByDeadline)
        .findIndex((task: Task) => editedTask.id === task.id);
    }

    return tasks.length;
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
    <Paper sx={{ p: 1 }}>
      <Table>
        {props.header && (
          <TableHead>
            <TableRow>
              <TableCell colSpan={5} padding="none" width="100%" align="right">
                <Switch
                  checked={props.showCompleted}
                  onChange={props.handleShowCompleted}
                  color="secondary"
                />
                Show Completed
              </TableCell>
            </TableRow>
            <TableRow>
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
                style={{ width: "1fr" }}
              >
                Time Elapsed
              </TableCell>
              <TableCell style={{ width: "1fr" }}></TableCell>
            </TableRow>
          </TableHead>
        )}
        {props.label && (
          <TableRow>
            <TableCell colSpan={5} padding="none" width="100%" align="center">
              <Box sx={{ pb: 1.5 }}>{props.label}</Box>
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
                  handleEditedTaskSelect={(
                    event: ChangeEvent<HTMLButtonElement>
                  ) => props.handleEditedTaskSelect(event, task)}
                  handleDeleteTask={(event: MouseEvent<HTMLButtonElement>) =>
                    props.handleDeleteTask(event, task)
                  }
                />
              );
            })
            .slice(0, getEditedTaskIndex(props.tasks, props.editedTask))}
          <TableRow>
            <TableCell colSpan={5} width="100%" align="right">
              <Collapse
                in={props.editedTask ? true : false}
                orientation="vertical"
              >
                {props.editedTask && (
                  <EditTaskForm
                    task={props.editedTask}
                    key={`${props.editedTask.id}_${props.editedTask.name}`}
                    handleUpdateTasks={props.handleUpdateTasks}
                    handleEditedTaskDeselect={props.handleEditedTaskDeselect}
                    handleProjectSelect={props.handleProjectSelect}
                  ></EditTaskForm>
                )}
              </Collapse>
            </TableCell>
          </TableRow>
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
                  handleEditedTaskSelect={(
                    event: ChangeEvent<HTMLButtonElement>
                  ) => props.handleEditedTaskSelect(event, task)}
                  handleDeleteTask={(event: MouseEvent<HTMLButtonElement>) =>
                    props.handleDeleteTask(event, task)
                  }
                />
              );
            })
            .slice(getEditedTaskIndex(props.tasks, props.editedTask) + 1)}
        </TableBody>
      </Table>
    </Paper>
  );
};

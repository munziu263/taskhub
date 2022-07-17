import {
  Box,
  Button,
  Checkbox,
  Collapse,
  TableCell,
  TableRow,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import { PercentageCompleteTimerIcon } from "./PercentageCompleteTimerIcon";
import TimerIcon from "@mui/icons-material/Timer";
import { Fragment, useState } from "react";
import { EditTaskForm } from "./EditTaskForm";

interface TaskTableRowProps {
  task: Task;
  handleComplete: any;
  handleTimedTaskSelect: any;
  handleUpdateTasks: any;
  handleDeleteTask: any;
  handleProjectSelect: any;
}

export const TaskTableRow = (props: TaskTableRowProps) => {
  const [showEditedTask, setShowEditedTask] = useState<boolean>(false);

  const fullTimePeriods = (time: Seconds) => {
    return Math.floor(time / (25 * 60));
  };
  const moduloFullTimePeriod = (time: Seconds) => {
    return (time % (25 * 60)) / (25 * 60);
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 3) {
      return "error";
    } else if (priority === 2) {
      return "warning";
    } else if (priority === 1) {
      return "success";
    }
  };

  const toggleShowEditedTask = () => setShowEditedTask(!showEditedTask);

  return (
    <Fragment>
      <TableRow>
        <TableCell style={{ width: "5%" }}>
          <Checkbox
            onChange={(event) => props.handleComplete(event, props.task.id)}
            checked={props.task.complete}
            color="success"
          />
        </TableCell>
        <TableCell
          sx={{
            textDecoration: props.task.complete ? "line-through" : "none",
          }}
          style={{ width: "25%" }}
        >
          {props.task.name}
        </TableCell>
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
          <Box sx={{ display: "flex" }}>
            {fullTimePeriods(props.task.elapsed_time) > 0 &&
              [...Array(fullTimePeriods(props.task.elapsed_time))].map(
                (element, i) => <TimerIcon key={i} />
              )}
            {moduloFullTimePeriod(props.task.elapsed_time) > 0 && (
              <PercentageCompleteTimerIcon
                percentageComplete={
                  (100 * (props.task.elapsed_time % (25 * 60))) / (25 * 60)
                }
              />
            )}
          </Box>
        </TableCell>
        <TableCell style={{ width: "5%" }}>
          {props.task.priority > 0 && (
            <FlagIcon color={getPriorityColor(props.task.priority)} />
          )}
        </TableCell>
        <TableCell style={{ width: "5%" }}>
          <Button>
            <PlayArrowIcon
              color="secondary"
              onClick={(event) =>
                props.handleTimedTaskSelect(event, props.task)
              }
            />
          </Button>
        </TableCell>
        <TableCell style={{ width: "5%" }}>
          <Button>
            <ModeEditIcon
              color="secondary"
              onClick={(event) => toggleShowEditedTask()}
            />
          </Button>
        </TableCell>
        <TableCell style={{ width: "5%" }}>
          <Button>
            <DeleteIcon
              color="secondary"
              onClick={(event) => props.handleDeleteTask(event, props.task)}
            />
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ padding: showEditedTask ? "0.5rem" : 0 }}
          colSpan={7}
          width="100%"
          align="right"
        >
          <Collapse
            in={showEditedTask}
            orientation="vertical"
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ margin: 1 }}>
              <EditTaskForm
                task={props.task}
                key={`${props.task.id}_${props.task.name}`}
                handleUpdateTasks={props.handleUpdateTasks}
                handleProjectSelect={props.handleProjectSelect}
                toggleShowEditedTask={toggleShowEditedTask}
              ></EditTaskForm>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

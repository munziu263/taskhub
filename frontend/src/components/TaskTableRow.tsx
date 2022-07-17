import {
  Box,
  Button,
  Checkbox,
  Collapse,
  TableCell,
  TableRow,
  useTheme,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import { Fragment, useState } from "react";
import { EditTaskForm } from "./EditTaskForm";
import { ElapsedVersusEstimatedTimeProgressBar } from "./ElapsedVersusEstimatedTimeProgressBar";

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
  const theme = useTheme();

  const getPriorityColor = (priority: number) => {
    if (priority >= 3) {
      return "error";
    } else if (priority === 2) {
      return "warning";
    } else if (priority === 1) {
      return "success";
    }
  };

  const highPriority = (priority: number) => priority >= 3;

  const toggleShowEditedTask = () => setShowEditedTask(!showEditedTask);

  return (
    <Fragment>
      <TableRow
        sx={{
          boxShadow: 5,
          bgcolor: highPriority(props.task.priority)
            ? theme.palette.primary.dark
            : theme.palette.primary.main,
        }}
      >
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
          style={{ width: "40%" }}
        >
          <ElapsedVersusEstimatedTimeProgressBar
            elapsed_time={props.task.elapsed_time}
            estimated_time={props.task.estimated_time}
            highPriority={highPriority(props.task.priority)}
          />
        </TableCell>
        <TableCell style={{ width: "3%" }}>
          {props.task.priority > 0 && (
            <FlagIcon color={getPriorityColor(props.task.priority)} />
          )}
        </TableCell>
        <TableCell style={{ width: "3%" }}>
          <Button>
            <PlayArrowIcon
              color="secondary"
              onClick={(event) =>
                props.handleTimedTaskSelect(event, props.task)
              }
            />
          </Button>
        </TableCell>
        <TableCell style={{ width: "3%" }}>
          <Button>
            <ModeEditIcon
              color="secondary"
              onClick={(event) => toggleShowEditedTask()}
            />
          </Button>
        </TableCell>
        <TableCell style={{ width: "3%" }}>
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

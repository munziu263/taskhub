import { Box, Button, Checkbox, TableCell, TableRow } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import { PercentageCompleteTimerIcon } from "./PercentageCompleteTimerIcon";
import TimerIcon from "@mui/icons-material/Timer";

interface TaskTableRowProps {
  task: Task;
  handleComplete: any;
  handleTimedTaskSelect: any;
  handleEditedTaskSelect: any;
  handleDeleteTask: any;
}

export const TaskTableRow = (props: TaskTableRowProps) => {
  const fullTimePeriods = (time: Seconds) => {
    return Math.floor(time / (25 * 60));
  };

  const moduloFullTimePeriod = (time: Seconds) => {
    return (time % (25 * 60)) / (25 * 60);
  };

  return (
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
        style={{ width: "1fr" }}
      >
        <Box sx={{ display: "flex" }}>
          {props.task.elapsed_time &&
            fullTimePeriods(props.task.elapsed_time) > 0 &&
            [...Array(fullTimePeriods(props.task.elapsed_time))].map(
              (element, i) => <TimerIcon key={i} />
            )}
          {props.task.elapsed_time &&
            moduloFullTimePeriod(props.task.elapsed_time) > 0 && (
              <PercentageCompleteTimerIcon
                percentageComplete={
                  (100 * (props.task.elapsed_time % (25 * 60))) / (25 * 60)
                }
              />
            )}
        </Box>
      </TableCell>
      <TableCell style={{ width: "1fr" }}>
        <Button>
          <ModeEditIcon
            color="secondary"
            onClick={(event) => props.handleEditedTaskSelect(event, props.task)}
          />
        </Button>
        <Button>
          <PlayArrowIcon
            color="secondary"
            onClick={(event) => props.handleTimedTaskSelect(event, props.task)}
          />
        </Button>
        <Button>
          <DeleteIcon
            color="secondary"
            onClick={(event) => props.handleDeleteTask(event, props.task)}
          />
        </Button>
      </TableCell>
    </TableRow>
  );
};

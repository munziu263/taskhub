import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskTableRow {
  task: Task;
  handleComplete: any;
  handleTimedTaskSelect: any;
  handleEditedTaskSelect: any;
  handleDeleteTask: any;
  editedTaskID?: number;
}

export const TaskTableRow: React.FC<TaskTableRow> = (props: TaskTableRow) => {
  return (
    <TableRow>
      <TableCell>
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
      >
        {props.task.elapsed_time}
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
      >
        {props.task.estimated_time}
      </TableCell>
      <TableCell>
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

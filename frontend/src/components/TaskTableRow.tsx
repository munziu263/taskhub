import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface TaskTableRow {
  task: Task;
  handleComplete: any;
  handleTimedTaskSelect: any;
  handleEditedTaskSelect: any;
}

export const TaskTableRow: React.FC<TaskTableRow> = (props: TaskTableRow) => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          onChange={(event) => props.handleComplete(event, props.task.id)}
          checked={props.task.complete}
        />
      </TableCell>
      <TableCell>{props.task.name}</TableCell>
      <TableCell>{props.task.elapsed_time}</TableCell>
      <TableCell>{props.task.estimated_time}</TableCell>
      <TableCell>
        <Button size="small">
          <ModeEditIcon
            onClick={(event) => props.handleEditedTaskSelect(event, props.task)}
          />
        </Button>
        <Button size="small">
          <PlayArrowIcon
            onClick={(event) => props.handleTimedTaskSelect(event, props.task)}
          />
        </Button>
      </TableCell>
    </TableRow>
  );
};

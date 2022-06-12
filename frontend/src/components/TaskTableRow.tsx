import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

interface TaskTableRow {
  task: Task;
  handleComplete: any;
  handleTaskSelect: any;
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
            onClick={(event) => props.handleTaskSelect(event, props.task.id)}
          />
        </Button>
      </TableCell>
    </TableRow>
  );
};

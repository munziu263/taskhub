import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { TaskTableRow } from "./TaskTableRow";

interface TaskTable {
  tasks: Task[];
}

export const TaskTable = (props: TaskTable) => {
  return (
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
            return <TaskTableRow task={task} key={task.id} />;
          })}
      </TableBody>
    </Table>
  );
};

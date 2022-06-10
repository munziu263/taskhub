import { TableCell, TableHead } from "@mui/material";

export const TaskTableHead: React.FC = () => {
  return (
    <TableHead>
      <TableCell>Complete</TableCell>
      <TableCell>Name</TableCell>
    </TableHead>
  );
};

import {
  TextField,
  Typography,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  Paper,
} from "@mui/material";

const ProjectPage: React.FC<ProjectPageProps> = (props: ProjectPageProps) => {
  const projectID: number = props.project.id;
  const projectName: string = props.project.name;
  const tasks: Task[] = props.project.tasks;

  const loadData: any = (task: Task) => {
    let complete = task.complete;
    let name = task.name;
    let estimated_time = task.estimated_time;
    let priority = task.priority;
    return { complete, name, estimated_time, priority };
  };

  const rows = tasks.map((task: Task) => loadData(task));

  return (
    <Container
      component={Paper}
      id={"project-page-" + String(projectID)}
      sx={{ m: "auto", px: 1, py: 2 }}
    >
      <Typography
        variant="h5"
        sx={{ mx: 1, my: 2, px: 1, py: 1, borderBottom: 1 }}
      >
        {projectName === null ? "Tasks" : projectName}
      </Typography>
      <Container sx={{ m: "auto", px: 1, py: 3 }}>
        <Table
          aria-label={projectName}
          sx={{
            width: "auto",
            p: 1,
            m: "auto",
          }}
        >
          <TableContainer
            sx={{
              width: "auto",
              p: 2,
              m: "auto",
            }}
          >
            {/* Input field start*/}
            <TextField
              id="new_task"
              name="new_task"
              label="Add new task"
              fullWidth
              size="small"
            ></TextField>
            {/* input field end */}
            {/* table head start*/}
            <TableHead>
              <TableRow>
                <TableCell>Complete</TableCell>
                <TableCell>Task Name</TableCell>
                <TableCell>Estimated Time</TableCell>
                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>
            {/* table head end */}
            {/* table body start */}
            <TableBody>
              {tasks.map((task: Task, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <Checkbox checked={task.complete} />
                    </TableCell>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.estimated_time}</TableCell>
                    <TableCell>
                      {task.priority ? task.priority : "Low"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {/* table body end */}
          </TableContainer>
        </Table>
      </Container>
    </Container>
  );
};

export { ProjectPage };

import { Button, TextField, Grid } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface EditTaskFormProps {
  task: Task;
  handleUpdateTasks: any;
  handleProjectSelect: any;
  toggleShowEditedTask: any;
}

export const EditTaskForm = (props: EditTaskFormProps) => {
  const [taskValues, setTaskValues] = useState<Task>(props.task);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setTaskValues({ ...taskValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleUpdateTasks(taskValues);
    props.toggleShowEditedTask();
    if (taskValues.project_id !== props.task.project_id) {
      props.handleProjectSelect(event, taskValues.project_id);
    }
  };

  return (
    props.task && (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <TextField
              id="name-input"
              name="name"
              label="Name"
              type="text"
              value={taskValues.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <TextField
              id="project-id-input"
              name="project_id"
              label="Project ID"
              type="number"
              value={taskValues.project_id}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            {" "}
            <TextField
              id="elapsed-time-input"
              name="elapsed_time"
              label="Elapsed Time"
              type="number"
              value={taskValues.elapsed_time}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <TextField
              id="estimated-time-input"
              name="estimated_time"
              label="Estimated Time"
              type="number"
              value={taskValues.estimated_time}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <TextField
              id="deadline-input"
              name="deadline"
              label="Deadline"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={taskValues.deadline ? taskValues.deadline : undefined}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <TextField
              id="priority-input"
              name="priority"
              label="Priority Level"
              type="number"
              value={taskValues.priority}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  );
};

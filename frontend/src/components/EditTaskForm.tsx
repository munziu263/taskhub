import { Button, TextField, Grid, MenuItem } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useProjectsApi from "../services/useProjectsApi";
import HomeIcon from "@mui/icons-material/Home";

interface EditTaskFormProps {
  task: Task;
  handleUpdateTasks: any;
  handleProjectSelect: any;
  toggleShowEditedTask: any;
}

export const EditTaskForm = (props: EditTaskFormProps) => {
  const [taskValues, setTaskValues] = useState<Task>(props.task);
  const [projects, setProjects] = useState<Project[]>();
  const { projectsApi } = useProjectsApi();

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

  useEffect(() => {
    projectsApi
      .get_all()
      .then((projects: Project[]) => {
        setProjects(projects);
      })
      .catch((err: Error) => console.log(err));
  }, []);

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
              id="project-input"
              name="project_id"
              label="Project"
              type="text"
              onChange={handleChange}
              fullWidth
              select
            >
              <MenuItem value={0}>
                <HomeIcon />
              </MenuItem>
              {projects &&
                projects
                  .slice(0)
                  .reverse()
                  .map((project: Project) => {
                    return (
                      <MenuItem value={project.id} key={project.id}>
                        {project.name.toUpperCase()}
                      </MenuItem>
                    );
                  })}
            </TextField>
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
              defaultValue={
                taskValues.deadline ? taskValues.deadline : undefined
              }
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <TextField
              id="priority-input"
              name="priority"
              label="Priority Level"
              type="text"
              onChange={handleChange}
              fullWidth
              select
            >
              <MenuItem value={0}>Low</MenuItem>
              <MenuItem value={1}>Medium</MenuItem>
              <MenuItem value={2}>High</MenuItem>
              <MenuItem value={3}>Very High</MenuItem>
            </TextField>
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

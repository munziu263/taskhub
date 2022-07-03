import { Container, TextField, Typography } from "@mui/material";
import { profileEnd } from "console";
import { ChangeEvent, FormEvent, useState } from "react";

interface EditTaskForm {
  task: Task;
  handleUpdateTasks: any;
  handleEditedTaskDeselect: any;
}

export const EditTaskForm = (props: EditTaskForm) => {
  const [name, setName] = useState<string>(props.task.name);
  const [elapsedTime, setElapsedTime] = useState<Seconds>(
    props.task.elapsed_time ? props.task.elapsed_time : 0
  );
  const [estimatedTime, setEstimatedTime] = useState<Seconds>(
    props.task.estimated_time ? props.task.estimated_time : 0
  );
  const [project, setProject] = useState<number | undefined>(
    props.task.project_id
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // Update the textfield selected
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTask: Task = {
      ...props.task,
      name: name,
      elapsed_time: elapsedTime,
      estimated_time: estimatedTime,
    };
    props.handleUpdateTasks(updatedTask);
    props.handleEditedTaskDeselect();
  };

  return (
    props.task && (
      <Container id={`edit-task-${props.task.name}`}>
        <form onSubmit={handleSubmit}>
          <TextField
            autoComplete="off"
            onChange={handleChange}
            value={name}
            label={"Name"}
          />
          <TextField
            autoComplete="off"
            onChange={handleChange}
            value={elapsedTime}
            label={"Elapsed Time"}
          />
          <TextField
            autoComplete="off"
            onChange={handleChange}
            value={estimatedTime}
            label={"Estimated Time"}
          />
          <TextField
            autoComplete="off"
            onChange={handleChange}
            value={project}
            label={"Project"}
          />
        </form>
      </Container>
    )
  );
};

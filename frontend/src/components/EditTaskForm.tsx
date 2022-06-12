import { useEffect, useState } from "react";
import useTasksApi from "../services/useTasksApi";

interface EditTaskForm {
  taskID: number;
}

export const EditTaskForm = (props: EditTaskForm) => {
  const [task, setTask] = useState<Task | undefined>();
  const { tasksApi } = useTasksApi();

  useEffect(() => {
    tasksApi.get_by_id(props.taskID).then((selectedTask: Task) => {
      setTask(selectedTask);
    });
  }, [props.taskID]);

  const handleSubmitUpdatedTask = (updatedTask: Task) => {};
  return <div>{task && task.name}</div>;
};

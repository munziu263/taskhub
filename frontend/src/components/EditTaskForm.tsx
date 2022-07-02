interface EditTaskForm {
  task: Task | null;
  handleUpdateTasks: any;
}

export const EditTaskForm = (props: EditTaskForm) => {
  return <div>{props.task && props.task.name}</div>;
};

type Seconds = number;

type Task = {
  id: number;
  name: string;
  project_id?: number;
  estimated_time?: Seconds;
  elapsed_time?: Seconds;
  complete: boolean;
  priority?: number;
  deadline?: Date;
};

type Project = {
  id: number;
  name: string;
  tasks: Task[];
};
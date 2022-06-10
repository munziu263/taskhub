type Seconds = number

type Task = {
  id: number;
  name: string;
  projectID?: number;
  estimated_time?: Seconds;
  elapsed_time?: Seconds;
  complete: boolean;
  priority?: number;
  deadline?: Date
}

type Project = {
  id: number;
  name: string;
  tasks: Task[]
}

type TimerProps = {
  activePeriod: Seconds;
  restPeriod: Seconds;
  endPeriodHandler: () => void;
}

type ProjectPageProps = {
  project: Project
}
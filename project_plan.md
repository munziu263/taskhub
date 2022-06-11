# Build a pomodoro / to-do hybrid

## Data Structure

Projects

- Tasks
  - Description
  - Time Estimate
  - Time Taken
  - Deadline

Timer

- for projects
- automatically logs time taken on task

Project Dashboard

- Deadline summary (late / due today / future)
- Estimated Time
- Elapsed Time
- Task summary (# to do / # done)
- Estimates how long it will take based on time estimates

User - Own projects - Logs time taken to complete tasks and time for total project

## Outline

| Projects | Project Page           | Task Page |
| -------- | ---------------------- | --------- |
|          | Project Stats          |           |
| Create   | Create                 | Edit Task |
| Select   | Select                 |           |
| List     | List                   |           |
|          | Timer for current task |           |

## Major components to build

| ProjectSideNavBar  | ProjectPage      | TaskPage      |
| ------------------ | ---------------- | ------------- |
| CreateProjectField | ProjectDashboard | TaskDashboard |
| ProjectTab         | CreateTaskField  | EditTaskForm  |
|                    | TasksTable       |

## State required

| Project      | Project Page     | Task Page     |
| ------------ | ---------------- | ------------- |
| All Projects | Selected Project | Selected Task |

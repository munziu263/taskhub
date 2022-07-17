import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Chip, Grid, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { accurateTimer } from "../shared/util/accurateTimer";

interface TimerProps {
  activePeriod: Seconds;
  restPeriod: Seconds;
  task?: Task;
  endPeriodHandler: () => void;
  handleTimedTaskDeselect: any;
  handleUpdateTasks: any;
}

const Timer = (props: TimerProps) => {
  const [isRestPeriod, setIsRestPeriod] = useState<boolean>(false);
  const isRestPeriodRef = useRef<boolean>();
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<Seconds>(props.activePeriod);
  const [startTime, setStartTime] = useState<Seconds>(props.activePeriod);

  const [timer, setTimer] = useState<any>(
    accurateTimer(() => setTimeLeft((timeLeft) => timeLeft - 1))
  );

  const toggle = () => {
    setIsPaused((isPaused) => !isPaused);
  };

  const toggleRestPeriod = () => {
    setIsRestPeriod((isRestPeriod) => !isRestPeriod);
  };

  const resetTimeLeft = () => {
    const nextTimePeriod: Seconds = isRestPeriodRef.current
      ? props.restPeriod
      : props.activePeriod;
    setTimeLeft(nextTimePeriod);
    setStartTime(nextTimePeriod);
  };

  const handleUpdateElapsedTime = () => {
    if (props.task && !isRestPeriodRef.current) {
      const elapsedTime: Seconds = startTime - timeLeft;
      console.log(`Time Elapsed: ${elapsedTime}`);
      const updatedTask: Task = {
        ...props.task,
        elapsed_time: props.task.elapsed_time
          ? props.task.elapsed_time + elapsedTime
          : elapsedTime,
      };
      props.handleUpdateTasks(updatedTask);
      setStartTime(timeLeft);
    }
  };

  const handleRemoveTask = () => {
    handleUpdateElapsedTime();
    props.handleTimedTaskDeselect();
  };

  isRestPeriodRef.current = isRestPeriod;
  useEffect(() => {
    if (!isPaused) {
      timer.run();
    } else {
      timer.stop();
    }
  }, [isPaused, timer]);

  useEffect(() => {
    // When the timer runs out
    if (timeLeft === 0) {
      handleUpdateElapsedTime();
      toggle();
      toggleRestPeriod();
      props.endPeriodHandler();
    }
  }, [props, timeLeft]);

  useEffect(() => {
    resetTimeLeft();
  }, [isRestPeriod]);

  useEffect(() => {
    if (props.task) {
      setStartTime(timeLeft);
    }

    console.log(`${props.task?.name}: Start time - ${startTime}`);
    if (props.task && isPaused) {
      toggle();
    }
  }, [props.task]);

  return (
    <Grid
      id="timer-display"
      container
      spacing={2}
      padding={6}
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Grid item>
        {props.task && (
          <Chip
            label={props.task ? props.task.name : ""}
            onDelete={handleRemoveTask}
            size="medium"
            color="warning"
            avatar={<Avatar>{props.task.project_id}</Avatar>}
          />
        )}
      </Grid>
      <Grid item>
        <Typography variant="h1">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </Typography>
      </Grid>
      <Grid item>
        <Button onClick={toggle} variant="contained" color="secondary">
          {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
        </Button>
      </Grid>
    </Grid>
  );
};

export { Timer };

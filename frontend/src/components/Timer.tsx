import { useEffect, useRef, useState } from "react";
import { Button, Chip, Stack, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { accurateTimer } from "../shared/util/accurateTimer";
import useTasksApi from "../services/useTasksApi";

interface TimerProps {
  activePeriod: Seconds;
  restPeriod: Seconds;
  currentTask: Task | null;
  endPeriodHandler: () => void;
  handleTaskDeselect: any;
  handleUpdateTasks: any;
}

const Timer = (props: TimerProps) => {
  const [isRestPeriod, setIsRestPeriod] = useState<boolean>(false);
  const isRestPeriodRef = useRef<boolean>();
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<Seconds>(props.activePeriod);
  const [startTime, setStartTime] = useState<Seconds>(props.activePeriod);

  const [timer, setTimer] = useState<any>(
    accurateTimer(() => setTimeLeft((timeleft) => timeleft - 1))
  );

  const toggle = () => {
    setIsPaused((isPaused) => !isPaused);
  };

  const toggleRestPeriod = () => {
    setIsRestPeriod((isRestPeriod) => !isRestPeriod);
  };

  const resetTimeLeft = () => {
    setTimeLeft(
      isRestPeriodRef.current ? props.restPeriod : props.activePeriod
    );
    setStartTime(
      isRestPeriodRef.current ? props.restPeriod : props.activePeriod
    );
  };

  const handleUpdateElapsedTime = () => {
    if (props.currentTask) {
      const updatedTask: Task = {
        ...props.currentTask,
        elapsed_time: props.currentTask.elapsed_time
          ? props.currentTask.elapsed_time + (startTime - timeLeft)
          : startTime - timeLeft,
      };
      props.handleUpdateTasks(updatedTask);
      setStartTime(timeLeft);
    }
  };

  const handleRemoveTask = () => {
    handleUpdateElapsedTime();
    props.handleTaskDeselect();
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

  return (
    <div id="timer-display">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h1">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </Typography>
        {props.currentTask && (
          <Chip
            label={props.currentTask ? props.currentTask.name : ""}
            onDelete={handleRemoveTask}
          />
        )}
        <Button variant={isPaused ? "outlined" : "contained"} onClick={toggle}>
          {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
        </Button>
      </Stack>
    </div>
  );
};

export { Timer };

import { useEffect, useRef, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { accurateTimer } from "../shared/util/accurateTimer";

const Timer = (props: TimerProps) => {
  const [isRestPeriod, setIsRestPeriod] = useState<boolean>(false);
  const isRestPeriodRef = useRef<boolean>();
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(5);

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
        <Button variant={isPaused ? "outlined" : "contained"} onClick={toggle}>
          {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
        </Button>
      </Stack>
    </div>
  );
};

export { Timer };

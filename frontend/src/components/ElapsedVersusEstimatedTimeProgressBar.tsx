import { Box } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import { PercentageCompleteTimerIcon } from "./PercentageCompleteTimerIcon";

interface ElapsedVersusEstimatedTimeProgressBarProps {
  elapsed_time: Seconds;
  estimated_time: Seconds;
  highPriority: boolean;
}
export const ElapsedVersusEstimatedTimeProgressBar = (
  props: ElapsedVersusEstimatedTimeProgressBarProps
) => {
  const fullTimePeriods = (time: Seconds) => {
    return Math.floor(time / (25 * 60));
  };
  const moduloFullTimePeriod = (time: Seconds) => {
    return (time % (25 * 60)) / (25 * 60);
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        alignItems: "right",
      }}
    >
      {fullTimePeriods(props.elapsed_time) > 0 &&
        [...Array(fullTimePeriods(props.elapsed_time))].map((element, i) => (
          <TimerIcon key={i} />
        ))}
      {moduloFullTimePeriod(props.elapsed_time) > 0 && (
        <PercentageCompleteTimerIcon
          percentageComplete={
            (100 * (props.elapsed_time % (25 * 60))) / (25 * 60)
          }
          highPriority={props.highPriority}
        />
      )}
      {props.estimated_time > 0 && <Box>/</Box>}
      {fullTimePeriods(props.estimated_time) > 0 &&
        [...Array(fullTimePeriods(props.estimated_time))].map((element, i) => (
          <TimerIcon color="secondary" key={i} />
        ))}
      {moduloFullTimePeriod(props.estimated_time) > 0 && (
        <PercentageCompleteTimerIcon
          percentageComplete={
            (100 * (props.estimated_time % (25 * 60))) / (25 * 60)
          }
          highPriority={props.highPriority}
          color="secondary"
        />
      )}
    </Box>
  );
};

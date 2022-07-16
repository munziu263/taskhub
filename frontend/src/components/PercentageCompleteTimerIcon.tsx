import { Box } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";

interface PercentageCompleteTimerIconProps {
  percentageComplete: number;
}

export const PercentageCompleteTimerIcon = (
  props: PercentageCompleteTimerIconProps
) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "24px",
        height: "24px",
        alignItems: "right",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "0",
          bottom: "0",
          right: "0",
          height: "100%",
          width: `${100 - props.percentageComplete}%`,
          backgroundColor: "#0f2536",
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          height: "100%",
          width: "100%",
        }}
      >
        <TimerIcon />
      </Box>
    </Box>
  );
};

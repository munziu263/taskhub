import { Box, useTheme } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";

interface PercentageCompleteTimerIconProps {
  percentageComplete: number;
}

export const PercentageCompleteTimerIcon = (
  props: PercentageCompleteTimerIconProps
) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        width: "35px",
        height: "35px",
        fontSize: "large",
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
          backgroundColor: theme.palette.primary.main,
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
          fontSize: "large",
        }}
      >
        <TimerIcon fontSize="large" />
      </Box>
    </Box>
  );
};

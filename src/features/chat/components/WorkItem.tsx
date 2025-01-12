import React from "react";
import { Box, Typography, Stack } from "@mui/material";

interface WorkItemProps {
  title: string;
  imageUrl: string | null;
  message: string;
  createdAt: string;
}

const WorkItem: React.FC<WorkItemProps> = ({
  title,
  imageUrl,
  message,
  createdAt,
}) => {
  const formatDate = (timestamp: string): string => {
    // UTCとして解釈するため、タイムゾーンをZ（UTC）に明示させておく
    const utcDate = new Date(`${timestamp}Z`);

    if (isNaN(utcDate.getTime())) {
      console.error("Invalid timestamp:", timestamp);
      return "Invalid date";
    }

    const jstDate = new Date(utcDate.getTime());

    const now = new Date();
    const jstNow = new Date(now.getTime());

    const isToday =
      jstDate.getFullYear() === jstNow.getFullYear() &&
      jstDate.getMonth() === jstNow.getMonth() &&
      jstDate.getDate() === jstNow.getDate();

    if (isToday) {
      return jstDate.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return `${jstDate.getMonth() + 1}/${jstDate.getDate()}`;
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2} height={"60px"}>
      <Box
        component="img"
        src={imageUrl || "/placeholder-image.png"}
        alt={title}
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <Stack flexDirection="column" flex={1} overflow="hidden">
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="text.primary"
          noWrap
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          noWrap
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {message}
        </Typography>
      </Stack>
      <Stack
        flexDirection="column"
        justifyContent="flex-end"
        height="100%"
        sx={{ whiteSpace: "nowrap" }}
      >
        <Typography variant="caption" sx={{ color: "grey.600" }}>
          {formatDate(createdAt)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default WorkItem;

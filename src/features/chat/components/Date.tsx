import React from "react";
import { Box, Typography } from "@mui/material";

interface DateBadgeProps {
  date: string; // Add a date prop
}

const DateBadge: React.FC<DateBadgeProps> = ({ date }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 100, // Fixed width
          height: 40, // Fixed height
          backgroundColor: "rgba(127, 127, 127, 0.5)", // Adjust the color
          borderRadius: 6, // Equivalent to 8px
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: 16,
            fontFamily: '"SF Pro Text", sans-serif',
            fontWeight: 400,
            lineHeight: "22px",
            wordWrap: "break-word",
          }}
        >
          {date}
        </Typography>
      </Box>
    </Box>
  );
};

export default DateBadge;

"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface ClickableSpeechBubbleProps {
  content: string | React.ReactNode;
  onClick?: () => void; // Callback for button click
}

const ClickableSpeechBubble: React.FC<ClickableSpeechBubbleProps> = ({
  content,
  onClick,
}) => {
  const bubbleColor = "common.white";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginY: "8px",
        position: "relative", // Allow absolute positioning for the tail
      }}
    >
      <Button
        onClick={onClick}
        sx={{
          backgroundColor: bubbleColor,
          color: "common.black",
          maxWidth: "100%",
          padding: "8px 12px",
          borderRadius: "16px 16px 4px 16px",
          boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
          textTransform: "none", // Prevents uppercase transformation of button text
          whiteSpace: "nowrap", // Ensures text stays on one line
          wordWrap: "normal", // Prevents word wrapping
        }}
      >
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          {content}
        </Typography>
      </Button>

      {/* Tail */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-8px", // Adjust position to align with the bubble
          width: 0,
          height: 0,
          border: "8px solid transparent",
          borderTopColor: bubbleColor,
          right: "-8px",
        }}
      />
    </Box>
  );
};

export default ClickableSpeechBubble;

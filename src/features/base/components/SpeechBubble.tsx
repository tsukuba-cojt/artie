"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface SpeechBubbleProps {
  content: string;
  sender?: boolean; // If true, the message is from the sender
  bubbleColor?: string; // Custom bubble color
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  content,
  sender = true,
  bubbleColor = sender ? "accent.main" : "background.paper",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: sender ? "flex-end" : "flex-start",
        marginY: "8px",
      }}
    >
      <Box
        sx={{
          backgroundColor: bubbleColor,
          color: sender ? "common.white" : "common.black",
          maxWidth: "60%",
          padding: "8px 12px",
          borderRadius: sender ? "16px 16px 4px 16px" : "16px 16px 16px 4px", // Adjusts border radius for tail
          boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
          position: "relative",
          fontFamily: "SF Pro Text",
          wordWrap: "break-word",
        }}
      >
        <Typography variant="body1">{content}</Typography>

        {/* Tail */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: 0,
            height: 0,
            border: "8px solid transparent",
            borderTopColor: bubbleColor,
            left: sender ? "auto" : "-8px",
            right: sender ? "-8px" : "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default SpeechBubble;

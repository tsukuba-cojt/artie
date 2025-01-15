"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface SpeechBubbleProps {
  content: string;
  sender?: boolean;
  bubbleColor?: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  content,
  sender = true,
  bubbleColor = sender ? "background.paper" : "accent.main",
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
          color: sender ? "common.black" : "common.white",
          maxWidth: "100%",
          padding: "8px 12px",
          borderRadius: sender ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
          position: "relative",
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

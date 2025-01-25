"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface SpeechBubbleProps {
  content: string;
  isRight?: boolean;
  bubbleColor?: string;
  textColor?: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  content,
  isRight = true,
  bubbleColor = isRight ? "common.white" : "accent.main",
  textColor = isRight ? "text.primary" : "accent.main",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isRight ? "flex-end" : "flex-start",
      }}
    >
      <Box
        sx={{
          backgroundColor: bubbleColor,
          color: textColor,
          maxWidth: "100%",
          padding: "8px 12px",
          borderRadius: isRight ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
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
            left: isRight ? "auto" : "-8px",
            right: isRight ? "-8px" : "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default SpeechBubble;

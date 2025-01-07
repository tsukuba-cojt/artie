"use client";

import React from "react";
import { Box } from "@mui/material";
import ChatInput from "@/features/chat/components/Input";

export default function Home() {
  return (
    <Box
      sx={{
        padding: 3, // Add padding around the page
        display: "flex",
        flexDirection: "column", // Arrange children in a vertical stack
        gap: 2, // Add spacing between components
      }}
    >
      <ChatInput />
    </Box>
  );
}

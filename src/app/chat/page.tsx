"use client";

import React from "react";
import { Box } from "@mui/material";
import ChatInput from "@/features/chat/components/Input";

export default function Home() {
  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <ChatInput />
    </Box>
  );
}

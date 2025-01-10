"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import ChatInput from "@/features/chat/components/Input";
import { useParams } from "next/navigation";

export default function Home() {
  const { workId } = useParams(); // Retrieve `workId` from the route

  return (
    <>
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
      <Typography>ID: {workId}</Typography>
    </>
  );
}

"use client";

import React from "react";
import { Box } from "@mui/material";
import DateBadge from "@/features/chat/components/Date";
import SpeechBubble from "@/features/base/components/SpeechBubble";

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
      <DateBadge date={"11/10(日)"} />
      <SpeechBubble
        content={
          "モナリザね～！知ってる？モナリザは○○△△××なんだよー✨君もモナリザに興味ある？どんなことでも気軽に聞いてね！"
        }
        sender={false}
      />

      {/* Speech Bubble for receiver */}
      <SpeechBubble content={"モナリザって誰が書いたの？"} sender={true} />

      {/* Date Badge */}
    </Box>
  );
}

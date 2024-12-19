"use client";

import React from "react";
import { Box } from "@mui/material";
import SpeechBubble from "@/features/base/components/SpeechBubble";

export default function Home() {
  return (
    <Box>
      <SpeechBubble
        content="モナリザって誰が書いたのOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO？"
        sender={false}
      />
      <SpeechBubble content="レオナルドダヴィンチだよ！" sender={true} />
    </Box>
  );
}

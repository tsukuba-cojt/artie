"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import Header from "@/features/base/components/header";

export default function Home() {
  return (
    <Stack flexDirection="column" height="100dvh" gap={2}>
      <Stack flexDirection="column" px={2} gap={2}>
        <Header title="Social" showBackButton={false} />
        <Typography textAlign={"center"}>開発中</Typography>
      </Stack>
    </Stack>
  );
}

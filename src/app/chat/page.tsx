"use client";

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NavigationBar from "@/feature/base/components/NavigationBar";

export default function Home() {
  return (
    <Box
      sx={{
        paddingBottom: "100px", // Adjust based on the height of the NavigationBar
      }}
    >
      <div>Chat</div>
      <NavigationBar />
    </Box>
  );
}

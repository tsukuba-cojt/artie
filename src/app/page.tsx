"use client";

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const theme = useTheme();

  const colors = [
    {
      name: "Primary",
      palette: theme.palette.primary,
    },
    {
      name: "Secondary",
      palette: theme.palette.secondary,
    },
    {
      name: "Accent",
      palette: theme.palette.accent,
    },
    {
      name: "Background Default",
      palette: { main: theme.palette.background.default },
    },
    {
      name: "Background Paper",
      palette: { main: theme.palette.background.paper },
    },
    {
      name: "Text Primary",
      palette: { main: theme.palette.text.primary },
    },
    {
      name: "Text Secondary",
      palette: { main: theme.palette.text.secondary },
    },
    {
      name: "Text Disabled",
      palette: { main: theme.palette.text.disabled },
    },
    {
      name: "Common Black",
      palette: { main: theme.palette.common.black },
    },
    {
      name: "Common White",
      palette: { main: theme.palette.common.white },
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Theme Colors
      </Typography>
      <Grid container spacing={2}>
        {colors.map((color) => (
          <Grid item xs={12} sm={6} md={4} key={color.name}>
            <Box
              sx={{
                backgroundColor: color.palette.main,
                color: theme.palette.text.primary,
                padding: 2,
                borderRadius: 1,
                border: "1px solid #ccc",
              }}
            >
              <Typography variant="subtitle1">{color.name}</Typography>
              <Typography variant="body2">
                Main: {color.palette.main}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

"use client";

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./thema";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ height: "100vh", width: "100vw" }} p={2}>
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./thema";
import NavigationBar from "@/feature/base/components/NavigationBar";

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
          <NavigationBar />
          {/* Render the children */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

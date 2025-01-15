"use client";

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./thema";
import NavigationBar from "@/features/base/components/NavigationBar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const shouldShowNavigationBar =
    !pathname.startsWith("/auth") && !pathname.startsWith("/chat/");

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {shouldShowNavigationBar && <NavigationBar />}
          <Box sx={{ height: "100vh", width: "100vw" }}>{children}</Box>
        </ThemeProvider>
      </body>
    </html>
  );
}

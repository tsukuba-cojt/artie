"use client";

import AboutWorks from "@/features/works/components/AboutWorks";
import Header from "@/features/works/components/Header";
import SlidingTabs from "@/features/works/components/SlideBar";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <main>
      <Box sx={{ position: "relative" }}>
        <Header />
        <AboutWorks />
      </Box>
      <SlidingTabs />
      <div
        style={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        <p>This is the main content of the page.</p>
      </div>
    </main>
  );
}

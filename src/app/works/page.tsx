"use client";

import Index from "@/feature/works/components/Index";
import SlidingTabs from "@/features/works/components/SlideBar";

export default function Page() {
  return (
    <main>
      <Index />
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

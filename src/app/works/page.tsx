"use client";

import Header from "@/feature/works/components/Header";
import SlidingTabs from "@/features/works/components/SlideBar";

export default function Page() {
  return (
    <main>
      <Header />
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

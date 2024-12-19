"use client";

import Index from "@/feature/works/components/Index";

export default function Page() {
  return (
    <main>
      <Index />
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

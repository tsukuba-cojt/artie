"use client";

import SpeechBubble from "@/features/base/components/SpeechBubble";
import ClickableSpeechBubble from "@/features/chat/components/SuggestionButton";
import SpeechBubbleButton from "@/features/chat/components/SuggestionButton";
import React from "react";

const Example = () => {
  const handleClick = () => {
    console.log("Speech bubble clicked!");
  };

  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        padding: "16px",
        gap: "16px",
        msOverflowStyle: "none",
      }}
    >
      <ClickableSpeechBubble
        content="どうやって書いたの？"
        onClick={() => alert("Button clicked!")}
      />
      <ClickableSpeechBubble
        content="モナリザは誰？"
        onClick={() => alert("Button clicked!")}
      />
      <ClickableSpeechBubble
        content="高いの？"
        onClick={() => alert("Button clicked!")}
      />
    </div>
  );
};

export default Example;

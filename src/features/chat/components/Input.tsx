"use client";

import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim() !== "") {
      sendMessageToDatabase(message); // Call your function to send the message
      setMessage(""); // Clear the input field after sending
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend(); // Trigger sending the message when Enter is pressed
    }
  };

  const sendMessageToDatabase = async (message: string) => {
    console.log("Sending message:", message);
    // Add your database logic here
  };

  return (
    <Box
      sx={{
        width: "100%",
        paddingX: 2,
        paddingY: 1,
        background: "white",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
        borderRadius: 48,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* Input Field */}
      <InputBase
        placeholder="Type message here..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Listen for key presses
        sx={{
          flex: 1,
          height: 40,
          paddingY: 1,
          paddingX: 1,
          color: "accent.main",
          fontSize: 16,
          fontFamily: '"Noto Sans", sans-serif',
          fontWeight: 400,
          lineHeight: "24px",
          letterSpacing: "0.5px",
        }}
      />

      {/* Send Button */}
      <IconButton
        onClick={handleSend}
        sx={{
          color: "accent.main",
        }}
      >
        <Icon icon="akar-icons:paper-airplane" style={{ fontSize: "24px" }} />
      </IconButton>
    </Box>
  );
};

export default ChatInput;

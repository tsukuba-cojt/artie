"use client";

import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "55px",
        paddingX: 2,
        paddingY: 1,
        backgroundColor: "common.white",
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
        placeholder="メッセージを入力..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        sx={{
          flex: 1,
          height: 40,
          paddingY: 1,
          paddingX: 1,
          color: "accent.main",
          fontSize: 16,
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

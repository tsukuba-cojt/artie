"use client";

import React, { useState } from "react";
import { Box, InputBase, IconButton, CircularProgress } from "@mui/material";
import { Icon } from "@iconify/react";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
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
    if (event.key === "Enter" && !disabled) {
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
      <InputBase
        placeholder="メッセージを入力..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
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

      <IconButton
        onClick={handleSend}
        disabled={disabled}
        sx={{
          color: "accent.main",
        }}
      >
        {disabled ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <Icon icon="akar-icons:paper-airplane" style={{ fontSize: "24px" }} />
        )}
      </IconButton>
    </Box>
  );
};

export default ChatInput;

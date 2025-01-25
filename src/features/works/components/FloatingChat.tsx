"use client";

import React, { useState } from "react";
import { Fab, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

interface FloatingActionButtonProps {
  id: string | string[] | undefined;
  IconComponent?: React.ElementType;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    if (id) {
      setTimeout(() => {
        router.push(`/chat/${id}`);
      }, 500); // Simulate loading delay
    }
  };

  return (
    <Fab
      sx={{
        position: "fixed",
        bottom: "100px",
        right: "20px",
        backgroundColor: "accent.main",
      }}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress size={24} style={{ color: "white" }} />
      ) : (
        <Box
          sx={{
            fontSize: "35px",
            color: "primary.main", // Use theme's primary color
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Centers the icon vertically
          }}
        >
          <Icon icon="token:chat" />
        </Box>
      )}
    </Fab>
  );
};

export default FloatingActionButton;

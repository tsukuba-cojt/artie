import React, { useState } from "react";
import { Fab, CircularProgress, Box } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface FloatingActionButtonProps {
  id: string | string[] | undefined;
  IconComponent?: React.ElementType;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <Link href={`/chat/${id}`} passHref>
      <Fab
        color="accent"
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
        }}
        onClick={handleClick} // Trigger loading spinner
        disabled={isLoading} // Disable button while loading
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
    </Link>
  );
};

export default FloatingActionButton;

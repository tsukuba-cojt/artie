"use client";

import React, { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";

interface HeaderProps {
  title: string;
  rightReactNode?: ReactNode;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  rightReactNode,
  showBackButton = false,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <AppBar
      position="static"
      sx={{
        color: "accent.main",
        boxShadow: "none",
        position: "relative",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <Box
          sx={{
            width: "48px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {showBackButton && (
            <IconButton
              edge="start"
              onClick={handleBack}
              sx={{ color: "accent.main", padding: 0 }}
            >
              <Icon icon="stash:angle-left-duotone" width="32" height="32" />
            </IconButton>
          )}
        </Box>

        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "48px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {rightReactNode}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

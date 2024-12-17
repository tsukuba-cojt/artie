import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";

interface HeaderProps {
  title: string;
  backPath?: string;
}

const Header: React.FC<HeaderProps> = ({ title, backPath }) => {
  const router = useRouter();

  const handleBack = () => {
    if (backPath) {
      router.push(backPath);
    }
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
          position: "relative",
          justifyContent: backPath ? "start" : "center",
        }}
      >
        {backPath && (
          <IconButton
            edge="start"
            onClick={handleBack}
            sx={{
              color: "accent.main",
              padding: 0,
              position: "absolute",
            }}
          >
            <Icon icon="stash:angle-left-duotone" width="32" height="32" />
          </IconButton>
        )}
        <Typography
          variant="h6"
          sx={{
            margin: "0 auto",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

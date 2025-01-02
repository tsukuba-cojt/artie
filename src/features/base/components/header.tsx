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
  backPath?: string;
}

const Header: React.FC<HeaderProps> = ({ title, backPath, rightReactNode }) => {
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          padding: 0,
        }}
      >
        {/* 左端の戻るボタン */}
        {backPath ? (
          <IconButton
            edge="start"
            onClick={handleBack}
            sx={{ color: "accent.main", padding: 0 }}
          >
            <Icon icon="stash:angle-left-duotone" width="32" height="32" />
          </IconButton>
        ) : (
          <Box />
        )}

        {/* 中央のタイトル */}
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>

        {/* 右端のノード */}
        {rightReactNode && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {rightReactNode}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

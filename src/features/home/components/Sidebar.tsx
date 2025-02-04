import React from "react";
import {
  Drawer,
  IconButton,
  Box,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { theme } from "@/app/thema";
import { signOut } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 200,
          padding: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
          backgroundColor: "primary.main",
        },
      }}
    >
      {/* ヘッダー */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="close sidebar"
          className="closeButton"
        >
          <Icon icon="mdi:close" width="24" />
        </IconButton>
        <Typography variant="body1">
          <strong>設定</strong>
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <MenuItem id="aboutPageLinkButton">
          <span>About</span>
          <Icon
            icon="mdi:chevron-right"
            width="24"
            color={theme.palette.accent.main}
          />
        </MenuItem>
        <MenuItem id="profilePageLinkButton">
          <span>プロフィール</span>
          <Icon
            icon="mdi:chevron-right"
            width="24"
            color={theme.palette.accent.main}
          />
        </MenuItem>
      </Box>

      {/* フッター */}
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{
            borderColor: "accent.main",
            color: "accent.main",
          }}
          onClick={() => router.push(`/auth/deleteAccount/`)}
        >
          アカウント削除
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "accent.main", color: "common.white" }}
          onClick={signOut}
          fullWidth
        >
          ログアウト
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

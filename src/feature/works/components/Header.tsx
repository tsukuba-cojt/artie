import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { theme } from "@/app/thema";

const Header: React.FC = () => {
  const [icon, setIcon] = useState<string>("stash:heart");

  const router = useRouter();

  const toggleIcon = () => {
    setIcon((prevIcon) =>
      prevIcon === "stash:heart" ? "stash:heart-solid" : "stash:heart"
    );
  };

  const goBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 7,
        width: "100%",
        height: "100%",
      }}
    >
      {/* 左アイコン：前のページに戻る */}
      <IconButton onClick={goBack}>
        <Icon
          icon="stash:angle-left-light"
          style={{ fontSize: "48px", color: theme.palette.text.secondary }}
        />
      </IconButton>

      {/* 中央テキスト */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontWeight: 400,
        }}
      >
        作品について
      </Typography>

      {/* 右アイコン */}
      <IconButton onClick={toggleIcon}>
        <Icon
          icon={icon}
          style={{
            fontSize: "48px",
            color:
              icon === "stash:heart"
                ? theme.palette.text.secondary
                : theme.palette.accent.main,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default Header;

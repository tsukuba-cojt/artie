// components/Header.tsx

import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  // アイコンの状態を管理
  const [icon, setIcon] = useState<string>("stash:heart");

  // useRouterフックを使ってrouterオブジェクトを取得
  const router = useRouter();

  // アイコンを切り替える関数
  const toggleIcon = () => {
    setIcon((prevIcon) =>
      prevIcon === "stash:heart" ? "stash:heart-solid" : "stash:heart"
    );
  };

  // 前のページに戻る関数
  const goBack = () => {
    router.back(); // Next.jsの`router.back()`で前のページに戻る
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
          style={{ fontSize: "48px", color: "#ffffff" }}
        />
      </IconButton>

      {/* 中央テキスト */}
      <Typography
        sx={{
          color: "#ffffff",
          fontSize: 24,
          fontFamily: "Zen Kaku Gothic Antique, sans-serif",
          fontWeight: 400,
        }}
      >
        作品について
      </Typography>

      {/* 右アイコン */}
      <IconButton onClick={toggleIcon}>
        <Icon icon={icon} style={{ fontSize: "48px", color: "#ffffff" }} />
      </IconButton>
    </Box>
  );
};

export default Header;

"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Box, Button, Stack } from "@mui/material";

interface ArtBoxProps {
  imageUrl: string;
  title: string;
  workId: number;
  direction?: "row" | "column";
}

const ArtBox: React.FC<ArtBoxProps> = ({
  imageUrl,
  title,
  workId,
  direction = "column",
}) => {
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/works/${workId}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "16px",
        width: direction === "column" ? "100%" : "auto",
        height: direction === "column" ? "auto" : "100%",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* 画像 */}
      <Box
        component="img"
        src={imageUrl ?? ""}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* タイトルと詳細ボタン */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: "absolute",
          bottom: 0,
          padding: "24px",
          width: "100%",
        }}
      >
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {title}
        </Typography>
        <Button
          sx={{
            backgroundColor: "common.white",
            color: "text.primary",
            borderRadius: "10px",
          }}
          onClick={handleDetail}
        >
          <strong>詳細</strong>
        </Button>
      </Stack>
    </Box>
  );
};

export default ArtBox;

"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Box, Button, Stack } from "@mui/material";
import useSearchHistory from "@/features/search/hooks/useSearchHistory";

interface ArtBoxProps {
  imageUrl: string;
  title: string;
  workId: string;
  direction?: "row" | "column";
}

const ArtBox: React.FC<ArtBoxProps> = ({
  imageUrl,
  title,
  workId,
  direction = "column",
}) => {
  const router = useRouter();

  const { addHistory } = useSearchHistory();

  const handleDetail = () => {
    addHistory({ id: workId, title, imageUrl });
    router.push(`/works/${workId}`);
  };

  return (
    <Box
      className="work-card-item"
      sx={{
        position: "relative",
        borderRadius: "16px",
        width: direction === "column" ? "100%" : "auto",
        height: direction === "column" ? "auto" : "100%",
        maxHeight: direction === "row" ? "30dvh" : "auto",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* 画像 */}
      <Box
        component="img"
        src={imageUrl ?? null}
        alt={title}
        sx={{
          width: "100%",
          height: direction === "column" ? "auto" : "100%",
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
          padding: "12px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            // backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: "8px",
            padding: "4px",
            maxWidth: "calc(100% - 100px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            className="title"
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Box>
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

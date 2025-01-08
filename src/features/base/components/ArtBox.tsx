"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Box, Button, Stack } from "@mui/material";

interface ArtBoxProps {
  imageUrl: string;
  title: string;
  workId: number;
}

const ArtBox: React.FC<ArtBoxProps> = ({ imageUrl, title, workId }) => {
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/works/${workId}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "16px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={imageUrl ?? ""}
        alt={title}
        sx={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
      />

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
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

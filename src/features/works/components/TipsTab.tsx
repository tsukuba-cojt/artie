"use client";

import React from "react";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import SpeechBubble from "@/features/base/components/SpeechBubble";
import { getArtieImageUrl } from "@/lib/getArtieImageUrl";
import { ShowArtieModel } from "@prisma/client";

export default function Home() {
  const handleClick = () => {
    alert("ボタンがクリックされました！");
  };

  console.log(getArtieImageUrl(ShowArtieModel.DEFAULT));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingTop: "0px",
      }}
    >
      <Image
        src={getArtieImageUrl(ShowArtieModel.DEFAULT)}
        alt="Default Artie"
        width={137}
        height={200}
        style={{
          objectFit: "contain",
          borderRadius: "center",
        }}
      />
      <Stack flexDirection="column" gap={1}>
        <SpeechBubble
          content="これはサンプルの吹き出しです！"
          isRight={false}
        />

        <Button
          sx={{
            backgroundColor: "common.white",
            color: "accent.main",
            borderRadius: "10px",
            width: "160px",
            boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <strong>チャットしてみる</strong>
        </Button>
      </Stack>
    </Box>
  );
}

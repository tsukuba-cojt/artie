"use client";

import React from "react";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import SpeechBubble from "@/features/base/components/SpeechBubble";

export default function Home() {
  const isLeft = false; // 吹き出しを左向きにする場合 true, 右向きなら false
  const handleClick = () => {
    alert("ボタンがクリックされました！");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingTop: "0px",
        paddingLeft: "5px",
        gap: "10px", // 吹き出しと画像の間隔
      }}
    >
      {/* 画像（常に右側に固定） */}
      <Image
        src="/images/artie.png"
        alt="Default Artie"
        width={137}
        height={200}
        style={{
          objectFit: "contain", // 枠いっぱいに収める（トリミング）
          borderRadius: "center", 
         
        }}
      />
      <Stack flexDirection="column">

      {/* 吹き出し */}
      <SpeechBubble content="これはサンプルの吹き出しです！" sender={isLeft} />
     
      <Button
          sx={{
            backgroundColor: "common.white",
            color: "accent.main",
            borderRadius: "10px",
            width:"160px",
            boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
  
          }}
        
        >
          <strong>チャットしてみる</strong>
        </Button>
      </Stack>
      
    </Box>
  );
}

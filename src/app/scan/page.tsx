"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Fab, Typography } from "@mui/material";
import SearchAreaFrameSVG from "@/features/scan/components/SearchAreaFrameSVG";
import { Icon } from "@iconify/react";
import { theme } from "../thema";
import { useRouter } from "next/navigation";

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch {
        setStatusMessage(
          "カメラの使用許可がありません。設定からカメラへのアクセスを許可してください。",
        );
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCaptureAndPredict = async () => {
    try {
      if (!videoRef.current) {
        setStatusMessage(
          "予期せぬエラーが発生しました。再度時間をおいてお試しください。",
        );
        return;
      }

      setStatusMessage("認識中です...");

      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setStatusMessage(
          "予期せぬエラーが発生しました。再度時間をおいてお試しください。",
        );
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg").split(",")[1];

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64: imageData }),
      });

      const data = await response.json();

      if (data.id) {
        setStatusMessage("");

        router.push(`/works/${data.id}`);
      } else if (data.error) {
        setStatusMessage(data.error);
      }

      setTimeout(() => setStatusMessage(""), 5000);
    } catch {
      setStatusMessage(
        "予期せぬエラーが発生しました。再度時間をおいてお試しください。",
      );

      setTimeout(() => setStatusMessage(""), 5000);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <video
        ref={videoRef}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
        }}
      />

      <Fab
        sx={{
          position: "absolute",
          bottom: 110,
          right: 16,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
        onClick={handleCaptureAndPredict}
      >
        <Icon
          icon="hugeicons:search-02"
          width={40}
          height={40}
          color={theme.palette.accent.main}
        />
      </Fab>

      <Box
        sx={{
          position: "absolute",
          top: "10%",
          width: "100%",
          textAlign: "center",
          color: "primary.main",
          px: 2,
        }}
      >
        <Typography variant="h6">{statusMessage}</Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          pointerEvents: "none",
        }}
      >
        <SearchAreaFrameSVG
          width={200}
          height={200}
          stroke={theme.palette.accent.main}
        />
      </Box>
    </Box>
  );
}

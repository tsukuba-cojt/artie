"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Fab, Typography } from "@mui/material";
import SearchAreaFrameSVG from "@/features/scan/components/SearchAreaFrameSVG";
import { Icon } from "@iconify/react";
import { theme } from "../thema";
import { useRouter } from "next/navigation";

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (isMounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch((error) => console.warn(error));
        }
      } catch (error) {
        console.error("Camera error:", error);
        setStatusMessage(
          "カメラの使用許可がありません。設定からカメラへのアクセスを許可してください。",
        );
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCaptureAndPredict = async () => {
    if (isRecognizing) return;

    try {
      setIsRecognizing(true);

      if (!videoRef.current || !canvasRef.current) {
        console.error("videoRef or canvasRef is null:", {
          video: videoRef.current,
          canvas: canvasRef.current,
        });
        setStatusMessage(
          "予期せぬエラーが発生しました。再度時間をおいてお試しください。",
        );
        setIsRecognizing(false);
        return;
      }

      if (!videoRef.current.videoWidth || !videoRef.current.videoHeight) {
        setStatusMessage("カメラの準備が整っていません。");
        setIsRecognizing(false);
        return;
      }

      setStatusMessage("認識中です...");

      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Canvas context is null");
        setStatusMessage(
          "予期せぬエラーが発生しました。再度時間をおいてお試しください。",
        );
        setIsRecognizing(false);
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setIsVideoVisible(false);

      const imageData = canvas.toDataURL("image/jpeg").split(",")[1];

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64: imageData }),
      });

      if (!response.ok) {
        throw new Error("APIエラー: " + response.status);
      }

      const data = await response.json();

      if (data.id) {
        setStatusMessage("");
        router.push(`/works/${data.id}`);
      } else if (data.error) {
        setStatusMessage(data.error);
      }

      setTimeout(() => setStatusMessage(""), 5000);
    } catch (error) {
      console.error("Error in handleCaptureAndPredict:", error);
      setStatusMessage(
        "予期せぬエラーが発生しました。再度時間をおいてお試しください。",
      );
      setTimeout(() => setStatusMessage(""), 5000);
    } finally {
      setIsRecognizing(false);
      setIsVideoVisible(true); // リアルタイム表示に戻す
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100dvh",
        backgroundColor: "black",
      }}
    >
      {/* 常に DOM にレンダリングし、スタイルで切り替える */}
      <video
        ref={videoRef}
        style={{
          display: isVideoVisible ? "block" : "none",
          width: "100vw",
          height: "100dvh",
          objectFit: "cover",
        }}
        playsInline
        autoPlay
        muted
        controls={false}
      />
      <canvas
        ref={canvasRef}
        style={{
          display: isVideoVisible ? "none" : "block",
          width: "100vw",
          height: "100dvh",
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
        disabled={isRecognizing}
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

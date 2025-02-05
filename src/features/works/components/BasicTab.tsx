"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useParams } from "next/navigation";
import useUserSettings from "@/features/auth/hooks/useUserSettings";

const BasicTab = () => {
  const { id } = useParams();
  const { settings } = useUserSettings();
  const [description, setDescription] = useState<string | null>(null);
  const [descriptionAudioUrl, setDescriptionAudioUrl] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Audio インスタンスを保持する ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchWork = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/works/basic?id=${id}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "データの取得に失敗しました。");
        setDescription(null);
        setDescriptionAudioUrl(null);
        return;
      }

      setDescription(data.description || "説明がありません。");
      setDescriptionAudioUrl(data.descriptionAudioUrl || null);
      setError(null);
    } catch {
      setError("予期せぬエラーが発生しました。");
      setDescription(null);
      setDescriptionAudioUrl(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchWork();
    }
  }, [id, fetchWork]);

  // 音声ガイドの自動再生・停止を制御
  useEffect(() => {
    if (settings.autoPlayAudioGuide && descriptionAudioUrl) {
      // もしすでに再生中の音声があれば停止してから新しい音声を再生
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(descriptionAudioUrl);
      audioRef.current = audio;
      audio.play().catch((error) => {
        console.error("音声の再生に失敗しました。", error);
      });
    } else {
      // 自動再生がオフになった場合、再生中の音声を停止する
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    }
  }, [settings.autoPlayAudioGuide, descriptionAudioUrl]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        p={2}
        alignItems="center"
        mb="111px"
      >
        <CircularProgress sx={{ color: "accent.main" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" gap={2} p={2} mb="111px">
        <Typography sx={{ color: "accent.main" }}>{error}</Typography>
        <Button
          variant="outlined"
          sx={{ color: "accent.main" }}
          onClick={fetchWork}
        >
          再試行
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "left", mb: "111px" }}>
      <Typography variant="body1" sx={{ marginTop: "10px" }}>
        {description}
      </Typography>
    </Box>
  );
};

export default BasicTab;

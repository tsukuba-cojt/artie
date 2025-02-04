"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Stack,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import Image from "next/image";
import SpeechBubble from "@/features/base/components/SpeechBubble";
import { getArtieImageUrl } from "@/lib/getArtieImageUrl";
import { ShowArtieModel } from "@prisma/client";
import { useParams } from "next/navigation";

const TipsTab = () => {
  const { id } = useParams();
  const router = useRouter();
  const [funFacts, setFunFacts] = useState<
    { fuctComment: string; showArtieModel: ShowArtieModel }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFunFacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/works/tips?id=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      setFunFacts(data.data);
      setError(null);
    } catch {
      setError("データの取得に失敗しました。");
      setFunFacts([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchFunFacts();
    }
  }, [id, fetchFunFacts]);

  const handleChatNavigation = (message: string) => {
    if (id) {
      router.push(`/chat/${id}?message=${message}`);
    }
  };

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
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <Typography sx={{ color: "accent.main" }}>{error}</Typography>
        <Button
          variant="outlined"
          sx={{ color: "accent.main", borderColor: "accent.main" }}
          onClick={fetchFunFacts}
        >
          再試行
        </Button>
      </Box>
    );
  }

  return (
    <Stack spacing={2} paddingTop="0px" pb="100px">
      {funFacts.length > 0 &&
        funFacts.map((fact, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                width: 100,
                height: 170,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={getArtieImageUrl(fact.showArtieModel)}
                alt="Artie"
                width={120}
                height={200}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Stack flexDirection="column" gap={1}>
              <SpeechBubble content={fact.fuctComment} isRight={false} />
              <Button
                onClick={() => handleChatNavigation(fact.fuctComment)}
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
        ))}
    </Stack>
  );
};

export default TipsTab;

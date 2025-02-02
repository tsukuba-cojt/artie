"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack, Button, CircularProgress } from "@mui/material";
import Image from "next/image";
import SpeechBubble from "@/features/base/components/SpeechBubble";
import { getArtieImageUrl } from "@/lib/getArtieImageUrl";
import { ShowArtieModel } from "@prisma/client";
import { useParams } from "next/navigation";

const TipsTab = () => {
  const { id } = useParams();
  const router = useRouter();
  const [funFacts, setFunFacts] = useState<string[]>([]);
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
      setFunFacts(
        Array.isArray(data.funFactComments) ? data.funFactComments : []
      );
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

  const handleChatNavigation = () => {
    if (id) {
      router.push(`/chat/${id}`);
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
      <Box display="flex" flexDirection="column" gap={2} p={2} mb="111px">
        <Button
          variant="outlined"
          sx={{ color: "accent.main" }}
          onClick={fetchFunFacts}
        >
          再試行
        </Button>
      </Box>
    );
  }

  return (
    <Stack spacing={2} paddingTop="0px" pb="100px">
      {funFacts.length > 0 ? (
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
                width: 120,
                height: 180,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={getArtieImageUrl(ShowArtieModel.DEFAULT)}
                alt="Artie"
                width={120}
                height={180}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Stack flexDirection="column" gap={1}>
              <SpeechBubble content={fact} isRight={false} />
              <Button
                onClick={handleChatNavigation}
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
        ))
      ) : (
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 120,
              height: 180,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={getArtieImageUrl(ShowArtieModel.DEFAULT)}
              alt="Artie"
              width={120}
              height={180}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Stack flexDirection="column" gap={1}>
            <SpeechBubble content="Fun fact not available" isRight={false} />
            <Button
              onClick={handleChatNavigation}
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
      )}
    </Stack>
  );
};

export default TipsTab;

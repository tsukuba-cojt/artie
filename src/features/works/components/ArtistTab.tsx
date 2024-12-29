"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { theme } from "@/app/thema";
import { CollapsibleText } from "@/features/base/components/CollapsibleText";

export default function ArtistTab() {
  const { id } = useParams();

  const [artistData, setArtistData] = useState({
    name: "",
    description: "",
    era: "",
    birthplace: "",
    keywords: [] as string[],
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAuthor = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/works/author?id=${id}`);
      const data = await res.json();

      if (res.ok) {
        setArtistData({
          name: data.data.Author.name,
          description: data.data.Author.description,
          era: data.data.Author.era,
          birthplace: data.data.Author.birthplace,
          keywords: data.data.Author.keywords || [],
        });
        setError(null);
      } else {
        setError("作者情報の取得に失敗しました");
      }
    } catch {
      setError("作者情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAuthor();
    }
  }, [id, fetchAuthor]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        p={2}
        alignItems={"center"}
        mb={"111px"}
      >
        <CircularProgress sx={{ color: "accent.main" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" gap={2} p={2} mb={"111px"}>
        <Typography sx={{ color: "accent.main" }}>{error}</Typography>
        <Button
          variant="outlined"
          sx={{ color: "accent.main" }}
          onClick={fetchAuthor}
        >
          再試行
        </Button>
      </Box>
    );
  }

  return (
    <Stack direction="column" gap={2} p={1} mb={"111px"}>
      <CollapsibleText text={artistData.description} maxLines={3} />

      <Stack direction="column" gap={2}>
        <Typography variant="h6" textAlign={"left"}>
          <strong>作者情報</strong>
        </Typography>

        {/* 名前 */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Icon
            icon="mdi:account-outline"
            width="20"
            height="20"
            color={theme.palette.accent.main}
          />
          <Typography sx={{ color: "accent.main", textAlign: "left" }}>
            <strong>名前</strong>
            <Box component={"span"} sx={{ color: "text.primary" }} ml={2}>
              {artistData.name}
            </Box>
          </Typography>
        </Stack>

        {/* 年代 */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Icon
            icon="material-symbols:footprint"
            width="20"
            height="20"
            color={theme.palette.accent.main}
          />
          <Typography sx={{ color: "accent.main", textAlign: "left" }}>
            <strong>年代</strong>
            <Box component={"span"} sx={{ color: "text.primary" }} ml={2}>
              {artistData.era}
            </Box>
          </Typography>
        </Stack>

        {/* 出身地 */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Icon
            icon="material-symbols:location-on-outline"
            width="20"
            height="20"
            color={theme.palette.accent.main}
          />
          <Typography sx={{ color: "accent.main", textAlign: "left" }}>
            <strong>出身地</strong>
            <Box component={"span"} sx={{ color: "text.primary" }} ml={2}>
              {artistData.birthplace}
            </Box>
          </Typography>
        </Stack>

        {/* キーワード */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Icon
            icon="material-symbols:label-outline"
            width="20"
            height="20"
            color={theme.palette.accent.main}
          />
          <Typography sx={{ color: "accent.main", textAlign: "left" }}>
            <strong>キーワード</strong>
            <Box component={"span"} sx={{ color: "text.primary" }} ml={2}>
              {artistData.keywords.join(", ")}
            </Box>
          </Typography>
        </Stack>
      </Stack>

      <Typography variant="h6" textAlign={"left"}>
        <strong>この作者の作品</strong>
      </Typography>
    </Stack>
  );
}

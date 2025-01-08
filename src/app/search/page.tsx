"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Stack,
  Typography,
  CircularProgress,
  IconButton,
  Button,
} from "@mui/material";
import ArtBox from "@/features/base/components/ArtBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { theme } from "../thema";
import Header from "@/features/base/components/header";
import useSearchHistory from "@/features/search/hooks/useSearchHistory";
import popularWorks from "@/features/search/datas/popularWorks";

interface SearchResult {
  id: number;
  title: string;
  imageUrl: string;
}

export default function SearchPage() {
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { history } = useSearchHistory();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setSearchResults([]);
    setError(null);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchQuery)}`,
      );
      if (!response.ok) {
        throw new Error("検索に失敗しました。");
      }

      const results: SearchResult[] = await response.json();
      setSearchResults(results);
    } catch {
      setError("予期しないエラーが発生しました。");
    } finally {
      setSearching(false);
    }
  };

  return (
    <Stack flexDirection="column" height="100vh" px={2} gap={2}>
      <Header title="Search" />

      <Stack
        direction="row"
        p={1.5}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          borderRadius: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.80)",
        }}
      >
        <TextField
          placeholder="作品名"
          variant="standard"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            "& .MuiInput-root": {
              border: "none",
            },
          }}
        />
        <IconButton
          onClick={handleSearch}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.80)",
            color: "rgba(255, 255, 255, 0.80)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.80)" },
          }}
        >
          <Icon
            icon="hugeicons:search-02"
            width={24}
            height={24}
            color={theme.palette.accent.main}
          />
        </IconButton>
      </Stack>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          paddingBottom: "113px",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {searchQuery.trim() === "" ? (
          <Stack direction="column" gap={2}>
            <Stack gap={1} direction="column">
              <Typography variant="h6">
                <strong>検索履歴</strong>
              </Typography>
              <Box
                sx={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  display: "flex",
                  gap: 2,
                  height: "300px",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {history.map((item) => (
                  <ArtBox
                    key={item.id}
                    direction="row"
                    imageUrl={item.imageUrl}
                    title={item.title}
                    workId={item.id}
                  />
                ))}
              </Box>
            </Stack>

            <Stack gap={1} direction="column">
              <Typography variant="h6">
                <strong>よく検索される作品</strong>
              </Typography>
              <Box
                sx={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  display: "flex",
                  gap: 2,
                  height: "300px",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {popularWorks.map((item) => (
                  <ArtBox
                    key={item.id}
                    direction="row"
                    imageUrl={item.imageUrl}
                    title={item.title}
                    workId={item.id}
                  />
                ))}
              </Box>
            </Stack>
          </Stack>
        ) : searching ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress sx={{ color: "accent.main" }} />
          </Box>
        ) : error ? (
          <Box display="flex" flexDirection="column" gap={2} p={2}>
            <Typography sx={{ color: "accent.main" }}>{error}</Typography>
            <Button
              variant="outlined"
              sx={{ color: "accent.main", borderColor: "accent.main" }}
              onClick={handleSearch}
            >
              再試行
            </Button>
          </Box>
        ) : searchResults.length > 0 ? (
          <Stack gap={1} direction="column">
            <Typography variant="h6">
              <strong>検索結果</strong>
            </Typography>
            <Stack direction="column" gap={2}>
              {searchResults.map((result) => (
                <ArtBox
                  key={result.id}
                  imageUrl={result.imageUrl}
                  title={result.title}
                  workId={result.id.toString()}
                />
              ))}
            </Stack>
          </Stack>
        ) : (
          <Stack gap={1} direction="column">
            <Typography variant="h6">
              <strong>検索結果</strong>
            </Typography>
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              検索結果が見つかりませんでした。
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

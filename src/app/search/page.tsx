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
import { Icon } from "@iconify/react";
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
    <Stack flexDirection="column" height="100dvh" gap={2}>
      <Stack flexDirection="column" px={2} gap={2}>
        <Header title="Search" showBackButton={false} />

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
            id="searchButton"
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
      </Stack>

      <Box
        sx={{
          height: "calc( 100dvh - 113px - 150px )",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {searchQuery.trim() === "" ? (
          <Stack direction="column" gap={2} height="100%">
            <Stack
              gap={1}
              direction="column"
              height="50%"
              width="100vw"
              sx={{
                overflow: "hidden",
              }}
            >
              <Typography variant="h6" ml={2}>
                <strong>閲覧履歴</strong>
              </Typography>
              <Stack
                flexDirection="row"
                id="searchHistory"
                sx={{
                  overflowX: "auto",
                  overflowY: "hidden",
                  whiteSpace: "nowrap",
                  height: "100%",
                  gap: 2,
                  paddingX: 2,
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
              </Stack>
            </Stack>

            <Stack
              gap={1}
              direction="column"
              height="50%"
              width="100vw"
              sx={{
                overflow: "hidden",
              }}
            >
              <Typography variant="h6" ml={2}>
                <strong>よく検索される作品</strong>
              </Typography>
              <Stack
                flexDirection="row"
                id="searchHistory"
                sx={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  height: "100%",
                  gap: 2,
                  paddingX: 2,
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
              </Stack>
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
            id="searchLoadingIndicator"
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
          <Stack gap={1} direction="column" p={2} mb={113}>
            <Typography variant="h6">
              <strong>検索結果</strong>
            </Typography>
            <Stack id="searchResultsContainer" direction="column" gap={2}>
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
          <Stack gap={1} direction="column" p={2} mb={113}>
            <Typography variant="h6">
              <strong>検索結果</strong>
            </Typography>
            <Typography
              id="noSearchResultsMessage"
              variant="body1"
              sx={{ color: "text.primary" }}
            >
              検索結果が見つかりませんでした。
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

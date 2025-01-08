"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Stack,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ArtBox from "@/features/base/components/ArtBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { theme } from "../thema";
import Header from "@/features/base/components/header";

interface SearchResult {
  id: number;
  title: string;
  imageUrl: string;
}

export default function SearchPage() {
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setSearchResults([]);

    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          title: "モナ・リザ",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/512px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
        },
        {
          id: 2,
          title: "彫刻作品",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Laocoon_Pio-Clementino_Inv1059-1064-1067_n01.jpg/512px-Laocoon_Pio-Clementino_Inv1059-1064-1067_n01.jpg",
        },
      ];
      setSearchResults(mockData);
      setSearching(false);
    }, 2000);
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
                  paddingBottom: 1,
                  paddingX: 2,
                  marginLeft: -2,
                  height: "300px",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <ArtBox
                  direction="row"
                  imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/512px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
                  title="モナ・リザ"
                  workId={1}
                />
                <ArtBox
                  direction="row"
                  imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Laocoon_Pio-Clementino_Inv1059-1064-1067_n01.jpg/512px-Laocoon_Pio-Clementino_Inv1059-1064-1067_n01.jpg"
                  title="彫刻作品"
                  workId={2}
                />
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
                <ArtBox
                  direction="row"
                  imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Laocoon_Pio-Clementino_Inv1059-1064-1067_n01.jpg/512px-Laocoon_Pio-Clementino_Inv1059-1064-1067_n01.jpg"
                  title="彫刻作品"
                  workId={2}
                />
                <ArtBox
                  direction="row"
                  imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/512px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
                  title="モナ・リザ"
                  workId={1}
                />
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
                  workId={result.id}
                />
              ))}
            </Stack>
          </Stack>
        ) : (
          <Stack gap={1} direction="column">
            <Typography variant="h6">
              <strong>検索結果</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
              }}
            >
              検索結果が見つかりませんでした。
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

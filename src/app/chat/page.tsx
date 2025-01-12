"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Stack,
  IconButton,
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { theme } from "../thema";
import Header from "@/features/base/components/header";
import WorkItem from "@/features/chat/components/WorkItem";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState<
    {
      workId: string;
      title: string;
      imageUrl: string | null;
      message: string;
      createdAt: string;
    }[]
  >([]);
  const [filteredWorks, setFilteredWorks] = useState<typeof works>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchWorkData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/chat/history", { method: "GET" });
      const data = await response.json();

      if (response.ok && Array.isArray(data.data)) {
        const formattedWorks = data.data.map(
          (item: {
            Work: { id: string; title: string; imageUrl: string | null };
            message: string;
            createdAt: string;
          }) => ({
            workId: item.Work.id,
            title: item.Work.title,
            imageUrl: item.Work.imageUrl,
            message: item.message,
            createdAt: item.createdAt,
          }),
        );
        setWorks(formattedWorks);
        setFilteredWorks(formattedWorks);
      } else {
        setError("データ取得に失敗しました。");
      }
    } catch {
      setError("予期しないエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = works.filter((work) =>
      work.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredWorks(filtered);
  };

  useEffect(() => {
    fetchWorkData();
  }, []);

  return (
    <Stack flexDirection="column" height="100vh" px={2} gap={2} width={"100vw"}>
      <Header title="Chat" showBackButton={false} />

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
          placeholder="検索キーワード (例:作品名)"
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
            color: theme.palette.accent.main,
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.90)" },
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
          padding: 1,
          backgroundColor: theme.palette.background.default,
          borderRadius: "16px",
        }}
      >
        {loading ? (
          <Stack alignItems="center" justifyContent="center" py={2}>
            <CircularProgress sx={{ color: theme.palette.accent.main }} />
          </Stack>
        ) : error ? (
          <Box display="flex" flexDirection="column" gap={2} p={2}>
            <Typography sx={{ color: theme.palette.accent.main }}>
              {error}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.accent.main,
                borderColor: theme.palette.accent.main,
              }}
              onClick={fetchWorkData}
            >
              再試行
            </Button>
          </Box>
        ) : (
          <Stack spacing={2} pb={"120px"} width={"100%"}>
            {filteredWorks.map((work, index) => (
              <Box
                key={index}
                onClick={() => router.push(`/chat/${work.workId}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <WorkItem
                  title={work.title}
                  imageUrl={work.imageUrl}
                  message={work.message}
                  createdAt={work.createdAt}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

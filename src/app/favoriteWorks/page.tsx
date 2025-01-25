"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import ArtBox from "@/features/base/components/ArtBox";
import Header from "@/features/base/components/header";

interface WorkData {
  id: string;
  title: string;
  imageUrl: string;
}

const FavoritesCard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [workData, setWorkData] = useState<WorkData[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/auth/user/favoriteWorks");
        if (!response.ok) {
          throw new Error("お気に入り作品の取得に失敗しました");
        }
        const data = await response.json();

        const formattedData = data.map((item: { Work: WorkData }) => ({
          id: item.Work.id,
          title: item.Work.title,
          imageUrl: item.Work.imageUrl,
        }));

        setWorkData(formattedData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading || error) {
    return null;
  }

  return (
    <Stack flexDirection="column" height="100dvh">
      <Header title="Gallery" showBackButton={true} />
      <Stack
        flexDirection="column"
        sx={{
          overflowX: "auto",
        }}
        width="100%"
        gap={2}
        px={2}
        pb="113px"
      >
        {workData.map((item) => (
          <ArtBox
            key={item.id}
            direction="column"
            imageUrl={item.imageUrl}
            title={item.title}
            workId={item.id}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default FavoritesCard;

"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { theme } from "@/app/thema";
import { useRouter } from "next/navigation";

const FavoritesCard: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const placeholder = "rgba(211, 211, 211, 0.6)";
  const imageSlots = [0, 1, 2].map((i) => images[i] || placeholder);

  const router = useRouter();

  const handleDetail = () => {
    router.push(`/favoriteWorks`);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/auth/user/favoriteWorks?limit=3");
        if (!response.ok) {
          throw new Error("お気に入り作品の取得に失敗しました");
        }
        const data = await response.json();
        console.log(data);
        const imageUrls = data.map(
          (item: {
            Work: {
              imageUrl: string;
            };
          }) => item.Work.imageUrl,
        );
        setImages(imageUrls);
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
    <Stack flexDirection="column" gap={1} px={2}>
      <Box
        sx={{
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "common.white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "200px",
            gap: "1px",
          }}
        >
          {/* 左側半分 (50%) */}
          <Box
            sx={{
              width: "50%",
              height: "100%",
              position: "relative",
            }}
          >
            {imageSlots[0] !== placeholder ? (
              <Box
                component="img"
                src={imageSlots[0]}
                alt="Favorite 1"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px 0 0 0",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: placeholder,
                  borderRadius: "8px 0 0 0",
                }}
              />
            )}
          </Box>

          {/* 右側 (上下で25%ずつ) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              height: "100%",
              gap: "1px",
            }}
          >
            {/* 右上 (25%) */}
            <Box
              sx={{
                width: "100%",
                height: "50%",
                position: "relative",
              }}
            >
              {imageSlots[1] !== placeholder ? (
                <Box
                  component="img"
                  src={imageSlots[1]}
                  alt="Favorite 2"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0 8px 0 0",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: placeholder,
                    borderRadius: "0 8px 0 0",
                  }}
                />
              )}
            </Box>

            {/* 右下 (25%) */}
            <Box
              sx={{
                width: "100%",
                height: "50%",
                position: "relative",
              }}
            >
              {imageSlots[2] !== placeholder ? (
                <Box
                  component="img"
                  src={imageSlots[2]}
                  alt="Favorite 3"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: placeholder,
                    borderRadius: "0",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            お気に入り
          </Typography>
          <IconButton onClick={handleDetail}>
            <Icon
              icon="material-symbols:arrow-circle-right"
              width={24}
              height={24}
              color={theme.palette.grey[700]}
            />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
};

export default FavoritesCard;

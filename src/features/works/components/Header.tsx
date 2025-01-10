"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter, useParams } from "next/navigation";
import { theme } from "@/app/thema";

const Header: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [toggling, setToggling] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // お気に入り状態を取得する関数
  const fetchFavoriteStatus = async () => {
    if (!id) return;

    try {
      const response = await fetch(`/api/works/${id}/favorite`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteStatus();
  }, [id]);

  // お気に入りの追加・解除を行う関数
  const toggleFavorite = async () => {
    if (!id) return;

    setToggling(true);

    try {
      const response = await fetch(`/api/works/${id}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFavorited((prev) => !prev);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setToggling(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "10px",
        gap: 7,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <IconButton onClick={goBack}>
        <Icon
          icon="stash:angle-left-light"
          style={{ fontSize: "48px", color: theme.palette.text.secondary }}
        />
      </IconButton>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontWeight: 400,
        }}
      >
        作品について
      </Typography>

      <IconButton
        onClick={toggleFavorite}
        disabled={loading || toggling || error}
      >
        {loading ? (
          <CircularProgress
            size={24}
            sx={{ color: theme.palette.accent.main }}
          />
        ) : (
          <Icon
            icon={isFavorited ? "stash:heart-solid" : "stash:heart"}
            style={{
              fontSize: "48px",
              color: isFavorited
                ? theme.palette.accent.main
                : theme.palette.text.secondary,
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default Header;

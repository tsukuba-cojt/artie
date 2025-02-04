"use client";

import React, { useState } from "react";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import Header from "@/features/base/components/header";

const FavoritesCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/deleteAccount", {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "アカウント削除に失敗しました。");
      }

      window.location.href = "/";
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "予期しないエラーが発生しました。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack flexDirection="column" height="100dvh">
      <Header title="Gallery" showBackButton={true} />
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        flex={1}
        p={2}
      >
        <Typography variant="body1" textAlign="center">
          アカウントを削除すると、過去の記録がすべて削除されますが、よろしいですか？
        </Typography>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{
            padding: "10px",
            backgroundColor: isLoading ? "grey.800" : "accent.main",
            color: "text.secondary",
            width: "180px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "アカウント削除"
          )}
        </Button>
      </Stack>
    </Stack>
  );
};

export default FavoritesCard;

"use client";

import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useParams } from "next/navigation";

const BasicTab = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWork = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/works/basic?id=${id}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "データの取得に失敗しました。");
        setDescription("");
        return;
      }

      setDescription(data.description || "説明がありません。");
      console.log(data);
      setError(null);
    } catch {
      setError("予期せぬエラーが発生しました。");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchWork();
    }
  }, [id]);

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
        <Typography sx={{ color: "accent.main" }}>{error}</Typography>
        <Button
          variant="outlined"
          sx={{ color: "accent.main" }}
          onClick={fetchWork}
        >
          再試行
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", textAlign: "left", mb: "111px" }}>
      <Typography variant="body1" sx={{ marginTop: "10px" }}>
        {description}
      </Typography>
    </Box>
  );
};

export default BasicTab;

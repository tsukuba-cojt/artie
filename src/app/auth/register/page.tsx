"use client";

import { useState } from "react";
import Header from "@/features/base/components/header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";

const StyledInput = styled("input")({
  display: "block",
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid",
  borderRadius: "5px",
});

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !file) {
      setErrorMessage("名前と画像を入力してください。");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("アカウントが作成されました！");
      setErrorMessage("");
    } else {
      setErrorMessage(
        "プロフィール情報の更新に失敗しました。時間をおいてやりなおしてください。",
      );
    }
  };

  return (
    <Stack
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Header title={"アカウント作成"} backPath="/auth/login" />

      <Stack component="form" onSubmit={handleSubmit} flexGrow={1} gap={3}>
        <Box>
          <Typography variant="h6">名前</Typography>
          <StyledInput
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box>
          <Typography variant="h6">アイコン画像</Typography>
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: "accent.main",
              color: "text.secondary",
              textTransform: "none",
              padding: "10px",
            }}
          >
            ファイルを選択
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </Button>
          {/* 選択されたファイル名を表示 */}
          {file && (
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {file.name}
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="h6">プレビュー</Typography>
          <Stack sx={{ width: "100%", alignItems: "center" }}>
            {previewUrl && (
              <Avatar
                src={previewUrl}
                alt="Preview"
                sx={{
                  width: 150,
                  height: 150,
                }}
              />
            )}
          </Stack>
        </Box>
      </Stack>

      <Stack
        sx={{
          px: 2,
          py: 2,
          alignItems: "center",
        }}
      >
        {errorMessage && (
          <Typography
            sx={{
              color: "error.main",
              fontSize: "14px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            padding: "10px",
            backgroundColor: "accent.main",
            color: "text.secondary",
            width: "180px",
          }}
        >
          アカウント作成
        </Button>
      </Stack>
    </Stack>
  );
}

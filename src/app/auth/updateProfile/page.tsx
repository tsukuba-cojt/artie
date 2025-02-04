"use client";

import { useEffect, useState } from "react";
import Header from "@/features/base/components/header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";
import { Stack, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

const StyledInput = styled("input")({
  display: "block",
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid",
  borderRadius: "5px",
});

export default function UpdateProfilePage() {
  const [name, setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    setErrorMessage("");
    if (!name) {
      setErrorMessage("名前を入力してください。");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("/api/auth/updateProfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setErrorMessage("");
        router.push("/");
      } else {
        setErrorMessage(
          "プロフィール情報の更新に失敗しました。時間をおいてやりなおしてください。",
        );
      }
    } catch {
      setErrorMessage("サーバーエラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (!response.ok) throw new Error("プロフィールの取得に失敗しました");

        const data = await response.json();
        setName(data.name || "");
        setPreviewUrl(data.imageUrl || null);
      } catch {
        setErrorMessage("プロフィールの取得に失敗しました");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Stack
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Header title={"プロフィール編集"} showBackButton={true} />

      <Stack flexGrow={1} gap={3} p={2}>
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
              accept=".jpg,.jpeg"
              onChange={handleFileChange}
              hidden
            />
          </Button>
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
            id="errorMessage"
          >
            {errorMessage}
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
            "プロフィール更新"
          )}
        </Button>
      </Stack>
    </Stack>
  );
}

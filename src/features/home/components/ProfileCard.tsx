import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface UserProfile {
  name: string;
  email: string;
  imageUrl?: string;
}

const ProfileCard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (!response.ok) {
          throw new Error("プロフィールの取得に失敗しました");
        }
        const data: UserProfile = await response.json();
        setProfile(data);
      } catch {
        setError("プロフィールの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Stack alignItems={"center"} justifyContent={"center"} width={"100%"}>
        <CircularProgress sx={{ color: "accent.main" }} />
      </Stack>
    );
  }

  if (error) {
    return <Typography color="error">エラーが発生しました: {error}</Typography>;
  }

  if (!profile) {
    return <Typography>プロフィールが見つかりません</Typography>;
  }

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack direction={"column"} gap={0}>
        <Typography variant="h5">
          <strong>{profile.name}</strong>
        </Typography>
        <Typography variant="body2" color="grey.500">
          <strong>{profile.email}</strong>
        </Typography>
      </Stack>
      <Box
        sx={{
          position: "relative",
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: profile.imageUrl ? "transparent" : "grey.300",
          border: profile.imageUrl ? "none" : "2px solid grey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {profile.imageUrl ? (
          <Box
            component="img"
            src={profile.imageUrl}
            alt="Profile Image"
            sx={{
              position: "absolute",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          // プレースホルダーの内容
          <Typography variant="body2" color="grey.500">
            No Img
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default ProfileCard;

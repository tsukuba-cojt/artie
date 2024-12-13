"use client";

import Header from "@/features/base/components/header";
import { signInWithGoogle } from "@/lib/supabase/auth";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Stack
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Header title="ログイン" />

      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Box
          sx={{
            width: "300px",
            height: "300px",
            position: "relative",
          }}
        >
          <Image
            src="/images/default_artie.png"
            alt="artieちゃん"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Box>

        {/* テキスト */}
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          ログインしてartieちゃんと
          <br />
          作品について語り合おう！
        </Typography>

        {/* Googleログインボタン */}
        <Box
          component="button"
          onClick={signInWithGoogle}
          sx={{
            background: "none",
            border: "none",
            objectFit: "contain",
            padding: "0",
            cursor: "pointer",
            display: "inline-flex",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Image
            src="/images/google_login.png"
            alt="Sign in with Google"
            width={280}
            height={67}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

// pages/works/[id].tsx または適切なパス
"use client";

import { AboutWorks } from "@/features/works/components/AboutWorks";
import Header from "@/features/works/components/Header";
import SlidingTabs from "@/features/works/components/SlideBar";
import FloatingActionButton from "@/features/works/components/FloatingChat";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FloatingAudioToggle from "@/features/works/components/FloatingAudioToggle";

const WorkPage = () => {
  const { id } = useParams();
  const [workData, setWorkData] = useState({
    title: "",
    author: "",
    imageUrl: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchWork = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/works?id=${id}`);
          const data = await res.json();

          if (res.ok) {
            setWorkData({
              title: data.data.title,
              author: data.data.Author.name,
              imageUrl: data.data.imageUrl || "",
            });
            setError(null);
          } else {
            setError("作品情報の取得に失敗しました");
          }
        } catch {
          setError("作品情報の取得に失敗しました");
        } finally {
          setLoading(false);
        }
      };

      fetchWork();
    }
  }, [id]);

  return (
    <Stack sx={{ height: "100%", width: "100%" }}>
      <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100dvh",
              width: "100vw",
            }}
          >
            <CircularProgress sx={{ color: "accent.main" }} />
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100dvh",
              width: "100vw",
            }}
          >
            <Typography sx={{ color: "accent.main", textAlign: "center" }}>
              {error}
            </Typography>
          </Box>
        ) : (
          <>
            <Header />
            <AboutWorks
              imageUrl={workData.imageUrl}
              title={workData.title}
              author={workData.author}
            />

            <SlidingTabs />
            <FloatingAudioToggle />
            <FloatingActionButton id={id} />
          </>
        )}
      </Box>
    </Stack>
  );
};

export default WorkPage;

"use client";

<<<<<<< HEAD
import { AboutWorks } from "@/features/works/components/AboutWorks";
import Header from "@/features/works/components/Header";
import SlidingTabs from "@/features/works/components/SlideBar";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
=======
import Header from "@/features/base/components/header";
import SlidingTabs from "@/features/works/components/SlideBar";
import { Box, Typography } from "@mui/material";
>>>>>>> 0e2f5837338edb92547b6ee5d2e6614d1faec959
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
              imageUrl: data.data.imageUrl || null,
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
<<<<<<< HEAD
    <Stack sx={{ height: "100%", width: "100%" }}>
      <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
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
              height: "100vh",
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
          </>
        )}
      </Box>
    </Stack>
=======
    <main>
      <Header title={""} />
      <SlidingTabs />
    </main>
>>>>>>> 0e2f5837338edb92547b6ee5d2e6614d1faec959
  );
};

export default WorkPage;

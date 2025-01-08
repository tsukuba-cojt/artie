"use client";

import { AboutWorks } from "@/features/works/components/AboutWorks";
import Header from "@/features/works/components/Header";
import SlidingTabs from "@/features/works/components/SlideBar";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const WorkPage = () => {
  const { id } = useParams();
<<<<<<< HEAD
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      // Fetch the work data using the API
      const fetchWork = async () => {
        try {
          const response = await fetch(`/api/works/basic?id=${id}`);
          const data = await response.json();

          if (!response.ok) {
            setError(data.error || "An error occurred.");
            return;
          }

          setDescription(data.description || "No description available.");
        } catch (err) {
          setError("An unexpected error occurred.");
=======
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
>>>>>>> 96901c24c6059251c42b8cd261b331d9b737e71c
        }
      };

      fetchWork();
    }
  }, [id]);

  return (
<<<<<<< HEAD
    <div>
      <h1>Work ID: {id}</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>Description: {description}</p>
      )}
    </div>
=======
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
>>>>>>> 96901c24c6059251c42b8cd261b331d9b737e71c
  );
};

export default WorkPage;

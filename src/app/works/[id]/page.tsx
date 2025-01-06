"use client";

import Header from "@/features/base/components/header";
import SlidingTabs from "@/features/works/components/SlideBar";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const WorkPage = () => {
  const { id } = useParams();
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
        }
      };

      fetchWork();
    }
  }, [id]);

  return (
    <main>
      <Header title={""} />
      <SlidingTabs />
    </main>
  );
};

export default WorkPage;

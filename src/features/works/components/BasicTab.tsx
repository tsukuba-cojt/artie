"use client";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const BasicTab = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await fetch(`/api/works/basic?id=${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "An error occurred while fetching the data.");
          return;
        }

        setDescription(data.description || "No description available.");
      } catch (err) {
        setError("An unexpected error occurred.");
      }
    };

    if (id) {
      fetchWork();
    }
  }, [id]);

  return (
    <Box sx={{ padding: "20px", textAlign: "left" }}>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            {description}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default BasicTab;

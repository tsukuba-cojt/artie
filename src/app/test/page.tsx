import React from "react";
import { Box, Typography } from "@mui/material";
import FloatingActionButton from "@/features/works/components/FloatingChat";

const FabTestPage = () => {
  const testId = "test123"; // Example ID for testing

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Test Floating Action Button
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", marginBottom: "16px" }}
      >
        Click the floating button to navigate to the chat page with ID: {testId}
      </Typography>
      <FloatingActionButton id={testId} />
    </Box>
  );
};

export default FabTestPage;

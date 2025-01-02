import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";

const ProfileCard = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack direction={"column"} gap={0}>
        <Typography variant="h5">
          <strong>筑波 太郎</strong>
        </Typography>
        <Typography variant="body2" color="grey.500">
          <strong>s2210573@u.tsukuba.ac.jp</strong>
        </Typography>
      </Stack>
      <Box
        component="img"
        src={
          "https://d2v5egomggext2.cloudfront.net/irohani.art/wp-content/uploads/2023/11/20111033/%E3%83%A2%E3%83%8A%E3%83%BB%E3%83%AA%E3%82%B60-768x1161.jpg"
        }
        sx={{
          position: "relative",
          height: "60px",
          width: "60px",
          objectFit: "cover",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      />
    </Stack>
  );
};

export default ProfileCard;

import { Box, Stack, Typography } from "@mui/material";

export default function AboutWorks() {
  return (
    <Stack direction={"column"}>
      <Box
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Leonardo_da_Vinci_-_Mona_Lisa.jpg/300px-Leonardo_da_Vinci_-_Mona_Lisa.jpg"
        sx={{
          position: "relative",
          width: "100vw",
          height: "auto",
          overflow: "hidden",
        }}
      />
      <Stack
        direction={"column"}
        gap={2}
        p={2}
        sx={{ width: "100vw", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h5">モナリザ</Typography>
        <Typography variant="body2">レオナルド・ダ・ヴィンチ</Typography>
      </Stack>
    </Stack>
  );
}

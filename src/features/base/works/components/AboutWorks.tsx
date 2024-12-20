import { Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
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
  );
}

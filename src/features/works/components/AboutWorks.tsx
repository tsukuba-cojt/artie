import { Box, Stack, Typography } from "@mui/material";

interface HeaderProps {
  imageUrl: string;
  title: string;
  author: string;
}

export const AboutWorks: React.FC<HeaderProps> = ({
  imageUrl,
  title,
  author,
}) => {
  return (
    <Stack direction={"column"}>
      <Box
        component="img"
        src={imageUrl ?? null}
        sx={{
          position: "relative",
          width: "100vw",
          height: "auto",
          minHeight: "100px",
          overflow: "hidden",
        }}
      />
      <Stack
        direction={"column"}
        gap={2}
        p={2}
        sx={{ width: "100vw", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{author}</Typography>
      </Stack>
    </Stack>
  );
};

import { theme } from "@/app/thema";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface CollapsibleTextProps {
  text: string;
  maxLines?: number;
}

export const CollapsibleText: React.FC<CollapsibleTextProps> = ({
  text,
  maxLines = 3,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [overflowed, setOverflowed] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(
        window.getComputedStyle(textRef.current).lineHeight,
      );
      const maxHeight = lineHeight * maxLines;
      const actualHeight = textRef.current.scrollHeight;
      setOverflowed(actualHeight > maxHeight);
    }
  }, [text, maxLines]);

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography
        variant="body1"
        ref={textRef}
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "unset" : maxLines,
          overflow: "hidden",
          textAlign: "left",
        }}
      >
        {text}
      </Typography>

      {overflowed && (
        <Button
          variant="text"
          onClick={() => setExpanded(!expanded)}
          sx={{
            color: "accent.main",
            p: 0,
            mt: 1,
            minWidth: "auto",
            textAlign: "left",
          }}
        >
          {expanded ? "閉じる" : "もっと見る >"}
        </Button>
      )}
    </Box>
  );
};

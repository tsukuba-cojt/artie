import React, { useEffect, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import Image from "next/image";
import SpeechBubble from "@/features/base/components/SpeechBubble";
import { getArtieImageUrl } from "@/lib/getArtieImageUrl";
import useSearchHistory from "@/features/search/hooks/useSearchHistory";
import { useRouter } from "next/navigation";

const PickUpWork: React.FC = () => {
  const [workData, setWorkData] = useState<{
    imageUrl: string;
    title: string;
    id: string;
  } | null>(null);
  const [comment, setComment] = useState<string>("");
  const [artieImageUrl, setArtieImageUrl] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { addHistory } = useSearchHistory();

  const handleDetail = () => {
    if (workData) {
      addHistory({
        id: workData.id,
        title: workData.title,
        imageUrl: workData.imageUrl,
      });
      router.push(`/works/${workData.id}`);
    }
  };

  useEffect(() => {
    const fetchPickUpWork = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/pickUpWork");
        const data = await response.json();

        if (response.ok) {
          setWorkData({
            id: data.pickUpWork.Work.id,
            title: data.pickUpWork.Work.title,
            imageUrl: data.pickUpWork.Work.imageUrl,
          });
          setComment(data.pickUpWork.comment);
          setArtieImageUrl(getArtieImageUrl(data.pickUpWork.showArtieModel));
          setError(null);
        } else {
          setError(data.error || "データの取得に失敗しました");
        }
      } catch {
        setError("予期せぬエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchPickUpWork();
  }, []);

  if (loading || error || !workData) {
    return null;
  }

  return (
    <Stack flexDirection="column" gap={1}>
      <Box px={2}>
        <Typography variant="h6" width="100%">
          <strong>今日のイチオシ⭐️</strong>
        </Typography>
      </Box>
      <Stack
        flexDirection="column"
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
          flexShrink: 0,
        }}
        gap={0.5}
      >
        <Box
          px={2}
          sx={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={workData?.imageUrl}
            alt="Work Image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              borderRadius: "8px",
            }}
            onClick={handleDetail}
          />
          <Stack
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-start"
            sx={{
              position: "absolute",
              left: 0,
              bottom: 0,
              padding: "24px",
              height: "100%",
            }}
          >
            <Typography
              className="title"
              variant="body1"
              sx={{ color: "text.secondary" }}
            >
              {workData?.title}
            </Typography>
          </Stack>
        </Box>

        <Stack flexDirection="row">
          {/* 吹き出し部分 */}
          <Box sx={{ width: "calc(100% - 130px)" }} pl={2}>
            <SpeechBubble
              content={comment}
              textColor="text.secondary"
              bubbleColor="accent.main"
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <Image
              src={artieImageUrl}
              alt="Artie Character"
              width={131}
              height={202}
              layout="intrinsic"
              objectFit="contain"
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PickUpWork;

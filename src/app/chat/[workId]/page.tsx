"use client";

import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatInput from "@/features/chat/components/Input";
import SpeechBubble from "@/features/base/components/SpeechBubble";
import Header from "@/features/base/components/header";
import ClickableSpeechBubble from "@/features/chat/components/SuggestionButton";

const ChatPage = () => {
  const { workId } = useParams();
  const [workData, setWorkData] = useState({
    imageUrl: "",
    title: "",
  });
  const [messages, setMessages] = useState<
    { sender: string; message: string; createdAt: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (workId) {
      const fetchWorkAndMessages = async () => {
        setLoading(true);
        try {
          const workRes = await fetch(`/api/works?id=${workId}`, {
            method: "GET",
          });
          const workData = await workRes.json();

          if (workRes.ok) {
            setWorkData({
              imageUrl: workData.data.imageUrl || "",
              title: workData.data.title || "Unknown Title",
            });
          } else {
            setError("データの取得に失敗しました");
          }

          const historyRes = await fetch(`/api/chat/${workId}/history`, {
            method: "POST",
          });
          const historyData = await historyRes.json();

          if (historyRes.ok) {
            setMessages(historyData.data || []);
          } else {
            setError("会話履歴の取得に失敗しました。");
          }
        } catch {
          setError("データの取得に失敗しました");
        } finally {
          setLoading(false);
        }
      };

      fetchWorkAndMessages();
    }
  }, [workId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      const res = await fetch(`/api/chat/${workId}/llm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: messages.map((msg) => ({
            role: msg.sender === "USER" ? "user" : "assistant",
            content: msg.message,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { sender: "USER", message, createdAt: new Date().toISOString() },
          {
            sender: "AI",
            message: data.reply,
            createdAt: new Date().toISOString(),
          },
        ]);
      } else {
        setError(data.reply || "メッセージの送信に失敗しました。");
      }
    } catch {
      setError("メッセージの送信中にエラーが発生しました。");
    }
  };

  return (
    <Stack
      sx={{
        height: "100dvh",
        width: "100%",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <Header title={workData.title || "Loading..."} showBackButton={true} />

      <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 3,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
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
              height: "100%",
            }}
          >
            <Typography sx={{ color: "accent.main", textAlign: "center" }}>
              {error}
            </Typography>
          </Box>
        ) : (
          messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 0,
                marginBottom: "20px",
                flexDirection: msg.sender === "USER" ? "row-reverse" : "row",
                justifyContent: msg.sender === "AI" ? "flex-end" : "flex-start",
              }}
            >
              {msg.sender !== "USER" && (
                <Box
                  component="img"
                  src="/images/profile_artie.png"
                  alt="Profile Image"
                  sx={{ width: 150, height: 150, borderRadius: "50%" }}
                />
              )}
              <SpeechBubble
                content={msg.message}
                sender={msg.sender === "USER"}
              />
            </Box>
          ))
        )}
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: "110px",
          left: 0,
          width: "100%",
          zIndex: 10,
          padding: "10px",
          display: "flex",
          gap: 2,
        }}
      >
        <ChatInput onSend={handleSendMessage} />
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: "180px",
          left: 0,
          width: "100%",
          zIndex: 10,
          padding: "10px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {["豆知識", "誰が描いたの", "いつ書かれたの"].map((text) => (
          <ClickableSpeechBubble
            key={text}
            content={text}
            onSend={handleSendMessage}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100px",
        }}
      ></Box>
    </Stack>
  );
};

export default ChatPage;

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
  const [sending, setSending] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!workId) {
      console.error("workId is undefined!");
      setError("Invalid work ID.");
      return;
    }

    const fetchWorkAndMessages = async () => {
      setLoading(true);
      try {
        console.log("Fetching work data from:", `/api/works?id=${workId}`);
        console.log(
          "Fetching chat history from:",
          `/api/chat/${workId}/history`,
        );

        // Fetch work data
        const workRes = await fetch(`/api/works?id=${workId}`);
        const workData = await workRes.json();

        if (workRes.ok) {
          setWorkData({
            imageUrl: workData.data?.imageUrl || "",
            title: workData.data?.title || "Unknown Title",
          });
        } else {
          console.error("Work API Error:", workData);
          setError("Failed to fetch work data.");
        }

        // Fetch chat history
        const historyRes = await fetch(`/api/chat/${workId}/history`, {
          method: "POST",
        });
        const historyText = await historyRes.text();
        console.log("Raw Chat History Response:", historyText);

        let historyData;
        try {
          historyData = JSON.parse(historyText);
        } catch (err) {
          console.error("Failed to parse JSON:", err);
          setError("Invalid chat history response.");
          return;
        }

        console.log("Parsed Chat History:", historyData);

        // Assign chat history correctly
        const chatHistory = historyData.history || historyData.message || [];

        if (!Array.isArray(chatHistory)) {
          console.error("Invalid history format:", historyData);
          setError("Invalid chat history response.");
          return;
        }

        setMessages(
          chatHistory.map((msg) => ({
            sender: msg.sender === "user" ? "user" : "assistant",
            message: msg.message,
            createdAt: msg.createdAt,
          })),
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkAndMessages();
  }, [workId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    setSending(true);

    try {
      const res = await fetch(`/api/chat/${workId}/llm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          context: workData.title || "Unknown Title",
          history: messages.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.message,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { sender: "user", message, createdAt: new Date().toISOString() },
          {
            sender: "AI",
            message: data.reply,
            createdAt: new Date().toISOString(),
          },
        ]);
      } else {
        console.error("Chat API Error:", data);
        setError(data.reply || "Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("An error occurred while sending the message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Stack
      sx={{
        height: "100vh",
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
          padding: 2,
          paddingBottom: "160px",
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
          <>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 2,
                  marginBottom: "10px",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  justifyContent:
                    msg.sender === "user" ? "flex-start" : "flex-end",
                }}
              >
                {msg.sender !== "user" && (
                  <Box
                    component="img"
                    src="/images/profile_artie.png"
                    alt="Profile Image"
                    sx={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                )}
                <Box
                  sx={{
                    alignSelf:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <SpeechBubble
                    content={msg.message}
                    isRight={msg.sender === "user"}
                  />
                </Box>
              </Box>
            ))}

            {sending && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <CircularProgress sx={{ color: "accent.main" }} />
              </Box>
            )}
          </>
        )}
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: "90px",
          left: 0,
          width: "100%",
          zIndex: 10,
          padding: "10px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          gap: 2,
        }}
      >
        {["この作品の豆知識", "誰が描いたの", "いつ書かれたの", "君は誰？"].map(
          (text) => (
            <ClickableSpeechBubble
              key={text}
              content={text}
              onSend={handleSendMessage}
            />
          ),
        )}
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
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
    </Stack>
  );
};

export default ChatPage;

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
    if (workId) {
      const fetchWorkAndMessages = async () => {
        setLoading(true);
        try {
          // Fetch work data
          const workRes = await fetch(`/api/works?id=${workId}`);
          const workData = await workRes.json();

          if (workRes.ok) {
            setWorkData({
              imageUrl: workData.data.imageUrl || "",
              title: workData.data.title || "Unknown Title",
            });
          } else {
            setError("Failed to fetch work data.");
          }

          // Fetch chat history
          const historyRes = await fetch(`/api/chat/${workId}/history`, {
            method: "POST",
          });
          const historyData = await historyRes.json();

          console.log("Chat history response:", historyData); // Debugging line

          if (historyRes.ok) {
            console.log(historyRes);
            setMessages(
              historyData.history.map(
                (msg: {
                  role: string;
                  content: string;
                  created_at: string;
                }) => ({
                  sender: msg.role,
                  message: msg.content,
                  createdAt: msg.created_at,
                })
              )
            );
          } else {
            setError("Failed to fetch chat history.");
          }
        } catch (err) {
          setError("Failed to fetch data.");
          console.error(err); // Debugging line
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
        setError(data.reply || "Failed to send message.");
      }
    } catch {
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
          padding: 3,
          paddingBottom: "200px", // Ensure space for fixed input and buttons
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
                    sender={msg.sender === "user"}
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
          )
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

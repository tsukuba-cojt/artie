"use client";

import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatInput from "@/features/chat/components/Input";
import SpeechBubble from "@/features/base/components/SpeechBubble";
import Header from "@/features/base/components/header";
import ClickableSpeechBubble from "@/features/chat/components/SuggestionButton";
import { LLMMessage, LLMRole } from "@/types/LLMType";

interface WorkData {
  imageUrl: string;
  title: string;
  suggestComments: string[];
}

const ChatPage = () => {
  const { workId } = useParams();
  const workIdStr = workId as string;

  const [workData, setWorkData] = useState<WorkData>({
    imageUrl: "",
    title: "",
    suggestComments: [],
  });

  const [messages, setMessages] = useState<LLMMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!workIdStr) {
      setError("Invalid work ID.");
      return;
    }

    const fetchWorkAndMessages = async () => {
      setLoading(true);
      try {
        const [workRes, historyRes] = await Promise.all([
          fetch(`/api/works?id=${workIdStr}`),
          fetch(`/api/chat/${workIdStr}/history`),
        ]);

        const workData = await workRes.json();
        const historyData = await historyRes.json();

        if (workRes.ok) {
          setWorkData({
            imageUrl: workData.data?.imageUrl || "",
            title: workData.data?.title || "Unknown Title",
            suggestComments: workData.data?.suggestComments || [],
          });
        } else {
          setError("作品情報の取得に失敗しました");
        }

        if (!historyRes.ok || !Array.isArray(historyData.data)) {
          setError("チャット履歴の取得に失敗しました");
          return;
        }

        setMessages(historyData.data);
      } catch {
        setError("予期せぬエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkAndMessages();
  }, [workIdStr]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessage: LLMMessage = {
      role: LLMRole.USER,
      content: message,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setSending(true);

    try {
      const newMessages =
        messages.length === 1 ? [{ ...messages[0] }, newMessage] : [newMessage];

      const res = await fetch(`/api/chat/${workIdStr}/llm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newMessages: newMessages,
          history: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: LLMRole.ASSISTANT,
            content: data.reply,
            created_at: new Date().toISOString(),
          },
        ]);
      } else {
        setError(data.reply || "artieちゃんの調子が悪いようです...");
      }
    } catch {
      setError("artieちゃんの調子が悪いようです...");
    } finally {
      setSending(false);
    }
  };

  const searchParams = useSearchParams();
  const queryMessage = searchParams.get("message");

  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const fetchInitialMessage = useCallback(async () => {
    if (!queryMessage || hasFetched) return;
    setHasFetched(true);

    const newMessages: LLMMessage[] = [
      {
        role: LLMRole.ASSISTANT,
        content: queryMessage,
        created_at: new Date().toISOString(),
      },
      {
        role: LLMRole.USER,
        content: "もっと教えて",
        created_at: new Date().toISOString(),
      },
    ];

    try {
      const res = await fetch(`/api/chat/${workIdStr}/llm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newMessages: newMessages,
          history: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          ...newMessages,
          {
            role: LLMRole.ASSISTANT,
            content: data.reply,
            created_at: new Date().toISOString(),
          },
        ]);
      } else {
        setError(data.reply || "artieちゃんの調子が悪いようです...");
      }
    } catch {
      setError("artieちゃんの調子が悪いようです...");
    }
  }, [queryMessage, workIdStr, hasFetched, messages]);

  useEffect(() => {
    fetchInitialMessage();
  }, [fetchInitialMessage]);

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
                  flexDirection:
                    msg.role === LLMRole.USER ? "row-reverse" : "row",
                  justifyContent:
                    msg.role === LLMRole.USER ? "flex-start" : "flex-end",
                }}
              >
                {msg.role !== LLMRole.USER && (
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
                      msg.role === LLMRole.USER ? "flex-end" : "flex-start",
                  }}
                >
                  <SpeechBubble
                    content={msg.content}
                    isRight={msg.role === LLMRole.USER}
                  />
                </Box>
              </Box>
            ))}

            {sending && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 2,
                  marginBottom: "10px",
                  justifyContent: "flex-start",
                }}
              >
                <Box
                  component="img"
                  src="/images/profile_artie.png"
                  alt="Profile Image"
                  sx={{ width: 50, height: 50, borderRadius: "50%" }}
                />
                <SpeechBubble content="考え中…" isRight={false} />
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
        {workData.suggestComments.map((text) => (
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

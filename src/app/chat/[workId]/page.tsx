"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import ChatInput from "@/features/chat/components/Input";
import { useParams } from "next/navigation";
import { LLMMessage } from "@/lib/executeLLM";
import Header from "@/features/base/components/header";
import { relative } from "path";

export default function Chat() {
  const { workId } = useParams();

  const [history, setHistory] = useState<LLMMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 会話履歴を取得する関数
  const fetchHistory = async () => {
    try {
      const response = await fetch(`/api/chat/${workId}/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("会話履歴の取得に失敗しました。");
      }

      const data = await response.json();
      setHistory(data.history);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // メッセージを送信する関数
  const sendMessage = async (message: string) => {
    try {
      const response = await fetch(`/api/chat/${workId}/llm`, {
        // 正しいAPIパスに変更
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("メッセージの送信に失敗しました。");
      }

      const data = await response.json();
      setHistory(data.history);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  // コンポーネントのマウント時に会話履歴を取得
  useEffect(() => {
    fetchHistory();
  }, [workId]);

  if (loading) return <Typography>読み込み中...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Stack
      direction="column"
      height="calc(100vh - 120px)"
      px={2}
      gap={2}
      sx={{ width: "100vw" }}
    >
      <Header title="Chat" />
      <Box flexGrow={1} overflow="auto">
        <List>
          {history.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    align={msg.role === "user" ? "right" : "left"}
                  >
                    {msg.role === "user" ? "You" : "Bot"}: {msg.content}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <ChatInput onSend={sendMessage} />
      </Box>
    </Stack>
  );
}

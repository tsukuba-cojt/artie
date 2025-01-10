import { executeLLM, LLMMessage } from "@/lib/executeLLM";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  userId: string;
  workId: string;
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      workId,
      message: inputMessage,
    }: RequestBody = await req.json();

    // バリデーション: 必須フィールドが正しい型であることを確認
    if (
      typeof userId !== "string" ||
      typeof workId !== "string" ||
      typeof inputMessage !== "string"
    ) {
      return NextResponse.json(
        { reply: "不正なリクエストです。" },
        { status: 400 }
      );
    }

    // systemMessageの定義
    const systemMessage = "あなたは親切なアシスタントです。";

    const supabase = createClient();

    // Supabaseから会話履歴を取得
    const { data: conversations, error: fetchError } = await supabase
      .from("Conversation")
      .select("sender, message, createdAt")
      .eq("userId", userId)
      .eq("workId", workId)
      .order("createdAt", { ascending: true });

    if (fetchError) {
      return NextResponse.json(
        { reply: "会話履歴の取得中にエラーが発生しました。" },
        { status: 500 }
      );
    }

    // ConversationデータをLLMMessage形式にマッピング
    const history: LLMMessage[] = conversations
      ? conversations.map((conv) => ({
          role: conv.sender === "USER" ? "user" : "assistant",
          content: conv.message,
        }))
      : [];

    // LLMを実行してAIの応答を取得
    const aiReply = await executeLLM({
      systemMessage,
      history,
      prompt: inputMessage,
    });

    // 新しいメッセージを会話履歴に追加
    const updatedHistory = [
      ...history,
      { role: "user", content: inputMessage },
      { role: "assistant", content: aiReply },
    ];

    // 新しい会話メッセージをSupabaseに挿入
    const newConversations = [
      {
        userId,
        workId,
        sender: "USER",
        message: inputMessage,
      },
      {
        userId,
        workId,
        sender: "AI",
        message: aiReply,
      },
    ];

    const { error: insertError } = await supabase
      .from("Conversation")
      .insert(newConversations);

    if (insertError) {
      console.error("Supabaseへの会話履歴保存エラー:", insertError);
      return NextResponse.json(
        { reply: "会話履歴の保存中にエラーが発生しました。" },
        { status: 500 }
      );
    }

    // クライアントにAIの応答と更新された会話履歴を返す
    return NextResponse.json({
      reply: aiReply,
      history: updatedHistory,
    });
  } catch (error) {
    console.error("APIエラー:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { reply: `エラーが発生しました: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { reply: "未知のエラーが発生しました。" },
        { status: 500 }
      );
    }
  }
}

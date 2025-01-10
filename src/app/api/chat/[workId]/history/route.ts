// src/app/api/chat/[workId]/route.ts
import { LLMMessage } from "@/lib/executeLLM";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { workId: string } }
) {
  try {
    const { workId } = params;

    const supabase = createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "ユーザー情報の取得に失敗しました。" },
        { status: 500 }
      );
    }

    // Supabaseから会話履歴を取得（逆時系列順）
    const { data: conversations, error: fetchError } = await supabase
      .from("Conversation")
      .select("sender, message, createdAt")
      .eq("userId", userData.user.id)
      .eq("workId", workId)
      .order("createdAt", { ascending: false }); // 逆時系列順

    if (fetchError) {
      return NextResponse.json(
        { error: "会話履歴の取得中にエラーが発生しました。" },
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

    // クライアントに会話履歴を返す
    return NextResponse.json({
      history,
    });
  } catch (error) {
    console.error("APIエラー:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `エラーが発生しました: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "未知のエラーが発生しました。" },
        { status: 500 }
      );
    }
  }
}

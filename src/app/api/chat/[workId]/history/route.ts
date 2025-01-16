import { LLMMessage } from "@/lib/executeLLM";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ workId: string }> }
) {
  try {
    const { workId } = await params;

    const supabase = createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "ユーザー情報の取得に失敗しました。" },
        { status: 401 }
      );
    }

    // Supabaseから会話履歴を取得（時系列順）
    const { data: conversations, error: fetchError } = await supabase
      .from("Conversation")
      .select("sender, message, createdAt")
      .eq("userId", userData.user.id)
      .eq("workId", workId)
      .order("createdAt", { ascending: true });

    if (fetchError) {
      return NextResponse.json(
        { error: "会話履歴の取得中にエラーが発生しました。" },
        { status: 500 }
      );
    }

    const history: LLMMessage[] =
      conversations?.map((conv) => ({
        role: conv.sender === "USER" ? "user" : "assistant",
        content: conv.message,
        created_at: conv.createdAt,
      })) || [];

    return NextResponse.json({
      history,
    });
  } catch (error) {
    console.error("APIエラー:", error);
    const errorMessage =
      error instanceof Error
        ? `エラーが発生しました: ${error.message}`
        : "未知のエラーが発生しました。";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

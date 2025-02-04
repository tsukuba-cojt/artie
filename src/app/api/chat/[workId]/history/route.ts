import { createClient } from "@/lib/supabase/server";
import { LLMMessage, LLMRole } from "@/types/LLMType";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ workId: string }> },
) {
  try {
    const { workId } = await params;
    const supabase = createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "ユーザー情報の取得に失敗しました。" },
        { status: 401 },
      );
    }

    const userId = userData.user.id;

    const { data: conversations, error: fetchError } = await supabase
      .from("Conversation")
      .select("userId, sender, message, createdAt")
      .eq("userId", userId)
      .eq("workId", workId)
      .order("createdAt", { ascending: true });

    if (fetchError) {
      return NextResponse.json(
        { error: "会話履歴の取得中にエラーが発生しました。" },
        { status: 500 },
      );
    }

    let message: LLMMessage[];

    if (conversations && conversations.length > 0) {
      message = conversations.map((conv) => ({
        role: conv.sender,
        content: conv.message,
        created_at: conv.createdAt,
      }));
    } else {
      const { data: workData, error: workError } = await supabase
        .from("Work")
        .select("firstComment")
        .eq("id", workId)
        .single();

      if (workError) {
        return NextResponse.json(
          { error: "作品情報の取得中にエラーが発生しました。" },
          { status: 500 },
        );
      }

      if (workData?.firstComment) {
        message = [
          {
            role: LLMRole.ASSISTANT,
            content: workData.firstComment,
            created_at: new Date().toISOString(),
          },
        ];
      } else {
        message = [];
      }
    }

    return NextResponse.json({ data: message });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `エラーが発生しました: ${error.message}`
        : "未知のエラーが発生しました。";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

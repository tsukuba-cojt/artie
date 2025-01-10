import { executeLLM, LLMMessage } from "@/lib/executeLLM";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// リクエストボディの型定義
type RequestBody = {
  message: string;
  history: LLMMessage[];
};

export async function POST(
  req: NextRequest,
  { params }: { params: { workId: string } },
) {
  try {
    const { workId } = params;

    // リクエストボディをパース
    const { message: inputMessage, history }: RequestBody = await req.json();

    // バリデーション: 必須フィールドが正しい型であることを確認
    if (typeof inputMessage !== "string" || !Array.isArray(history)) {
      return NextResponse.json(
        { reply: "不正なリクエストです。" },
        { status: 400 },
      );
    }

    // systemMessageの定義
    const systemMessage = "あなたは親切なアシスタントです。";

    const supabase = createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "ユーザー情報の取得に失敗しました。" },
        { status: 500 },
      );
    }

    // LLMを実行してAIの応答を取得
    const aiReply = await executeLLM({
      systemMessage,
      history,
      prompt: inputMessage,
    });

    // 新しいメッセージを会話履歴に追加
    const updatedHistory: LLMMessage[] = [
      ...history,
      { role: "user", content: inputMessage },
      { role: "assistant", content: aiReply },
    ];

    // 新しい会話メッセージをSupabaseに挿入
    const newConversations = [
      {
        userId: userData.user.id,
        workId,
        sender: "USER",
        message: inputMessage,
      },
      {
        userId: userData.user.id,
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
        { status: 500 },
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
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { reply: "未知のエラーが発生しました。" },
        { status: 500 },
      );
    }
  }
}

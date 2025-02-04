import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
  try {
    const supabase = createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "ユーザー情報の取得に失敗しました。" },
        { status: 401 },
      );
    }

    const userId = userData.user.id;

    // TODO: 全てのconversationを取得して、ここでバックエンドでフィルタリングをしている。workそれぞれにつき1件のconversationしか取得しない形にしたい。
    const { data, error } = await supabase
      .from("Conversation")
      .select(
        `
          message,
          createdAt,
          workId,
          Work (
            id,
            title,
            imageUrl
          )
        `,
      )
      .eq("userId", userId)
      .eq("sender", "assistant")
      .order("workId", { ascending: true })
      .order("createdAt", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "会話履歴の取得に失敗しました。" },
        { status: 500 },
      );
    }

    const uniqueConversations = new Map<number, (typeof data)[0]>();
    if (data) {
      data.forEach((item) => {
        if (!uniqueConversations.has(item.workId)) {
          uniqueConversations.set(item.workId, item);
        }
      });
    }

    const result = Array.from(uniqueConversations.values()).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );

    return NextResponse.json({
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `エラーが発生しました: ${error.message}` },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "未知のエラーが発生しました。" },
      { status: 500 },
    );
  }
}

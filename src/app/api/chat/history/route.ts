import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
      .eq("sender", "AI")
      .order("workId", { ascending: true })
      .order("createdAt", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "会話履歴の取得に失敗しました。" },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "会話履歴が存在しません。" },
        { status: 404 },
      );
    }

    const uniqueConversations = new Map();

    // TODO: 一度すべてのconversationを取得しているので、非効率。各workに対して直近一つのconvのみを取得できるようにしたい。
    data.forEach((item) => {
      if (!uniqueConversations.has(item.workId)) {
        uniqueConversations.set(item.workId, item);
      }
    });

    return NextResponse.json({
      data: Array.from(uniqueConversations.values()),
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

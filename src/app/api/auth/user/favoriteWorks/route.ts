import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const query = supabase
      .from("WorkFavorite")
      .select(
        `
        workId,
        createdAt,
        Work (
          id,
          imageUrl,
          title
        )
      `,
      )
      .eq("userId", userId)
      .order("createdAt", { ascending: false });

    if (limit) {
      query.limit(limit);
    }

    const { data: favoriteWorks, error: favoriteError } = await query;

    if (favoriteError) {
      return NextResponse.json(
        { error: "お気に入り作品の取得中にエラーが発生しました。" },
        { status: 500 },
      );
    }

    return NextResponse.json(favoriteWorks);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `エラーが発生しました: ${error.message}` },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: "未知のエラーが発生しました。" },
        { status: 500 },
      );
    }
  }
}

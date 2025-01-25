import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    const { data, error } = await supabase
      .from("WorkFavorite")
      .select("*")
      .eq("userId", userId)
      .eq("workId", workId)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json(
        { error: "お気に入りの確認中にエラーが発生しました。" },
        { status: 500 },
      );
    }

    const isFavorited = data ? true : false;

    return NextResponse.json({ isFavorited });
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

export async function POST(
  req: NextRequest,
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

    // 既にお気に入りに登録されているか確認
    const { data: existingFavorite, error: fetchError } = await supabase
      .from("WorkFavorite")
      .select("*")
      .eq("userId", userId)
      .eq("workId", workId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return NextResponse.json(
        { error: "お気に入りの確認中にエラーが発生しました。" },
        { status: 500 },
      );
    }

    if (existingFavorite) {
      const { error: deleteError } = await supabase
        .from("WorkFavorite")
        .delete()
        .eq("userId", userId)
        .eq("workId", workId);

      if (deleteError) {
        return NextResponse.json(
          { error: "お気に入りの解除中にエラーが発生しました。" },
          { status: 500 },
        );
      }

      return NextResponse.json({ message: "お気に入りを解除しました。" });
    } else {
      // 登録されていない場合は追加
      const { error: insertError } = await supabase
        .from("WorkFavorite")
        .insert([{ userId: userId, workId: workId }]);

      console.log(userId, workId);

      if (insertError) {
        return NextResponse.json(
          { error: "お気に入りの追加中にエラーが発生しました。" },
          { status: 500 },
        );
      }

      return NextResponse.json({ message: "お気に入りに登録しました。" });
    }
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

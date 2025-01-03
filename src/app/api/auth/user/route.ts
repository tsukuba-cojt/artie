import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "認証されていないため、データにアクセスできません。" },
        { status: 401 },
      );
    }

    const userId = user.id;

    // データベースからユーザープロフィールを取得
    const { data: userProfile, error: dbError } = await supabase
      .from("User")
      .select("name, email, imageUrl")
      .eq("id", userId)
      .single();

    if (dbError || !userProfile) {
      return NextResponse.json(
        { error: "ユーザー情報が見つかりませんでした。" },
        { status: 404 },
      );
    }

    // プロファイルデータを返却
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("ユーザープロフィール取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "予期しないエラーが発生しました。" },
      { status: 500 },
    );
  }
}

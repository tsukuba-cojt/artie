import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(_request: Request) {
  const supabase = createClient();

  try {
    // 現在のユーザーを取得
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "ユーザー情報の取得に失敗しました。" },
        { status: 401 }
      );
    }

    const userId = userData.user.id;

    // Supabase データベースからユーザー情報を削除
    const { error: dbError } = await supabase
      .from("User")
      .delete()
      .eq("id", userId);

    if (dbError) {
      return NextResponse.json(
        { error: "ユーザーデータの削除に失敗しました。" },
        { status: 500 }
      );
    }

    // 管理者権限の Supabase クライアントを作成
    const adminSupabase = createAdminClient();

    // Supabase Authentication からユーザーを削除
    const { error: authError } =
      await adminSupabase.auth.admin.deleteUser(userId);

    if (authError) {
      return NextResponse.json(
        { error: "認証情報の削除に失敗しました。" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "アカウントが削除されました。" });
  } catch (error) {
    console.error("アカウント削除中のエラー:", error);
    return NextResponse.json(
      { error: "予期しないエラーが発生しました。" },
      { status: 500 }
    );
  }
}

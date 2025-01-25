import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();

    // 最新の PickUpWork データを取得
    const { data, error } = await supabase
      .from("PickUpWork")
      .select("Work(id, title, imageUrl), comment, showArtieModel")
      .order("createdAt", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "PickUpWork データの取得に失敗しました。" },
        { status: 500 },
      );
    }

    // データがない場合の処理
    if (!data) {
      return NextResponse.json(
        { error: "PickUpWork データが見つかりません。" },
        { status: 404 },
      );
    }

    return NextResponse.json({ pickUpWork: data });
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

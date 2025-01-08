import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "検索クエリが指定されていません。" },
      { status: 400 },
    );
  }

  try {
    const { data: works, error: worksError } = await supabase
      .from("Work")
      .select("id, title, imageUrl")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

    if (worksError) {
      return NextResponse.json(
        { error: "データベース検索中にエラーが発生しました。" },
        { status: 500 },
      );
    }

    return NextResponse.json(works);
  } catch (error) {
    console.error("検索中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "検索中に予期しないエラーが発生しました。" },
      { status: 500 },
    );
  }
}

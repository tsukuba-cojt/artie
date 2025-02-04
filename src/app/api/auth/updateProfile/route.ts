import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();

  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const file = formData.get("file") as File | null;

    if (!name) {
      return NextResponse.json({ error: "名前は必須です。" }, { status: 400 });
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "ユーザー情報の取得に失敗しました。" },
        { status: 500 },
      );
    }

    let imageUrl = "";

    if (file) {
      try {
        const filePath = `avatars/${Date.now()}_${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("user-avatars")
          .upload(filePath, file, { contentType: file.type });

        if (uploadError) {
          return NextResponse.json(
            { error: "画像のアップロードに失敗しました。" },
            { status: 500 },
          );
        }

        const { data: publicUrlData } = supabase.storage
          .from("user-avatars")
          .getPublicUrl(filePath);

        if (!publicUrlData?.publicUrl) {
          return NextResponse.json(
            { error: "画像の公開URLの取得に失敗しました。" },
            { status: 500 },
          );
        }

        imageUrl = publicUrlData.publicUrl;
      } catch {
        return NextResponse.json(
          { error: "画像アップロード処理中のエラーが発生しました。" },
          { status: 500 },
        );
      }
    }

    const updateData: Record<string, string> = { name };
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const { error: dbError } = await supabase
      .from("User")
      .update(updateData)
      .eq("id", userData.user.id);

    if (dbError) {
      return NextResponse.json(
        { error: "プロフィール更新に失敗しました。" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "プロフィールが更新されました。" });
  } catch {
    return NextResponse.json(
      { error: "予期しないエラーが発生しました。" },
      { status: 500 },
    );
  }
}

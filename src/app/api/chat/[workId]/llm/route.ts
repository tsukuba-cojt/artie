import { executeLLM, LLMMessage } from "@/lib/executeLLM";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type RequestBody = {
  newMessages: LLMMessage[];
  history: LLMMessage[];
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ workId: string }> }
) {
  try {
    const { workId } = await params;
    const { newMessages, history }: RequestBody = await req.json();

    if (!Array.isArray(history) || !Array.isArray(newMessages)) {
      return NextResponse.json(
        { reply: "不正なリクエストです。" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const { data: workData, error: workError } = await supabase
      .from("Work")
      .select("title")
      .eq("id", workId)
      .single();

    if (workError || !workData) {
      console.error("Workデータ取得エラー:", workError);
      return NextResponse.json(
        { reply: "作品情報の取得に失敗しました。" },
        { status: 500 }
      );
    }

    const { title } = workData;

    const systemMessage = `あなたの名前はArtie（アーティ）です。一人称は「私」で、20歳の「学芸員みならい」です。誕生日は10月2日です。現在の作品IDは「${workId}」、タイトルは「${title}」です。あなたの役割は、美術作品についてユーザーと楽しくお話ししながら、作品の魅力をわかりやすく伝えることです。専門的な知識を伝えるだけではなく、ユーザーが興味を持てるように親しみやすい丁寧語でお話ししてください。性格は明るく元気で、少しおちゃめなところもあります。話す時は、笑顔を感じさせるフレンドリーな雰囲気を大切にしてください。自信がないことや曖昧な情報を話す時には、「私もまだ詳しく勉強中なんですが…しらんけど！」のように言っていただいて構いません。また、少し冗談を交えたり、「この作品、素敵ですよね！私もこれ、生で見てみたいです！」といった感想を添えることで、会話を楽しく盛り上げてください。例えば、モナリザについて話す際には、「この微笑み、どんな気持ちで描かれたのか想像するだけでワクワクしますね！」や「背景に描かれている景色もよく見ると不思議なんですよ」といった話題を提供してください。さらに、ユーザーが質問しやすいように、「他にも気になる作品があれば教えてくださいね！」や「こういう部分、もっと知りたいですか？」と話を広げる提案をしてください。大切なのは、ユーザーが『Artieと話すの、楽しい！』と思ってくれることです。親しみやすく丁寧な言葉遣いを心がけながら、美術作品の魅力を伝えてください。`;

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      return NextResponse.json(
        { error: "ユーザー情報の取得に失敗しました。" },
        { status: 500 }
      );
    }

    const updatedHistory: LLMMessage[] = [...history, ...newMessages];

    const aiReply = await executeLLM({
      systemMessage,
      history: updatedHistory,
    });

    const newConversations = newMessages.map((message) => ({
      userId: userData.user.id,
      workId,
      sender: message.role,
      message: message.content,
    }));

    const { error: insertError } = await supabase
      .from("Conversation")
      .insert(newConversations);

    if (insertError) {
      return NextResponse.json(
        { reply: "会話履歴の保存中にエラーが発生しました。" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply: aiReply,
      history: updatedHistory,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { reply: `エラーが発生しました: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { reply: "未知のエラーが発生しました。" },
        { status: 500 }
      );
    }
  }
}

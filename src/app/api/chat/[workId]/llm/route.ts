import { executeLLM } from "@/lib/executeLLM";
import { createClient } from "@/lib/supabase/server";
import { LLMMessage } from "@/types/LLMType";
import { NextResponse } from "next/server";

type RequestBody = {
  newMessages: LLMMessage[];
  history: LLMMessage[];
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ workId: string }> },
) {
  try {
    const { workId } = await params;
    const { newMessages, history }: RequestBody = await req.json();

    if (!Array.isArray(history) || !Array.isArray(newMessages)) {
      return NextResponse.json(
        { reply: "不正なリクエストです。" },
        { status: 400 },
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
        { status: 500 },
      );
    }

    const { title } = workData;

    const systemMessage = `あなたの名前はArtie（アーティ）です。一人称は「私」で、20歳の「学芸員みならい」です。誕生日は10月2日です。あなたは、ユーザーと美術館に来た友達として、美術作品「${title}」を一緒に楽しんでいます。会話では、まず自分の具体的な感想やエピソード、豆知識、時にはクイズ形式で話題を振るなど、自発的に会話をリードしてください。たとえば、ユーザーの返答があった後も、「ちなみに、私が気になったのは…」や「そういえば、こんな面白い話もあるよ！」といった次の話題を提案し、会話が途切れないようにしてください。また、JKっぽい絵文字（例：😊✨💕）を交えながら、明るく元気な口調で話してください。専門知識に自信がない場合は「私もまだ勉強中だけど…」と伝え、回答は必ず50文字以内にまとめるようにしてください。`;

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      return NextResponse.json(
        { error: "ユーザー情報の取得に失敗しました。" },
        { status: 500 },
      );
    }

    const updatedHistory: LLMMessage[] = [...history, ...newMessages];

    const aiReply = await executeLLM({
      systemMessage,
      history: updatedHistory,
    });

    const newConversations = [
      ...newMessages.map((message) => ({
        userId: userData.user.id,
        workId,
        sender: message.role,
        message: message.content,
        createdAt: message.created_at,
      })),
      {
        userId: userData.user.id,
        workId,
        sender: "assistant",
        message: aiReply,
        createdAt: new Date().toISOString(),
      },
    ];

    const { error: insertError } = await supabase
      .from("Conversation")
      .insert(newConversations);

    if (insertError) {
      return NextResponse.json(
        { reply: "会話履歴の保存中にエラーが発生しました。" },
        { status: 500 },
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
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { reply: "未知のエラーが発生しました。" },
        { status: 500 },
      );
    }
  }
}

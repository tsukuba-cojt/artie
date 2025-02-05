import { LLMMessage, LLMRole } from "@/types/LLMType";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type LLMInput = {
  systemMessage: string;
  history: LLMMessage[];
};

export const executeLLM = async ({
  systemMessage,
  history,
}: LLMInput): Promise<string> => {
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      // 直近50件のメッセージのみを渡すようにする。
      const recentHistory = history.slice(-50);

      const messages: LLMMessage[] = [
        {
          role: LLMRole.SYSTEM,
          content: systemMessage,
        },
        ...recentHistory.map(
          (msg): LLMMessage => ({
            role: msg.role,
            content: msg.content,
          }),
        ),
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: messages,
        max_tokens: 150,
        temperature: 0.6,
      });

      return (
        response.choices[0].message?.content?.trim() ||
        "予期せぬエラーが発生しました。"
      );
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} - Error in executeLLM:`, error);

      if (attempt >= MAX_RETRIES) {
        if (error instanceof Error) {
          return `エラーが発生しました: ${error.message}`;
        } else {
          return "未知のエラーが発生しました。";
        }
      }

      // リトライ間の遅延（指数バックオフ）
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  // 通常ここに到達することはないが保険として
  return "エラーが発生しました。再度お試しください。";
};

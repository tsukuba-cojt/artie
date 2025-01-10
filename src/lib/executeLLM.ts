import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type LLMMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type LLMInput = {
  systemMessage: string;
  history: LLMMessage[];
  prompt: string;
};

export const executeLLM = async ({
  systemMessage,
  history,
  prompt,
}: LLMInput): Promise<string> => {
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const messages: LLMMessage[] = [
        {
          role: "system",
          content: systemMessage,
        },
        ...history.map(
          (msg): LLMMessage => ({
            role: msg.role,
            content: msg.content,
          })
        ),
        { role: "user", content: prompt },
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
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

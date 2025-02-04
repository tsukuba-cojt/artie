export enum LLMRole {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
}

export type LLMMessage = {
  role: LLMRole;
  content: string;
  created_at?: string;
};

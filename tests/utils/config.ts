// config.ts
import dotenv from "dotenv";

// 環境変数を読み込む
dotenv.config();

// 環境変数を取得し、未設定の場合にデフォルト値を適用
export const BASE_URL = getEnvVar(
  "NEXT_PUBLIC_BASE_URL",
  "http://localhost:3000"
);

// Supabase の環境変数
export const SUPABASE_URL = getEnvVar("NEXT_PUBLIC_SUPABASE_URL", "");
export const SUPABASE_ANON_KEY = getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");

// テストユーザーの環境変数
export const TEST_USER_EMAIL = getEnvVar("TEST_USER_EMAIL", "");
export const TEST_USER_PASSWORD = getEnvVar("TEST_USER_PASSWORD", "");

// // Google OAuth関連の環境変数
// export const GOOGLE_CLIENT_ID = getEnvVar("GOOGLE_CLIENT_ID", "");
// export const GOOGLE_CLIENT_SECRET = getEnvVar("GOOGLE_CLIENT_SECRET", "");
// export const GOOGLE_REFRESH_TOKEN = getEnvVar("GOOGLE_REFRESH_TOKEN", "");

/**
 * 環境変数を取得し、未設定の場合はデフォルト値を返す
 * また、未設定の場合に警告を表示
 * @param key 環境変数名
 * @param defaultValue デフォルト値
 */
function getEnvVar(key: string, defaultValue: string): string {
  const value = process.env[key];
  if (!value) {
    console.warn(
      `[WARN] 環境変数 "${key}" が設定されていません。デフォルト値 "${defaultValue}" を使用します。`
    );
    return defaultValue;
  }
  return value;
}

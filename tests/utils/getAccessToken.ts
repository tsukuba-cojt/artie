import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD,
} from "./config";

/**
 * テストユーザーのアクセストークンとリフレッシュトークンを取得する関数
 */
export async function getAccessToken(): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  console.log("TEST_USER_EMAIL:", TEST_USER_EMAIL);
  console.log("TEST_USER_PASSWORD:", TEST_USER_PASSWORD);

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
  });

  if (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }

  if (
    !data.session ||
    !data.session.access_token ||
    !data.session.refresh_token
  ) {
    throw new Error(
      "アクセストークンまたはリフレッシュトークンが取得できませんでした。",
    );
  }

  console.log(data);

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
  };
}

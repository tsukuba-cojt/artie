// createTestUser.js
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

// 環境変数を読み込む
dotenv.config();

// 環境変数の取得
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

// Supabase クライアントの初期化
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * テストユーザーを作成する関数
 */
async function createTestUser() {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
      email_confirm: true, // メール確認を自動化
    });

    if (error) {
      console.error("Error creating test user:", error.message);
      process.exit(1);
    } else {
      console.log("Test user created successfully:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    process.exit(1);
  }
}

// スクリプトの実行
createTestUser();

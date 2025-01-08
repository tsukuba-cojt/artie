import { Page } from "@playwright/test";
import { BASE_URL } from "./config";

export async function performCommonSetup(page: Page): Promise<void> {
  console.log(
    "テスト用API (/api/auth/test-login/test-login) を呼び出してログインします...",
  );

  const response = await page.request.get(`${BASE_URL}/api/auth/test-login`);

  if (!response.ok()) {
    const status = response.status();
    const body = await response.text();
    console.error(
      `ログインAPIが失敗しました (status: ${status})\nレスポンス:`,
      body,
    );
    throw new Error(`Login API failed with status ${status}`);
  }

  console.log("ログインに成功");
}

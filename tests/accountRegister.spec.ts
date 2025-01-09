import { test, expect, BrowserContext, Page } from "@playwright/test";
import { performCommonSetup } from "./utils/setup";
import { BASE_URL } from "./utils/config";
import path from "path";
import { AccountRegistrationPage } from "./pages/registerPage/registerPage";

// 直列実行モード
test.describe.serial("アカウント作成ページのテスト", () => {
  let context: BrowserContext;
  let page: Page;
  let registerPage: AccountRegistrationPage;

  test.beforeAll(async ({ browser }) => {
    // ブラウザコンテキストを生成
    context = await browser.newContext();
    // ページを生成
    page = await context.newPage();

    // 一度だけ共通セットアップ
    await performCommonSetup(page);

    // アカウント登録ページへ遷移
    await page.goto(`${BASE_URL}/auth/register`);

    // Page Object のインスタンス生成も一回だけ
    registerPage = new AccountRegistrationPage(page);
  });

  // ─────────────────────────────────────────────────────────
  //  各テスト (直列実行される)
  // ─────────────────────────────────────────────────────────

  test("ヘッダーが存在すること", async () => {
    await registerPage.verifyHeaderVisible();
  });

  test("名前が存在しない時にエラーが表示されること", async () => {
    await registerPage.clickCreateAccountButton();
    await registerPage.verifyErrorMessage("名前を入力してください。");
  });

  test("名前を入力できること", async () => {
    await registerPage.fillName("テストユーザー");
    await registerPage.verifyNameValue("テストユーザー");
  });

  test("画像をアップロードできること（jpg 画像のみ）", async () => {
    const imagePath = path.resolve(
      __dirname,
      "..",
      "public",
      "images",
      "default_artie.jpg"
    );
    await registerPage.uploadImage(imagePath);
  });

  test("アップロードした画像のプレビューが表示されること", async () => {
    await registerPage.verifyImagePreviewVisible();
  });

  test("名前が入力されている時、アカウント作成ボタンを押してルートページにリダイレクトされること", async () => {
    // ボタンを押す
    await registerPage.clickCreateAccountButton();

    // ルートページに遷移したかを確認
    await registerPage.verifyRedirectTo(`${BASE_URL}/`);
  });

  // ─────────────────────────────────────────────────────────
  //  test.afterAll でクリーンアップ（必要に応じて）
  // ─────────────────────────────────────────────────────────
  test.afterAll(async () => {
    // コンテキストを閉じてブラウザリソースを解放
    await context.close();
  });
});

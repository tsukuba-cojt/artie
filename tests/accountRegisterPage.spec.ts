import { test, expect, BrowserContext, Page } from "@playwright/test";
import { performCommonSetup } from "./utils/setup";
import { BASE_URL } from "./utils/config";
import path from "path";
import { AccountRegistrationPage } from "./pages/registerPage/registerPage";

test.describe.serial("アカウント作成ページのテスト", () => {
  let context: BrowserContext;
  let page: Page;
  let registerPage: AccountRegistrationPage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await performCommonSetup(page);

    await page.goto(`${BASE_URL}/auth/register`);

    registerPage = new AccountRegistrationPage(page);
  });

  test("名前が存在しない時にエラーが表示されること", async () => {
    await registerPage.getCreateAccountButton().click();
    const errorMessage = await registerPage.getErrorMessage();
    await expect(errorMessage).toHaveText("名前を入力してください。");
  });

  test("名前を入力できること", async () => {
    const nameInput = await registerPage.getNameInput();
    const name = "テストユーザー";
    await nameInput.fill(name);
    await expect(nameInput).toHaveValue(name);
  });

  test("画像をアップロードできること（jpg 画像のみ）", async () => {
    const imagePath = path.resolve(
      __dirname,
      "..",
      "public",
      "images",
      "default_artie.jpg",
    );
    await registerPage.getFileUploadButton().setInputFiles(imagePath);
  });

  test("アップロードした画像のプレビューが表示されること", async () => {
    const imagePreview = await registerPage.getImagePreview();
    await expect(imagePreview).toBeVisible();
  });

  test("名前が入力されている時、アカウント作成ボタンを押してルートページにリダイレクトされること", async () => {
    await registerPage.getCreateAccountButton().click();
    await expect(page).toHaveURL(`${BASE_URL}/`);
  });

  test.afterAll(async () => {
    await context.close();
  });
});

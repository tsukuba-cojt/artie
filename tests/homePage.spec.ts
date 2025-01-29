import { test, expect, BrowserContext, Page } from "@playwright/test";
import { performCommonSetup } from "./utils/setup";
import { BASE_URL } from "./utils/config";
import { HomePage } from "./pages/homePage/homePage";

test.describe.serial("ホームページのテスト", () => {
  let context: BrowserContext;
  let page: Page;
  let homePage: HomePage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await performCommonSetup(page);

    await page.goto(`${BASE_URL}/`);

    homePage = new HomePage(page);
  });

  test("ユーザー情報が正しく表示されることを検証", async () => {
    await test.step("ローディングインジケータの表示を確認", async () => {
      await expect(homePage.getLoadingIndicator()).toBeVisible();
    });

    await test.step("ローディングインジケータが非表示になるのを待つ", async () => {
      await expect(homePage.getLoadingIndicator()).toBeHidden();
    });
    await expect(homePage.getUserName()).toHaveText("テストユーザー");
    await expect(homePage.getUserEmail()).toHaveText("testuser@example.com");
    await expect(homePage.getUserProfileImage()).toHaveScreenshot(
      "user-profile.png",
    );
  });

  test("今日のイチオシ作品の画像と作品名が正しく表示されることを検証", async () => {
    await expect(homePage.getTodayPickUpWorkImage()).toHaveScreenshot(
      "today-pickup-work.png",
    );
  });

  test("今日のイチオシ作品の説明文が正しく表示されることを検証", async () => {
    await expect(homePage.getTodayPickUpWorkComment()).toHaveText(
      "今日のイチオシの作品はこれ!伝説のバベルの塔が描かれているんだよ！バベルの塔ってなんだろうね！",
    );
  });

  test("今日のイチオシ作品の横のアーティーちゃんの画像が正しく表示されることを検証", async () => {
    await expect(homePage.getTodayPickUpWorkArtieImage()).toHaveScreenshot(
      "today-pickup-work-artie.png",
    );
  });

  test.afterAll(async () => {
    await context.close();
  });
});

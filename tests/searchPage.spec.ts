import { test, BrowserContext, Page, expect } from "@playwright/test";
import { performCommonSetup } from "./utils/setup";
import { BASE_URL } from "./utils/config";
import { SearchPage } from "./pages/searchPage/searchPage";
import popularWorks from "@/features/search/datas/popularWorks";

test.describe.serial("検索ページのテスト", () => {
  let context: BrowserContext;
  let page: Page;
  let searchPage: SearchPage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    // 共通セットアップを実行
    await performCommonSetup(page);

    // 検索ページに遷移
    await page.goto(`${BASE_URL}/search`);

    // SearchPage クラスを初期化
    searchPage = new SearchPage(page);
  });

  test("検索履歴が空であることを検証", async () => {
    const searchHistoryCards = searchPage.getSearchHistoryCards();
    const allCards = searchHistoryCards.getAllCards();

    // 検索履歴が空であることを確認
    await expect(allCards).toHaveCount(0);
  });

  test("よく検索される作品が正しく表示されていることを検証", async () => {
    const popularWorksCards = searchPage.getPopularWorksCards();
    const allCards = popularWorksCards.getAllCards();

    // 作品カードの数を検証
    await expect(allCards).toHaveCount(popularWorks.length);

    // 各作品のタイトルと画像を確認
    for (let i = 0; i < popularWorks.length; i++) {
      const card = popularWorksCards.getWorkCard(i);

      // 各カードが可視であることを確認
      await expect(card.getContainer()).toBeVisible();

      // タイトルと画像を検証
      await expect(card.getTitle()).toHaveText(popularWorks[i].title);
      await expect(card.getImage()).toBeVisible();
    }
  });

  test("検索中にローディングインジケータが表示されることを検証", async () => {
    // 検索クエリを入力し検索ボタンをクリック
    await searchPage.getSearchInput().fill("Mona");
    await searchPage.getSearchButton().click();

    // ローディングインジケータが表示されることを確認
    await expect(searchPage.getLoadingIndicator()).toBeVisible();

    // ローディングが完了するのを待つ
    await expect(searchPage.getLoadingIndicator()).toBeHidden();
  });

  test("検索結果が正しく表示されることを検証", async () => {
    // 検索クエリを入力し検索ボタンをクリック
    await searchPage.getSearchInput().fill("Mona");
    await searchPage.getSearchButton().click();

    // ローディングインジケータが表示されることを確認
    await expect(searchPage.getLoadingIndicator()).toBeVisible();

    // ローディングが完了するのを待つ
    await expect(searchPage.getLoadingIndicator()).toBeHidden();

    // 検索結果コンテナが表示されるのを待つ
    const searchResults = searchPage.getSearchResultsCards();
    const cardCount = await searchResults.getAllCards().count();
    expect(cardCount).toBeGreaterThan(0);

    // // "Mona Lisa" が検索結果に含まれることを確認
    const matchingCards = await searchResults.getCardsByName("Mona Lisa");
    expect(matchingCards.length).toBeGreaterThan(0);

    const firstCard = matchingCards[0];
    await expect(firstCard.getTitle()).toHaveText("Mona Lisa");
  });

  test("検索結果が見つからない場合、適切なメッセージが表示されることを検証", async () => {
    // 検索クエリを入力し検索ボタンをクリック
    await searchPage.getSearchInput().fill("適当なクエリ");
    await searchPage.getSearchButton().click();

    // "検索結果が見つかりませんでした" メッセージを確認
    const noResultsMessage = searchPage.getNoSearchResultsMessage();
    await expect(noResultsMessage).toBeVisible();
    await expect(noResultsMessage).toHaveText(
      "検索結果が見つかりませんでした。",
    );
  });

  test("検索後に詳細ページに遷移し、検索履歴に追加されていることを検証", async () => {
    // 検索クエリを入力し検索ボタンをクリック
    await searchPage.getSearchInput().fill("Mona");
    await searchPage.getSearchButton().click();

    // ローディングインジケータが表示されることを確認
    await expect(searchPage.getLoadingIndicator()).toBeVisible();

    // ローディングが完了するのを待つ
    await expect(searchPage.getLoadingIndicator()).toBeHidden();

    // 検索結果に "Mona Lisa" が表示されることを確認
    const searchResults = searchPage.getSearchResultsCards();
    const matchingCards = await searchResults.getCardsByName("Mona Lisa");
    expect(matchingCards.length).toBeGreaterThan(0);

    // 詳細ボタンをクリックして詳細ページに遷移
    const firstCard = matchingCards[0];
    const detailButton = firstCard.getDetailButton();
    await detailButton.click();

    // 詳細ページに遷移したことを確認
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/works/\\d+`));

    // 検索ページに戻る
    await page.goBack();

    // 検索履歴に "Mona Lisa" が追加されていることを確認
    const searchHistoryCards = searchPage.getSearchHistoryCards();
    const historyCards = await searchHistoryCards.getCardsByName("Mona Lisa");
    expect(historyCards.length).toBeGreaterThan(0);
    await expect(historyCards[0].getTitle()).toHaveText("Mona Lisa");
  });

  test.afterAll(async () => {
    // コンテキストを閉じてリソースを解放
    await context.close();
  });
});

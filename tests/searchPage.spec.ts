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
    await performCommonSetup(page);
    await page.goto(`${BASE_URL}/search`);
    searchPage = new SearchPage(page);
  });

  /**
   * 検索操作とローディングインジケータの確認を行う関数
   * @param query 検索クエリ
   */
  const performSearch = async (query: string) => {
    await test.step(`検索クエリ「${query}」を入力して検索`, async () => {
      await searchPage.getSearchInput().fill(query);
      await searchPage.getSearchButton().click();
    });

    await test.step("ローディングインジケータの表示を確認", async () => {
      await expect(searchPage.getLoadingIndicator()).toBeVisible();
    });

    await test.step("ローディングインジケータが非表示になるのを待つ", async () => {
      await expect(searchPage.getLoadingIndicator()).toBeHidden();
    });
  };

  test("検索履歴が初期状態で空であることを検証", async () => {
    const searchHistoryCards = searchPage.getSearchHistoryCards();
    const allCards = await searchHistoryCards.getAllCards();
    await expect(allCards).toHaveCount(0);
  });

  test("よく検索される作品が正しく表示されていることを検証", async () => {
    const popularWorksCards = searchPage.getPopularWorksCards();
    const allCards = await popularWorksCards.getAllCards();
    await expect(allCards).toHaveCount(popularWorks.length);

    for (let i = 0; i < popularWorks.length; i++) {
      const card = popularWorksCards.getWorkCard(i);
      await expect(card.getContainer()).toBeVisible();
      await expect(card.getTitle()).toHaveText(popularWorks[i].title);
      await expect(card.getImage()).toBeVisible();
    }
  });

  test("検索結果が正しく表示されることを検証", async () => {
    await performSearch("Mona");

    const searchResults = searchPage.getSearchResultsCards();
    const cardCount = await searchResults.getAllCards().count();
    expect(cardCount).toBeGreaterThan(0);

    const matchingCards = await searchResults.getCardsByName("Mona Lisa");
    expect(matchingCards.length).toBeGreaterThan(0);
    const firstCard = matchingCards[0];
    await expect(firstCard.getTitle()).toHaveText("Mona Lisa");
  });

  test("検索結果が見つからない場合、適切なメッセージが表示されることを検証", async () => {
    await performSearch("適当なクエリ");

    const noResultsMessage = searchPage.getNoSearchResultsMessage();
    await expect(noResultsMessage).toBeVisible();
    await expect(noResultsMessage).toHaveText(
      "検索結果が見つかりませんでした。",
    );
  });

  test("検索後に詳細ページに遷移し、検索履歴に追加されていることを検証", async () => {
    await performSearch("Mona");

    const searchResults = searchPage.getSearchResultsCards();
    const matchingCards = await searchResults.getCardsByName("Mona Lisa");
    expect(matchingCards.length).toBeGreaterThan(0);

    const firstCard = matchingCards[0];
    const detailButton = firstCard.getDetailButton();
    await detailButton.click();

    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/works/\\d+`));

    await page.goBack();

    const searchHistoryCards = searchPage.getSearchHistoryCards();
    const historyCards = await searchHistoryCards.getCardsByName("Mona Lisa");
    expect(historyCards.length).toBeGreaterThan(0);
    await expect(historyCards[0].getTitle()).toHaveText("Mona Lisa");
  });

  test.afterAll(async () => {
    await context.close();
  });
});

import { Page, Locator } from "@playwright/test";
import { WorkCards } from "../base/workCards";

/**
 * 検索ページ
 */
export class SearchPage {
  private readonly page: Page;

  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly searchHistoryContainerId = "searchHistory";
  private readonly searchPopularContainerId = "searchPopular";
  private readonly searchResultsContainerId = "searchResultsContainer";
  private readonly searchLoadingIndicator: Locator;
  private readonly noSearchResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByPlaceholder("作品名");
    this.searchButton = page.locator("#searchButton");
    this.searchLoadingIndicator = page.locator("#searchLoadingIndicator");
    this.noSearchResultsMessage = page.locator("#noSearchResultsMessage");
  }

  /**
   * 検索入力欄のロケータを返却
   */
  getSearchInput(): Locator {
    return this.searchInput;
  }

  /**
   * 検索ボタンのロケータを返却
   */
  getSearchButton(): Locator {
    return this.searchButton;
  }

  /**
   * ローディングインジケータのロケータを返却
   */
  getLoadingIndicator(): Locator {
    return this.searchLoadingIndicator;
  }

  /**
   * 検索結果なしメッセージのロケータを返却
   */
  getNoSearchResultsMessage(): Locator {
    return this.noSearchResultsMessage;
  }

  /**
   * 検索履歴の WorkCards インスタンスを返却
   */
  getSearchHistoryCards(): WorkCards {
    return new WorkCards(this.page, this.searchHistoryContainerId);
  }

  /**
   * よく検索される作品の WorkCards インスタンスを返却
   */
  getPopularWorksCards(): WorkCards {
    return new WorkCards(this.page, this.searchPopularContainerId);
  }

  /**
   * 検索結果の WorkCards インスタンスを返却
   */
  getSearchResultsCards(): WorkCards {
    return new WorkCards(this.page, this.searchResultsContainerId);
  }
}

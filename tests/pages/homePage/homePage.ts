import { Page, Locator } from "@playwright/test";

/**
 * ホームページ
 */
export class HomePage {
  private readonly page: Page;

  private readonly userName: Locator;
  private readonly userEmail: Locator;
  private readonly userProfileImage: Locator;
  private readonly todayPickUpWorkImage: Locator;
  private readonly todayPickUpWorkTitle: Locator;
  private readonly todayPickUpWorkComment: Locator;
  private readonly todayPickUpWorkArtieImage: Locator;
  private readonly profileLoadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userName = page.locator("#userName");
    this.userEmail = page.locator("#userEmail");
    this.userProfileImage = page.locator(".user-profile-image");
    this.todayPickUpWorkImage = page.locator("#todayPickUpWorkImage");
    this.todayPickUpWorkTitle = page.getByRole("heading", {
      name: "今日のイチオシ⭐️",
    });
    this.todayPickUpWorkComment = page.locator(".today-pickup-comment");
    this.todayPickUpWorkArtieImage = page.locator("#artieImage");
    this.profileLoadingIndicator = page.locator("#profileLoadingIndicator");
  }

  /**
   * ローディングインジケータのロケータを返却
   */
  getLoadingIndicator(): Locator {
    return this.profileLoadingIndicator;
  }

  /**
   * ユーザー名のロケーターを返却
   */
  getUserName(): Locator {
    return this.userName;
  }

  /**
   * ユーザーEメールのロケーターを返却
   */
  getUserEmail(): Locator {
    return this.userEmail;
  }

  /**
   * ユーザープロフィール画像のロケーターを返却
   */
  getUserProfileImage(): Locator {
    return this.userProfileImage;
  }

  /**
   * 今日のイチオシ作品の画像ロケーターを返却
   */
  getTodayPickUpWorkImage(): Locator {
    return this.todayPickUpWorkImage;
  }

  /**
   * 今日のイチオシ作品のタイトルロケーターを返却
   */
  getTodayPickUpWorkTitle(): Locator {
    return this.todayPickUpWorkTitle;
  }

  /**
   * 今日のイチオシ作品のコメントロケーターを返却
   */
  getTodayPickUpWorkComment(): Locator {
    return this.todayPickUpWorkComment;
  }

  /**
   * 今日のイチオシ作品のアーティキャラクター画像ロケーターを返却
   */
  getTodayPickUpWorkArtieImage(): Locator {
    return this.todayPickUpWorkArtieImage;
  }
}

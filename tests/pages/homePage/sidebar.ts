import { Page, Locator } from "@playwright/test";

/**
 * サイドバー
 */
export class Sidebar {
  private readonly page: Page;

  private readonly closeButton: Locator;
  private readonly aboutPageLinkButton: Locator;
  private readonly profilePageLinkButton: Locator;
  private readonly deletePageLinkButton: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.closeButton = page.locator(".closeButton");
    this.aboutPageLinkButton = page.locator("#aboutPageLinkButton");
    this.profilePageLinkButton = page.locator("#profilePageLinkButton");
    this.deletePageLinkButton = page.getByRole("button", {
      name: "ログアウト",
    });
    this.logoutButton = page.getByRole("button", {
      name: "アカウント削除",
    });
  }

  /**
   * 閉じるボタンのロケーターを返却
   */
  getCloseButton(): Locator {
    return this.closeButton;
  }

  /**
   * アバウトページリンクボタンのロケーターを返却
   */
  getAboutPageLinkButton(): Locator {
    return this.aboutPageLinkButton;
  }

  /**
   * プロフィールページリンクボタンのロケーターを返却
   */
  getProfilePageLinkButton(): Locator {
    return this.profilePageLinkButton;
  }

  /**
   * ログアウトボタンのロケーターを返却
   */
  getDeletePageLinkButton(): Locator {
    return this.deletePageLinkButton;
  }

  /**
   * アカウント削除ボタンのロケーターを返却
   */
  getLogoutButton(): Locator {
    return this.logoutButton;
  }
}

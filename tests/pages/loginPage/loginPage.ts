import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly headerText: Locator;
  readonly googleLoginButton: Locator;
  readonly logoImage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.headerText = page.getByRole("heading", { name: "ログイン" });

    this.googleLoginButton = page.getByRole("button", {
      name: "Sign in with Google",
    });

    this.logoImage = page.getByRole("img", { name: "artieちゃん" });
  }

  /**
   * Google ログインボタンをクリック
   */
  async clickGoogleLoginButton() {
    await this.googleLoginButton.click();
  }
}

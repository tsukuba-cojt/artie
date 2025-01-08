import { Page, Locator, expect } from "@playwright/test";

/**
 * アカウント登録ページ
 */
export class AccountRegistrationPage {
  private readonly page: Page;

  private readonly headerText: Locator;
  private readonly nameInput: Locator;
  private readonly fileUploadButton: Locator;
  private readonly imagePreview: Locator;
  private readonly createAccountButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.headerText = page.getByRole("heading", { name: "アカウント作成" });
    this.nameInput = page.locator("#name");
    this.fileUploadButton = page.getByRole("button", {
      name: "ファイルを選択",
    });
    this.imagePreview = page.getByRole("img", { name: "Preview" });
    this.createAccountButton = page.getByRole("button", {
      name: "アカウント作成",
    });
    this.errorMessage = page.locator("#errorMessage");
  }

  /**
   * ヘッダーが表示されているか検証
   */
  async verifyHeaderVisible() {
    await expect(this.headerText).toBeVisible();
  }

  /**
   * 名前入力欄に文字を入力
   */
  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  /**
   * 現在の名前入力欄の値を検証
   */
  async verifyNameValue(expectedName: string) {
    await expect(this.nameInput).toHaveValue(expectedName);
  }

  /**
   * 画像ファイルをアップロード
   */
  async uploadImage(filePath: string) {
    await this.fileUploadButton.setInputFiles(filePath);
  }

  /**
   * プレビュー画像が表示されているか検証
   */
  async verifyImagePreviewVisible() {
    await expect(this.imagePreview).toBeVisible();
  }

  /**
   * エラーメッセージのテキストを検証
   */
  async verifyErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toHaveText(expectedText);
  }

  /**
   * エラーメッセージが表示されていない（空）ことを検証
   */
  async verifyNoErrorMessage() {
    await expect(this.errorMessage).toBeEmpty();
  }

  /**
   * 「アカウント作成」ボタンをクリック
   */
  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }

  /**
   * 指定のURLへのリダイレクトを検証
   */
  async verifyRedirectTo(url: string) {
    await expect(this.page).toHaveURL(url);
  }
}

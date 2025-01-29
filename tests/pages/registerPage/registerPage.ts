import { Page, Locator } from "@playwright/test";

/**
 * アカウント登録ページ
 */
export class AccountRegistrationPage {
  private readonly page: Page;

  private readonly nameInput: Locator;
  private readonly fileUploadButton: Locator;
  private readonly imagePreview: Locator;
  private readonly createAccountButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

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
   * 名前入力欄のロケータを返却
   */
  getNameInput(): Locator {
    return this.nameInput;
  }

  /**
   * 画像アップロードボタンのロケータを返却
   */
  getFileUploadButton(): Locator {
    return this.fileUploadButton;
  }

  /**
   * 画像プレビューのロケータを返却
   */
  getImagePreview(): Locator {
    return this.imagePreview;
  }

  /**
   * アカウント作成ボタンのロケータを返却
   */
  getCreateAccountButton(): Locator {
    return this.createAccountButton;
  }

  /**
   * エラーメッセージのロケータを返却
   */
  getErrorMessage(): Locator {
    return this.errorMessage;
  }
}

import { Page, Locator } from "@playwright/test";

/**
 * 作品カード全体を操作するクラス
 */
export class WorkCards {
  private readonly cardItems: Locator;

  constructor(page: Page, containerId: string) {
    // 特定のコンテナ内の作品カードを取得
    this.cardItems = page.locator(`#${containerId} .work-card-item`);
  }

  /**
   * すべてのカードのロケータを返却
   */
  getAllCards(): Locator {
    return this.cardItems;
  }

  /**
   * 指定したインデックスの作品カードを返却
   * @param index 取得するカードのインデックス (0から始まる)
   */
  getWorkCard(index: number): WorkCardItem {
    return new WorkCardItem(this.cardItems.nth(index));
  }

  /**
   * 指定された名前の作品カードのロケータの配列を返却
   * @param name 作品カードのタイトル
   * @returns WorkCardItem インスタンスの配列
   */
  async getCardsByName(name: string): Promise<WorkCardItem[]> {
    const matchingCards: WorkCardItem[] = [];
    const cardCount = await this.cardItems.count();

    for (let i = 0; i < cardCount; i++) {
      const card = this.cardItems.nth(i);
      const title = await card.locator(".title").innerText();

      if (title.includes(name)) {
        matchingCards.push(new WorkCardItem(card));
      }
    }

    return matchingCards;
  }
}

/**
 * 個々の作品カードを操作するクラス
 */
export class WorkCardItem {
  private readonly container: Locator;

  constructor(container: Locator) {
    this.container = container;
  }

  /**
   * カード全体のロケータを返却
   */
  getContainer(): Locator {
    return this.container;
  }

  /**
   * 画像ロケータを返却
   */
  getImage(): Locator {
    return this.container.locator("img");
  }

  /**
   * タイトルロケータを返却
   */
  getTitle(): Locator {
    return this.container.locator(".title");
  }

  /**
   * 詳細ボタンロケータを返却
   */
  getDetailButton(): Locator {
    return this.container.getByRole("button", { name: "詳細" });
  }
}

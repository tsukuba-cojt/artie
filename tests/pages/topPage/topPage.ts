import { Page } from "@playwright/test";

export class TopPage {
  readonly page: Page;
  readonly header: string;
  readonly heroText: string;
  readonly moreInfoLink: string;

  constructor(page: Page) {
    this.page = page;
    this.header = "h1";
    this.heroText = ".hero-text";
    this.moreInfoLink = 'a[href="https://www.iana.org/domains/example"]';
  }

  async navigateTo() {
    await this.page.goto("/");
  }

  async clickMoreInfo() {
    await this.page.click(this.moreInfoLink);
  }
}

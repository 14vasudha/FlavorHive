import { Page, expect } from "@playwright/test";

export class OnTheMenuPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async verifyPageContent() {
    expect(this.page.url()).toContain("/on-the-menu");
  }
}

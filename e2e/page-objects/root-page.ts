import { Page, expect } from "@playwright/test";
import { homePageMenuApiMockResponse } from "../load-constants";

export class RootPage {
  rootRoute: string;
  env = process.env?.APP_ENV;

  constructor(private page: Page) {
    this.page = page;
    this.rootRoute =
      this.env === "local"
        ? `http://localhost:5173/`
        : `https://flavor-hive.netlify.app/`;
  }

  async gotoRootRoute() {
    await this.page.goto(this.rootRoute);
    await this.page.route(`**/api/recipes/v2**`, async (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(homePageMenuApiMockResponse),
      });
    });
  }

  async verifyPageTitile() {
    await expect(this.page).toHaveTitle(/Flavor Hive/);
  }
}

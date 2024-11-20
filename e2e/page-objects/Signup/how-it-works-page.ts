import { Page, expect } from "@playwright/test";

export class HowItWorksPage {
  constructor(private page: Page) {
    this.page = page;
  }

  get howItWorksHeaderText() {
    return this.page.getByTestId("text-how-it-works-header");
  }

  get chooseMealIcon() {
    return this.page.getByTestId("icon-how-it-works-choose-meal");
  }

  get receiveMealIcon() {
    return this.page.getByTestId("icon-how-it-works-receive-meal");
  }

  get enjoyMealIcon() {
    return this.page.getByTestId("icon-how-it-works-enjoy-meal");
  }

  get howItWorksSubHeaderText0() {
    return this.page.getByTestId("text-how-it-works-sub-header-0");
  }

  get howItWorksSubHeaderText1() {
    return this.page.getByTestId("text-how-it-works-sub-header-1");
  }

  get howItWorksSubHeaderText2() {
    return this.page.getByTestId("text-how-it-works-sub-header-2");
  }

  get howItWorksDescriptionText0() {
    return this.page.getByTestId("text-how-it-works-description-0");
  }

  get howItWorksDescriptionText1() {
    return this.page.getByTestId("text-how-it-works-description-1");
  }

  get howItWorksDescriptionText2() {
    return this.page.getByTestId("text-how-it-works-description-2");
  }

  async verifyHowItWorksPage() {
    await expect(this.howItWorksHeaderText).toContainText("how it works");
    await this.verifyHowItWorksIcons();
    await this.verifyHowItWorksSubHeaders();
    await this.verifyHowItWorksDescriptions();
  }

  async verifyHowItWorksDescriptions() {
    await expect(this.howItWorksDescriptionText0).toContainText(
      "Enjoy unlimited menu access to easy recipes and pre-made meals.",
    );
    await expect(this.howItWorksDescriptionText1).toContainText(
      "like top-quality meat and sustainably sourced seafood.",
    );
    await expect(this.howItWorksDescriptionText2).toContainText(
      "Follow step-by-step recipes to create something delicious, or enjoy pre-made meals delivered fresh.",
    );
  }

  async verifyHowItWorksIcons() {
    await expect(this.enjoyMealIcon).toBeVisible();
    await expect(this.receiveMealIcon).toBeVisible();
    await expect(this.chooseMealIcon).toBeVisible();
  }

  async verifyHowItWorksSubHeaders() {
    await expect(this.howItWorksSubHeaderText0).toContainText(
      "Choose your Meals",
    );
    await expect(this.howItWorksSubHeaderText1).toContainText(
      "Receive what you need",
    );
    await expect(this.howItWorksSubHeaderText2).toContainText(
      "Enjoy restaurant-worthy meals",
    );
  }
}

import { Page, expect } from "@playwright/test";

export class AdditionalInfoPage {
  constructor(private page: Page) {
    this.page = page;
  }

  get noCommitmentIcon() {
    return this.page.getByTestId("icon-additional-info-no-commitment");
  }

  get personalizedMenusIconreceiveMealIcon() {
    return this.page.getByTestId("icon-additional-info-personalized-menus");
  }

  get convenientDeliveryIcon() {
    return this.page.getByTestId("icon-additional-info-convenient-delivery");
  }

  get additionalInfoSubHeaderText0() {
    return this.page.getByTestId("text-additional-info-sub-header-0");
  }

  get additionalInfoSubHeaderText1() {
    return this.page.getByTestId("text-additional-info-sub-header-1");
  }

  get additionalInfoSubHeaderText2() {
    return this.page.getByTestId("text-additional-info-sub-header-2");
  }

  get howItWorksDescriptionText0() {
    return this.page.getByTestId("text-additional-info-description-0");
  }

  get howItWorksDescriptionText1() {
    return this.page.getByTestId("text-additional-info-description-1");
  }

  get howItWorksDescriptionText2() {
    return this.page.getByTestId("text-additional-info-description-2");
  }

  async verifyAdditionalIngoPage() {
    await this.verifyAdditionalInfoIcons();
    await this.verifyAdditionalInfoSubHeaders();
    await this.verifyAdditionalInfoDescriptions();
  }

  async verifyAdditionalInfoDescriptions() {
    await expect(this.howItWorksDescriptionText0).toContainText(
      `Receive your delivery whenever it's convenient`,
    );
    await expect(this.howItWorksDescriptionText1).toContainText(
      `Tell us your dietary preferences and we'll personalize`,
    );
    await expect(this.howItWorksDescriptionText2).toContainText(
      `Ingredients are carefully packaged in a refrigerated box`,
    );
  }

  async verifyAdditionalInfoSubHeaders() {
    await expect(this.additionalInfoSubHeaderText0).toContainText(
      "No Commitment",
    );
    await expect(this.additionalInfoSubHeaderText1).toContainText(
      "Personalized Menus",
    );
    await expect(this.additionalInfoSubHeaderText2).toContainText(
      "Convenient Delivery",
    );
  }

  async verifyAdditionalInfoIcons() {
    await expect(this.noCommitmentIcon).toBeVisible();
    await expect(this.personalizedMenusIconreceiveMealIcon).toBeVisible();
    await expect(this.convenientDeliveryIcon).toBeVisible();
  }
}

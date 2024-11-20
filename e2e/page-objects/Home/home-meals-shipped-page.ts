import { Page, expect } from "@playwright/test";

export class HomeMealsShippedPage {
  constructor(private page: Page) {
    this.page = page;
  }

  private get totalMealsText() {
    return this.page.getByTestId("text-home-meal-shipped-total-meals");
  }

  private get chefImg() {
    return this.page.getByTestId("img-home-meals-shipped-chef");
  }

  private get ingredientsImg() {
    return this.page.getByTestId("img-home-meals-shipped-ingredients");
  }

  private get flexibleImg() {
    return this.page.getByTestId("img-home-meals-shipped-flexible");
  }

  private get chefSubHeaderText() {
    return this.page.getByTestId("text-home-meals-shipped-sub-header-chef");
  }

  private get ingredientsSubHeaderText() {
    return this.page.getByTestId(
      "text-home-meals-shipped-sub-header-ingredients",
    );
  }

  private get flexibleSubHeaderText() {
    return this.page.getByTestId("text-home-meals-shipped-sub-header-flexible");
  }

  private get chefDescriptionPrimaryText() {
    return this.page.getByTestId(
      "text-home-meals-shipped-description-primary-chef",
    );
  }

  private get ingredientsDescriptionPrimaryText() {
    return this.page.getByTestId(
      "text-home-meals-shipped-description-primary-ingredients",
    );
  }

  private get flexibleDescriptionPrimaryText() {
    return this.page.getByTestId(
      "text-home-meals-shipped-description-primary-flexible",
    );
  }

  private get chefDescriptionSecondaryText() {
    return this.page.getByTestId(
      "text-home-meals-shipped-description-secondary-chef",
    );
  }

  private get ingredientsDescriptionSecondaryText() {
    return this.page.getByTestId(
      "text-home-meals-shipped-description-secondary-ingredients",
    );
  }

  private get flexibleDescriptionSecondaryText() {
    return this.page.getByTestId(
      "text-home-meals-shipped-description-secondary-flexible",
    );
  }

  private get pricePerServingInfoText() {
    return this.page.getByTestId("text-home-meal-shipped-price-per-serving");
  }

  private get seePlansBtn() {
    return this.page.getByTestId("btn-home-meal-shipped-see-plans");
  }

  async verifyMealsShippedPage() {
    await expect(this.totalMealsText).toContainText("530+");
    await this.verifyImages();
    await this.verifySubHeaders();
    await this.verifyPrimaryDescriptions();
    await this.verifySecondaryDescriptions();
    await expect(this.pricePerServingInfoText).toContainText(
      "$7.99 per serving",
    );
    await expect(this.seePlansBtn).toBeVisible();
  }
  private async verifySecondaryDescriptions() {
    await expect(this.chefDescriptionSecondaryText).toContainText(
      "crafting your ",
    );
    await expect(this.ingredientsDescriptionSecondaryText).toContainText(
      "producers",
    );
    await expect(this.flexibleDescriptionSecondaryText).toContainText(
      "pause, or cancel anytime.",
    );
  }
  private async verifyPrimaryDescriptions() {
    await expect(this.chefDescriptionPrimaryText).toContainText(
      "Our chefs bring high standards to",
    );
    await expect(this.ingredientsDescriptionPrimaryText).toContainText(
      "80% of ingredients come directly fr",
    );
    await expect(this.flexibleDescriptionPrimaryText).toContainText(
      "Get boxes on your schedule. Sk",
    );
  }
  private async verifySubHeaders() {
    await expect(this.chefSubHeaderText).toContainText(
      "5 decades of top restaurant experience",
    );
    await expect(this.ingredientsSubHeaderText).toContainText(
      "Fresher ingredients faster",
    );
    await expect(this.flexibleSubHeaderText).toContainText(
      "You're busy, so we're flexible",
    );
  }

  private async verifyImages() {
    await expect(this.chefImg).toBeVisible();
    await expect(this.flexibleImg).toBeVisible();
    await expect(this.ingredientsImg).toBeVisible();
  }
}

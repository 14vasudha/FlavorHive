import { Page, expect } from "@playwright/test";

export class WhatsCookingPage {
  constructor(private page: Page) {
    this.page = page;
  }

  get followUsText() {
    return this.page.getByTestId("text-follow-us");
  }

  get whatsCookinText() {
    return this.page.getByTestId("text-discover-whats-cookin");
  }

  get fromTheBlogText() {
    return this.page.getByTestId("text-from-the-blog");
  }

  get instagramLink() {
    return this.page.getByTestId("link-external-instagram");
  }

  get facebookLink() {
    return this.page.getByTestId("link-external-facebook");
  }

  get pinterestLink() {
    return this.page.getByTestId("link-external-pinterest");
  }

  get youTubeLink() {
    return this.page.getByTestId("link-external-youtube");
  }

  get newsLetterSignupInputValidationError() {
    return this.page.getByTestId("error-validation-email");
  }

  get newsLetterSignupInput() {
    return this.page.locator("#input-newsletter-signup");
  }

  get fromTheBlogItemImg() {
    return this.page.getByTestId("img-blog-item");
  }

  get fromTheBlogItemLink() {
    return this.page.getByTestId("link-external-blog-item");
  }

  get goBtn() {
    return this.page.getByTestId("btn-go");
  }

  async verifyImages(width: number) {
    if (width === 640) {
      await expect(this.fromTheBlogItemImg).toBeHidden();
    } else {
      await expect(this.fromTheBlogItemImg).toBeVisible();
    }
  }

  async verifyInfoText(width: number) {
    if (width === 640) {
      await expect(this.followUsText).toBeHidden();
      await expect(this.whatsCookinText).toBeHidden();
    } else {
      await expect(this.followUsText).toBeVisible();
      await expect(this.whatsCookinText).toBeVisible();
      await expect(this.fromTheBlogText).toBeVisible();
      await expect(this.followUsText).toContainText("Follow Us");
      await expect(this.fromTheBlogText).toContainText("From the blog");
      await expect(this.whatsCookinText).toContainText(
        `Discover what's cookin`,
      );
    }
  }

  async verifyLinks(width: number) {
    await expect(this.instagramLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.pinterestLink).toBeVisible();
    await expect(this.youTubeLink).toBeVisible();
    if (width === 640) {
      await expect(this.fromTheBlogItemImg).toBeHidden();
    } else {
      await expect(this.fromTheBlogItemImg).toBeVisible();
    }
  }

  async verifyNewsletterSignupForm() {
    await expect(this.newsLetterSignupInput).toBeVisible();
    await expect(this.goBtn).toBeVisible();
  }

  async verifyErrorMessage(browserName: "chromium" | "webkit" | "firefox") {
    await this.verifyNewsletterSignupForm();
    await this.newsLetterSignupInput.fill("Vishu");
    browserName === "webkit"
      ? await this.goBtn.click()
      : await this.newsLetterSignupInput.press("Tab");
    await expect(this.newsLetterSignupInputValidationError).toBeVisible();
    await expect(this.newsLetterSignupInputValidationError).toContainText(
      "Invalid email address",
    );
    await expect(this.newsLetterSignupInputValidationError).toHaveRole("alert");
  }

  async fillNewsletterSignupFormAndSubmit(email: string) {
    await this.newsLetterSignupInput.fill(email);
    await this.goBtn.click();
    return await this.page.waitForResponse(`*/**/rest/v1/subscribers*`);
  }

  async verifyNewsletterSignupSuccess(email: string) {
    await this.verifyNewsletterSignupForm();
    const response = await this.fillNewsletterSignupFormAndSubmit(email);
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(201);
  }

  async verifyNewsletterSignupFailure(email: string) {
    await this.verifyNewsletterSignupSuccess(email);
    // Submit with same email and get an error
    const response = await this.fillNewsletterSignupFormAndSubmit(email);
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(409);
  }
}

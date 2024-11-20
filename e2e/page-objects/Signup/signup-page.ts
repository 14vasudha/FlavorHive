import { Page, expect } from "@playwright/test";

export class SignupPage {
  constructor(private page: Page) {
    this.page = page;
  }

  get signUpHeader() {
    return this.page.getByTestId("text-sign-up-header");
  }

  get nameInput() {
    return this.page.locator("#name");
  }

  get emailInput() {
    return this.page.locator("#email");
  }

  get passwordInput() {
    return this.page.locator("#password");
  }

  get termsOfUseLink() {
    return this.page.getByTestId("link-terms-of-use");
  }

  get privacyPolicyLink() {
    return this.page.getByTestId("link-privacy-policy");
  }

  get loginLink() {
    return this.page.getByTestId("link-sign-in");
  }

  get submitBtn() {
    return this.page.getByTestId("btn-submit");
  }

  get googleBtn() {
    return this.page.getByTestId("btn-google");
  }

  get appleBtn() {
    return this.page.getByTestId("btn-apple");
  }

  async goToLoginScreen() {
    await this.loginLink.click();
  }

  async verifyNavigationToSignUpScreen() {
    expect(this.page.url()).toContain("sign-up");
    await expect(this.signUpHeader).toBeVisible();
    await expect(this.googleBtn).toBeVisible();
    await expect(this.appleBtn).toBeVisible();
  }

  async fillSignUpFormAndSubmit() {
    await this.nameInput.fill("Vishu");
    await this.emailInput.fill("vishuhanuma@gmail.com");
    await this.emailInput.press("Enter");
    await this.passwordInput.fill("vishu1");
    await this.submitBtn.click();
  }

  async verifyPageAfterLogin() {
    const response = await this.page.waitForResponse(`*/**/auth/v1/signup*`);
    return await response.json();
  }
}

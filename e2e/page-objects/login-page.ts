import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {
    this.page = page;
  }

  get loginHeaderText() {
    return this.page.getByTestId("text-login-header");
  }

  get emailInput() {
    return this.page.locator("#email");
  }

  get passwordInput() {
    return this.page.locator("#password");
  }

  get rememberMeInputCheckBox() {
    return this.page.locator("#remember");
  }

  get forgotPasswordLink() {
    return this.page.getByTestId("link-forgot-password");
  }

  get loginBtn() {
    return this.page.getByTestId("btn-login");
  }

  get googleBtn() {
    return this.page.getByTestId("btn-google");
  }

  get appleBtn() {
    return this.page.getByTestId("btn-apple");
  }

  get signupLink() {
    return this.page.getByTestId("link-signup");
  }

  async verifyNavigationToLoginScreen() {
    expect(this.page.url()).toContain("sign-in");
    await expect(this.loginHeaderText).toContainText("Login");
    await expect(this.googleBtn).toBeVisible();
    await expect(this.appleBtn).toBeVisible();
  }

  async fillSignUpFormAndSubmit() {
    await this.emailInput.click();
    await this.emailInput.fill("vishu2@gmail.com");
    await this.emailInput.press("Tab");
    await this.passwordInput.fill("vishu1");
    await this.loginBtn.click();
  }

  async verifyPageAfterLogin() {
    const response = await this.page.waitForResponse(
      `*/**/auth/v1/token?grant_type=password*`,
    );
    return await response.json();
  }
}

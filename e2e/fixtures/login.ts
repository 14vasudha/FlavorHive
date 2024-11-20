import { test as base } from "@playwright/test";
import { LoginPage } from "../page-objects/login-page";
import { SignupPage } from "../page-objects/Signup/signup-page";
import { RootPage } from "../page-objects/root-page";
import { HeaderPage } from "../page-objects/header-page";
import { WhatsCookingPage } from "../page-objects/WhatsCooking/whats-cooking-page";

export const loginTest = base.extend<{
  loginPage: LoginPage;
  signupPage: SignupPage;
  rootPage: RootPage;
  headerPage: HeaderPage;
  whatsCookingPage: WhatsCookingPage;
}>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  signupPage: async ({ page }, use) => await use(new SignupPage(page)),
  rootPage: async ({ page }, use) => await use(new RootPage(page)),
  headerPage: async ({ page }, use) => await use(new HeaderPage(page)),
  whatsCookingPage: async ({ page }, use) =>
    await use(new WhatsCookingPage(page)),
});

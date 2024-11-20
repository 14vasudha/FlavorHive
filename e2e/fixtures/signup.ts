import { test as base } from "@playwright/test";
import { SignupPage } from "../page-objects/Signup/signup-page";
import { RootPage } from "../page-objects/root-page";
import { HeaderPage } from "../page-objects/header-page";
import { HowItWorksPage } from "../page-objects/Signup/how-it-works-page";
import { AdditionalInfoPage } from "../page-objects/Signup/additional-info-page";

export const signupTest = base.extend<{
  signupPage: SignupPage;
  rootPage: RootPage;
  headerPage: HeaderPage;
  howItWorksPage: HowItWorksPage;
  additionalInfoPage: AdditionalInfoPage;
}>({
  signupPage: async ({ page }, use) => await use(new SignupPage(page)),
  rootPage: async ({ page }, use) => await use(new RootPage(page)),
  headerPage: async ({ page }, use) => await use(new HeaderPage(page)),
  howItWorksPage: async ({ page }, use) => await use(new HowItWorksPage(page)),
  additionalInfoPage: async ({ page }, use) =>
    await use(new AdditionalInfoPage(page)),
});

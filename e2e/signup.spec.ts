import test from "@playwright/test";
import { signupTest } from "./fixtures/signup";
import { verifyRootPage } from "./helper-functions";
import { HeaderPage } from "./page-objects/header-page";
import { SignupPage } from "./page-objects/Signup/signup-page";
import { RootPage } from "./page-objects/root-page";

const verifynavigationToSignUpScreen = async ({
  headerPage,
  rootPage,
  signupPage,
}: {
  headerPage: HeaderPage;
  signupPage: SignupPage;
  rootPage: RootPage;
}) => {
  await verifyRootPage(rootPage);
  await headerPage.goToSignUpScreen();
  await signupPage.verifyNavigationToSignUpScreen();
};

signupTest(
  "Should sign up with email and password",
  async ({ signupPage, rootPage, headerPage, browserName, viewport }) => {
    test.skip(
      browserName === "firefox" ||
        browserName === "webkit" ||
        viewport?.width !== 1412,
      "This test only works on chrome atm",
    );
    await verifynavigationToSignUpScreen({ signupPage, rootPage, headerPage });
    await signupPage.fillSignUpFormAndSubmit();
    const userResponse = await signupPage.verifyPageAfterLogin();
    await headerPage.verifyWelcomeText(userResponse.user.user_metadata.name);
  },
);

signupTest(
  `Should verify 'how it works' and 'additional info' sections in the signup screen`,
  async ({
    rootPage,
    headerPage,
    signupPage,
    howItWorksPage,
    additionalInfoPage,
  }) => {
    await verifynavigationToSignUpScreen({ signupPage, rootPage, headerPage });
    await howItWorksPage.verifyHowItWorksPage();
    await additionalInfoPage.verifyAdditionalIngoPage();
  },
);

signupTest.afterAll(async () => {
  // TODO: Delete user requires edge function in Supabase. Parking this for now
  // await deleteUser(user.user.id);
});

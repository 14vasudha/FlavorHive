import { homeTest } from "./fixtures/home";
import { verifyRootPage, verifyWhatsCookingPage } from "./helper-functions";
import { HomeGettingStartedPage } from "./page-objects/Home/home-getting-started-page";
import { HomeBannerPage } from "./page-objects/Home/home-banner-page";
import { HomeHeroPage } from "./page-objects/Home/home-hero-page";
import { HomeTestimonialsPage } from "./page-objects/Home/home-testimonials-page";
import { HomeRatingsPage } from "./page-objects/Home/home-ratings-page";
import { HomeMealsShippedPage } from "./page-objects/Home/home-meals-shipped-page";
import { HomeMenuPage } from "./page-objects/Home/home-menu-page";

const verifyHomePage = async (
  homeHeroPage: HomeHeroPage,
  homeBannerPage: HomeBannerPage,
  homeRatingsPage: HomeRatingsPage,
  homeTestimonialsPage: HomeTestimonialsPage,
  homeGettingStartedPage: HomeGettingStartedPage,
  homeMealsShippedPage: HomeMealsShippedPage,
  width: number,
  homeMenuPage: HomeMenuPage,
) => {
  await homeHeroPage.verifyHeroImg(width);
  await homeHeroPage.verifyHeroDetails();
  await homeBannerPage.verifyBannerImg(width);
  await homeBannerPage.verifyBannerDetails();
  await homeRatingsPage.verifyHomeRatingsDetails(width);
  await homeTestimonialsPage.verifyTestimonialsDetails();
  await homeGettingStartedPage.verifyGettingStartedDetails();
  await homeMealsShippedPage.verifyMealsShippedPage();
  await homeMenuPage.verifyHomeMenuScreenDetails();
};

homeTest(
  "Verify details on Home Screen",
  async ({
    rootPage,
    homeHeroPage,
    homeBannerPage,
    homeGettingStartedPage,
    homeTestimonialsPage,
    homeMealsShippedPage,
    homeMenuPage,
    homeRatingsPage,
    whatsCookingPage,
    viewport,
    browserName,
  }) => {
    await verifyRootPage(rootPage);
    await verifyHomePage(
      homeHeroPage,
      homeBannerPage,
      homeRatingsPage,
      homeTestimonialsPage,
      homeGettingStartedPage,
      homeMealsShippedPage,
      viewport?.width!,
      homeMenuPage,
    );
    await verifyWhatsCookingPage(
      whatsCookingPage,
      viewport?.width!,
      browserName,
    );
  },
);

homeTest(
  "Navigate to Login Screen and then back to home screen and verify the details",
  async ({
    rootPage,
    headerPage,
    loginPage,
    ourVisionPage,
    homeHeroPage,
    homeBannerPage,
    homeRatingsPage,
    homeMealsShippedPage,
    homeTestimonialsPage,
    homeGettingStartedPage,
    whatsCookingPage,
    homeMenuPage,
    viewport,
    browserName,
  }) => {
    await verifyRootPage(rootPage);
    await headerPage.goToLoginScreen();
    await loginPage.verifyNavigationToLoginScreen();
    await headerPage.navigateToOurVisionScreen();
    await ourVisionPage.verifyOurVisionPageContent();
    await headerPage.goToHomeScreen();
    await verifyHomePage(
      homeHeroPage,
      homeBannerPage,
      homeRatingsPage,
      homeTestimonialsPage,
      homeGettingStartedPage,
      homeMealsShippedPage,
      viewport?.width!,
      homeMenuPage,
    );
    await verifyWhatsCookingPage(
      whatsCookingPage,
      viewport?.width!,
      browserName,
    );
  },
);
    
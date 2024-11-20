import { test as base } from "@playwright/test";
import { HeaderPage } from "../page-objects/header-page";
import { HomeHeroPage } from "../page-objects/Home/home-hero-page";
import { HomeBannerPage } from "../page-objects/Home/home-banner-page";
import { RootPage } from "../page-objects/root-page";
import { OurVisionPage } from "../page-objects/our-vision-page";
import { LoginPage } from "../page-objects/login-page";
import { WhatsCookingPage } from "../page-objects/WhatsCooking/whats-cooking-page";
import { HomeGettingStartedPage } from "../page-objects/Home/home-getting-started-page";
import { HomeTestimonialsPage } from "../page-objects/Home/home-testimonials-page";
import { HomeRatingsPage } from "../page-objects/Home/home-ratings-page";
import { HomeMealsShippedPage } from "../page-objects/Home/home-meals-shipped-page";
import { HomeMenuPage } from "../page-objects/Home/home-menu-page";

export const homeTest = base.extend<{
  rootPage: RootPage;
  ourVisionPage: OurVisionPage;
  loginPage: LoginPage;
  headerPage: HeaderPage;
  homeHeroPage: HomeHeroPage;
  homeBannerPage: HomeBannerPage;
  whatsCookingPage: WhatsCookingPage;
  homeRatingsPage: HomeRatingsPage;
  homeMenuPage: HomeMenuPage;
  homeGettingStartedPage: HomeGettingStartedPage;
  homeTestimonialsPage: HomeTestimonialsPage;
  homeMealsShippedPage: HomeMealsShippedPage;
}>({
  rootPage: async ({ page }, use) => await use(new RootPage(page)),
  ourVisionPage: async ({ page }, use) => await use(new OurVisionPage(page)),
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  headerPage: async ({ page }, use) => await use(new HeaderPage(page)),
  homeHeroPage: async ({ page }, use) => await use(new HomeHeroPage(page)),
  homeMenuPage: async ({ page }, use) => await use(new HomeMenuPage(page)),
  homeRatingsPage: async ({ page }, use) =>
    await use(new HomeRatingsPage(page)),
  homeTestimonialsPage: async ({ page }, use) =>
    await use(new HomeTestimonialsPage(page)),
  homeGettingStartedPage: async ({ page }, use) =>
    await use(new HomeGettingStartedPage(page)),
  homeBannerPage: async ({ page }, use) => await use(new HomeBannerPage(page)),
  homeMealsShippedPage: async ({ page }, use) =>
    await use(new HomeMealsShippedPage(page)),
  whatsCookingPage: async ({ page }, use) =>
    await use(new WhatsCookingPage(page)),
});

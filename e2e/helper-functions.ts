import { WhatsCookingPage } from "./page-objects/WhatsCooking/whats-cooking-page";
import { RootPage } from "./page-objects/root-page";

const generateRandomEmail = () => {
  const domains = ["example.com", "test.com", "mail.com", "demo.com"];
  const usernameLength = Math.floor(Math.random() * 6) + 5; // Random username length between 5 and 10 characters
  const username = Array(usernameLength)
    .fill(null)
    .map(() => {
      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      return chars.charAt(Math.floor(Math.random() * chars.length));
    })
    .join("");
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
};

export const verifyRootPage = async (rootPage: RootPage) => {
  await rootPage.gotoRootRoute();
  await rootPage.verifyPageTitile();
};

export const verifyWhatsCookingPage = async (
  whatsCookingPage: WhatsCookingPage,
  width: number,
  browserName: "chromium" | "webkit" | "firefox",
) => {
  await whatsCookingPage.verifyInfoText(width);
  await whatsCookingPage.verifyImages(width);
  await whatsCookingPage.verifyLinks(width);
  await whatsCookingPage.verifyNewsletterSignupForm();
  await whatsCookingPage.verifyErrorMessage(browserName);
  await whatsCookingPage.verifyNewsletterSignupSuccess(generateRandomEmail());
  await whatsCookingPage.verifyNewsletterSignupFailure(generateRandomEmail());
};

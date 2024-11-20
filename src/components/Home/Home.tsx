import { createLazyRoute } from "@tanstack/react-router";
import HomeHero from "./HomeHero";
import HomeBanner from "./HomeBanner";
import WhatsCooking from "../Discover/WhatsCooking";
import GettingStarted from "./GettingStarted";
import Testimonials from "./Testimonials";
import Ratings from "./Ratings";
import MealsShipped from "./MealsShipped";
import HomeMenu from "./HomeMenu";

const Home = () => {
  return (
    <>
      <section id="home" className="space-y-10">
        <HomeHero />
        <HomeBanner />
        <Ratings />
        <HomeMenu />
        <MealsShipped />
        <Testimonials />
        <GettingStarted />
      </section>
      <WhatsCooking />
    </>
  );
};

export default Home;

export const Route = createLazyRoute("/pages/vision")({
  component: Home,
});

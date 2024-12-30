import { createLazyRoute } from "@tanstack/react-router";
import WhatsCooking from "../components/Discover/WhatsCooking";

const RecipeDetailPage = () => {
  return (
    <>
      <section id="recipe-detail" className="mt-4">
        Recipe Detail goes here!!
      </section>
      <WhatsCooking />
    </>
  );
};

export default RecipeDetailPage;

export const Route = createLazyRoute("/on-the-menu/recipe/$recipeId")({
  component: RecipeDetailPage,
});

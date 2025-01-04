import { createLazyRoute, useLoaderData } from "@tanstack/react-router";
import WhatsCooking from "../components/Discover/WhatsCooking";
import { getMatchingLabels } from "../services/helper-functions";
import RecipeDetailImage from "../components/recipe-detail/RecipeDetailImage";
import RecipeDetailNutritionInfo from "../components/recipe-detail/RecipeDetailNutritionInfo";
import RecipeDetailDietaryInfo from "../components/recipe-detail/RecipeDetailDietaryInfo";
import RecipeDetailDescription from "../components/recipe-detail/RecipeDetailDescription";
import RecipeDetailHeader from "../components/recipe-detail/RecipeDetailHeader";

const RecipeDetailPage = () => {
  const {
    recipe: {
      image,
      images,
      label,
      healthLabels,
      dietLabels,
      totalTime,
      yield: servings,
      calories,
    },
  } = useLoaderData({ from: "/on-the-menu/recipe/$recipeId" });
  const matchingLabels = getMatchingLabels([...healthLabels, ...dietLabels]);

  return (
    <>
      <section
        id="recipe-detail"
        className="mt-1 bg-gray-50 pb-8 lg:container lg:mt-8 lg:grid lg:grid-cols-2 lg:gap-6 lg:bg-inherit lg:px-20 xl:px-28 2xl:px-40"
      >
        <RecipeDetailImage
          image={image}
          images={images}
          label={label}
          matchingLabels={matchingLabels}
          totalTime={totalTime}
        />
        <article className="grid gap-y-10">
          <RecipeDetailHeader
            healthLabels={healthLabels}
            label={label}
            servings={servings}
            totalTime={totalTime}
            key={label}
          />
          <RecipeDetailDescription />
          {!!matchingLabels.length && (
            <RecipeDetailDietaryInfo matchingLabels={matchingLabels} />
          )}
          <RecipeDetailNutritionInfo calories={calories} />
        </article>
      </section>
      <WhatsCooking />
    </>
  );
};

export default RecipeDetailPage;

export const Route = createLazyRoute("/on-the-menu/recipe/$recipeId")({
  component: RecipeDetailPage,
});

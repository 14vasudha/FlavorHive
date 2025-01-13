import {
  createLazyRoute,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";
import WhatsCooking from "../components/Discover/WhatsCooking";
import {
  getMatchingLabels,
  replaceKeysInObject,
} from "../services/helper-functions";
import RecipeDetailImage from "../components/recipe-detail/RecipeDetailImage";
import RecipeDetailNutritionInfo from "../components/recipe-detail/RecipeDetailNutritionInfo";
import RecipeDetailDietaryInfo from "../components/recipe-detail/RecipeDetailDietaryInfo";
import RecipeDetailDescription from "../components/recipe-detail/RecipeDetailDescription";
import RecipeDetailHeader from "../components/recipe-detail/RecipeDetailHeader";
import { useGetSimilarRecipes } from "../services/use-queries";
import { Filters } from "../types/on-the-menu/on-the-menu-filter";
import OnTheMenuRecipeCard from "../components/on-the-menu/OnTheMenuRecipeCard";

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

  const { recipeId } = useParams({ from: "/on-the-menu/recipe/$recipeId" });
  const matchingLabels = getMatchingLabels([...healthLabels, ...dietLabels]);

  const savedFilters = replaceKeysInObject(
    JSON.parse(localStorage.getItem("filters") || "") as Filters,
  );

  const { data: similarRecipes, isError: similarRecipesError } =
    useGetSimilarRecipes(savedFilters, recipeId);

  return (
    <>
      <section
        id="recipe-detail"
        className="mt-1 bg-gray-50 lg:mt-4 xl:flex xl:gap-3 2xl:gap-6"
      >
        <div className="items-start py-8 lg:grid lg:grid-cols-2 lg:gap-6 lg:bg-white xl:flex-1 xl:py-4 2xl:py-6">
          <RecipeDetailImage
            image={image}
            images={images}
            label={label}
            matchingLabels={matchingLabels}
            totalTime={totalTime}
          />
          <article className="grid gap-y-10 lg:px-1">
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
        </div>
        <section
          id="similar-recipes"
          className="grid content-start gap-y-8 bg-white py-8 xl:w-1/4"
        >
          <h2 className="text-center text-2xl text-info10">Try Also</h2>
          <div className="grid grid-cols-2 items-start justify-items-center gap-y-10 bg-white lg:grid-cols-3 lg:gap-x-4 xl:grid-flow-row xl:grid-cols-1">
            {similarRecipesError && (
              <p className="px-4">
                Failed to fetch similar recipes. Please try again later!!
              </p>
            )}

            {!similarRecipes?.length ? (
              <p className="px-4">
                No recipes found!! Please try a different filter in on-the-menu
                screen
              </p>
            ) : (
              similarRecipes?.map((recipe, index) => (
                <OnTheMenuRecipeCard recipe={recipe} key={index} />
              ))
            )}
          </div>
        </section>
      </section>
      <WhatsCooking />
    </>
  );
};

export default RecipeDetailPage;

export const Route = createLazyRoute("/on-the-menu/recipe/$recipeId")({
  component: RecipeDetailPage,
});

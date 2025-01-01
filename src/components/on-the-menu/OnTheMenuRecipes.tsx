import { useEffect, useState } from "react";
import { RecipeHit } from "../../types/home";
import OnTheMenuRecipeCard from "./OnTheMenuRecipeCard";

interface Props {
  recipes: RecipeHit[];
}

const OnTheMenuRecipes = ({ recipes }: Props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (screenWidth >= 1024 && screenWidth < 1280) {
    recipes = recipes.slice(0, recipes.length - 2);
  }

  return (
    <section id="recipes-list" className="container mx-auto p-4">
      {recipes.length ? (
        <div className="grid grid-cols-2 justify-items-center gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-4 xl:grid-cols-4">
          {recipes?.map((recipe, index) => {
            return <OnTheMenuRecipeCard key={index} recipe={recipe} />;
          })}
        </div>
      ) : (
        <p className="my-10 text-center">
          Your search didn't return any results. Please apply a different
          filter.
        </p>
      )}
    </section>
  );
};

export default OnTheMenuRecipes;

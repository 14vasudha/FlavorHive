import axios, { AxiosResponse } from "axios";
import {
  HomeMenu,
  HomeMenuSelector,
  Recipe,
  RecipeHit,
  RecipeResponse,
} from "../types/home";
import { buildUrl } from "./helper-functions";
import { homeRecipeFields } from "../types/types";

const getHits = (response: AxiosResponse<RecipeResponse>): RecipeHit[] =>
  response?.data?.hits;

const getHomeRecipe = async (url: string): Promise<Recipe> => {
  try {
    const hits = getHits(await axios.get(url));
    const [{ recipe }] = hits;
    return recipe;
  } catch (error) {
    throw error;
  }
};

const getRecipes = async (url: string): Promise<RecipeResponse> => {
  try {
    return (await axios.get(url)).data;
  } catch (error) {
    throw error;
  }
};

/**
 * This function is used to get the Menus to be displayed on the Home Screen.
 * Selector is used to filter the recipes on the 'on the menu' screen.
 * @returns Promise<HomeMenu>
 */
export const getHomeMenu = async (): Promise<HomeMenu> => {
  try {
    const fields = homeRecipeFields;
    return {
      mediterranean: {
        recipe: await getHomeRecipe(
          buildUrl({ fields, cuisineType: ["mediterranean"] }),
        ),
        selector: HomeMenuSelector.cuisine,
      },
      breakFast: {
        recipe: await getHomeRecipe(
          buildUrl({ fields, mealType: ["breakfast"] }),
        ),
        selector: HomeMenuSelector.meal,
      },
      vegetarian: {
        recipe: await getHomeRecipe(
          buildUrl({ fields, health: ["vegetarian"] }),
        ),
        selector: HomeMenuSelector.health,
      },
      french: {
        recipe: await getHomeRecipe(
          buildUrl({ fields, cuisineType: ["french"] }),
        ),
        selector: HomeMenuSelector.cuisine,
      },
      indian: {
        recipe: await getHomeRecipe(
          buildUrl({ fields, cuisineType: ["indian"] }),
        ),
        selector: HomeMenuSelector.cuisine,
      },
      starter: {
        recipe: await getHomeRecipe(
          buildUrl({ fields, dishType: ["starter"] }),
        ),
        selector: HomeMenuSelector.dish,
      },
      snack: {
        recipe: await getHomeRecipe(buildUrl({ fields, mealType: ["snack"] })),
        selector: HomeMenuSelector.meal,
      },
      mexican: {
        recipe: await getHomeRecipe(
          buildUrl({ fields, cuisineType: ["mexican"] }),
        ),
        selector: HomeMenuSelector.cuisine,
      },
      pancake: {
        recipe: await getHomeRecipe(
          buildUrl({ fields, dishType: ["pancake"] }),
        ),
        selector: HomeMenuSelector.dish,
      },
      salad: {
        recipe: await getHomeRecipe(buildUrl({ fields, dishType: ["salad"] })),
        selector: HomeMenuSelector.dish,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getOnTheMenuData = async ({
  pageParam,
}: {
  pageParam: string;
}): Promise<RecipeResponse> => {
  try {
    return getRecipes(pageParam);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.status === 401) {
        throw new Error("You don't have acces to this feature");
      } else {
        throw new Error("Something went wrong");
      }
    } else {
      throw error;
    }
  }
};

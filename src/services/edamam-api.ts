import axios from "axios";
import { HomeMenu, HomeMenuSelector, Recipe } from "../types/home";

type SelectorMap = {
  fields: string[];
  mealType?: string;
  cuisineType?: string;
  health?: string;
  dishType?: string;
  diet?: string;
};

const appId = "7f563e49";
const appKeys = [
  "4be7f47dd4dc6fd6ed0b7644e352f6aa",
  "7bbf70c600c349da70d8d807a2949f29",
];

const homeRecipeFields = ["label", "image", "images"];

const getBaseUrl = () =>
  `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKeys[Math.floor(Math.random() * appKeys.length)]}`;

const buildUrl = (selectorMap: SelectorMap) => {
  const selectors = Object.entries(selectorMap)
    .map(([key, value]) => {
      if (key !== "fields") {
        return `&${key}=${value}`;
      }
    })
    .join("");

  return `${getBaseUrl()}${appendFields(selectorMap.fields)}${selectors}`;
};

const appendFields = (fields: string[]) => {
  const urlPart = fields.map((field) => {
    return `&field=${field}`;
  });
  return urlPart.join("");
};

const getRecipe = async (url: string): Promise<Recipe> => {
  try {
    const {
      data: { hits },
    } = await axios.get(url);
    const [{ recipe }] = hits;
    return recipe;
  } catch (error) {
    throw error;
  }
};

export const getHomeMenu = async (): Promise<HomeMenu> => {
  try {
    const fields = homeRecipeFields;
    return {
      mediterranean: {
        recipe: await getRecipe(
          buildUrl({ fields, cuisineType: "mediterranean" }),
        ),
        selector: HomeMenuSelector.cuisineType,
      },
      breakFast: {
        recipe: await getRecipe(buildUrl({ fields, mealType: "breakfast" })),
        selector: HomeMenuSelector.mealType,
      },
      vegetarian: {
        recipe: await getRecipe(buildUrl({ fields, health: "vegetarian" })),
        selector: HomeMenuSelector.health,
      },
      french: {
        recipe: await getRecipe(buildUrl({ fields, cuisineType: "french" })),
        selector: HomeMenuSelector.cuisineType,
      },
      indian: {
        recipe: await getRecipe(buildUrl({ fields, cuisineType: "indian" })),
        selector: HomeMenuSelector.cuisineType,
      },
      starter: {
        recipe: await getRecipe(buildUrl({ fields, dishType: "starter" })),
        selector: HomeMenuSelector.dishType,
      },
      snack: {
        recipe: await getRecipe(buildUrl({ fields, mealType: "snack" })),
        selector: HomeMenuSelector.mealType,
      },
      mexican: {
        recipe: await getRecipe(buildUrl({ fields, cuisineType: "mexican" })),
        selector: HomeMenuSelector.cuisineType,
      },
      pancake: {
        recipe: await getRecipe(buildUrl({ fields, dishType: "pancake" })),
        selector: HomeMenuSelector.dishType,
      },
      salad: {
        recipe: await getRecipe(buildUrl({ fields, dishType: "salad" })),
        selector: HomeMenuSelector.dishType,
      },
    };
  } catch (error) {
    throw error;
  }
};

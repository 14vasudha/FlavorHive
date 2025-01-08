import { RecipeHit } from "../types/home";
import {
  Filters,
  OnTheMenuFilterOption,
} from "../types/on-the-menu/on-the-menu-filter";

type SelectorMap = {
  fields: string[];
  mealType?: string[];
  cuisineType?: string[];
  health?: string[];
  dishType?: string[];
  diet?: string[];
};
// Reverse the mapping to look up keys by their values
const reverseMapping = Object.entries(OnTheMenuFilterOption).reduce(
  (acc, [key, value]) => {
    acc[value] = key as keyof typeof OnTheMenuFilterOption;
    return acc;
  },
  {} as Record<string, keyof typeof OnTheMenuFilterOption>,
);

export function replaceKeysInObject(
  input: Record<string, any>,
): Record<string, any> {
  const newObj: Record<string, any> = {};
  for (const key in input) {
    const newKey = reverseMapping[key]; // Look up the new key using the reverse mapping
    if (newKey) {
      newObj[newKey] = input[key];
    } else {
      newObj[key] = input[key]; // Keep the original key if no match is found
    }
  }
  return newObj;
}

export const appId = "7f563e49";
export const appKeys = [
  "4be7f47dd4dc6fd6ed0b7644e352f6aa",
  "7bbf70c600c349da70d8d807a2949f29",
];

const appendFields = (fields: string[]) => {
  const urlPart = fields.map((field) => {
    return `&field=${field}`;
  });
  return urlPart.join("");
};

const getBaseUrl = () =>
  `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKeys[Math.floor(Math.random() * appKeys.length)]}`;

export const buildUrl = (selectorMap: SelectorMap) => {
  const selectors = Object.entries(selectorMap)
    .filter(([key]) => key !== "fields")
    .map(([key, value]) =>
      value
        .map((v) => `&${key}=${encodeURIComponent(v).replace(" ", "%20")}`)
        .join(""),
    )
    .join("");

  return `${getBaseUrl()}${appendFields(selectorMap.fields)}${selectors}`;
};

export const labelsForFiltering = [
  "Sugar-Conscious",
  "High-Protein",
  "Low-Fat",
  "Low-Carb",
];

export const isVeganVegetarion = (labels: string[]) =>
  labels.some(
    (label) =>
      label.toLocaleLowerCase() === "vegan" ||
      label.toLocaleLowerCase() === "vegetarian",
  );

export const getMatchingLabels = (labels: string[]) => {
  const labelSet = new Set(labels);
  return labelsForFiltering.filter((label) => labelSet.has(label));
};

export const paramsSerializerFn = (
  params: Record<string, any>,
  fields: string[],
  filters?: Filters,
) => {
  // Serialize base params
  const searchParams = new URLSearchParams(params);

  // Append fields dynamically
  fields.forEach((field) => searchParams.append("field", field));

  // Iterate through each key-value pair
  if (filters) {
    Object.entries(filters).forEach(([key, values]) => {
      values.forEach((value) => {
        searchParams.append(key, value); // Append key-value pairs
      });
    });
  }

  // Return the final query string
  return searchParams.toString();
};

export const extractRecipeId = (url: string): string => {
  const regex = /\/api\/recipes\/v2\/([^?]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

export const getRandomRecipes = (
  recipes: RecipeHit[],
  count: number,
  recipeId: string,
): RecipeHit[] => {
  const shuffled = [
    ...recipes.filter((recipe) => {
      const id = extractRecipeId(recipe._links.self.href);
      return id !== recipeId;
    }),
  ]; // Create a shallow copy to avoid modifying the original array

  // Shuffle using Fisher-Yates Algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }

  return shuffled.slice(0, count); // Return the first 'count' elements
};

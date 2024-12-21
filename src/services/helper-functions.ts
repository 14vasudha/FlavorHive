import { OnTheMenuFilterOption } from "../types/on-the-menu/on-the-menu-filter";

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

const appId = "7f563e49";
const appKeys = [
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

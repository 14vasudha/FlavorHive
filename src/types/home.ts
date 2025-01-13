export type Recipe = {
  label: string;
  image: string;
  images: RecipeImages;
  source: string;
  url: string;
  healthLabels: string[];
  ingredientLines: string[];
  calories: number;
  totalTime: number;
  dietLabels: string[];
  yield: number;
};

export type RecipeImages = {
  LARGE?: ImageContent;
  REGULAR: ImageContent;
  SMALL: ImageContent;
  THUMBNAIL: ImageContent;
};

export type HomeMenuSelector = "cuisine" | "meal" | "health" | "dish";

export const HomeMenuSelector = {
  cuisine: "cuisine" as HomeMenuSelector,
  meal: "meal" as HomeMenuSelector,
  health: "health" as HomeMenuSelector,
  dish: "dish" as HomeMenuSelector,
};

type HomeMenuItem = {
  recipe: Recipe;
  selector: HomeMenuSelector;
};

type ImageContent = {
  height: number;
  url: string;
  width: number;
};

export type HomeMenu = {
  mediterranean: HomeMenuItem;
  breakFast: HomeMenuItem;
  vegetarian: HomeMenuItem;
  french: HomeMenuItem;
  indian: HomeMenuItem;
  starter: HomeMenuItem;
  snack: HomeMenuItem;
  mexican: HomeMenuItem;
  pancake: HomeMenuItem;
  salad: HomeMenuItem;
};

type Link = {
  href: string;
  title: string;
};

type SelfNextLinks = {
  self: Link;
  next: Link;
};

export type RecipeHit = {
  recipe: Recipe;
  _links: SelfNextLinks;
};

export type RecipeResponse = {
  from: number;
  to: number;
  count: number;
  _links: SelfNextLinks;
  hits: RecipeHit[];
};

export type BlogResponse = {
  recipes: BlogRecipe[];
};

export type BlogRecipe = {
  image: string;
  sourceUrl: string;
  title: string;
};

export type Recipe = {
  label: string;
  image: string;
  images: {
    LARGE?: ImageContent;
    REGULAR: ImageContent;
    SMALL: ImageContent;
    THUMBNAIL: ImageContent;
  };
};

export type HomeMenuSelector =
  | "cuisineType"
  | "mealType"
  | "health"
  | "dishType";

export const HomeMenuSelector = {
  cuisineType: "cuisineType" as HomeMenuSelector,
  mealType: "mealType" as HomeMenuSelector,
  health: "health" as HomeMenuSelector,
  dishType: "dishType" as HomeMenuSelector,
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

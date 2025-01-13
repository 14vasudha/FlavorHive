export const OnTheMenuFilterOption = {
  cuisineType: "cuisine",
  dietType: "diet",
  dishType: "dish",
  health: "health",
  mealType: "meal",
  ingr: "ingredients",
};

export type Filters = {
  [key: string]: string[];
};

export type Filter = {
  id: number;
  value: string;
  label?: string | null;
  description?: string | null;
};
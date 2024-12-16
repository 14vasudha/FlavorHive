export const OnTheMenuFilterOption = {
  cuisineType: "Cuisine",
  dietType: "Diet",
  dishType: "Dish",
  health: "Health",
  mealType: "Meal",
  ingr: "Ingredients",
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
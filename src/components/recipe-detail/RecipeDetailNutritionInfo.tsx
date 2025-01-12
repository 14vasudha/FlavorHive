import Button from "../Button";

type RecipeDetailNutritionInfoProps = {
  calories: number;
};

const RecipeDetailNutritionInfo = ({
  calories,
}: RecipeDetailNutritionInfoProps) => {
  return (
    <section className="flex flex-col justify-around gap-5 border border-gray40 bg-white px-5 py-10 md:px-10 lg:border-none lg:px-0 lg:py-0">
      <header className="flex items-baseline justify-between border-b border-gray60 px-4 pb-2">
        <h2 className="text-xl font-bold text-black20">Nutrition</h2>
        <span className="text-sm uppercase leading-tight tracking-wide text-primary-info">
          per serving
        </span>
      </header>
      <div className="flex justify-between border-b border-gray60 px-4 pb-2 text-sm text-gray50">
        <span className="font-bold">Calories</span>
        <span data-testid={`text-on-the-menu-recipe-detail-calories`}>
          {Math.round(calories)} Cals
        </span>
      </div>
      <Button
        data-testid="btn-on-the-menu-recipe-detail-view-full-nutrition"
        variant="google"
        className="self-center border py-3 font-bold uppercase tracking-[3px] text-primary"
        rounded="triplexl"
      >
        view full nutrition
      </Button>
    </section>
  );
};

export default RecipeDetailNutritionInfo;

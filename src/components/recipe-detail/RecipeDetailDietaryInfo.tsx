import Button from "../Button";

type RecipeDetailDietaryInfoProps = {
  matchingLabels: string[];
};

const RecipeDetailDietaryInfo = ({
  matchingLabels,
}: RecipeDetailDietaryInfoProps) => {
  return (
    <section className="grid gap-y-2 border border-gray40 bg-white px-2 py-10 leading-8 text-info10 md:px-10 lg:border-none lg:px-0 lg:py-0">
      <header>
        <h2
          data-testid={`text-on-the-menu-recipe-detail-dietary-info-header`}
          className="text-lg font-semibold text-black20"
        >
          Dietary Information
        </h2>
      </header>
      <p>
        See nutrition facts for total fat, saturated fat, cholesterol, and
        sodium information
      </p>
      <div className="flex gap-4">
        {matchingLabels.map((label) => (
          <Button
            data-testid={`btn-on-the-menu-recipe-detail-dietary-label-${label}`}
            key={label}
            variant="gray"
            rounded="medium"
            className="text-xs"
          >
            {label}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default RecipeDetailDietaryInfo;

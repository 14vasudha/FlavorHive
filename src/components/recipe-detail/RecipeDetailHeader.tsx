import { isVeganVegetarion } from "../../services/helper-functions";
import TimeIcon from "../../assets/on-the-menu/time-icon.svg";
import VegetarianIcon from "../../assets/on-the-menu/vegetarian.svg";

type RecipeDetailHeaderProps = {
  label: string;
  totalTime: number;
  servings: number;
  healthLabels: string[];
};

const RecipeDetailHeader = ({
  label,
  healthLabels,
  totalTime,
  servings,
}: RecipeDetailHeaderProps) => {
  return (
    <header className="grid justify-center gap-y-3 bg-white px-2 pb-4 md:px-10 lg:mx-0 lg:justify-start lg:px-0 lg:pb-0">
      <h2
        data-testid={`text-on-the-menu-recipe-detail-title`}
        className="font-chronicle text-3xl font-medium capitalize text-primary"
      >
        {label}
      </h2>
      <div className="text-md flex place-items-center gap-2 font-medium text-blue-info">
        <TimeIcon data-testid={`icon-on-the-menu-recipe-detail-time-icon`} />
        <span
          data-testid={`text-on-the-menu-recipe-detail-time`}
          className={`${isVeganVegetarion(healthLabels) ? "inline-block border-r pr-3" : ""}`}
        >
          {totalTime} MIN
        </span>
        {isVeganVegetarion(healthLabels) && (
          <VegetarianIcon
            data-testid={`icon-on-the-menu-recipe-detail-veg-icon`}
          />
        )}
      </div>
      <p
        data-testid={`text-on-the-menu-recipe-detail-servings-count`}
        className="text-sm text-primary-info"
      >
        {servings} servings
      </p>
    </header>
  );
};

export default RecipeDetailHeader;

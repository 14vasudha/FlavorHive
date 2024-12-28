import { Link } from "@tanstack/react-router";
import { RecipeHit } from "../../types/home";
import TimeIcon from "../../assets/on-the-menu/time-icon.svg";
import VegetarianIcon from "../../assets/on-the-menu/vegetarian.svg";

type RecipeCardProps = {
  recipe: RecipeHit;
};

const OnTheMenuRecipeCard = ({
  recipe: {
    recipe: {
      image,
      images,
      label,
      totalTime,
      calories,
      source,
      ingredientLines,
      healthLabels,
      url,
      dietLabels,
    },
  },
}: RecipeCardProps) => {
  const labelsForFiltering = [
    "Sugar-Conscious",
    "High-Protein",
    "Low-Fat",
    "Low-Carb",
  ];
  const labelSet = new Set([...healthLabels, ...dietLabels]);
  const matchingLabels = labelsForFiltering.filter((label) =>
    labelSet.has(label),
  );

  const isVeganVegetarion = healthLabels.some(
    (label) =>
      label.toLocaleLowerCase() === "vegan" ||
      label.toLocaleLowerCase() === "vegetarian",
  );

  return (
    <article className="md:w-76 flex w-64 flex-col items-stretch justify-between overflow-hidden rounded-md border border-gray-200 bg-gray-50 shadow-md transition-all duration-300 hover:border-gray-300 hover:no-underline hover:shadow-lg lg:w-72 2xl:w-80">
      <Link className="hover:no-underline">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={image}
            data-testid={`img-home-menu-${label}`}
            srcSet={`${images.SMALL.url} 640w, ${images.REGULAR.url} 1024w, ${images.LARGE?.url ?? images.REGULAR.url} 1280w`}
            alt={label}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Save Button */}
          {/* <button className="absolute left-2 top-2 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-700 shadow">
            Save
          </button> */}

          {(totalTime <= 15 || matchingLabels.length) && (
            <div className="absolute bottom-2 rounded-r bg-primary px-2 py-1 text-[10px] font-bold uppercase leading-4 tracking-widest text-white">
              {totalTime <= 15
                ? `15 MIN MEAL`
                : matchingLabels[
                    Math.floor(Math.random() * matchingLabels.length)
                  ]
                    .split("-")
                    .join(" ")}
            </div>
          )}
        </div>
        <h3
          className="line-clamp-2 px-4 pt-2 text-center font-chronicle text-base font-semibold text-primary"
          title={label}
        >
          {label}
        </h3>
      </Link>

      <div className="grid gap-y-4 px-4 py-2 tracking-wider">
        <div className="flex divide-x divide-gray-300 border-b border-t py-2 text-xs text-primary-info">
          <span className="w-1/2">
            <span className="font-semibold text-checkbox-tick-blue">
              {Math.round(calories)}
            </span>{" "}
            CALORIES
          </span>
          <span className="w-1/2 text-right">
            <span className="font-semibold text-checkbox-tick-blue">
              {ingredientLines.length}
            </span>{" "}
            INGREDIENTS
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-blue-info">
          <TimeIcon />
          <span
            className={`${isVeganVegetarion ? "inline-block border-r pr-2" : ""}`}
          >
            {totalTime} MIN
          </span>
          {isVeganVegetarion && <VegetarianIcon />}
        </div>
        <a
          href={url}
          target="_blank"
          className="text-xs font-semibold text-gray20 underline-offset-2 hover:underline"
        >
          {source}
        </a>
      </div>
    </article>
  );
};

export default OnTheMenuRecipeCard;

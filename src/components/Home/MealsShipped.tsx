import { useLoaderData } from "@tanstack/react-router";
import Button from "../Button";

const MealsShipped = () => {
  const { mealsShipped } = useLoaderData({ from: "/" });

  return (
    <section id="meals-shipped" className="flex flex-col items-center gap-6">
      <span
        data-testid="text-home-meal-shipped-total-meals"
        className="font-chronicle text-3xl font-bold text-primary lg:text-[40px]"
      >
        530+ million meals shipped
      </span>
      <p className="text-black20 max-w-80 text-center text-lg lg:max-w-96 lg:text-xl">
        See why home cooks stick with the original American meal kit.
      </p>
      <div className="mx-2 grid gap-8 md:grid-cols-3 md:gap-0">
        {mealsShipped?.map(
          ({
            image,
            alt,
            name,
            description_primary,
            description_secondary,
          }) => {
            return (
              <div
                key={alt}
                className="mx-6 grid gap-4 text-center text-[15px] leading-snug text-black20"
              >
                <img
                  data-testid={`img-home-meals-shipped-${alt}`}
                  src={image}
                  alt={alt}
                  className="rounded-md"
                />
                <p
                  data-testid={`text-home-meals-shipped-sub-header-${alt}`}
                  className="font-bold"
                >
                  {name}
                </p>
                <div className="">
                  <p
                    data-testid={`text-home-meals-shipped-description-primary-${alt}`}
                  >
                    {description_primary}
                  </p>
                  <p
                    data-testid={`text-home-meals-shipped-description-secondary-${alt}`}
                  >
                    {description_secondary}
                  </p>
                </div>
              </div>
            );
          },
        )}
      </div>
      <p className="mt-6">
        Get started for as little as{" "}
        <span
          data-testid="text-home-meal-shipped-price-per-serving"
          className="text-black20 font-bold"
        >
          $7.99 per serving
        </span>
      </p>
      <Button data-testid="btn-home-meal-shipped-see-plans" className="py-3">
        See Plans
      </Button>
    </section>
  );
};

export default MealsShipped;

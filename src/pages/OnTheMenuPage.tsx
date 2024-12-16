import { createLazyRoute } from "@tanstack/react-router";
import OnTheMenuHeader from "../components/on-the-menu/OnTheMenuHeader";
import { useState } from "react";

import { replaceKeysInObject } from "../services/helper-functions";
import { useGetOnTheMenuData } from "../services/use-queries";
import Loader from "../components/layout/Loader";
import OnTheMenuRecipes from "../components/on-the-menu/OnTheMenuRecipes";
import { Filters } from "../types/on-the-menu/on-the-menu-filter";
import Button from "../components/Button";

const OnTheMenuPage = () => {
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters
      ? replaceKeysInObject(JSON.parse(savedFilters) as Filters)
      : null;
  });
  const {
    data: recipePages,
    hasNextPage,
    isPending,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetOnTheMenuData(appliedFilters || {});

  console.log(hasNextPage, recipePages, isError, error);

  return (
    <section id="on-the-menu">
      <OnTheMenuHeader setAppliedFilters={setAppliedFilters} />
      {isPending && <Loader />}
      {recipePages?.pages.map(({ hits }, index) => {
        return <OnTheMenuRecipes recipes={hits} key={index} />;
      })}

      {!isPending && hasNextPage && (
        <div className="flex items-center justify-center p-5">
          <Button
            onClick={() => fetchNextPage()}
            rounded="medium"
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default OnTheMenuPage;

export const Route = createLazyRoute("/on-the-menu")({
  component: OnTheMenuPage,
});

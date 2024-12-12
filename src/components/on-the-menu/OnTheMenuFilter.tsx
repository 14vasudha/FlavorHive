import { forwardRef, useState } from "react";
import { OnTheMenuFilterOptions } from "../../types/on-the-menu/on-the-menu-filter";
import { AnimatePresence, motion } from "framer-motion";
import {
  useGetCuisineTypes,
  useGetDietTypes,
  useGetDishTypes,
  useGetHealthLabels,
  useGetMealTypes,
} from "../../services/use-queries";
import Button from "../Button";

interface Filter {
  id: number;
  value: string;
  label?: string | null;
  description?: string | null;
}

interface Filters {
  [key: string]: string[];
}

const OnTheMenuFilter = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const [selectedFilterType, setSelectedFilterType] = useState<string>(
    OnTheMenuFilterOptions.Cuisine,
  );
  const [filters, setFilters] = useState<Filters>(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters ? (JSON.parse(savedFilters) as Filters) : {};
  });

  const handleFilterTypeSelect = (filterType: string) => {
    setSelectedFilterType(filterType);
  };

  const handleOptionChange = (option: string) => {
    if (!selectedFilterType) return;
    setFilters((prev) => {
      const currentOptions = prev[selectedFilterType] || [];
      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter((o) => o !== option) // Remove if already selected
        : [...currentOptions, option]; // Add if not selected
      return { ...prev, [selectedFilterType]: updatedOptions };
    });
  };

  const filtersData: {
    [x: string]: Filter[] | null | undefined;
  } = {
    [OnTheMenuFilterOptions.Cuisine]: useGetCuisineTypes().data,
    [OnTheMenuFilterOptions.Diet]: useGetDietTypes().data,
    [OnTheMenuFilterOptions.Dish]: useGetDishTypes().data,
    [OnTheMenuFilterOptions.Health]: useGetHealthLabels().data,
    [OnTheMenuFilterOptions.Meal]: useGetMealTypes().data,
    [OnTheMenuFilterOptions.Ingredients]: [],
  };

  const handleClearAll = () => {};
  const handleClear = () => {};
  const handleDone = () => {
    localStorage.setItem("filters", JSON.stringify(filters));
  };

  return (
    <div
      ref={ref}
      role="dialog"
      className={`absolute left-1/2 top-10 z-10 w-[630px] min-w-96 -translate-x-1/2 transform space-y-2 bg-white py-4 pb-0 shadow-lg`}
    >
      <div className="flex min-h-56 px-4">
        <nav className="w-1/5 border-r border-slate-100 text-sm">
          <ul>
            {Object.keys(filtersData).map((filterType) => (
              <li key={filterType} className="p-2">
                <a
                  data-testid={`link-${filterType.toLocaleLowerCase()}`}
                  className={`cursor-pointer rounded-md p-2 text-primary transition-all hover:bg-slate-100 hover:no-underline ${filterType === selectedFilterType ? "bg-slate-100" : ""}`}
                  onClick={() => handleFilterTypeSelect(filterType)}
                >
                  {filterType}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <AnimatePresence>
          <motion.ul
            key={selectedFilterType} // Trigger re-render on filter type change
            initial={{ x: "50%", opacity: 0 }} // Start from the right
            animate={{ x: 0, opacity: 1 }} // Move into view
            transition={{ duration: 0.5 }}
            className="mx-5 my-2 grid auto-rows-min grid-cols-3 gap-4 text-xs"
          >
            {filtersData[selectedFilterType]?.map(({ label, value }, index) => {
              const isChecked =
                filters[selectedFilterType]?.includes(value) || false;

              return (
                <li
                  className="flex items-center gap-2 hover:text-primary"
                  key={index}
                >
                  <input
                    data-testid={`input-checkbox-${value}`}
                    type="checkbox"
                    id={`input-checkbox-${value}`}
                    name={value}
                    className="custom-checkbox"
                    checked={isChecked}
                    onChange={() => handleOptionChange(value)}
                  />
                  <label
                    data-testid={`lbl-checkbox-${value}`}
                    className={`cursor-pointer capitalize ${isChecked ? "font-semibold" : ""}`}
                    htmlFor={`input-checkbox-${value}`}
                  >
                    {label || value}
                  </label>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>

      <footer className="flex justify-between bg-gray-50 px-8 py-4">
        <Button
          data-testid="btn-filter-clear-all"
          variant="clean"
          rounded="none"
          className="p-0 text-xs capitalize text-gray20"
          onClick={handleClearAll}
        >
          Clear all
        </Button>
        <div className="flex space-x-6">
          <Button
            data-testid="btn-filter-clear"
            variant="clean"
            rounded="none"
            className="p-0 text-xs capitalize text-gray20"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            data-testid="btn-filter-done"
            onClick={handleDone}
            className="font-medium capitalize"
            rounded="medium"
          >
            Done
          </Button>
        </div>
      </footer>
    </div>
  );
});

export default OnTheMenuFilter;

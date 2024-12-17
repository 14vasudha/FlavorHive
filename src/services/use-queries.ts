import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  getAllCustomerSupportLinks,
  getAllDiscountedPeopleLinks,
  getCuisineTypes,
  getDietTypes,
  getDishTypes,
  getHealthLabels,
  getHowItWorks,
  getLegalLinks,
  getMealTypes,
  getMealsShippedData,
  getOurVisionScreenDetails,
  getProductsLinks,
  getSignupAdditionalInfo,
  getTeamLinks,
  getTestimonials,
} from "./api";
import { queryClient } from "../App";
import { getHomeMenu, getOnTheMenuData } from "./edamam-api";
import { Filters } from "../types/on-the-menu/on-the-menu-filter";
import { buildUrl } from "./helper-functions";
import { homeRecipeFields } from "../types/types";

const staticDataStaleTime = 300000; // 5 minutes. Data wouldn't change that quickly
// const staticDataStaleTime = 20 * 60000; // 20 minutes. Data wouldn't change that quickly

export const useGetAllCustomerSupportLinks = () => {
  return useQuery({
    queryKey: ["customer support links"],
    queryFn: getAllCustomerSupportLinks,
    refetchOnWindowFocus: false,
  });
};

export const useGetAllDiscountedPeopleLinks = () => {
  return useQuery({
    queryKey: ["heroes links"],
    queryFn: getAllDiscountedPeopleLinks,
    refetchOnWindowFocus: false,
  });
};

export const useGetTeamLinks = () => {
  return useQuery({
    queryKey: ["team links"],
    queryFn: getTeamLinks,
    _optimisticResults: "optimistic",
    refetchOnWindowFocus: false,
  });
};

export const useGetProductsLinks = () => {
  return useQuery({
    queryKey: ["products links"],
    queryFn: getProductsLinks,
    _optimisticResults: "optimistic",
    refetchOnWindowFocus: false,
  });
};

export const useGetLegalLinks = () => {
  return useQuery({
    queryKey: ["legal links"],
    queryFn: getLegalLinks,
    _optimisticResults: "optimistic",
    refetchOnWindowFocus: false,
  });
};

export const useGetOurVisionScreenDetails = async () => {
  return await queryClient.ensureQueryData({
    queryKey: ["our vision"],
    queryFn: getOurVisionScreenDetails,
    revalidateIfStale: true,
  });
};

const useGetTestimonials = async () => {
  return await queryClient.ensureQueryData({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    revalidateIfStale: true,
    staleTime: staticDataStaleTime,
  });
};

const useGetMealsShipped = async () => {
  return await queryClient.ensureQueryData({
    queryKey: ["meals shipped"],
    queryFn: getMealsShippedData,
    revalidateIfStale: true,
    staleTime: staticDataStaleTime,
  });
};

const useGetHowItWorks = async () => {
  return await queryClient.ensureQueryData({
    queryKey: ["how it works"],
    queryFn: getHowItWorks,
    revalidateIfStale: true,
  });
};

const useGetSignupAdditionalInfo = async () => {
  return await queryClient.ensureQueryData({
    queryKey: ["signup additional info"],
    queryFn: getSignupAdditionalInfo,
    revalidateIfStale: true,
  });
};

export const useGetHomeMenu = () => {
  return useQuery({
    queryKey: ["home menu"],
    queryFn: getHomeMenu,
    refetchOnWindowFocus: true,
    staleTime: staticDataStaleTime,
    retry: false,
    placeholderData: keepPreviousData,
  });
};

export const getHomeData = async () => ({
  testimonials: await useGetTestimonials(),
  mealsShipped: await useGetMealsShipped(),
});

export const getSignupData = async () => ({
  howItWorks: await useGetHowItWorks(),
  additionalInfo: await useGetSignupAdditionalInfo(),
});

export const useGetCuisineTypes = () => {
  return useQuery({
    queryKey: ["cuisine types"],
    queryFn: getCuisineTypes,
    staleTime: staticDataStaleTime,
  });
};
export const useGetDietTypes = () => {
  return useQuery({
    queryKey: ["Diet types"],
    queryFn: getDietTypes,
    staleTime: staticDataStaleTime,
  });
};
export const useGetDishTypes = () => {
  return useQuery({
    queryKey: ["Dish types"],
    queryFn: getDishTypes,
    staleTime: staticDataStaleTime,
  });
};
export const useGetHealthLabels = () => {
  return useQuery({
    queryKey: ["Health labels"],
    queryFn: getHealthLabels,
    staleTime: staticDataStaleTime,
  });
};
export const useGetMealTypes = () => {
  return useQuery({
    queryKey: ["Meal types"],
    queryFn: getMealTypes,
    staleTime: staticDataStaleTime,
  });
};

export const useGetOnTheMenuData = (filters: Filters) => {
  filters = {
    ...filters,
    time: ["14-60"],
  };

  const fields = [
    ...homeRecipeFields,
    "source",
    "url",
    "healthLabels",
    "ingredientLines",
    "calories",
    "totalTime",
    "dietLabels",
  ];

  return useInfiniteQuery({
    queryKey: ["on the menu", filters],
    queryFn: ({ pageParam }) => {
      return getOnTheMenuData({ pageParam });
    },
    initialPageParam: buildUrl({ fields, ...filters }),
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, _) => lastPage._links?.next?.href || undefined,
  });
};

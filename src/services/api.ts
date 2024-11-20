import supabase from "../supabaseClient";
import { User } from "../types/types";

export const getAllCustomerSupportLinks = async () => {
  const { data: customerSupportLinks } = await supabase
    .schema("footer_navigation")
    .from("customer_support")
    .select("id, name, type, to, test_id")
    .order("id");

  return customerSupportLinks;
};

export const getAllDiscountedPeopleLinks = async () => {
  const { data: discountedPeopleLinks } = await supabase
    .schema("footer_navigation")
    .from("heroes")
    .select("id, name, to, type, test_id")
    .order("id");
  return discountedPeopleLinks;
};

export const getTeamLinks = async () => {
  const { data: teamLinks } = await supabase
    .schema("footer_navigation")
    .from("team")
    .select("id, name, to, type, test_id")
    .order("id");
  return teamLinks;
};

export const getProductsLinks = async () => {
  const { data: productsLinks } = await supabase
    .schema("footer_navigation")
    .from("product_links")
    .select("id, name, to, type, test_id")
    .order("id");
  return productsLinks;
};

export const getLegalLinks = async () => {
  const { data: legalLinks } = await supabase
    .schema("footer_navigation")
    .from("legal")
    .select("id, name, to, type, test_id")
    .order("id");
  return legalLinks;
};

export const getOurVisionScreenDetails = async () => {
  const { data: ourVisionData } = await supabase
    .schema("our_vision")
    .from("description")
    .select("id, description");
  return ourVisionData;
};

export const getTestimonials = async () => {
  const { data: testimonials } = await supabase
    .schema("home")
    .from("testimonials")
    .select("id, name, description");
  return testimonials;
};

export const getMealsShippedData = async () => {
  const { data: mealsShippedData } = await supabase
    .schema("home")
    .from("meals_shipped")
    .select("id, image, name, description_primary, description_secondary, alt")
    .order("id");
  return mealsShippedData;
};

export const getHowItWorks = async () => {
  const { data: howItWorks } = await supabase
    .schema("sign_up")
    .from("how_it_works")
    .select("id, name, description")
    .order("id");
  return howItWorks;
};

export const getSignupAdditionalInfo = async () => {
  const { data: additionalInfo } = await supabase
    .schema("sign_up")
    .from("additional_info")
    .select("id, name, description")
    .order("id");
  return additionalInfo;
};

export const signUpWithPassword = async (user: User) => {
  const { email, password, name } = user;
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (signUpError) {
    throw signUpError;
  }
  return data;
};

export const signInWithGoogle = async () => {
  const { data, error: signInError } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (signInError) {
    throw signInError;
  }
  return data;
};

export const signInWithApple = async () => {
  const { data, error: signInError } = await supabase.auth.signInWithOAuth({
    provider: "apple",
  });

  if (signInError) {
    throw signInError;
  }
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const signInWithPassword = async (user: User) => {
  const { password, email } = user;
  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    throw signInError;
  }
  return data;
};

export const insertNewsLetterSubscriber = async (email: string) => {
  const { data, error: newsLetterSubscribeError } = await supabase
    .schema("news_letter")
    .from("subscribers")
    .insert({
      email,
    });

  if (newsLetterSubscribeError) {
    if (newsLetterSubscribeError?.message.includes("duplicate")) {
      throw new Error(
        "This email is already in our subscription list. Please enter a different email",
      );
    } else {
      throw newsLetterSubscribeError;
    }
  }

  return data;
};


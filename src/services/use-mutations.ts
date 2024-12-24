import { useMutation } from "@tanstack/react-query";
import {
  insertNewsLetterSubscriber,
  signInWithApple,
  signInWithGoogle,
  signInWithPassword,
  signOut,
  signUpWithPassword,
} from "./api";
import { toast } from "react-toastify";
import { User } from "../types/types";


export const useSignUpWithPassword = () => {
  return useMutation({
    mutationKey: ["signUp", "password"],
    mutationFn: (user: User) => signUpWithPassword(user),
    onSuccess: () => toast.success("Signup successful"),
    onError: (error) => toast.error(error.message),
  });
};

export const useSignInWithGoogle = () => {
  return useMutation({
    mutationKey: ["signIn", "Google"],
    mutationFn: () => signInWithGoogle(),
    onError: (error) => toast.error(error.message),
  });
};

export const useSignInWithApple = () => {
  return useMutation({
    mutationKey: ["signIn", "Apple"],
    mutationFn: () => signInWithApple(),
    onError: (error) => toast.error(error.message),
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => signOut(),
    onError: (error) => toast.error(error.message),
  });
};

export const useSignInWithPassword = () => {
  return useMutation({
    mutationKey: ["signIn", "passoword"],
    mutationFn: (user: User) => signInWithPassword(user),
    onSuccess: () => toast.success("Login successful"),
    onError: (error) => toast.error(error.message),
  });
};

export const useInsertNewsLetterSubscriber = () => {
  return useMutation({
    mutationKey: ["newsLetter", "subscribe"],
    mutationFn: (email: string) => insertNewsLetterSubscriber(email),
    onError: (error) => toast.error(error.message),
    onSuccess: () =>
      toast.success("Successfully added the email to subscribers list"),
  });
};


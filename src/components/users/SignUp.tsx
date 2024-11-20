import { TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { Link, createLazyRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useState } from "react";
import {
  useSignInWithApple,
  useSignInWithGoogle,
  useSignUpWithPassword,
} from "../../services/use-mutations";

import GoogleIcon from "../../assets/google.svg";
import Button from "../Button";
import HowItWorks from "./HowItWorks";
import AdditionalInfo from "./AdditionalInfo";

const SignUp = () => {
  const [isContinue, setIsContinue] = useState<boolean>(false);
  const {
    mutate: signUpWithPasswordMutate,
    isSuccess: isSignUpWithPasswordSuccess,
  } = useSignUpWithPassword();
  const { mutate: signInWithAppleMutate } = useSignInWithApple();
  const { mutate: signInWithGoogleMutate } = useSignInWithGoogle();
  const navigate = useNavigate();

  const onSignUpWithGoogle = async (e: any) => {
    e.preventDefault();
    signInWithGoogleMutate();
  };
  const onSignInWithApple = async (e: any) => {
    e.preventDefault();
    signInWithAppleMutate();
  };
  if (isSignUpWithPasswordSuccess) {
    navigate({ to: "/" });
  }

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),

    onSubmit: async ({ value }) => {
      if (!value.password && !isContinue) {
        setIsContinue(true);
        return;
      }

      if (value.email && value.password) {
        signUpWithPasswordMutate(value);
      }
    },
  });
  return (
    <>
      <div className="container mx-auto max-w-[1440px] bg-cover bg-scroll bg-[50%] bg-no-repeat md:mb-10 md:bg-sign-up md:px-32 md:py-20 lg:mt-10">
        <div className="mx-auto space-y-4 bg-white px-2 py-10 md:max-w-[900px] lg:px-10">
          <div className="flex flex-col text-center">
            <h1
              className="mb-2 text-3xl font-bold text-primary"
              data-testid="text-sign-up-header"
            >
              Let's get cooking
            </h1>
            <h2 className="text-sm font-medium md:mx-4 lg:text-base">
              Enjoy delicious recipes and pre-made meals with quality
              ingredients.
            </h2>
          </div>
          <section className="grid grid-rows-2 gap-8 lg:grid-cols-2 lg:grid-rows-1">
            <div className="order-last -mt-44 lg:order-none lg:mt-0">
              <HowItWorks />
            </div>
            <div className="space-y-2 px-8 md:px-0">
              <section className="text-center text-sm">
                Already have an account?
                <Link
                  data-testid="link-sign-in"
                  to="/users/sign-in"
                  className="ml-2 inline-grid grid-cols-2 items-center gap-[0.1rem] font-extrabold text-primary hover:text-primary hover:underline"
                >
                  <span>Sign in</span>
                  <ChevronRight size="12" className="text-primary" />
                </Link>
              </section>
              <form
                className="mx-auto max-w-96 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Field
                  name="name"
                  validators={{
                    onChange: z
                      .string()
                      .min(1, "Name is required")
                      .min(3, "Name should be minimum 3 characters long"),
                  }}
                  children={({ state, handleChange, handleBlur }) => (
                    <TextField
                      id="name"
                      size="small"
                      label="Name"
                      variant="outlined"
                      defaultValue={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter name"
                      margin="dense"
                      fullWidth
                      error={!!state.meta.errors?.length}
                      helperText={
                        state.meta.errors[0]?.toString().split(",").length === 1
                          ? state.meta.errors
                          : state.meta.errors[0]?.toString().split(",")[0]
                      }
                    />
                  )}
                />
                <Field
                  name="email"
                  validators={{
                    onSubmit: z.string().email("Invalid email address"),
                  }}
                  children={({ state, handleChange, handleBlur }) => (
                    <TextField
                      id="email"
                      size="small"
                      label="Email"
                      variant="outlined"
                      defaultValue={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter email"
                      margin="dense"
                      fullWidth
                      error={!!state.meta.errors?.length}
                      helperText={
                        state.meta.errors[0]?.toString().split(",").length === 1
                          ? state.meta.errors
                          : state.meta.errors[0]?.toString().split(",")[0]
                      }
                    />
                  )}
                />
                <h2 className="mt-2 px-4 text-center text-[12px] font-normal leading-5">
                  By continuing, you agree to our&nbsp;
                  <Link
                    data-testid="link-terms-of-use"
                    to="/pages/terms"
                    className="text-header-primary underline hover:text-header-primary"
                  >
                    Terms of Use
                  </Link>
                  &nbsp;and consent to our&nbsp;
                  <Link
                    data-testid="link-privacy-policy"
                    to="/pages/privacy"
                    className="text-header-primary underline hover:text-header-primary"
                  >
                    Privacy Policy
                  </Link>
                </h2>

                {isContinue && (
                  <Field
                    name="password"
                    validators={{
                      onChange: z
                        .string()
                        .min(1, "Password is required")
                        .min(6, "Password should be minimum 6 characters"),
                    }}
                    children={({ state, handleChange, handleBlur }) => (
                      <TextField
                        id="password"
                        type="password"
                        size="small"
                        label="Password"
                        variant="outlined"
                        defaultValue={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        placeholder="Enter password"
                        margin="normal"
                        fullWidth
                        error={!!state.meta.errors?.length}
                        helperText={
                          state.meta.errors[0]?.toString().split(",").length ===
                          1
                            ? state.meta.errors
                            : state.meta.errors[0]?.toString().split(",")[0]
                        }
                      />
                    )}
                  />
                )}

                <Subscribe
                  selector={(state) => [
                    state.values.email && state.values.password,
                    state.canSubmit,
                    state.isSubmitting,
                    state.isTouched,
                  ]}
                  children={() => (
                    <div className="space-y-2 lg:space-y-4">
                      <Button
                        type="submit"
                        data-testid="btn-submit"
                        size="full"
                        variant="default"
                      >
                        {isContinue ? "Sign Up" : "Continue"}
                      </Button>
                      <div className="text-center text-[12px] font-bold tracking-wider text-black10">
                        OR
                      </div>
                      <Button
                        data-testid="btn-apple"
                        size="full"
                        display="flex"
                        variant="apple"
                        className="text-sm normal-case"
                        onClick={onSignInWithApple}
                      >
                         Sign in with Apple
                      </Button>
                      <Button
                        data-testid="btn-google"
                        size="full"
                        display="flex"
                        variant="google"
                        onClick={onSignUpWithGoogle}
                      >
                        <GoogleIcon />
                        <span className="text-sm font-medium normal-case">
                          Sign up with Google
                        </span>
                      </Button>
                    </div>
                  )}
                />
              </form>
            </div>
          </section>
        </div>
      </div>
      <AdditionalInfo />
    </>
  );
};

export default SignUp;

export const Route = createLazyRoute("/users/sign-up")({
  component: SignUp,
});

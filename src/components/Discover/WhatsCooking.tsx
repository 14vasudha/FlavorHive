import {
  FacebookRounded,
  Instagram,
  Pinterest,
  YouTube,
} from "@mui/icons-material";
import Button from "../Button";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useInsertNewsLetterSubscriber } from "../../services/use-mutations";

const WhatsCooking = () => {
  const icons = [
    {
      name: "instagram",
      to: "https://www.instagram.com/blueapron/",
      icon: (
        <Instagram
          sx={{ width: "100%", height: "100%", color: "rgb(177, 181, 189)" }}
        />
      ),
    },
    {
      name: "facebook",
      to: "https://www.facebook.com/BlueApron/",
      icon: (
        <FacebookRounded
          sx={{ width: "100%", height: "100%", color: "rgb(177, 181, 189)" }}
        />
      ),
    },
    {
      name: "pinterest",
      to: "https://in.pinterest.com/blueapron/",
      icon: (
        <Pinterest
          sx={{ width: "100%", height: "100%", color: "rgb(177, 181, 189)" }}
        />
      ),
    },
    {
      name: "youtube",
      to: "https://www.youtube.com/@Blueapron",
      icon: (
        <YouTube
          sx={{ width: "100%", height: "100%", color: "rgb(177, 181, 189)" }}
        />
      ),
    },
  ];

  const { mutate } = useInsertNewsLetterSubscriber();
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: ({ value }) => mutate(value.email),
  });

  return (
    <section
      id="whats-cooking"
      className="bg-gray30 pb-4 shadow-inner lg:grid lg:grid-flow-col lg:justify-evenly"
    >
      <div id="follow-us" className="p-5 lg:border-r-2 lg:border-gray-200">
        <h3
          data-testid="text-follow-us"
          className="hidden text-center text-sm font-medium uppercase tracking-widest text-black10 md:block"
        >
          Follow Us
        </h3>
        <ul className="grid list-none grid-flow-col justify-center">
          {icons.map(({ icon, to, name }, index) => (
            <li
              key={index}
              className="mx-4 my-3 rounded-lg py-2 transition-all duration-200 ease-in md:p-1 md:hover:bg-gray-200"
            >
              <a
                aria-label={name}
                data-testid={`link-external-${name}`}
                href={to}
                target="_blank"
                className="flex size-8 justify-center"
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div
        id="newsletter-signup"
        className="mx-auto max-w-80 text-center md:space-y-4 lg:max-w-96 lg:p-5"
      >
        <h3
          data-testid="text-discover-whats-cookin"
          className="hidden text-center text-sm font-medium uppercase tracking-widest text-black10 md:block"
        >
          Discover what's cookin'
        </h3>
        <form
          className="grid grid-flow-col grid-cols-[80%,1fr]"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <Field
            name="email"
            validators={{
              onBlur: z.string().email("Invalid email address"),
            }}
            children={({ state, handleBlur, handleChange }) => {
              return (
                <div className="flex flex-col space-y-2">
                  <input
                    id="input-newsletter-signup"
                    placeholder="email"
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    defaultValue={state.value}
                    className={`rounded-l border border-r-0 px-4 py-2 ${state.meta?.errors?.length && state.value.length ? "border-input-error" : "border-gray-300"}`}
                  />
                  {state.meta?.errors?.length && state.value.length ? (
                    <em
                      data-testid="error-validation-email"
                      role="alert"
                      className="text-sm font-medium text-input-error"
                    >
                      {state.meta.errors.join(", ")}
                    </em>
                  ) : null}
                </div>
              );
            }}
          />
          <Button
            data-testid="btn-go"
            variant="default"
            type="submit"
            className="h-[42px] rounded-none rounded-r bg-blue60"
          >
            Go
          </Button>
        </form>
        <aside
          data-testid="info-offers"
          className="mt-4 align-baseline text-sm font-normal leading-relaxed text-header-primary md:mt-0"
        >
          Sign up for offers, recipes, news, & more (subscribers to the Blue
          Apron recipe newsletter agree to our Privacy Policy)
        </aside>
      </div>
      <div
        id="blog-preview"
        className="hidden p-5 md:block lg:border-l-2 lg:border-gray-200"
      >
        <h3
          data-testid="text-from-the-blog"
          className="hidden text-center text-sm font-medium uppercase tracking-widest text-black10 md:block"
        >
          From the blog
        </h3>
        <div className="text-center">Blog Image and link will go here</div>
      </div>
    </section>
  );
};

export default WhatsCooking;

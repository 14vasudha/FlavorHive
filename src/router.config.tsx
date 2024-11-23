import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import {
  getHomeData,
  getSignupData,
  useGetOurVisionScreenDetails,
} from "./services/use-queries";
import DefaultLayout from "./components/layout/DefaultLayout";

const rootRoute = createRootRoute({
  errorComponent: () => <>There was an error</>,
  component: DefaultLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: getHomeData,
}).lazy(() => import("./components/Home/Home").then((d) => d.Route));

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

const pagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "pages",
});

const termsRoute = createRoute({
  getParentRoute: () => pagesRoute,
  path: "terms",
  component: () => <div>Your terms come up here</div>,
});

const privacyRoute = createRoute({
  getParentRoute: () => pagesRoute,
  path: "privacy",
  component: () => <div>Your privacy conditions load here</div>,
});

const visionRoute = createRoute({
  getParentRoute: () => pagesRoute,
  path: "vision",
  loader: useGetOurVisionScreenDetails,
}).lazy(() =>
  import("./components/company-pages/OurVision").then((d) => d.Route),
);

const blogRoute = createRoute({
  getParentRoute: () => pagesRoute,
  path: "blog",
  component: () => <p>Blogs are being written!!</p>,
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "users",
  component: () => <p>Dummy users</p>,
}).lazy(() => import("./pages/UsersPage").then((d) => d.Route));

const signInRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: "sign-in",
}).lazy(() => import("./components/users/LogIn").then((d) => d.Route));

const signUpRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: "sign-up",
  loader: getSignupData,
}).lazy(() => import("./components/users/SignUp").then((d) => d.Route));

const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "on-the-menu",
  component: () => <p>We are building the menu. Please visit later</p>,
});

const helpCenterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "help-center",
  component: function About() {
    return <div className="p-2">Help Center coming up here</div>;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  helpCenterRoute,
  menuRoute,
  pagesRoute.addChildren([visionRoute, blogRoute, termsRoute, privacyRoute]),
  usersRoute.addChildren([signInRoute, signUpRoute]),
]);

export const router = createRouter({
  routeTree,
  notFoundMode: "fuzzy",
  defaultPreload: "intent",
  defaultPreloadStaleTime: 10000,
  defaultNotFoundComponent: () => {
    return (
      <p className="flex w-screen justify-center align-middle">
        This screen is being developed! Stay tuned 🤓
      </p>
    );
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

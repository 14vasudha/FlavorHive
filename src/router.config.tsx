import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import DefaultLayoutPage from "./pages/DefaultLayoutPage";

const rootRoute = createRootRoute({
  errorComponent: () => <>There was an error</>,
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return <DefaultLayoutPage />;
  },
});

const aboutRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

const pagesRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: "/pages",
});

const visionRoute = createRoute({
  getParentRoute: () => pagesRoute,
  path: "/vision",
  component: function Vision() {
    return <p>This is our vision</p>;
  },
});

const helpCenterRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: "/help-center",
  component: function About() {
    return <div className="p-2">Help Center coming up here</div>;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  helpCenterRoute,
  pagesRoute.addChildren([visionRoute]),
]);

export const router = createRouter({
  routeTree,
  notFoundMode: "fuzzy",
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

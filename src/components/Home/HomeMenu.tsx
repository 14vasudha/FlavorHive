import { Link } from "@tanstack/react-router";
import { useGetHomeMenu } from "../../services/use-queries";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";

const HomeMenu = () => {
  const { data: homeMenu, isPending, isError } = useGetHomeMenu();

  const loadRecipes = () => {
    if (isPending) {
      return <Loader />;
    } else if (isError) {
      toast.error("Failed to fetch Recipes");
      return (
        <p className="m-10">
          We failed to fetch the recipes. Please reload or navigate to the menu
          screen.
        </p>
      );
    } else {
      return (
        <ul className="grid max-w-full grid-cols-custom-10 gap-x-4 gap-y-10 overflow-x-auto px-4 py-8 lg:grid-cols-5 lg:gap-x-6 xl:gap-x-8 xl:px-10">
          {Object.values(homeMenu).map(
            ({ recipe: { label, image, images }, selector }, index) => {
              const menuTitle = Object.keys(homeMenu)[index];
              return (
                <li key={index} className="flex shrink-0 flex-col gap-4">
                  <Link
                    data-testid={`link-home-menu-${menuTitle}`}
                    to="/on-the-menu"
                    search={{
                      [selector]: menuTitle,
                    }}
                  >
                    <img
                      data-testid={`img-home-menu-${menuTitle}`}
                      src={image}
                      srcSet={`${images.SMALL.url} 640w, ${images.REGULAR.url} 1024w, ${images.LARGE?.url ?? images.REGULAR.url} 1280w`}
                      alt={label}
                      className="h-48 w-full rounded-md xl:h-auto"
                    />
                  </Link>

                  <div className="space-y-2">
                    <p
                      data-testid={`text-home-menu-title-${menuTitle}`}
                      className="text-[13px] font-bold uppercase tracking-[1.3px] text-blue70 lg:text-sm"
                    >
                      {menuTitle}
                    </p>
                    <p className="text-sm font-medium leading-tight text-primary-info lg:text-base">
                      {label}
                    </p>
                  </div>
                </li>
              );
            },
          )}
        </ul>
      );
    }
  };

  return (
    <section
      id="home-menu"
      className="flex flex-col items-center justify-center text-center"
    >
      <h2
        data-testid="text-home-menu-choose"
        className="text-2xl font-semibold uppercase tracking-[5.4px] text-primary lg:text-4xl"
      >
        Choose from
      </h2>
      <h2
        data-testid="text-home-menu-weekly-options"
        className="mt-2 font-chronicle text-4xl font-semibold text-blue-info lg:text-5xl"
      >
        100+ weekly options
      </h2>
      {loadRecipes()}
      <Link
        data-testid="link-home-menu-browse-menu"
        to="/on-the-menu"
        className="w-64 rounded-3xl border-2 border-primary py-3 uppercase tracking-[2.5px] text-primary hover:no-underline"
      >
        Browse our menus
      </Link>
    </section>
  );
};

export default HomeMenu;

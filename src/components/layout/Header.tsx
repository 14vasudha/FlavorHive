import img from "../../assets/favicon_package_v0.16/android-chrome-192x192.png";
import { Link } from "@tanstack/react-router";
import supabase from "../../supabaseClient";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Logout } from "@mui/icons-material";
import { useSignOut } from "../../services/use-mutations";
import Button from "../Button";

const Header = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { mutate: signOutMutate } = useSignOut();
  const onSignout = () => {
    signOutMutate();
  };

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
  };

  useEffect(() => {
    getSession();
    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => setSession(session),
    );

    // Cleanup the subscription when the component unmounts
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav
      id="header"
      className="fixed left-0 right-0 z-10 flex max-h-20 w-full bg-slate-100 p-2 text-[10px] md:text-xs lg:p-4 lg:text-sm"
    >
      <Link to="/" data-testid="header-home">
        <img
          src={img}
          height="40"
          width="40"
          title="FlavorHive"
          alt="FlavourHive icon"
          className="rounded-full"
        />
      </Link>
      <section className="mx-8 grid w-full auto-cols-auto grid-cols-3 items-center font-normal uppercase tracking-widest text-header-primary md:grid-cols-2">
        <div className="col-span-2 md:col-auto">
          <Link
            data-testid="header-on-the-menu"
            to="/on-the-menu"
            className="px-3 py-2 hover:text-primary lg:px-3 lg:py-3"
            activeProps={{
              className: "text-primary",
            }}
          >
            on the menu
          </Link>
          <Link
            data-testid="header-our-vision"
            to="/pages/vision"
            className="px-3 py-2 hover:text-primary lg:px-3 lg:py-3"
            activeProps={{
              className: "text-primary",
            }}
          >
            our vision
          </Link>
          <Link
            to="/pages/blog"
            className="px-3 py-2 hover:text-primary lg:px-3 lg:py-3"
            activeProps={{
              className: "text-primary",
            }}
          >
            blog
          </Link>
        </div>
        <div className="col-span-1 flex items-center justify-self-end md:col-auto">
          {session?.user.user_metadata.name || session?.user.email ? (
            <span
              data-testid="text-welcome"
              className="mr-2 inline-block normal-case"
            >
              Welcome {session?.user.user_metadata.name || session?.user.email}!
            </span>
          ) : (
            <Link
              data-testid="link-header-login"
              to="/users/sign-in"
              className="px-3 py-2 hover:text-primary lg:px-3 lg:py-3"
              activeProps={{
                className: "text-primary",
              }}
            >
              Login
            </Link>
          )}

          {!session ? (
            <Link
              data-testid="link-header-sign-up"
              className="rounded-md border border-orange-600 bg-header-login-link px-2 py-2 font-bold text-white hover:border-orange-500 hover:bg-header-login-link-hover hover:text-white hover:no-underline active:bg-header-login-link-active lg:px-3 lg:py-3"
              to="/users/sign-up"
              activeProps={{
                className: "text-gray-100 bg-header-login-link-active",
              }}
            >
              Sign up
            </Link>
          ) : (
            <Button
              data-testid="btn-logout"
              type="button"
              display="flex"
              variant="icon"
              onClick={onSignout}
            >
              <Logout />
            </Button>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Header;

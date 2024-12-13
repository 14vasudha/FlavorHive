import { createLazyRoute } from "@tanstack/react-router";
import OnTheMenuHeader from "../components/on-the-menu/OnTheMenuHeader";

const OnTheMenuPage = () => {
  return (
    <section id="on-the-menu">
      <OnTheMenuHeader />
      <div className="h-96"></div>
    </section>
  );
};

export default OnTheMenuPage;

export const Route = createLazyRoute("/on-the-menu")({
  component: OnTheMenuPage,
});

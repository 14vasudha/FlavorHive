import { useLoaderData } from "@tanstack/react-router";
import ChooseMealIcon from "../../assets/signup/how-it-works/choose-meal.svg";
import EnjoyMealIcon from "../../assets/signup/how-it-works/enjoy-meal.svg";
import ReceiveMealIcon from "../../assets/signup/how-it-works/receive-meal.svg";

const HowItWorks = () => {
  const icons = [
    <ChooseMealIcon data-testid="icon-how-it-works-choose-meal" />,
    <ReceiveMealIcon data-testid="icon-how-it-works-receive-meal" />,
    <EnjoyMealIcon data-testid="icon-how-it-works-enjoy-meal" />,
  ];
  const { howItWorks: howItWorksDetails } = useLoaderData({
    from: "/users/sign-up",
  });

  return (
    <section className="mx-auto flex max-w-96 flex-col justify-center space-y-7">
      <h3
        data-testid={`text-how-it-works-header`}
        className="text-center text-sm font-bold uppercase leading-4 tracking-wider lg:text-left"
      >
        how it works
      </h3>

      <div className="flex flex-col items-center justify-center gap-10 lg:justify-start">
        {howItWorksDetails &&
          howItWorksDetails.map(({ name, description }, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:items-start lg:justify-start lg:gap-6"
              >
                {icons[index]}
                <div className="space-y-2 text-center lg:text-left">
                  <h4
                    data-testid={`text-how-it-works-sub-header-${index}`}
                    className="font-semibold"
                  >
                    {name}
                  </h4>
                  <p
                    data-testid={`text-how-it-works-description-${index}`}
                    className="max-w-64 text-sm text-header-primary"
                  >
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default HowItWorks;

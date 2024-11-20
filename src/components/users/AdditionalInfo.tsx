import NoCommitmentIcon from "../../assets/signup/additional-info/no-commitment.svg";
import PersonalizedMenusIcon from "../../assets/signup/additional-info/personalized-menus.svg";
import ConvenientDeliveryIcon from "../../assets/signup/additional-info/convenient-delivery.svg";
import { useLoaderData } from "@tanstack/react-router";

const AdditionalInfo = () => {
  const icons = [
    <NoCommitmentIcon data-testid="icon-additional-info-no-commitment" />,
    <PersonalizedMenusIcon data-testid="icon-additional-info-personalized-menus" />,
    <ConvenientDeliveryIcon data-testid="icon-additional-info-convenient-delivery" />,
  ];

  const { additionalInfo } = useLoaderData({ from: "/users/sign-up" });

  return (
    <section
      id="signup-additional-info"
      className="max-w-[900px] bg-white pb-6 md:mx-auto md:pb-10"
    >
      <ul className="flex list-none flex-col items-center gap-8 md:mx-2 md:flex-row md:items-center md:justify-center">
        {additionalInfo &&
          additionalInfo.map(({ name, description }, index) => {
            return (
              <li
                key={index}
                className="mx-6 flex min-h-32 max-w-72 flex-col items-center gap-3 text-center md:mx-0"
              >
                <div
                  className={` ${index === 1 ? "w-10 pt-5 md:pt-0 lg:pt-5" : "w-[34px]"} `}
                >
                  {icons[index]}
                </div>

                <h3
                  data-testid={`text-additional-info-sub-header-${index}`}
                  className="text-sm font-semibold"
                >
                  {name}
                </h3>
                <p
                  data-testid={`text-additional-info-description-${index}`}
                  className="text-sm text-header-primary"
                >
                  {description}
                </p>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default AdditionalInfo;

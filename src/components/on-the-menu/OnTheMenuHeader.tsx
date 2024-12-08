const OnTheMenuHeader = () => {
  return (
    <article className="flex flex-col items-center gap-2 pt-10">
      <h2
        data-testid="text-explore-menu"
        className="font-chronicle text-2xl font-bold tracking-[0.32px] text-primary md:text-3xl"
      >
        Explore our meal delivery menu
      </h2>
      <p
        data-testid="text-order-more"
        className="text-center tracking-[0.18px] text-black10 lg:text-lg"
      >
        <span className="font-bold text-blue-info">
          Select any meal or number of servings
        </span>
        —the more you order, the more you save.
      </p>
    </article>
  );
};

export default OnTheMenuHeader;

const Ratings = () => {
  return (
    <section
      id="ratings"
      className="flex items-center justify-center gap-6 bg-gray30 px-2 py-4 text-center font-bold lg:space-x-16"
    >
      <span className="max-w-48 leading-snug md:max-w-96 md:text-2xl lg:max-w-fit">
        Our customers think we're&nbsp;
        <span
          data-testid="text-home-ratings-customer-thought"
          className="text-lg uppercase text-blue-info md:text-2xl"
        >
          Excellent
        </span>
      </span>
      <div className="space-y-1 md:space-y-2">
        <div className="flex items-center justify-center gap-2">
          <img
            data-testid="img-home-ratings"
            height="24"
            src="https://media.blueapron.com/assets/registration/homepage/appstore_ratings_icon.svg"
            alt="app-rating"
            loading="lazy"
            className="h-6"
          />
          <span data-testid="text-home-ratings-app-rating" className="text-2xl">
            4.7
          </span>
        </div>
        <p className="text-sm font-normal">
          <span
            data-testid="text-home-ratings-based-on"
            className="hidden md:inline-block"
          >
            Based on&nbsp;
          </span>
          <strong data-testid="text-home-ratings-total-ratings">40k</strong>
          &nbsp;App Store Ratings
        </p>
      </div>
    </section>
  );
};

export default Ratings;

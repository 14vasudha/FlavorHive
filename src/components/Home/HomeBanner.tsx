import Button from "../Button";

const HomeBanner = () => {
  return (
    <section
      id="banner"
      className="mx-4 grid max-w-[1120px] grid-rows-2 md:grid-cols-[40%,1fr] md:grid-rows-1 lg:mx-auto"
    >
      <div className="max-h-52 overflow-hidden border md:relative md:order-last md:max-h-none">
        <img
          data-testid="img-home-banner-sm"
          loading="lazy"
          alt="A box containing prepared and ready meals"
          className="align-middle md:hidden"
          src="https://media.blueapron.com/assets/registration/homepage/CMO_Website_Banner_GIF.gif?width=800&quality=90"
        />
        <img
          data-testid="img-home-banner"
          loading="lazy"
          alt="A box containing prepared and ready meals"
          className="hidden h-full w-full md:block"
          src="https://media.blueapron.com/assets/registration/homepage/CMO_Website_Banner_GIF.gif?width=800&quality=90"
        />
      </div>
      <div className="flex flex-col justify-center space-y-3 bg-primary p-4 text-white">
        <h1
          data-testid="text-home-banner-savings-info"
          className="text-lg font-bold"
        >
          Save up to $4 per serving
        </h1>
        <p className="text-base text-blue40">
          Enjoy{" "}
          <span className="font-bold text-white">unlimited menu access </span>to
          100+ weekly options. The more you order, the more you save!
        </p>
        <Button
          type="button"
          variant="white"
          rounded="triplexl"
          data-testid="btn-home-banner-see-plans"
        >
          See Plans
        </Button>
      </div>
    </section>
  );
};

export default HomeBanner;

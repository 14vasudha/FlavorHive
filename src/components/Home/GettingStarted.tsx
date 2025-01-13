import Button from "../Button";

const GettingStarted = () => {
  return (
    <section id="getting-started" className="relative overflow-hidden">
      <img
        data-testid="img-home-getting-started"
        src="https://media.blueapron.com/assets/registration/homepage/gnocchi-ingredients.webp?height=400&quality=90"
        alt="ba chef"
        loading="lazy"
        width="1208"
        height="343"
        className="relative left-1/2 h-full min-w-[900px] -translate-x-1/2"
      />
      <div className="absolute left-1/2 top-1/2 flex h-44 w-80 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-y-4 rounded-md bg-white py-6 md:h-48 md:w-[400px] lg:h-56 lg:w-[550px] lg:py-10">
        <div className="text-center">
          <p className="font-chronicle text-2xl font-bold text-blue70 md:text-3xl">
            Get started now
          </p>
          <p className="text-primary-info md:text-lg">
            for as little as{" "}
            <span
              data-testid="text-home-getting-started-price-per-serving"
              className="font-bold text-blue-info"
            >
              $7.99 per serving
            </span>
          </p>
        </div>
        <Button
          data-testid="btn-home-getting-started-see-plans"
          className="h-12 w-60 text-base tracking-[2.5px]"
          rounded="triplexl"
        >
          See Plans
        </Button>
      </div>
    </section>
  );
};

export default GettingStarted;

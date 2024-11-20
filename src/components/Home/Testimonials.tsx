import { useLoaderData } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const Testimonials = () => {
  const { testimonials } = useLoaderData({ from: "/" }) || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % (testimonials ? testimonials.length : 0),
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [testimonials]);

  return (
    <section
      id="testimonials"
      className="relative max-h-[536px] min-h-[416px] overflow-hidden"
    >
      <img
        data-testid="img-home-testimonials-background"
        src="https://media.blueapron.com/assets/registration/homepage/cooking-pot.webp?height=600&quality=90"
        alt="testimonials background image"
        loading="lazy"
        className="h-full w-full min-w-[1200px]"
      />
      <div className="absolute left-1/2 top-1/2 max-w-[614px] -translate-x-1/2 -translate-y-1/2 space-y-4 overflow-hidden rounded-md bg-white lg:space-y-6">
        <img
          data-testid="img-home-testimonials-texture-pattern"
          src="https://media.blueapron.com/assets/registration/homepage/texture-pattern.webp?height=20&quality=90"
          alt="texture-pattern"
          loading="lazy"
          className="h-5"
        />
        <div className="flex flex-col items-center space-y-4 px-4 pb-6 lg:px-2 lg:pb-10">
          <p
            data-testid="text-home-testimonials-happy-customers"
            className="text-sm font-bold text-blue-info md:text-base lg:text-xl"
          >
            Celebrating 10 years of happy customers
          </p>
          <p className="min-w-80 max-w-[509px] px-2 text-center font-chronicle text-lg font-black text-blue70 lg:px-8 lg:pb-2 lg:text-2xl">
            {testimonials![currentIndex]?.description}
          </p>
          <div className="h-1 w-24 bg-blue-info"></div>
          <p className="text-sm font-bold uppercase tracking-[2.4px] text-blue70 lg:pt-2">
            — {testimonials![currentIndex]?.name}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

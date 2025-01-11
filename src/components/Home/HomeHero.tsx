import heroImg640 from "../../assets/home/hero/desktop/home-header-640.webp";
import heroImg750 from "../../assets/home/hero/desktop/home-header-750.webp";
import heroImg828 from "../../assets/home/hero/desktop/home-header-828.webp";
import heroImg1080 from "../../assets/home/hero/desktop/home-header-1080.webp";
import heroImg1200 from "../../assets/home/hero/desktop/home-header-1200.webp";
import heroImg1920 from "../../assets/home/hero/desktop/home-header-1920.webp";
import heroImg2048 from "../../assets/home/hero/desktop/home-header-2048.webp";
import heroImg3840 from "../../assets/home/hero/desktop/home-header-3840.webp";

import heroImgMobile640 from "../../assets/home/hero/mobile/home-hero-mobile-640.webp";
import heroImgMobile750 from "../../assets/home/hero/mobile/home-hero-mobile-750.webp";
import heroImgMobile828 from "../../assets/home/hero/mobile/home-hero-mobile-828.webp";
import heroImgMobile1080 from "../../assets/home/hero/mobile/home-hero-mobile-1080.webp";
import heroImgMobile1200 from "../../assets/home/hero/mobile/home-hero-mobile-1200.webp";
import heroImgMobile1920 from "../../assets/home/hero/mobile/home-hero-mobile-1920.webp";

import Button from "../Button";

const HomeHero = () => {
  return (
    <section id="hero" className="relative block h-96 overflow-hidden">
      <figure>
        <img
          data-testid="img-home-hero"
          alt="A spread of FlavorHive meals and ingredients"
          decoding="async"
          className="absolute inset-0 hidden h-full w-full max-w-full object-cover md:inline-block"
          sizes="100vw"
          src={heroImg1920}
          srcSet={`${heroImg640} 640w, ${heroImg750} 750w, ${heroImg828} 828w, ${heroImg1080} 1080w, ${heroImg1200} 1200w, ${heroImg1920} 1920w, ${heroImg2048} 2048w, ${heroImg3840} 3840w`}
        ></img>
        <img
          data-testid="img-home-hero-sm"
          alt="A spread of FlavorHive meals and ingredients"
          decoding="async"
          className="absolute inset-0 h-full w-full max-w-full object-cover md:hidden"
          sizes="100vw"
          src={heroImgMobile1920}
          srcSet={`${heroImgMobile640} 640w, ${heroImgMobile750} 750w, ${heroImgMobile828} 828w, ${heroImgMobile1080} 1080w, ${heroImgMobile1200} 1200w, ${heroImgMobile1920} 1920w`}
        ></img>
      </figure>
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/3 md:left-[3%] md:top-2/4 md:-translate-y-2/4 md:translate-x-0">
        <h2
          data-testid="text-home-hero"
          className="max-w-[440px] text-center font-chronicle text-3xl font-semibold text-primary md:text-left md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[40px] 2xl:leading-snug"
        >
          Easy meal kits. <br />
          Quality ingredients.
          <br />
          Delivered to your door.
        </h2>
        <Button
          data-testid="btn-home-hero-see-plans"
          rounded="triplexl"
          className="mx-auto mt-4 px-4 py-2 md:mx-0 xl:mt-5 xl:px-5 xl:py-3 2xl:mt-8 2xl:px-7 2xl:py-4"
        >
          See Plans
        </Button>
      </div>
    </section>
  );
};

export default HomeHero;

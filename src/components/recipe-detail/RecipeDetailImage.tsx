import { useState } from "react";
import { RecipeImages } from "../../types/home";

type RecipeDetailImageProps = {
  image: string;
  images: RecipeImages;
  label: string;
  totalTime: number;
  matchingLabels: string[];
};

const RecipeDetailImage = ({
  image,
  images,
  label,
  matchingLabels,
  totalTime,
}: RecipeDetailImageProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  return (
    <article className="bg-white pb-4 lg:pb-0">
      <figure className="relative mx-auto w-8/12 overflow-hidden lg:w-11/12 lg:rounded-md">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <svg
              className="h-10 w-10 animate-spin text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0116 0H4z"
              ></path>
            </svg>
          </div>
        )}
        <img
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
          src={image}
          data-testid={`img-on-the-menu-recipe-detail`}
          srcSet={`${images.SMALL.url} 640w, ${images.REGULAR.url} 1024w, ${images.LARGE?.url ?? images.REGULAR.url} 1280w`}
          alt={label}
          className={`w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105 lg:object-contain ${
            isImageLoading
              ? "-translate-y-10 opacity-0 lg:translate-y-20" // Start 20px down and invisible
              : "translate-y-0 opacity-100" // Animate up to 0 position and visible
          }`}
        />
        {(totalTime <= 15 || !!matchingLabels.length) && (
          <figcaption className="absolute bottom-2 rounded-r bg-primary px-2 py-2 text-sm font-bold uppercase leading-4 tracking-widest text-white">
            {totalTime <= 15
              ? `15 MIN MEAL`
              : matchingLabels[
                  Math.floor(Math.random() * matchingLabels.length)
                ]
                  .split("-")
                  .join(" ")}
          </figcaption>
        )}
      </figure>
    </article>
  );
};

export default RecipeDetailImage;

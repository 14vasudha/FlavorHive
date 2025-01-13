import { Link } from "@tanstack/react-router";
import { LoremIpsum } from "lorem-ipsum";

const RecipeDetailDescription = () => {
  const loremText = new LoremIpsum({
    sentencesPerParagraph: {
      max: 6,
      min: 4,
    },
    wordsPerSentence: {
      max: 10,
      min: 5,
    },
  }).generateParagraphs(1);

  return (
    <article className="grid gap-y-2 border-y border-gray40 bg-white px-2 py-10 leading-8 text-info10 md:px-10 lg:border-none lg:px-0 lg:py-0">
      <header>
        <h2 className="text-lg font-semibold text-black20">
          From the Test Kitchen
        </h2>
      </header>
      <p data-testid={`text-on-the-menu-recipe-detail-lorem-description`}>
        {loremText}
      </p>
      <Link
        data-testid={`link-on-the-menu-recipe-detail-see-plans`}
        className="w-fit rounded-md border border-orange-600 bg-header-login-link px-5 py-2 font-bold text-white hover:border-orange-500 hover:bg-header-login-link-hover hover:text-white hover:no-underline active:bg-header-login-link-active lg:px-6 lg:py-3"
      >
        See Plans
      </Link>
    </article>
  );
};

export default RecipeDetailDescription;

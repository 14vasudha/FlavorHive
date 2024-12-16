import { useEffect, useRef, useState } from "react";
import OnTheMenuFilter from "./OnTheMenuFilter";
import { ArrowDropDown } from "@mui/icons-material";
import Button from "../Button";
import { Filters } from "../../types/on-the-menu/on-the-menu-filter";

interface Props {
  setAppliedFilters: React.Dispatch<React.SetStateAction<Filters | null>>;
}

const OnTheMenuHeader = ({ setAppliedFilters }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isInView, setIsInView] = useState(false);
  const targetRef = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null); // Reference for the modal
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    }

    // Attach event listener when modal is open
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const toggleModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <article
        ref={targetRef}
        className="flex flex-col items-center gap-2 pt-10"
      >
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
      {!isInView && (
        <div
          id="search-filters"
          className="sticky top-12 z-10 bg-slate-50 lg:top-[4.5rem]"
        >
          <div className="relative flex h-10 justify-center py-2">
            <p rel="search-filters" className="flex items-center">
              <span
                data-testid="text-filter-header-text"
                className="text-[10px] uppercase tracking-wider text-black20"
              >
                Refine search
              </span>
              <Button
                data-testid="btn-toggle-filter-modal"
                ref={buttonRef}
                variant="icon"
                className={`h-fit w-fit transform p-0 text-primary transition-transform duration-200 hover:bg-transparent focus:outline-none ${!isModalOpen ? "rotate-0" : "-rotate-180"}`}
                onClick={toggleModal}
              >
                <ArrowDropDown />
              </Button>
            </p>
            {isModalOpen && (
              <OnTheMenuFilter
                ref={modalRef}
                onToggleModal={toggleModal}
                setAppliedFilters={setAppliedFilters}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OnTheMenuHeader;

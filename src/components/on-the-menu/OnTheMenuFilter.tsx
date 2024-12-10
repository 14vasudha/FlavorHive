import { forwardRef } from "react";

const OnTheMenuFilter = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <div
      ref={ref}
      role="dialog"
      className={`absolute left-1/2 top-10 z-10 flex -translate-x-1/2 transform bg-white shadow-lg`}
    >
      This is the filter
    </div>
  );
});

export default OnTheMenuFilter;

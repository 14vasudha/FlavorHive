import { ComponentProps, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(
  [
    "transition-colors",
    "duration-200",
    "ease-in",
    "rounded-3xl",
    "text-sm",
    "font-semibold",
    "tracking-widest",
    "uppercase",
  ],
  {
    variants: {
      display: {
        default: ["block"],
        flex: ["flex", "items-center", "justify-center"],
        "inline-block": ["inline-block"],
      },
      variant: {
        default: [
          "bg-primary",
          "hover:bg-primary-hover",
          "text-white",
          "hover:border-blue20",
        ],
        white: [
          "bg-white",
          "text-primary",
          "hover:bg-gray30",
          "hover:border-transparent",
        ],
        google: [
          "border-gray10",
          "hover:border-blue10",
          "hover:bg-blue50",
          "gap-3",
          "bg-white",
        ],
        apple: [
          "border-gray10",
          "hover:border-primary-black",
          "hover:bg-primary-black",
          "bg-black10",
          "text-white",
        ],
        icon: [
          "rounded-full",
          "w-10",
          "h-10",
          "p-2.5",
          "text-gray20",
          "bg-transparent",
          "hover:border-transparent",
          "hover:bg-gray-200",
        ],
      },
      size: {
        full: ["w-full"],
        default: ["w-fit"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      display: "default",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, display, className, ...props }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={twMerge(buttonStyles({ variant, size, display }), className)}
      >
        {props.children}
      </button>
    );
  },
);

export default Button;

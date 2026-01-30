import cx from "@/lib/cx";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "text-white box-border border border-transparent focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none",
  {
    variants: {
      variant: {
        default: " bg-brand hover:bg-brand-strong focus:ring-brand-medium   ",
        secondary:
          "text-body bg-neutral-secondary-medium border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading  focus:ring-neutral-tertiary ",
        tertiary:
          "text-body bg-neutral-primary-soft  border-default hover:bg-neutral-secondary-medium hover:text-heading  focus:ring-neutral-tertiary-soft ",
        success:
          " bg-success hover:bg-success-strong  focus:ring-success-medium ",
        danger: " bg-danger hover:bg-danger-strong  focus:ring-danger-medium ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ButtonVariants
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ref?: React.Ref<HTMLButtonElement>;
}

export default function Button({
  variant,
  ref,
  className,
  ...props
}: ButtonVariants) {
  return (
    <button
      ref={ref}
      className={cx(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

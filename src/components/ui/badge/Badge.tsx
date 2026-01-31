import cx from "@/lib/cx";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const badgeStyles = cva("text-xs font-medium px-1.5 py-0.5 rounded", {
  variants: {
    variant: {
      brand: "bg-brand-softer text-fg-brand-strong",
      alternative: "bg-neutral-primary-soft text-heading",
      gray: "bg-neutral-secondary-medium text-heading",
      danger: "bg-danger-soft text-fg-danger-strong",
      success: "bg-success-soft text-fg-success-strong",
      warning: "bg-warning-soft text-fg-warning",
    },
  },
  defaultVariants: {
    variant: "brand",
  },
});

interface BadgeProps
  extends VariantProps<typeof badgeStyles>, HTMLAttributes<HTMLSpanElement> {}

export default function Badge({ variant, className, ...props }: BadgeProps) {
  return (
    <span className={cx(badgeStyles({ variant }), className)} {...props} />
  );
}

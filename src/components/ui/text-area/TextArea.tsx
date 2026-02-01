import cx from "@/lib/cx";
import { HTMLAttributes } from "react";

export interface TextAreaProps extends Omit<
  HTMLAttributes<HTMLTextAreaElement>,
  "className"
> {
  className?: {
    container?: string;
    label?: string;
    textarea?: string;
  };
  label?: string;
  name?: string;
}

export default function TextArea({
  className,
  label,
  ...props
}: TextAreaProps) {
  return (
    <div className={className?.container}>
      <label
        htmlFor="message"
        className={cx(
          "block mb-2.5 text-sm font-medium text-heading",
          className?.label,
        )}
      >
        {label}
      </label>
      <textarea
        name={props.name}
        className={cx(
          "bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body",
          className?.textarea,
        )}
        {...props}
      ></textarea>
    </div>
  );
}

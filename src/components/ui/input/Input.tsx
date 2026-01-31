import cx from "@/lib/cx";
import { InputHTMLAttributes } from "react";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
  className?: {
    container?: string;
    label?: string;
    input?: string;
  };
}

export default function Input({ label, ref, className, ...props }: InputProps) {
  return (
    <div className={className?.container}>
      <label
        htmlFor={props.id}
        className={cx(
          "block mb-2.5 text-sm font-medium text-heading",
          className?.label,
        )}
      >
        {label}
      </label>
      <input
        ref={ref}
        className={cx(
          "bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body",
          className?.input,
        )}
        {...props}
      />
    </div>
  );
}

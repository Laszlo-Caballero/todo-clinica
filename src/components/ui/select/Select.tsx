import cx from "@/lib/cx";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "className"
> {
  className?: {
    container?: string;
    label?: string;
    select?: string;
  };
  options?: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  name?: string;
}

export default function Select({
  className,
  options,
  placeholder,
  label,
  ...props
}: SelectProps) {
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
      <select
        className={cx(
          "block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body",
          className?.select,
        )}
        name={props.name}
        {...props}
      >
        {placeholder && <option selected>{placeholder}</option>}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

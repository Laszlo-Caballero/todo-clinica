interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({ label, ref, ...props }: InputProps) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        {label}
      </label>
      <input
        ref={ref}
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        {...props}
      />
    </div>
  );
}

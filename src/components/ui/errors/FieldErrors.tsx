import { ReactNode } from "react";

interface ErrorProps {
  error?: string[];
  children?: ReactNode;
}

export default function FieldErrors({ error, children }: ErrorProps) {
  return (
    <div className="flex flex-col gap-1">
      {children}

      <div className="flex flex-col w-full gap-y-2">
        {error?.map((err, index) => (
          <p key={index} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
      </div>
    </div>
  );
}

"use client";

import { PropsWithChildren } from "react";
import { useContainerErrorContext } from "./ContainerError";
import cx from "@/lib/cx";

interface FieldErrorProps<T> extends PropsWithChildren {
  errorKey: keyof T;
  className?: string;
}

export default function FieldError<T>({
  errorKey,
  children,
  className,
}: FieldErrorProps<T>) {
  const { getErrorMessages } = useContainerErrorContext<T>();

  const error = getErrorMessages(errorKey);
  return (
    <div className={cx("flex flex-col gap-1", className)}>
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

import cx from "@/lib/cx";
import { PropsWithChildren } from "react";

interface ModalContentProps extends PropsWithChildren {
  className?: string;
}

export default function ModalContent({
  className,
  children,
}: ModalContentProps) {
  return (
    <div
      className={cx(
        "relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

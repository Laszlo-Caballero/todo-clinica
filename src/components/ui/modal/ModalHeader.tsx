import cx from "@/lib/cx";
import { PropsWithChildren } from "react";

export default function ModalHeader({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cx(
        "flex items-center justify-between border-b border-default pb-4 md:pb-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

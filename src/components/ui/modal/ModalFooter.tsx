import cx from "@/lib/cx";
import React, { PropsWithChildren } from "react";

export default function ModalFooter({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cx(
        "flex items-center border-t border-default space-x-4 pt-4 md:pt-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

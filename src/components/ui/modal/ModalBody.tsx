import cx from "@/lib/cx";
import React, { PropsWithChildren } from "react";

export default function ModalBody({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cx("space-y-4 md:space-y-6 py-4 md:py-6", className)}>
      {children}
    </div>
  );
}

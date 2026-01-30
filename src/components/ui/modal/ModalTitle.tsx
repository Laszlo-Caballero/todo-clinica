import cx from "@/lib/cx";
import React, { PropsWithChildren } from "react";

export default function ModalTitle({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <h3 className={cx("text-lg font-medium text-heading", className)}>
      {children}
    </h3>
  );
}
